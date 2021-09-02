import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { fromEvent, of, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { TwitterStreamService } from '../../services/twitter-stream.service';
import { AppState } from '../../store/appState.state';
import * as tpm from "../../store/tweeterPerMinute/tpm.actions";

@Component({
  selector: 'app-hashtag-input',
  templateUrl: './hashtag-input.component.html',
  styleUrls: ['./hashtag-input.component.scss']
})
export class HashtagInputComponent implements OnInit {

  input: FormGroup;
  tpmSubscription: Subscription | undefined;

  constructor(private store:Store<AppState>, private streamService:TwitterStreamService) {
      this.input = new FormGroup({
        search: new FormControl()
    });
  } 

  ngOnInit(): void {
    this.input.get('search')?.valueChanges
    .pipe(
      debounceTime(700),
      distinctUntilChanged()
    )
    .subscribe(input => {
      this.store.dispatch(tpm.setInput({ input }))
    })

  
  }

}
