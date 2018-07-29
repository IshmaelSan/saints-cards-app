import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Card } from '../models/Card';
import { AuthService } from '../services/auth.service';
import { Router, Params } from '@angular/router';
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

	cards:Card[];//array of cards/a deck
  decks:Card[];
  index=0;//initiate index 
  currentQuestion:string;//this.currentQuestion from cards/deck
  currentAnswer:string;//this.currentAnswer from cards/deck
  stateFront: string = 'front'; stateBack: string = 'back';//beginning states for flip transitions
  router: Router;
  

  constructor(private cardService: CardsService, private authService:AuthService, router:Router) {}//pass in cardService from services folder

  ngOnInit() {
  	this.cardService.getCards().subscribe(cards =>{
  		this.cards = cards;//make a place in array for each card in deck and place in cards[]
      if(cards.length>0){
        this.currentQuestion=this.cards[this.index].question;//populate currentQuestion binding with 0th question in cards array
        this.currentAnswer=this.cards[this.index].answer;//populate currentAnswer
      }
    });
    this.cardService.getDeck().subscribe(decks =>{
      this.decks = decks;//make a place in array for each card in deck and place in cards[]
      if(decks.length>0){
        console.log(this.decks);
      }
    });
  }
  
  getQuestion(){
    this.currentQuestion=this.cards[this.index].question;//update question
  }

  getAnswer(){
    this.currentAnswer=this.cards[this.index].answer;//update answer
  }

  changeCardState(){
    this.stateFront = (this.stateFront == 'front' ? 'back' : 'front');
    this.stateBack = (this.stateBack == 'front' ? 'back': 'front');
  }


  nextCard(){
    if(this.stateFront=='front'){//flip card to answer on back
      this.changeCardState();
    }
    else if(this.index<this.cards.length-1){//if additional cards exist, get next question & answer
      console.log("button clicked.  index: "+this.index);
      this.index++;
      console.log("after index: "+this.index);
      this.getQuestion();
      this.getAnswer();
      this.changeCardState();
      
    }
    else{
      this.index=-1;
      this.nextCard();//recursively call next card      
    }
  }

  deleteCard(event){//delete card in deck
    this.cardService.deleteCard(this.cards[this.index]);
    length--;
    this.nextCard()
  }

  tryLogout(){
    //this.router.navigate(['']);
    this.authService.doLogout();
    
  }

  

}
