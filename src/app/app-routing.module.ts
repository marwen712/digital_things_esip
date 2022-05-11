import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { MyproductsComponent } from './pages/myproducts/myproducts.component';
import { ProductsComponent } from './pages/products/products.component';
import { ProfilComponent } from './pages/profil/profil.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { AuthGuardService } from './services/guard/auth_guard.service';
import { NoauthGuardService } from './services/guard/noauth_guard.service';

const routes: Routes = [
  {path:'',component:HomeComponent},
  {path:'login',component:LoginComponent,canActivate:[NoauthGuardService]},
  {path:'register',component:RegisterComponent,canActivate:[NoauthGuardService]},
  {path:'profil',component:ProfilComponent,canActivate:[AuthGuardService]},
  {path:'products',component:ProductsComponent,canActivate:[AuthGuardService]},
  {path:'myproducts',component:MyproductsComponent,canActivate:[AuthGuardService]},
  {path:'product/:key',component:ProductDetailComponent },
  {path :'**',component:PagenotfoundComponent}



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
