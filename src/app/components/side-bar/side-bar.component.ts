import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
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


  start(){
  this.store.dispatch(tpm.streamOn())
  }

  stop(){
    this.store.dispatch(tpm.streamOff())
  }

  clear(){
    this.store.dispatch(tpm.clear())
  }

}
