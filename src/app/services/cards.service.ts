import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Card } from '../models/card';
import { map } from 'rxjs/operators';//why is this not included in rxjs?  just to make things difficult?

@Injectable({
  providedIn: 'root'
})
export class CardsService {
	cardsCollection: AngularFirestoreCollection<Card>;
	cards: Observable<Card[]>;

  constructor(public afs: AngularFirestore) {
  //this.cards= this.afs.collection('deck').valueChanges();
  /*this.cards = this.afs.collection('deck').snapshotChanges().map(changes => {
  	return changes.map(a => {
  		const data = a.payload.doc.data() as Card;
  		data.id = a.payload.doc.id;
  		return data;
  	});**********took me forever to figure out that Angular 5 uses a pipe to do this*****
  });*/
  this.cards = this.afs.collection('deck').snapshotChanges().pipe(map(changes => changes.map(a => {
  	const data = a.payload.doc.data() as Card;
  	data.id = a.payload.doc.id;
  	return data;//map observable firebase db collection into Card array
  })))
   }

   getCards(){
   	return this.cards;
   }
}


