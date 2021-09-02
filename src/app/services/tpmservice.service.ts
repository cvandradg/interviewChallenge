import { Injectable, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../store/appState.state';


@Injectable({
  providedIn: 'root'
})
export class TpmserviceService implements OnInit{

  uiSubscription: Subscription | undefined

  constructor(private store:Store<AppState>) { }

  ngOnInit() {

  }

  getI(){
    return this.store.select('tpm')
  }
}
