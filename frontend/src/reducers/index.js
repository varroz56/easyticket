//https://redux.js.org/api/combinereducers/
// define combine reducers to include alert, auth and other reducers
import { combineReducers } from 'redux';
import alert from './alert';
import accounts from './accounts';


export default combineReducers({
    alert,
    accounts
});