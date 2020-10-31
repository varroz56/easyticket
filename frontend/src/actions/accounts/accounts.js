// define actions
import {
    LOGIN_SUCCESS,
    LOGIN_FAILED,
    SUCCESS_LOADING_USER,
    FAILED_LOADING_USER,
    AUTHENTICATION_SUCCESS,
    AUTHENTICATION_FAILED,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAILED,
    CONFIRM_PASSWORD_RESET_SUCCESS,
    CONFIRM_PASSWORD_RESET_FAILED,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAILED
} from '../actions/actionTypes';
// import axios to handle http requests
import axios from 'axios';
import { showAlert } from '../Alert';

export const checkAuthenticated = () => async (dispatch) => {
    // if exists, get local storage access token
    if (localStorage.getItem('access')) {
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            }
        };

        const body = JSON.stringify({ token: localStorage.getItem('access') });

        try {
            // using Djoser verify endpoint
            const res = await axios.post(
                `${process.env.REACT_APP_API_URL}/auth/jwt/verify/`,
                body,
                config
            );
            // djoser returns "code" : 'token_not_valid' if the token is not valid
            // if valid
            if (res.data.status === 200) {
                dispatch({
                    type: AUTHENTICATION_SUCCESS
                });
                dispatch(showAlert('Authentication Successful!', 'success'));
                // if token not valid
            } else if (res.data.code === 'token_not_valid') {
                dispatch({
                    type: AUTHENTICATION_FAILED
                });
                dispatch(showAlert('Authentication Failed', 'error'));
            }
            // any error
        } catch (err) {
            dispatch({
                type: AUTHENTICATION_FAILED
            });
            dispatch(
                showAlert(
                    'Authentication Failed, please refer to the error message: ' +
                    err,
                    'error'
                )
            );
        }
        // if found no tokencheckAuthenticated
    } else {
        dispatch({
            type: AUTHENTICATION_FAILED
        });
        dispatch(showAlert('Please Log In or Register.', 'info'));
    }
};

// to load user data
export const load_user = () => async (dispatch) => {
    // check if user access token exists
    if (localStorage.getItem('access')) {
        // in the header need to receive the token and uid
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `JWT ${localStorage.getItem('access')}`,
                Accept: 'application/json'
            }
        };
        // compare the user access token
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_API_URL}/auth/users/me/`,
                config
            );
            // if the token valid, send user data, loading success
            dispatch({
                type: SUCCESS_LOADING_USER,
                payload: res.data
            });
            dispatch(showAlert('Loading User Info', 'info'));
            // Any problems, token is invalid, do not send data
        } catch (err) {
            dispatch({
                type: FAILED_LOADING_USER
            });
            dispatch(
                showAlert(
                    'Authentication Failed, please refer to the error message: ' +
                    err,
                    'error'
                )
            );
        }
        // if no access token stored in the local storage
        // act as if the token was invlaid
    } else {
        dispatch({
            type: FAILED_LOADING_USER
        });
        dispatch(showAlert('Session Expired, Please Log In Again.', 'info'));
    }
};

// handling login data
export const login = (email, password) => async (dispatch) => {
    // set the header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // to be able valid format before post request
    const body = JSON.stringify({ email, password });

    try {
        // post request to have an access and refresh token created for user
        // if this is successful, send user data and login success
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/jwt/create/`,
            body,
            config
        );
        if (
            res.detail === 'No active account found with the given credentials'
        ) {
            dispatch({
                type: LOGIN_FAILED
            });
            dispatch(
                showAlert(
                    'Log In Failed, please check your login details.',
                    'error'
                )
            );
        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });
            dispatch(showAlert('Logged in Successful!', 'success'));
            // call load_user action to load
            dispatch(load_user());
        }
    } catch (err) {
        // if this is unsuccessful, do not send user data and login is unsuccessful
        dispatch({
            type: LOGIN_FAILED
        });
        dispatch(
            showAlert(
                'Log In Failed, please refer to the error message: ' + err,
                'error'
            )
        );
    }
};

// define sign up, using djoser create endpoint
export const signup = (formData) => async (dispatch) => {
    // set the header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // to be able valid format before post request
    const body = JSON.stringify(formData);
    console.log(body);
    try {
        // post request to have a user being created on the DB
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/`,
            body,
            config
        );
        dispatch({
            type: SIGNUP_SUCCESS,
            payload: res.data
        });
        dispatch(
            showAlert(
                'Signed Up Successfully, please lcheck your emails to activate your account',
                'success'
            )
        );
    } catch (err) {
        // if this is unsuccessful, do not send user data and login is unsuccessful
        dispatch({
            type: SIGNUP_FAILED
        });
        dispatch(
            showAlert(
                'Failed to Sign Up, please refer to the error message: ' + err,
                'error'
            )
        );
    }
};

// user account activation upon successful signup
export const verifyUser = (uid, token) => async (dispatch) => {
    // set the header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // to be able valid format before post request
    const body = JSON.stringify({ uid, token });

    try {
        // post request to have an access and refresh token created for user
        // if this is successful, send user data and login success
        await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/activation/`,
            body,
            config
        );
        dispatch({
            type: ACTIVATION_SUCCESS
        });
        dispatch(
            showAlert(
                'Successfully verified your email address, please log in',
                'success'
            )
        );
    } catch (err) {
        // if this is unsuccessful, do not send user data and login is unsuccessful
        dispatch({
            type: ACTIVATION_FAILED
        });
        dispatch(
            showAlert(
                'Failed to Verify your email address, please refer to the error message: ' +
                err,
                'error'
            )
        );
    }
};

export const reset_password = (email) => async (dispatch) => {
    // set the header
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email });
    // email address to djoser reset password endpoint
    try {
        await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/reset_password/`,
            body,
            config
        );

        dispatch({
            type: PASSWORD_RESET_SUCCESS
        });
        dispatch(
            showAlert(
                'Password Reset Request was successful, please check your email and follow the instructions!',
                'success'
            )
        );
        // if failed to send
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAILED
        });
        dispatch(
            showAlert(
                'Password Reset Request Failed, please refer to the error message: ' +
                err,
                'error'
            )
        );
    }
};

export const confirm_reset_password = (
    uid,
    token,
    new_password,
    re_new_password
) => async (dispatch) => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ uid, token, new_password, re_new_password });
    // this is when customer received the reset password email containing the uid and token
    // and need to send the uid and token along with the new password(and confirm) to the djoser endpoint
    try {
        const res = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/users/reset_password_confirm/`,
            body,
            config
        );

        dispatch({
            type: CONFIRM_PASSWORD_RESET_SUCCESS,
            payload: res.data
        });
        dispatch(
            showAlert(
                'Password Reset was Successful, please log in.',
                'success'
            )
        );
        // if failed for any reasons
    } catch (err) {
        dispatch({
            type: CONFIRM_PASSWORD_RESET_FAILED
        });
        dispatch(
            showAlert(
                'Password Reset Failed, please refer to the error message: ' +
                err,
                'error'
            )
        );
    }
};

export const logout = () => (dispatch) => {
    dispatch({
        type: LOGOUT
    });
    dispatch(showAlert('Logged Out.', 'info'));
};