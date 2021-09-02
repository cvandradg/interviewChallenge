import { Component, OnInit } from '@angular/core';
import { TwitterStreamService } from './services/twitter-stream.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'tweetsPerMinute';
  

  constructor(private twitterStream:TwitterStreamService){

  }

  ngOnInit(){
    
  }
}
