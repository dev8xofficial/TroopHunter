import { createAction } from '@reduxjs/toolkit';

export interface IApiRequestAttributes<P, D, H, PD> {
  url: string;
  method: string;
  params?: P;
  data?: D;
  onSuccess?: string;
  onFailure?: string;
  headers?: H;
  requireAuth: boolean;
  payload?: PD;
}

// Create the API action using createAction
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ApiRequestAction = createAction<IApiRequestAttributes<any, any, any, any>>('api');
