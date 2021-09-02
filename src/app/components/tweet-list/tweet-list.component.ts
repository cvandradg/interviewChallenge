import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { of, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';
import { TwitterStreamService } from '../../services/twitter-stream.service';
import { AppState } from '../../store/appState.state';

@Component({
  selector: 'app-tweet-list',
  templateUrl: './tweet-list.component.html',
  styleUrls: ['./tweet-list.component.scss']
})
export class TweetListComponent implements OnInit, OnDestroy {

  parsedTweets: any[] = [];
  input: string = ''

  tpmSubscription: Subscription | undefined;
  streamSubscription: Subscription | undefined;

  constructor(private store: Store<AppState>, private streamService: TwitterStreamService, private ref: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.tpmSubscription = this.tpmObject()
      .subscribe((statetpm: any) => {
        this.input = statetpm.input

        if (statetpm.input !== '') {
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



  tweetsWithHashtag(tweets:any) {
    if(this.input === '##'){
      console.log('entra1')
      return tweets.filter((tweet: any) => tweet.entities.hashtags.length)
    }

    if(this.input !== '##' && this.input !== '' ){
      console.log('entra2')
      return tweets.filter((tweet: any) => this.hasInputHashtag(tweet.entities.hashtags) )
    }
  }

  hasInputHashtag(tweets:any[]) {
    return tweets.some( (tweet:any)=> tweet.text.toUpperCase() === this.input.toUpperCase() )
  }


  extractMainData(rawTweets: []) {
    return rawTweets.map((tweet: any) => tweet.d)
  }

  characterLimitCount(str: string) {
    return (str.length > 9) ? (str.slice(0, 6) + '..') : (str)
  }

  tpmObject() {
    return this.store.select('tpm')
  }

  sortbyTime(tweets:any[]){
    return tweets.sort(function(c, d) {
      return  +new Date(d.created_at) - +new Date(c.created_at)
    })
  }

  parseTweets() {
    this.streamSubscription =
      this.streamService
        .getTweetsStream()
        .pipe(
          map(tweet => {
            return this.extractMainData(tweet)
          }),
          distinctUntilChanged()
        ).subscribe((tweets:any) => {
           this.parsedTweets.push(...this.tweetsWithHashtag(tweets))
           this.parsedTweets = this.sortbyTime(this.parsedTweets)
          // this.ref.detectChanges()
        })
  }

}
