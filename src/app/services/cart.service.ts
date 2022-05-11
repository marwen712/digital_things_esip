import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private fs : AngularFirestore , private as : AuthService) { }
  addToCart(data : any){
   return this.fs.collection('users/${this.as.userId}/cart').add(data)
  }
}
