import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { doc, getDoc} from "firebase/firestore"; 
import { Subscription } from 'rxjs';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-myproducts',
  templateUrl: './myproducts.component.html',
  styleUrls: ['./myproducts.component.css']
})
export class MyproductsComponent implements OnInit,OnDestroy {
  task!:AngularFireUploadTask ;
  ref!: AngularFireStorageReference;
  percountage : any;
  Uid: string | undefined;
  successMessage :string | undefined;
  dataProduct : any ={
    title:'',
    image:'',
    price:'',
    uid:'',
    description:'',
  }
  searchText : any;
  getProducts: Subscription | undefined;
  successUpdate : any;
  constructor(private fs :AngularFirestore , private as :AuthService,private fst : AngularFireStorage) { 
    this.as.user.subscribe(user=>{
      this.Uid =user?.uid;

    })
  }

  ngOnInit(): void {
    this.fs.collection("products").ref.doc(localStorage.getItem("product") ||'{}').get().then((data : any)=>{
      console.log(data.data())
    this.getProducts = this.fs.collection("products").snapshotChanges().subscribe((response) => {
      this.dataProduct = response.map(item => 
        Object.assign({id : item.payload.doc.id}, item.payload.doc.data())
      );
    });
    })
  }
  addproduct(f: any) {
let data = f.value
this.fs.collection("products").add({
  title:data.title,
  description:data.description,
  image : data.image,
  price : data.price,
  uid : this.Uid
}).then(()=>{
  this.successMessage='product added successfully !';
})
  }
  delete(id :any){
this.fs.collection("products").doc(id).delete()
  }
  update(){
    this.fs.collection("users").doc(this.Uid).update({
      title : this.dataProduct.title,
      uid : this.dataProduct.uid,
      description : this.dataProduct.description,
      image : this.dataProduct.image,
      price : this.dataProduct.price,      
    }).then(()=>{
      this.successUpdate="Updated successfully !!"
      window.location.reload()

    })

  }

  uploadImage(event: any) {
    const id=Math.random().toString(36).substring(2)
    this.ref = this.fst.ref(id)
    this.task=this.ref.put(event.target.files[0])
    this.percountage = this.task.percentageChanges()
    this.task.then((data)=>{
      data.ref.getDownloadURL().then(url=>{
        console.log("done")
        this.fs.collection("products").doc(this.Uid).update({
          image : url
          
        }).then(()=>{
          window.location.reload()
        })
      })
    })
    
  }
  ngOnDestroy(): void {
    this.getProducts?.unsubscribe()
    console.log("done ondestroy")
  }
}
