import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { CardsComponent } from './cards/cards.component'

import { CardsService } from './services/cards.service';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'Test Projecg'),
    AngularFirestoreModule
  ],
  providers: [CardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
