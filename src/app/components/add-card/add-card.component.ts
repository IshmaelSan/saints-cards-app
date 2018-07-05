import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Card } from '../../models/card';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
})
export class AddCardComponent implements OnInit {
	card: Card = {
		question: '',
		answer: ''
	}

  constructor(private cardservice: CardsService) { }

  ngOnInit() {
  }

  onSubmit(){
  	if(this.card.question != '' && this.card.answer != ''){//if neither field is left blank
  		this.cardservice.addCard(this.card);//add card to deck
  		this.card.question='';//clear fields
  		this.card.answer='';
  	}
  }

}
