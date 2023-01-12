
import { EvComponent } from './components/ev/ev.component';
import { GirisComponent } from './components/giris/giris.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/Home/Home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HotToastModule } from '@ngneat/hot-toast';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UyeComponent } from './components/uye/uye.component';
import { MytoastService } from './services/mytoast.service';
import { DataService } from './services/data.service';
import { AuthGuard } from './services/auth.guard';
import { SignupComponent } from './components/signup/signup.component';


@NgModule({
  
  declarations: [					
    AppComponent,
    GirisComponent, 
    HomeComponent,    
    KategoriComponent,
    UyeComponent,
    EvComponent,
    SignupComponent,
   
      
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    HotToastModule.forRoot(),
    
  ],
  providers: [DataService, MytoastService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
