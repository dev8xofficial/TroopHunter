import { createAction } from '@reduxjs/toolkit';

export const setTargetRoute = createAction<string>('navigation/setTargetRoute');
export const setNavigationOptions = createAction<object>('navigation/setNavigationOptions');
export const resetNavigationAction = createAction('navigation/resetNavigationAction');
