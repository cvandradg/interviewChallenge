import { createAction, props } from '@ngrx/store';
import { apiParams } from '../../model/apiparams.model';


export const setApiParams = createAction('[TPM] setInput', props<{apiParams: apiParams}>());
