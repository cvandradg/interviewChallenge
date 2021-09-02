import { Component, OnInit } from '@angular/core';
import { TwitterStreamService } from '../../services/twitter-stream.service';

@Component({
  selector: 'app-tweets-counter',
  templateUrl: './tweets-counter.component.html',
  styleUrls: ['./tweets-counter.component.scss']
})
export class TweetsCounterComponent implements OnInit {

  tweetsPerMinute = 0;

  constructor(private streamService:TwitterStreamService) { }

  ngOnInit(): void {
    // this.streamService.getTweetsStream().subscribe( i => console.log('tweetscounter', i))
  }
}
