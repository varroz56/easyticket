// These information will be sent to the store

// https://redux.js.org/basics/actions/

// Define action types
// auth specific
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILED = 'LOGIN_FAILED';
export const SUCCESS_LOADING_USER = 'SUCCESS_LOADING_USER';
export const FAILED_LOADING_USER = 'FAILED_LOADING_USER';

export const AUTHENTICATION_SUCCESS = 'LOGIN_SUCCESS';
export const AUTHENTICATION_FAILED = 'AUTHENTICATION_FAILED';
export const LOGOUT = 'LOGOUT';

export const PASSWORD_RESET_SUCCESS = 'PASSWORD_RESET_SUCCESS';
export const PASSWORD_RESET_FAILED = 'PASSWORD_RESET_FAILED';
export const CONFIRM_PASSWORD_RESET_SUCCESS = 'CONFIRM_PASSWORD_RESET_SUCCESS';
export const CONFIRM_PASSWORD_RESET_FAILED = 'CONFIRM_PASSWORD_RESET_FAILED';

export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAILED = 'SIGNUP_FAILED';

export const ACTIVATION_SUCCESS = 'ACTIVATION_SUCCESS';
export const ACTIVATION_FAILED = 'ACTIVATION_FAILED';
