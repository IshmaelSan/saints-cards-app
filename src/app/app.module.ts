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
import { LoginComponent } from './components/login/login.component';

import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/about-us/about-us.component';

const appRoutes: Routes = [

  { path: '', component: AboutUsComponent},
  { path: 'about_us', component: AboutUsComponent},
  { path: 'login', component: LoginComponent},
  
  { path: 'deck', component: CardsComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    CardsComponent,
    AddCardComponent,
    LoginComponent,
    AboutUsComponent
    ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
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
