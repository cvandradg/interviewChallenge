/** 
 * Functions and variables used in multiple components.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */

import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AppState } from "../store/appState.state";

export class tweetsReadHelper {

  parsedTweets: any[] = [];
  input: string = ''
  isStreamOn!: boolean;
  tpmSubscription!: Subscription;
  streamSubscription!: Subscription;

  /** 
   * Selects the tweets that contains the given hashtag (if applicable).
   * 
   * @param {array any} tweets
   * @param {String} input
   * @return {array | void} 
   */
  tweetsWithHashtag(tweets: any, input: string) {
    if (this.isStreamOn && input === '') {
      return tweets.filter((tweet: any) => tweet.entities.hashtags.length)
    }

    if (this.isStreamOn && input !== '') {
      return tweets.filter((tweet: any) => this.hasInputHashtag(tweet.entities.hashtags, input))
    }
  }

  /** 
   * Identifies if the input matches a hashtag inside the tweets.
   * 
   * @param {array any} tweets
   * @param {String} input
   * @return {boolean} 
   */
  hasInputHashtag(tweets: any[], input: string): boolean {
    return tweets.some((tweet: any) => tweet.text.toUpperCase() === input.toUpperCase())
  }

  /** 
   * Selects the key where the most valuable content is located.
   * 
   * @param {array any} rawTweets
   * @return {array} 
   */
  extractMainData(rawTweets: []): Array<any> {
    return rawTweets.map((tweet: any) => tweet.d)
  }

  /** 
   * Shortens the displayed user name.
   * 
   * @param {array any} str
   * @return {String} 
   */
  characterLimitCount(str: string): string {
    return (str.length > 9) ? (str.slice(0, 6) + '..') : (str)
  }

  /** 
   * Returns the store state of tpm.
   * 
   * @param {Store} store
   * @return {Store} 
   */
  tpmObject(store: any): Store<AppState> {
    return store.select('tpm')
  }

  /** 
   * Sorts the given array of tweets.
   * 
   * @param {array any} tweets
   * @return {array} 
   */
  sortbyTime(tweets: any[]): Array<any> {
    return tweets.sort(function (c, d) {
      return +new Date(d.created_at) - +new Date(c.created_at)
    })
  }

  /** 
   * Unifies and sorts the unique tweets into a single array.
   * 
   * @param {array any} tweets
   * @return {array} 
   */
  getParsedTweets(tweets: any): Array<any> {
    let temparray = [...this.parsedTweets, ...this.tweetsWithHashtag(tweets, this.input)]

    return temparray = Array.from(new Set(temparray.map(a => a.id)))
      .map(id => {
        return temparray.find(a => a.id === id)
      })

  }

}