/** 
 * Shows the tweets per second and read tweets.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */

import { Store } from '@ngrx/store';
import { AppState } from '../../store/appState.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { tweetsReadHelper } from '../../mixins/tweetsReadHelper.mixin';
import { TwitterStreamService } from '../../services/twitter-stream.service';

@Component({
  selector: 'app-tweets-counter',
  templateUrl: './tweets-counter.component.html',
  styleUrls: ['./tweets-counter.component.scss']
})
export class TweetsCounterComponent extends tweetsReadHelper implements OnInit, OnDestroy {

  tpm = '';
  startTime: any;
  totalTweets = 0;

  constructor(
    private store: Store<AppState>,
    private streamService: TwitterStreamService) {
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

 /** 
  * Real time number of tweets per minute.
  * 
  * @return {void} 
  */
  tweetsPerMinute(): void {
    const currentTime = new Date();
    const difference = currentTime.getTime() - this.startTime.getTime(); // This will give difference in milliseconds
    const diffInMin = Math.round(difference / 1000);
    this.tpm = (this.parsedTweets.length / diffInMin).toFixed(2)
  }

 /** 
  * Parses the stream of tweets into a consumable product.
  * 
  * @return {void} 
  */
  parseTweets(): void {
    this.streamSubscription =
      this.streamService
        .getTweetsStream()
        .subscribe((tweets: any) => {
          this.totalTweets += tweets.length
          this.parsedTweets = this.getParsedTweets(tweets)
          this.tweetsPerMinute()
        })
  }

  /** 
   * Checks if it should be subscribed to the stream of tweets.
   * 
   * @param {any} statetpm 
   * @return {Boolean} 
   */
  isSubscribedTweetsStream(statetpm: any): boolean {
    if (statetpm.isStreamOn) {
      this.parseTweets()
      this.startTime = new Date()
      return true;
    }

    return false;
  }

  /** 
   * Checks if it should be unsubscribed to the stream of tweets.
   * 
   * @param {any} statetpm 
   * @return {Boolean} 
   */
  isUnSuscribedTweetsStream(statetpm: any): boolean {
    if (statetpm.isStreamOff) {
      this.streamSubscription?.unsubscribe()
      return true;
    }

    return false
  }

  /** 
   * Checks if it should clean the array and input field.
   * 
   * @param {any} statetpm 
   * @return {void} 
   */
  shouldClear(statetpm: any): void {
    if (statetpm.isClear) {
      this.tpm = ''
      this.totalTweets = 0
      this.parsedTweets = []
    }
  }

}
