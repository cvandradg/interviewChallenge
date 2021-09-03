import { ThrowStmt } from "@angular/compiler";
import { Subscription } from "rxjs";

export class tweetsReadHelper {

  parsedTweets: any[] = [];
  input: string = ''
  isStreamOn!: boolean;
  tpmSubscription: Subscription | undefined;
  streamSubscription: Subscription | undefined;

  tweetsWithHashtag(tweets: any, input: string) {
    if (this.isStreamOn && input === '') {
      console.log('entra1')
      return tweets.filter((tweet: any) => tweet.entities.hashtags.length)
    }

    if (this.isStreamOn && input !== '') {
      console.log('entra2')
      return tweets.filter((tweet: any) => this.hasInputHashtag(tweet.entities.hashtags, input))
    }
  }

  hasInputHashtag(tweets: any[], input: string) {
    return tweets.some((tweet: any) => tweet.text.toUpperCase() === input.toUpperCase())
  }


  extractMainData(rawTweets: []) {
    return rawTweets.map((tweet: any) => tweet.d)
  }

  characterLimitCount(str: string) {
    return (str.length > 9) ? (str.slice(0, 6) + '..') : (str)
  }

  tpmObject(store: any) {
    return store.select('tpm')
  }

  sortbyTime(tweets: any[]) {
    return tweets.sort(function (c, d) {
      return +new Date(d.created_at) - +new Date(c.created_at)
    })
  }
  
  getParsedTweets(tweets:any) {
    let temparray = [...this.parsedTweets, ...this.tweetsWithHashtag(tweets, this.input)]

    return temparray = Array.from(new Set(temparray.map(a => a.id)))
      .map(id => {
        return temparray.find(a => a.id === id)
      })

      // return this.parsedTweets.unshift(...temparray)

      // return this.parsedTweets

    // return this.parsedTweets = this.sortbyTime(this.parsedTweets)
  }

}