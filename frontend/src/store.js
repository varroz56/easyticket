// Using Store to hold the whole state for the application
// https://redux.js.org/api/store
//https://redux.js.org/api/applymiddleware/
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// Import thunk to delay certain actions until a condition met
import thunk from 'redux-thunk'
// Using reducers to combine different functions
import rootReducer from './reducers';
// define initial state
const initialState = {};

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;