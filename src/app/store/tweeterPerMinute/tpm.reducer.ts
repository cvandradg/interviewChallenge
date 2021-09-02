import { createReducer, on } from '@ngrx/store';
import * as tpmActions from './tpm.actions';
import { State } from "./tpm.state";

export const initialState: State = {
   isStreamOn: false,
   input: ''
}

const _tpmReducer = createReducer(initialState,

    on(tpmActions.streamOn,   state => ({ ...state, isStreamOn: true   })),
    on(tpmActions.streamOff, state => ({ ...state, isStreamOn: false  })),

    on(tpmActions.setInput, (state, {input}) => ({ ...state, input: input  })),
    on(tpmActions.unsetInput, state => ({ ...state, input: ''  })),

);

export function tpmReducer(state:any, action:any) {
    return _tpmReducer(state, action);
}   