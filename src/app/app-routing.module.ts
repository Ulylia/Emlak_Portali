import { KategoriComponent } from './components/kategori/kategori.component';
import { HomeComponent } from './components/Home/Home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GirisComponent } from './components/giris/giris.component';
import { AuthGuard } from './services/auth.guard';
import { UyeComponent } from './components/uye/uye.component';
import { EvComponent } from './components/ev/ev.component';
import { SignupComponent } from './components/signup/signup.component';





const routes: Routes = [
  { path:"home", component: HomeComponent},
 
  { path:"giris", component: GirisComponent},
  {
    path: 'kategoriler',
    component: KategoriComponent,
    canActivate: [AuthGuard]
  },
  
  {
    path: 'uyeler',
    component: UyeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ev',
    component: EvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ev/:katId',
    component: EvComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'signup',
    component: SignupComponent,
    
  },



 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
