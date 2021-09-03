import { state } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(
    private store: Store<AppState>,
    private streamService: TwitterStreamService) 
  {
    super()
  }
  
  ngOnInit(): void {
    this.tpmSubscription = this.tpmObject(this.store)
      .subscribe((statetpm: any) => {



        this.input = statetpm.input
        this.isStreamOn = statetpm.isStreamOn
        this.shouldClear(statetpm)
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
          
           this.parsedTweets =this.getParsedTweets(tweets)
           
        })
  }

  isSubscribedTweetsStream(statetpm: any) {
    console.log(statetpm.isStreamOn)
    if (statetpm.isStreamOn) {
      this.parseTweets()
      return true;
    }

    return false;
  }

  isUnSuscribedTweetsStream(statetpm: any) {
    if (!statetpm.isStreamOff) {
      this.streamSubscription?.unsubscribe()
      return true;
    }

    return false
  }

  shouldClear(statetpm:any){
    console.log('should clean,',statetpm.isClear)
      if(statetpm.isClear)
      this.parsedTweets = []
  }
}
