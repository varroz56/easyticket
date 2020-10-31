// Define reducers for authentication related actions
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
    SIGNUP_SUCCESS,
    SIGNUP_FAILED,
    ACTIVATION_SUCCESS,
    ACTIVATION_FAILED,
    LOGOUT
} from '../actions/actionTypes';

// Define initial state, check if there is an access and 
// refresh token stored in the local storage
// at this state user is not athenticated and is not defined who is this
const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: null,
    user: null
};

export default function (state = initialState, action) {
    const { type, payload } = action;
    // reducers for the different action types
    switch (type) {
        case LOGIN_SUCCESS:
            // login success, set access in local storage
            localStorage.setItem('access', payload.access);
            return {
                // if this state contains other infomation
                ...state,
                // set values for this state
                isAuthenticated: true,
                access: payload.access,
                refresh: payload.refresh
            }
        case SIGNUP_SUCCESS:
            //if signup success user is still not authenticated
            // only if login after signup
            return {
                ...state,
                isAuthenticated: false
            }
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
            }
        case SUCCESS_LOADING_USER:
            // if user loaded successfully, pass user data to the state
            if (state.isAuthenticated === true) {
                return {
                    ...state,
                    user: payload
                }
            } else {
                // as when reloading the page the access token has not timed out, but is Authenticated fail
                // the user still can load as expected from a refresh but the navbar/ anything else need to reflect this
                // so as long as the user's token valid, the session will be authenticated
                // in this case user won't load anymore if the token timed out and as refreshed the page, no refresh token in place so this 
                // will prevent to have is Authenticated in place unless an access token is 
                state.isAuthenticated = true;
                return {
                    ...state,
                    user: payload
                }
            }
        case AUTHENTICATION_FAILED:
            // if user NOT loaded successfully, user set to none
            return {
                ...state,
                user: null
            }
        case FAILED_LOADING_USER:
            // if user NOT loaded successfully, user set to none
            return {
                ...state,
                user: null
            }
        // Login failed, sign up failed and logout set the state to the same
        case SIGNUP_FAILED:
        case LOGIN_FAILED:
        case LOGOUT:
            // login failed, remove any access/refres token stored in localstorage
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated: false,
                access: null,
                refresh: null,
                user: null
            }
        case PASSWORD_RESET_SUCCESS:
        case PASSWORD_RESET_FAILED:
        case CONFIRM_PASSWORD_RESET_SUCCESS:
        case CONFIRM_PASSWORD_RESET_FAILED:
        case ACTIVATION_SUCCESS:
        case ACTIVATION_FAILED:
            return {
                ...state
            }

        default:
            return state
    }
};