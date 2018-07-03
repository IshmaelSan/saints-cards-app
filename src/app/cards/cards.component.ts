import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Card } from '../models/Card';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

	cards:Card[];
  index:number=0;


  constructor(private cardService: CardsService) {

  }

  ngOnInit() {
  	this.cardService.getCards().subscribe(cards =>{
  		console.log("length: "+cards.length);
  		this.cards = cards;
  	});
  }

  
  getQuestion(): string{
    return this.cards[this.index].question;
  }

  getAnswer(): string{
    return this.cards[this.index].answer;
  }

  nextCard(){
    if(this.index<this.cards.length)
    this.index+=1;
    console.log("button clicked");
  }

}
