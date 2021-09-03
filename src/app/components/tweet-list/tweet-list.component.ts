import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { tweetsReadHelper } from '../../mixins/tweetsReadHelper.mixin';
import { TwitterStreamService } from '../../services/twitter-stream.service';
import { AppState } from '../../store/appState.state';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent extends tweetsReadHelper implements OnInit, OnDestroy {


  

  constructor(private store: Store<AppState>, private streamService: TwitterStreamService, private ref: ChangeDetectorRef) 
  {
    super()
  }
  
  ngOnInit(): void {
    this.tpmSubscription = this.tpmObject(this.store)
      .subscribe((statetpm: any) => {
        
        this.input = statetpm.input
        this.isSubscribedTweetsStream(statetpm) || this.isUnSuscribedTweetsStream(statetpm)
      })
  }

  ngOnDestroy() {
    this.cancelSubscriptions()
  }

  cancelSubscriptions() {
    this.tpmSubscription?.unsubscribe()
    this.streamSubscription?.unsubscribe()
  }


  parseTweets() {
    this.streamSubscription =
      this.streamService
        .getTweetsStream()
        .subscribe((tweets:any) => {
           this.parsedTweets.push(...this.tweetsWithHashtag(tweets, this.input))
           this.parsedTweets = this.sortbyTime(this.parsedTweets)
        })
  }

  isSubscribedTweetsStream(statetpm: any) {
    if (statetpm.input !== '') {
      this.parseTweets()
      return true;
    }

    return false;
  }

  isUnSuscribedTweetsStream(statetpm: any) {
    if (statetpm.input === '') {
      this.streamSubscription?.unsubscribe()
      return true;
    }

    return false;
  }

}
