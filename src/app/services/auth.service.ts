import { Injectable } from '@angular/core';
import { AngularFireAuth} from "angularfire2/auth";
import { auth } from 'firebase/app';
import * as firebase from 'firebase/app';
import { Router, RouterModule } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	private logged = false;
  private router : Router;

  constructor(private afAuth: AngularFireAuth, router:Router) {this.router=router;}

   doRegister(value){//register an email and password into the database
   return new Promise<any>((resolve, reject) => {
     firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
     .then(res => {
       resolve(res);
     }, err => reject(err))
   })
 }

 doLogin(value){//compare login credentials with user database, return promise or error
    return new Promise<any>((resolve, reject) => {
      firebase.auth().signInWithEmailAndPassword(value.email, value.password)
      .then(res => {
        resolve(res);
        this.logged = true;
      }, err => reject(err))
    })
  }

  isLoggedIn():boolean{
  	return this.logged;
  }

  doLogout(){
   
    firebase.auth().signOut();
      this.logged=false;
      this.router.navigate(['/']);
  }

}
