import { Injectable, OnInit } from '@angular/core';
import { PubNubAngular } from 'pubnub-angular2';
import { HttpClient } from '@angular/common/http';
import { interval, Subject } from 'rxjs';
import { distinctUntilChanged, map, mergeAll, mergeMap, switchMap, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class TwitterStreamService implements OnInit{

  observer = {
    next: (val:any) => console.log('next:', val),
    complete: () => console.log('complete')
  }

  subject$ = new Subject();

  interval$ = interval(300);

  constructor(private http:HttpClient) {}

  ngOnInit(){}  
  

  getTweets(){
    const rnd = this.getRandomInt(9999);
    let url = `https://ps14.pndsn.com/v2/subscribe/sub-c-78806dd4-42a6-11e4-aed8-02ee2ddab7fe/pubnub-twitter/0?heartbeat=300&tt=16303808927${rnd}&tr=2&uuid=pn-34c440e6-58aa-41e5-9974-4017ce7d3209&pnsdk=PubNub-JS-Web%2F4.29.11`
    return this.http.get(url).pipe(
      map((tweet:any) => tweet.m),

      )
  }

  getTweetsStream(){
    return this.interval$.pipe(
      mergeMap(() => this.getTweets()),
      distinctUntilChanged(),
    )
  }

    getRandomInt(max:any) {
    return Math.floor(Math.random() * max);
  }
}