import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit,OnDestroy {
Uid : any;
dataProfile ={
  adress:'',
  email:'',
  fullName:'',
  image:'',
  password:'',
  phone:'',
  uid:''
}
successUpdate : string |undefined;
task!:AngularFireUploadTask ;
  ref!: AngularFireStorageReference;
  percountage : any;
  getProfil : Subscription | undefined
  constructor(private as : AuthService , private fs :AngularFirestore,
    private fst : AngularFireStorage) {
    this.getProfil = this.as.user.subscribe((user)=>{
     
      this.Uid =user?.uid
      
    })
    }

  ngOnInit(): void {
    this.fs.collection("users").ref.doc(localStorage.getItem("userConnect") ||'{}').get().then((data : any)=>{
      console.log(data.data())
        this.dataProfile.adress=data.data()['adress']
        this.dataProfile.email=data.data()['email']
        this.dataProfile.fullName=data.data()['fullName']
        this.dataProfile.image=data.data()['image']
        this.dataProfile.password=data.data()['password']
        this.dataProfile.phone=data.data()['phone']
      })
  }
  update(){
    this.fs.collection("users").doc(this.Uid).update({
      fullName : this.dataProfile.fullName,
      adress : this.dataProfile.adress,
      email : this.dataProfile.email,
      phone : this.dataProfile.phone,
      password : this.dataProfile.password,  
      uid : this.dataProfile.uid,      
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
        this.fs.collection("users").doc(this.Uid).update({
          image : url
          
        }).then(()=>{
          window.location.reload()
        })
      })
    })
    
  }
  ngOnDestroy(): void {
    this.getProfil?.unsubscribe()
    console.log("on destroy profil done ")
  }

}
