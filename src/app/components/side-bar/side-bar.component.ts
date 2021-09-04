/** 
 * Sidebar, provides buttons to interact with the stream of tweets.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */


import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/appState.state';
import * as tpm from "../../store/tweeterPerMinute/tpm.actions";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
  }

 /** 
  * Starts the stream of tweets.
  * 
  * @return {void} 
  */
  start(): void{
  this.store.dispatch(tpm.streamOn())
  }

 /** 
  * Stops the stream of tweets.
  * 
  * @return {void} 
  */
  stop(): void{
    this.store.dispatch(tpm.streamOff())
  }

 /** 
  * Clears the hashtag input and tweets displayed.
  * 
  * @return {void} 
  */
  clear(): void{
    this.store.dispatch(tpm.clear())
  }

}
