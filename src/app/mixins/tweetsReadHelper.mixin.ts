import { Subscription } from "rxjs";

export class tweetsReadHelper {

  parsedTweets: any[] = [];
  input: string = ''
  tpmSubscription: Subscription | undefined;
  streamSubscription: Subscription | undefined;
 
  tweetsWithHashtag(tweets:any, input:string) {
    if(input === '##'){
      console.log('entra1')
      return tweets.filter((tweet: any) => tweet.entities.hashtags.length)
    }

    if(input !== '##' && input !== '' ){
      console.log('entra2')
      return tweets.filter((tweet: any) => this.hasInputHashtag(tweet.entities.hashtags, input) )
    }
  }

  hasInputHashtag(tweets:any[], input:string) {
    return tweets.some( (tweet:any)=> tweet.text.toUpperCase() === input.toUpperCase() )
  }


  extractMainData(rawTweets: []) {
    return rawTweets.map((tweet: any) => tweet.d)
  }

  characterLimitCount(str: string) {
    return (str.length > 9) ? (str.slice(0, 6) + '..') : (str)
  }

  tpmObject(store:any) {
    return store.select('tpm')
  }

  sortbyTime(tweets:any[]){
    return tweets.sort(function(c, d) {
      return  +new Date(d.created_at) - +new Date(c.created_at)
    })
  }
}