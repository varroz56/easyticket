import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL
} from './types';
import axios from 'axios';

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
