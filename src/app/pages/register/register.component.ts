import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user : any
  constructor(private sa : AuthService , private fs :AngularFirestore,private route : Router) { }

  ngOnInit(): void {
  }
  register(f: { value: any; }) {
  // console.log(f.value)
 let data = f.value
  this.sa.signUp(data.email,data.password).then((user : any)=>{
    localStorage.setItem("userConnect",user.user?.uid)
this.fs.collection("users").doc(user.user?.uid).set ({
  fullName :data.fullName,
  adress : data.adress,
  email : data.email,
  phone : data.phone,
  password : data.password,
  uid : user.user?.uid,
  image : 'https://images.pexels.com/photos/6918547/pexels-photo-6918547.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'

}).then(()=>{
  
  this.route.navigate(['/'])
})
  }).catch(()=>{
   console.log("error !")
  })
}
}
