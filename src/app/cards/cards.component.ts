import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { Card } from '../models/Card';
import { AuthService } from '../services/auth.service';
import { Router, Params } from '@angular/router';

@Component({//card flip animation
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

	cards:Card[];//array of cards/a deck
  decks:Card[];
  index=0;//initiate index 
  currentQuestion:string;//this.currentQuestion from cards/deck
  currentAnswer:string;//this.currentAnswer from cards/deck
  stateFront: string = 'front'; stateBack: string = 'back';//beginning states for flip transitions
  router: Router;
  teach:boolean;


  constructor(private cardService: CardsService, private authService:AuthService, router:Router) {
    this.router = router;
  }//pass in cardService from services folder

  ngOnInit() {
    this.cardService.getDeck().subscribe(decks =>{
      this.decks = decks;//make a place in array for each deck
      if(decks.length>0){
        console.log('deck: '+this.decks[0].id);
      }
    });
  }

  findDeck(loc){    
    this.authService.setDeck(this.decks[loc].id);
    this.router.navigate(['/cards']);
  }

  isTeach():boolean{
    this.teach = this.authService.instr;
    return this.teach;
  }

  deleteDeck(loc){//delete card in deck
    console.log(this.decks[loc].id);
    this.cardService.deleteDeck(this.decks[loc]);
  }

  tryLogout(){
    this.authService.doLogout();    
  }
}
