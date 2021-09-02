import { createReducer, on } from '@ngrx/store';
import * as apiActions from './api.actions';
import { State } from "./api.state";

export const initialState: State = {
    heartbeat: 300,
    tt: 1630380892773456,
    tr: 2,
    uuid: 'pn-34c440e6-58aa-41e5-9974-4017ce7d3209',
    pnsdk: 'PubNub-JS-Web%2F4.29.11'
}

const _apiReducer = createReducer(initialState,

    on(apiActions.setApiParams, (state, {apiParams}) => ({ ...state, apiParams: apiParams  })),


);

export function apiReducer(state:any, action:any) {
    return _apiReducer(state, action);
}   