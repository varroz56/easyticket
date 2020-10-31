// using uuid to set a unique id to all alerts
import { v4 as uuid } from 'uuid';
import { SHOW_ALERT, HIDE_ALERT } from './alertTypes';

// The alert will have a message, a type(error, success, info)
// and a timeout to automatically hide the alert after a set of time
export const showAlert = (msg, alertType, timeout = 5000) => (dispatch) => {
    const id = uuid();
    dispatch({
        type: SHOW_ALERT,
        payload: { msg, alertType, id }
    });
    // after 5 seconds will call the HIDE ALERT action
    setTimeout(() => dispatch({ type: HIDE_ALERT, payload: id }), timeout);
};
