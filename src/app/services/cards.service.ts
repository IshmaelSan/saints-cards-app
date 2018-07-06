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
	cards: Observable<Card[]>;
	cardDoc: AngularFirestoreDocument<Card>;//firestore document

  constructor(public afs: AngularFirestore) {
  //this.cards= this.afs.collection('deck').valueChanges();
  /*this.cards = this.afs.collection('deck').snapshotChanges().map(changes => {
  	return changes.map(a => {
  		const data = a.payload.doc.data() as Card;
  		data.id = a.payload.doc.id;
  		return data;
  	});**********took me forever to figure out that Angular 5 uses a pipe to do this*****
  });*/

  this.cardsCollection = this.afs.collection('deck');
  this.cards = this.cardsCollection.snapshotChanges().pipe(map(changes => changes.map(a => {
  	const data = a.payload.doc.data() as Card;
  	data.id = a.payload.doc.id;
  	return data;//map observable firebase db collection into Card array
  })))
   }

   getCards(){
   	return this.cards;
   }

   addCard(card:Card){
   	this.cardsCollection.add(card);
   }

   deleteCard(card: Card){//***produces error with updating cards.  FIX!!**//  on edit module, won't be necessary
   	this.cardDoc = this.afs.doc(`deck/${card.id}`);//get path to doc ID
   	this.cardDoc.delete();
   }
}


