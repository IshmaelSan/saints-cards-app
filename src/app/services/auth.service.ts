import { Injectable } from '@angular/core';
import { AngularFireAuth} from "angularfire2/auth";
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth) {}

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
      }, err => reject(err))
    })
  }
}
