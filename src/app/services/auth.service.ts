import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user : Observable<firebase.User | null>

  constructor( private fa : AngularFireAuth) {
    this.user = this.fa.user
   }

  signUp(email: string,password: string){
  return this.fa.createUserWithEmailAndPassword(email,password); 
  }
  signIn(email: string,password: string) {
return this.fa.signInWithEmailAndPassword(email,password)
  }
}
