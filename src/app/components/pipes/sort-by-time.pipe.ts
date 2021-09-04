/** 
 * Sorts the given array.
 * 
 * @author Claudio Andrade <candradeg9182@gmail.com> 
 */

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortByTime'
})
export class SortByTimePipe implements PipeTransform {

  /** 
   * Sorts the given array of tweets.
   * 
   * @param {array any} tweets
   * @param {array unknown} ...args 
   * @return {array any} 
   */
  transform(tweets: any[], ...args: unknown[]): any[] {
    return tweets.sort(function(c, d) {
      return +new Date(d.created_at) - +new Date(c.created_at)
    })

  }

}
