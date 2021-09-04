/** 
 * Mapping of the reducers across the application.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */


import { ActionReducerMap } from "@ngrx/store";
import { AppState } from "./appState.state";
import * as api from "./api/api.reducer";
import * as tpm from "./tweeterPerMinute/tpm.reducer";

export const appReducers: ActionReducerMap<AppState> = {
    api: api.apiReducer,
    tpm: tpm.tpmReducer
}