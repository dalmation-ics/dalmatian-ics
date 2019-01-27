import {createStore as reduxCreateStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import allReducers from 'src/_redux/reducer/';
import React from 'react';

export const createStore = (initialState) => {
    if (initialState === undefined) {
        return reduxCreateStore(allReducers, applyMiddleware(thunk));
    } else {
        return reduxCreateStore(allReducers, initialState,
            applyMiddleware(thunk));
    }
};

export const wrapWithProvider = (module, store) => {
    return <Provider store={store}>{module}</Provider>;
};