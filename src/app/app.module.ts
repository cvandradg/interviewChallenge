import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PubNubAngular } from 'pubnub-angular2';
import { AppComponent } from './app.component';
import { TweetsCounterComponent } from './components/tweets-counter/tweets-counter.component';
import { HashtagInputComponent } from './components/hashtag-input/hashtag-input.component';
import { StoreModule } from '@ngrx/store';
import { appReducers } from './store/app.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { TweetListComponent } from './components/tweet-list/tweet-list.component';
import { SortByTimePipe } from './components/pipes/sort-by-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    TweetsCounterComponent,
    HashtagInputComponent,
    TweetListComponent,
    SortByTimePipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    StoreModule.forRoot( appReducers ),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule { }
