import { type PayloadAction } from '@reduxjs/toolkit';
import axios, { type AxiosRequestConfig, type AxiosInstance, type AxiosResponse, type AxiosError, type AxiosHeaders } from 'axios';
import { toast } from 'react-toastify';
import { type Middleware } from 'redux';
import { type ApiResponse } from 'validator';

import { refreshTokenService } from '../services/apiService';
import { ApiRequestAction } from '../store/actions/apiActions';
import { refreshTokenSuccessAction } from '../store/actions/authActions';
import { type IRootState } from '../store/rootReducer';

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

      axios.defaults.baseURL = process.env.BACKEND_URL ?? '';
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      const axiosInstance: AxiosInstance = axios.create();
      axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const response: AxiosResponse<AxiosResponse<any>> = await axiosInstance.request({
          url,
          method,
          headers: headers as AxiosHeaders,
          params: params as AxiosRequestConfig,
          data: data as AxiosRequestConfig
        });

        const successActionType = onSuccess;
        const successPayload = { request: action.payload, response: response.data, payload: payload as Record<any, any> };
        dispatch({ type: successActionType, payload: successPayload });
      } catch (error) {
        try {
          const axiosError = error as AxiosError;

          if (!(axiosError.response != null && axiosError.response.status === 406)) {
            toast.error(`Failed to execute api. An internal server error occurred.`);
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
