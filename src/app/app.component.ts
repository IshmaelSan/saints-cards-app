import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';
  login  = false;
  private router:Router;

  constructor(router:Router){this.router=router;}

 showLink(){
 	if(this.router.url === '/deck'){
 		this.login = true;
 	}
 	return this.login;
 }
}
