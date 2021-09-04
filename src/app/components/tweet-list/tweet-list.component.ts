/** 
 * Parse, list and displays the read tweets.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */

import { Store } from '@ngrx/store';
import { AppState } from '../../store/appState.state';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { tweetsReadHelper } from '../../mixins/tweetsReadHelper.mixin';
import { TwitterStreamService } from '../../services/twitter-stream.service';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent extends tweetsReadHelper implements OnInit, OnDestroy {

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
   * Calls for the stream of tweets and agregates the data.
   * 
   * @return {void} 
   */
  parseTweets(): void {
    this.streamSubscription =
      this.streamService
        .getTweetsStream()
        .subscribe((tweets: any) => {

          this.parsedTweets = this.getParsedTweets(tweets)

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
    if (!statetpm.isStreamOff) {
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
    if (statetpm.isClear)
      this.parsedTweets = []
  }
}
