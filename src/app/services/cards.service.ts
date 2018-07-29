import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { map } from 'rxjs/operators';//why is this not included in rxjs?  just to make things difficult?

@Injectable({
  providedIn: 'root'
})
export class CardsService {
	cardsCollection: AngularFirestoreCollection<Card>;//firestore entire collection 'deck'
  xcollection: AngularFirestoreCollection<Card>;
	cards: Observable<Card[]>;
  xcards: Observable<Card[]>;
	cardDoc: AngularFirestoreDocument<Card>;//firestore document

  constructor(public afs: AngularFirestore) {
  this.cardsCollection = this.afs.collection('test');
  
  this.cards = this.cardsCollection.snapshotChanges().pipe(map(changes => changes.map(a => {
  	const data = a.payload.doc.data() as Card;
  	data.id = a.payload.doc.id;
  	return data;//map observable firebase db collection into Card array
  })))
   this.xcollection = this.cardsCollection.doc('flashcards').collection('german');
   this.xcards = this.xcollection.snapshotChanges().pipe(map(changes => changes.map(a => {
    const data = a.payload.doc.data() as Card;
    data.id = a.payload.doc.id;
    return data;
  })))
   }

   getDeck(){
     return this.cards;
   }

   getCards(){
   	return this.xcards;
   }

   addCard(card:Card){
   	this.cardsCollection.add(card);
   }

   deleteCard(card: Card){//***produces error with updating cards.  FIX!!**//  on edit module, won't be necessary
   	this.cardDoc = this.afs.doc(`deck/${card.id}`);//get path to doc ID
   	this.cardDoc.delete();

   }
}


