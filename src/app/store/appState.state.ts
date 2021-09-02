import * as tpm from "./tweeterPerMinute/tpm.state";
import * as api from "./api/api.state";
import { apiParams } from "../model/apiparams.model";


export interface AppState {
    api: api.State;
    tpm: tpm.State;
}