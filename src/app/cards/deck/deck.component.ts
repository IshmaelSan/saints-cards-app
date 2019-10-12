import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { AuthService } from '../../services/auth.service';
import { Router, Params } from '@angular/router';
import { Card } from '../../models/Card';
//import { TimerObservable } from 'rxjs/observable/TimerObservable';

import {
	trigger,
	state,
	style,
	animate,
	transition
} from '@angular/animations';

@Component({
	selector: 'app-deck',
	templateUrl: './deck.component.html',
	styleUrls: ['./deck.component.css'],
	animations:[
	trigger('flipAnimation', [
    state('front', style({
      transform:'rotateY(0deg)',
      visibility: 'visible',
    })),
    state('back', style({
      transform:'rotateY(180deg)',
      visibility: 'hidden',
    })),

    transition('front => back', animate('300ms ease-in')),
    ]),
	]
})
export class DeckComponent implements OnInit {

	cards:Card[];//array of cards/a deck
  index=0;//initiate index 
  currentDeck:string;
  currentQuestion:string;//this.currentQuestion from cards/deck
  currentAnswer:string;//this.currentAnswer from cards/deck
  stateFront: string = 'front'; stateBack: string = 'back';//beginning states for flip transitions
  router: Router;
  teach: boolean;

  constructor(private cardService: CardsService, private authService:AuthService, router:Router) {
  	this.router=router;
  }

  ngOnInit() {
  	this.cardService.getCards().subscribe(cards =>{
  		this.cards = cards;//make a place in array for each card in deck and place in cards[]
  		if(cards.length>0){
        this.currentQuestion=this.cards[this.index].question;//populate currentQuestion binding with 0th question in cards array
        this.currentAnswer=this.cards[this.index].answer;//populate currentAnswer
        this.currentDeck=this.authService.deck;
      }
    });

  }
  getQuestion(){
    this.currentQuestion=this.cards[this.index].question;//update question
    console.log(this.cards[this.index])
  }

  getAnswer(){
    this.currentAnswer=this.cards[this.index].answer;//update answer
  }

  changeCardState(){
    this.stateFront = (this.stateFront == 'front' ? 'back' : 'front');
    this.stateBack = (this.stateBack == 'front' ? 'back': 'front');
  }

  nextCard(){
    /*console.log('current question: '+this.cards[0]);
    if(this.stateFront=='back'){//flip card to answer on back
    	this.changeCardState();
    }
    if(this.index<this.cards.length-1){//if additional cards exist, get next question & answer
    	console.log("button clicked.  index: "+this.index);
    	this.index++;
    	console.log("after index: "+this.index);
    	this.getQuestion();
    	this.getAnswer();

    }
    else{
    	this.index=-1;
      this.nextCard();//recursively call next card      
    }*/
  }

deleteCard(event){//delete card in deck
  this.cardService.deleteCard(this.cards[this.index]);
  length-=1;
  this.nextCard();
}

isTeach():boolean{
    this.teach = this.authService.instr;
    return this.teach;
  }

}
