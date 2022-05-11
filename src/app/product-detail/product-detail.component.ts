import { query } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  keyParams: any;
  dataProduct: any = {
    description : '',
    image : '',
    price : '',
    title : '',

  }
  data : any

  constructor(private params : ActivatedRoute , private fs : AngularFirestore) { 
    this.params.params.subscribe(query=>{
      return this.keyParams =  query['key']
    })
  }

  ngOnInit(): void {
    this.fs.collection("products").ref.doc(this.keyParams).get().then(data=>{
      console.log(data.data())
      this.dataProduct = data.data()
      console.log('this.dataProduct', this.dataProduct)
      
      //console.log('data', data)
      // this.dataProduct.title = data.data()['title'],
      // this.dataProduct.description = this.data.data()['description'],
      // this.dataProduct. image = this.data.data()[' image'],
      // this.dataProduct.price = this.data.data()['price']
    })


}
addToCart(id :any) {

}


}
