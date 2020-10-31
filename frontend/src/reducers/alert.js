// importing our alert types to create the initia state for alerts
import { SHOW_ALERT, HIDE_ALERT } from '../actions/types/alertTypes';

const initialState = [];

export default function (state = initialState, action) {
    // define type and payload coming from the action
    const { type, payload } = action;
    // define the state from an action type
    switch (type) {
        case SHOW_ALERT:
            return [...state, payload];
        case HIDE_ALERT:
            return state.filter((alert) => alert.id !== payload);
        default:
            return state;
    }
}