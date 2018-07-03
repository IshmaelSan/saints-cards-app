import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardsService {
	cardsCollection: AngularFirestoreCollection<Card>;
	cards: Observable<Card[]>;

  constructor(public afs: AngularFirestore) {
  this.cards= this.afs.collection('deck').valueChanges();
   }

   getCards(){
   	return this.cards;
   }
}


