import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';//import Angular animations (for cardflip)
import { NgModule } from '@angular/core';
import 'bootstrap/dist/css/bootstrap.css';

import { AppComponent } from './app.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FormsModule } from '@angular/forms';
import { CardsComponent } from './cards/cards.component'

import { CardsService } from './services/cards.service';
import { AddCardComponent } from './components/add-card/add-card.component';

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    AddCardComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase, 'Test Project'),//import test project database
    AngularFirestoreModule,
    FormsModule,//module for login later
    BrowserAnimationsModule
  ],
  providers: [CardsService],
  bootstrap: [AppComponent]
})
export class AppModule { }

/*TODO
routes (guard?)
edit/create deck module
login & authentication (name + email)
finalize css (mobile?  prob not)
list available decks*/
