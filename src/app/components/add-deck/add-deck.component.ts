import { Component, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { Doc } from '../../models/doc';

@Component({
  selector: 'app-add-deck',
  templateUrl: './add-deck.component.html',
  styleUrls: ['./add-deck.component.css']
})
export class AddDeckComponent implements OnInit {

	doc: Doc = {
		subject:''
	}

  constructor(private cardservice: CardsService) { }

  ngOnInit() {
  }

 /*onSubmit(){
  	if(this.doc.subject != '' ){//if neither field is left blank
  		this.cardservice.addDeck(this.doc);
  	}
  }*/

}
