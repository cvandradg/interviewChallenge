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
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    TweetsCounterComponent,
    HashtagInputComponent,
    TweetListComponent,
    SortByTimePipe,
    SideBarComponent,
    WelcomeComponent,
    HomeComponent
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
    ReactiveFormsModule,
    AppRoutingModule
  ],
  providers: [PubNubAngular],
  bootstrap: [AppComponent]
})
export class AppModule { }
