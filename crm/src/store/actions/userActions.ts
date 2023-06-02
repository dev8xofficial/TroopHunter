import { createAction } from '@reduxjs/toolkit';

export const fetchUsers = createAction('user/fetchUsers');
export const fetchUsersSuccess = createAction('user/fetchUsersSuccess');
export const fetchUsersFailure = createAction('user/fetchUsersFailure');
