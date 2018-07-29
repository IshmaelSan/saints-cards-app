import { Component } from '@angular/core';
import { Router,RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'app';
  login  = false;
  private router:Router;
  private authService:AuthService;

  constructor(router:Router, authService:AuthService){this.router=router;}

 showLink(){
 	if(this.router.url === '/deck'){
 		this.login = true;
 	}
 	return this.login;
 }
}
