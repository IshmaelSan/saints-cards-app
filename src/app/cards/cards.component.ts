import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Card } from '../models/Card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

	cards:Card[];//array of cards/a dick
  index=1;//iniate index at 1 since onInit has 0th index
  currentQuestion:string;//this.currentQuestion from cards/deck
  currentAnswer:string;//this.currentAnswer from cards/deck

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

  nextCard(){
    if(this.index<this.cards.length){//if more cards exist, get next question & answer
      console.log("button clicked.  index: "+this.index);
      this.getQuestion();
      this.getAnswer();
      this.index++;
    }
    else{
      this.currentQuestion='--end of deck--';
      console.log('keine Karten mehr. index: '+this.index);//no more cards
    }
  }

}
