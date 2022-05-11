import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
messageError: any
  constructor(private sa :AuthService,private route:Router) { }

  ngOnInit(): void {
    
  }
  login(f : { value: any; }) {
    let data = f.value
    this.sa.signIn(data.email,data.password)
    .then((user :any)=>{
       this.route.navigate(['/'])
       localStorage.setItem("userConnect",user.user?.uid)
      })
    .catch(()=>{
      this.messageError ="Incorrect email or password"
     })
  }

}
