import { createAction, props } from '@ngrx/store';
import { apiParams } from 'src/app/model/apiparams.model';


export const setApiParams = createAction('[TPM] setInput', props<{apiParams: apiParams}>());
