/** 
 * Hashtag input to search in the stream of tweets.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { AppState } from '../../store/appState.state';
import { FormControl, FormGroup } from '@angular/forms';
import * as tpm from "../../store/tweeterPerMinute/tpm.actions";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";


@Component({
  selector: 'app-hashtag-input',
  templateUrl: './hashtag-input.component.html',
  styleUrls: ['./hashtag-input.component.scss']
})
export class HashtagInputComponent  implements OnInit {

  input: FormGroup;
  tpmSubscription!: Subscription;

  constructor(
    private store: Store<AppState>, 
    )
  {
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

      this.store.select('tpm').subscribe((state:any)=>{
        state.input === '' && this.input.patchValue({ search: '' })
      })
  }
}
