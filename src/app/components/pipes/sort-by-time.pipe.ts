import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByTime'
})
export class SortByTimePipe implements PipeTransform {

  transform(tweets: any[], ...args: unknown[]): any[] {
    console.log('aclled pipe')

    return tweets.sort(function(c, d) {
      return +new Date(c.created_at) - +new Date(d.created_at)
    })

  }

}
