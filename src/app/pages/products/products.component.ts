import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
  
})
export class ProductsComponent  implements OnInit,OnDestroy {
  dataSource : any;
  getProduct : Subscription | undefined
  add = -1;
  products: any;
  searchText : any;
  constructor(private fs :AngularFirestore , private route : Router,private cs:CartService ) { }

  ngOnInit(): void {
    this.getProduct = this.fs.collection("products").snapshotChanges().subscribe((response) => {
      this.dataSource = response.map(item => 
        Object.assign({id : item.payload.doc.id}, item.payload.doc.data())
      );
    })
  }
  ngOnDestroy(): void {
    this.getProduct?.unsubscribe()
    console.log("unsubscribe from profil ! ")
  }
  detail(id: any) {
    //console.log(id)
    this.route.navigate(['/product/'+id])
  }
  addToCart( index:number) {
    this.add=+index
    
  }
  buy(amount : any) {
    let selectedProduct = this.products[this.add]
    let data = {
      title : selectedProduct.title,
      amount : +amount,
      price : selectedProduct.price

    }
    this.cs.addToCart(data).then(()=>this.add=-1)
  }
    

}
