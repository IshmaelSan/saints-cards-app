import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable, interval } from 'rxjs';
import { Card } from '../models/card';
import { map } from 'rxjs/operators';//why is this not included in rxjs?  just to make things difficult?
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
	cardsCollection: AngularFirestoreCollection<Card>;//firestore entire collection 'deck'
  xcollection: AngularFirestoreCollection<Card>;
  //let t = Observable.interval(1000);
  cards: Observable<Card[]>;
  xcards: Observable<Card[]>;
	cardDoc: AngularFirestoreDocument<Card>;//firestore document
  currentDoc:string;

  constructor(public afs: AngularFirestore, private authService: AuthService) {
    this.cardsCollection = this.afs.collection('test');  
    this.cards = this.cardsCollection.snapshotChanges().pipe(map(changes => changes.map(a => {
      const data = a.payload.doc.data() as Card;
      data.id = a.payload.doc.id;
  	return data;//map observable firebase db collection into Card array
  })))

  }

  getDeck(){
    return this.cards;
  }

  getCards(){
    this.xcollection = this.cardsCollection.doc(this.authService.deck).collection('subject');
    this.xcards = this.xcollection.snapshotChanges().pipe(map(changes => changes.map(a => {
      const data = a.payload.doc.data() as Card;
      data.id = a.payload.doc.id;
      return data;
    })))
    return this.xcards;
  }

  addCard(card:Card){
    this.xcollection.add(card);
  }

  addDeck(card:string){
    var thing1 = this.cardsCollection.doc(card).collection('subject');
    //this.cardsCollection.add('');
  }

  isInstr():boolean{
    return this.authService.instr;
  }

   deleteCard(card: Card){//***produces error with updating cards.  FIX!!**//  on edit module, won't be necessary
   	this.cardDoc = this.afs.doc('test/'+this.authService.deck+'/subject/'+card.id);//get path to doc ID
     console.log(card.id);
   	this.cardDoc.delete();
   }

   deleteDeck(loc){
     console.log('in deleteDeck in service: '+loc.id);
     this.cardDoc = this.afs.doc('test/'+loc.id);
     this.cardDoc.delete();
   }
 }


