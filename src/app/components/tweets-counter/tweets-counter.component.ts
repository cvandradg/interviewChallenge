import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { tweetsReadHelper } from '../../mixins/tweetsReadHelper.mixin';
import { TwitterStreamService } from '../../services/twitter-stream.service';
import { AppState } from '../../store/appState.state';

@Component({
  selector: 'app-tweets-counter',
  templateUrl: './tweets-counter.component.html',
  styleUrls: ['./tweets-counter.component.scss']
})
export class TweetsCounterComponent extends tweetsReadHelper implements OnInit, OnDestroy {

  tpm = '';
  startTime: any;
  totalTweets = 0;

  constructor(private store: Store<AppState>, private streamService: TwitterStreamService) 
  {
    super()
  }

  ngOnInit(): void {
    this.tpmSubscription = this.tpmObject(this.store)
      .subscribe((statetpm: any) => {
        this.input = statetpm.input

        if (statetpm.input !== '') {
          this.startTime = new Date()
          this.parseTweets()
        } 
        
        if (statetpm.input === ''){
          this.streamSubscription?.unsubscribe()
        }
      })
  }

  ngOnDestroy() {
    this.cancelSubscriptions()
  }

  cancelSubscriptions() {
    this.tpmSubscription?.unsubscribe()
    this.streamSubscription?.unsubscribe()
  }

  tweetsPerMinute(){
    const currentTime = new Date();
    const difference = currentTime.getTime() - this.startTime.getTime(); // This will give difference in milliseconds
    const diffInMin = Math.round(difference / 1000);
    console.log('diff in mins,',this.parsedTweets.length+1, diffInMin)
    this.tpm = (this.parsedTweets.length / diffInMin).toFixed(2)
  }

  parseTweets() {
    this.streamSubscription =
      this.streamService
        .getTweetsStream()
        .subscribe((tweets:any) => {
           console.log('tweets,',tweets)
           this.totalTweets += tweets.length
           this.parsedTweets.unshift(...this.tweetsWithHashtag(tweets, this.input))
           console.log('parsed,',this.parsedTweets)
           this.tweetsPerMinute()
        })
  }
}
