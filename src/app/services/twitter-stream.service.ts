/** 
 * Generates a stream of tweets.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */

import { interval, Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { distinctUntilChanged, map, mergeMap, multicast, refCount} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TwitterStreamService implements OnInit{
  subject$ = new Subject();
  interval$ = interval(300);

  public multicasted = this.interval$.pipe();

  constructor(private http:HttpClient) {}

  ngOnInit(){}  
  
  /** 
   * Calls for an array of tweets.
   * 
   * @return {Observable} 
   */
  getTweets(): Observable<any>{
    const rnd = this.getRandomInt(9999);
    let url = `https://ps14.pndsn.com/v2/subscribe/sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe/pubnub-twitter/0?heartbeat=300&tt=16303808927${rnd}&tr=2&uuid=pn-34c440e6-58aa-41e5-9974-4017ce7d3209&pnsdk=PubNub-JS-Web%2F4.29.11`
    return this.http.get(url).pipe(
      map((tweet:any) => tweet.m))
  }

  /** 
   * Creates a stream of tweets.
   * 
   * @return {Observable} 
   */
  getTweetsStream(): Observable<any>{
    return this.interval$.pipe(
      mergeMap(() => this.getTweets()),
      map(tweet => {
        return this.extractMainData(tweet)
      }),
      distinctUntilChanged(),
      multicast(this.subject$),
      refCount()
    )
  }

  /** 
   * Creates a random number based on a max possible value.
   * 
   * @param {number} max
   * @return {number} 
   */
  getRandomInt(max:number): number {
    return Math.floor(Math.random() * max);
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
}