import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    AUTHENTICATED_SUCCESS,
    AUTHENTICATED_FAIL,
    LOGOUT,
    SIGNUP_SUCCESS,
    SIGNUP_FAIL,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAIL,
    PASSWORD_RESET_SUCCESS,
    PASSWORD_RESET_FAIL,
    CONFIRM_PASSWORD_RESET_SUCCESS,
    CONFIRM_PASSWORD_RESET_FAIL
} from './types';
import axios from 'axios';

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
            if (res.data.code !== "token_not_valid") {
                dispatch({
                    type: AUTHENTICATED_SUCCESS
                });
            } else {
                dispatch({
                    type: AUTHENTICATED_FAIL
                });
            }
            // any error
        } catch (err) {
            dispatch({
                type: AUTHENTICATED_FAIL
            });
        }
        // if found no tokencheckAuthenticated
    } else {
        dispatch({
            type: AUTHENTICATED_FAIL
        });
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
                type: LOAD_USER_SUCCESS,
                payload: res.data
            });

            // Any problems, token is invalid, do not send data
        } catch (err) {
            dispatch({
                type: LOAD_USER_FAIL
            });

        }
        // if no access token stored in the local storage
        // act as if the token was invlaid
    } else {
        dispatch({
            type: LOAD_USER_FAIL
        });

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
    console.log(email, password)
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
                type: LOGIN_FAIL
            });

        } else {
            dispatch({
                type: LOGIN_SUCCESS,
                payload: res.data
            });

            // call load_user action to load
            dispatch(load_user());
        }
    } catch (err) {
        // if this is unsuccessful, do not send user data and login is unsuccessful
        dispatch({
            type: LOGIN_FAIL
        });
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
    } catch (err) {
        // if this is unsuccessful, do not send user data and login is unsuccessful
        dispatch({
            type: SIGNUP_FAIL
        });
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
    } catch (err) {
        // if this is unsuccessful, do not send user data and login is unsuccessful
        dispatch({
            type: ACTIVATION_FAIL
        });
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
        // if failed to send
    } catch (err) {
        dispatch({
            type: PASSWORD_RESET_FAIL
        });
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
        // if failed for any reasons
    } catch (err) {
        dispatch({
            type: CONFIRM_PASSWORD_RESET_FAIL
        });
    }
};


export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT
    });
};