import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { map, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { TwitterStreamService } from '../../services/twitter-stream.service';
import { AppState } from '../../store/appState.state';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit, OnDestroy {

  parsedTweets :any[]=[];
  input:string = ''

  tpmSubscription: Subscription | undefined;
  streamSubscription: Subscription | undefined;

  constructor(private store:Store<AppState>, private streamService:TwitterStreamService) { }

  ngOnInit(): void {
    this.tpmSubscription = this.tpmObject()
    .subscribe( (tweets:any) => {
        console.log('que trae?',tweets.input)

        if(tweets.input !== ''){
          this.parseTweets(tweets)
        } else {
          this.streamSubscription?.unsubscribe()
        }
    })
  }

  ngOnDestroy(){
    this.cancelSubscriptions()
  }

  cancelSubscriptions(){
    this.tpmSubscription?.unsubscribe()
    this.streamSubscription?.unsubscribe()
  }



  tweetsWithHashtag(tweets:any){
    const tweetsWithHash = tweets.filter( (tweet:any) => tweet.entities.hashtags.length)
    this.parsedTweets.concat(tweetsWithHash)
    return tweetsWithHash
  }


  extractMainData(rawTweets: []) {
    return rawTweets.map( (tweet:any) => tweet.d)
  }

  characterLimitCount(str:string){
    return  (str.length>9) ? (str.slice(0,6)+'..'):(str)
  }

  tpmObject(){
    return  this.store.select('tpm')
  }

  //return  (str.length>9) ? (str.slice(0,6)+'..'):(str)
  parseTweets(tweets:any[]){
    this.streamSubscription = this.streamService.getTweetsStream().pipe(
      map( tweet => this.extractMainData(tweet))
    ).subscribe(tweets => {

      this.parsedTweets = [...this.parsedTweets, ...this.tweetsWithHashtag(tweets)]
      console.log('llamado', this.parsedTweets)
    })
  }

}
