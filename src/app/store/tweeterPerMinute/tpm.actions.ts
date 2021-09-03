import { createAction, props } from '@ngrx/store';

export const streamOn = createAction('[TPM] streamOn');
export const streamOff = createAction('[TPM] streamOff');


export const setInput = createAction('[TPM] setInput', props<{input: string}>());
export const clear = createAction('[TPM] clear');