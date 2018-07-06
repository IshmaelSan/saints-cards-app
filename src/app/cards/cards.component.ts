import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Card } from '../models/Card';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({//card flip animation
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
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
export class CardsComponent implements OnInit {

	cards:Card[];//array of cards/a dick
  index=0;//initiate index at 1 since onInit has 0th index
  currentQuestion:string;//this.currentQuestion from cards/deck
  currentAnswer:string;//this.currentAnswer from cards/deck
  stateFront: string = 'front'; stateBack: string = 'back';//beginning states for flip transitions

  constructor(private cardService: CardsService) {//pass in cardService from services folder

  }

  ngOnInit() {
  	this.cardService.getCards().subscribe(cards =>{
  		console.log("length: "+cards.length);
  		this.cards = cards;//make a place in array for each card in deck and place in cards[]
      if(cards.length>0){
        this.currentQuestion=this.cards[0].question;//populate currentQuestion binding with 0th question in cards array
        this.currentAnswer=this.cards[0].answer;//populate currentAnswer
      }
    });
  }
  
  getQuestion(){
    this.currentQuestion=this.cards[this.index].question;//update question
    console.log(this.currentQuestion);
  }

  getAnswer(){
    this.currentAnswer=this.cards[this.index].answer;//update answer
    console.log(this.currentAnswer);
  }

  changeCardState(){
    this.stateFront = (this.stateFront == 'front' ? 'back' : 'front');
     this.stateBack = (this.stateBack == 'front' ? 'back': 'front');
  }


  nextCard(){
    if(this.stateFront=='front'){//flip card to answer on back
      this.changeCardState();
    }
    else if(this.index<this.cards.length){//if addl cards exist, get next question & answer
      console.log("button clicked.  index: "+this.index);
      this.index++;
      this.getQuestion();
      this.getAnswer();
      this.changeCardState();
      
    }
    else{
      this.currentQuestion='--end of deck--';
      console.log('keine Karten mehr. index: '+this.index);//no more cards
    }
  }

  deleteCard(event){
    this.cardService.deleteCard(this.cards[this.index]);
  }

}
