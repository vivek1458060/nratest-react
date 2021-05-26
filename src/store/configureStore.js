import thunk from 'redux-thunk';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import authReducer from '../reducers/auth';
import modalReducer from '../reducers/modal';

const composeEnhacers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const configureStore = () => {
    const store = createStore(
        combineReducers({
            auth: authReducer,
            modal: modalReducer
        }),
        composeEnhacers(applyMiddleware(thunk))
    )
    return store;
}

export default configureStore;