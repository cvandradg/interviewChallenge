/** 
 * Interface of the appplication State.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */


import * as tpm from "./tweeterPerMinute/tpm.state";
import * as api from "./api/api.state";

export interface AppState {
    api: api.State;
    tpm: tpm.State;
}