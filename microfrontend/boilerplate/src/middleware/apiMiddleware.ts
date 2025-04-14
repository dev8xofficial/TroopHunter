import { type PayloadAction } from '@reduxjs/toolkit';
import { type ApiResponse } from '@repo/validator';
import axios, { type AxiosRequestConfig, type AxiosInstance, type AxiosResponse, type AxiosError, type AxiosHeaders } from 'axios';
import { toast } from 'react-toastify';
import { type Middleware } from 'redux';

import { refreshTokenService } from '../services/apiService';
import { ApiRequestAction } from '../store/actions/apiActions';
import { refreshTokenSuccessAction } from '../store/actions/authActions';
import { type IRootState } from '../store/rootReducer';
import { getBackendUrl } from '../utils/helpers';

const apiMiddleware: Middleware =
  ({ getState, dispatch }) =>
  (next) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (action: PayloadAction<any>) => {
    if (ApiRequestAction.match(action)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { url, method, params, data, onSuccess, headers, requireAuth = false, payload } = action.payload;
      const state: IRootState = getState() as IRootState;
      const accessToken = state.auth.accessToken;
      const refreshToken = state.auth.refreshToken;

      if (!requireAuth) {
        return;
      }

      axios.defaults.baseURL = getBackendUrl();
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      const axiosInstance: AxiosInstance = axios.create();
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let response: AxiosResponse<AxiosResponse<any>> = await axiosInstance.request({
          url,
          method,
          headers: headers as AxiosHeaders,
          params: params as AxiosRequestConfig,
          data: data as AxiosRequestConfig
        });

        if (response.data !== null && response.data !== undefined && response.data.status === 406) {
          const refreshResponse: ApiResponse<{ accessToken: string }> = await refreshTokenService(axiosInstance, refreshToken);
          if (refreshResponse.data !== null && refreshResponse.data !== undefined && refreshResponse.data.accessToken.length > 0) {
            axiosInstance.defaults.headers.common.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
            dispatch(refreshTokenSuccessAction({ accessToken: refreshResponse.data.accessToken }));

            response = await axiosInstance.request({
              url,
              method,
              headers: headers as AxiosHeaders,
              params: params as AxiosRequestConfig,
              data: data as AxiosRequestConfig
            });
          } else {
            toast.error(refreshResponse.error);
            return;
          }
        }

        const successActionType = onSuccess;
        const successPayload = { request: action.payload, response: response.data, payload: payload as Record<any, any> };
        dispatch({ type: successActionType, payload: successPayload });
      } catch (error) {
        try {
          const axiosError = error as AxiosError<ApiResponse<Omit<ApiResponse<unknown>, 'data'>>>;

          if (!(axiosError.response != null && axiosError.response.status === 406)) {
            if (axiosError.response != null && typeof axiosError.response.data === 'object') {
              const messageText = axiosError.response.data.message as string;
              const errorText = axiosError.response.data.error as string;
              toast.error(`${messageText.length > 0 ? messageText : errorText}`);
            } else {
              toast.error(`Failed to execute API. An internal server error occurred.`);
            }
            return;
          }

          const refreshResponse: ApiResponse<{ accessToken: string }> = await refreshTokenService(axiosInstance, refreshToken);
          if (!(refreshResponse.data !== null && refreshResponse.data !== undefined && refreshResponse.data.accessToken.length > 0 && axiosError.config != null)) {
            toast.error(`Failed to execute refresh token api. An internal server error occurred.`);
            return;
          }

          try {
            const retryConfig: AxiosRequestConfig = {
              ...axiosError.config,
              headers: {
                ...axiosError.config.headers,
                Authorization: `Bearer ${refreshResponse.data.accessToken}`
              }
            };
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const retryResponse: AxiosResponse<ApiResponse<any>> = await axiosInstance.request(retryConfig);

            if (!(retryResponse.data !== undefined && onSuccess !== undefined)) {
              return;
            }

            const successActionType = onSuccess;
            const successPayload = { request: action.payload, response: retryResponse.data };
            dispatch(refreshTokenSuccessAction({ accessToken: refreshResponse.data.accessToken }));
            dispatch({ type: successActionType, payload: successPayload });
          } catch (refreshError) {
            toast.error((refreshError as Error).message);
            console.error(refreshError);
          }
        } catch (error) {
          toast.error((error as Error).message);
          console.error(error);

          // If token refresh or retry fails, reject the promise
          return await Promise.reject(error);
        }
      }
    } else {
      next(action);
    }
  };

export default apiMiddleware;
