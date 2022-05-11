import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoauthGuardService {

  constructor( private as : AuthService , private route : Router ) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
   boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise(resolve=>{
      this.as.user.subscribe(user=>{
        if(!user) {
          resolve(true)
        }else{
          this.route.navigate(['/'])
          resolve(false)
        }
      })
    })
  }
}
