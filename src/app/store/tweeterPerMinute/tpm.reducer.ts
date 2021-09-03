import { createReducer, on } from '@ngrx/store';
import * as tpmActions from './tpm.actions';
import { State } from "./tpm.state";

export const initialState: State = {
   isStreamOn: false,
   input: '',
   isClear: true
}

const _tpmReducer = createReducer(initialState,

    on(tpmActions.streamOn,   state => ({ ...state, isStreamOn: true, isClear:false   })),
    on(tpmActions.streamOff, state => ({ ...state, isStreamOn: false, isClear:false  })),

    on(tpmActions.setInput, (state, {input}) => ({ ...state, input: input, isStreamOn: input ? true:false, isClear:input ? false:true })),
    on(tpmActions.clear, state => ({ ...state, input: '', isStreamOn: false, isClear:true  })),

);

export function tpmReducer(state:any, action:any) {
    return _tpmReducer(state, action);
}   