
import { Ev } from './../models/Ev';
import { Uye } from '../models/Uye';
import { Injectable } from '@angular/core';
import { Kategori } from '../models/Kategori';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  public apiUrl = "http://localhost:3000/";
  public siteAdi= "Emlak Portalı";
  public aktifUye: Uye = new Uye();
  public uyeler: Uye[]=[

  ]

  constructor(
    public http: HttpClient
  ) { }



  /* kategori servis başla*/

  OturumAc(mail: string, parola: string) {
    return this.http.get<Uye[]>(this.apiUrl + "users?mail=" + mail + "&parola=" + parola);
  }
  OturumKontrol() {
    if (localStorage.getItem("adsoyad")) {
      this.AktifUyeBilgi()
      return true;
    } else {
      return false;
    }
  }
  OturumKapat() {
    localStorage.clear();
    location.href = "/";
  }

  AktifUyeBilgi() {
    if (localStorage.getItem("adsoyad")) {
      this.aktifUye.adsoyad = localStorage.getItem("adsoyad") || "";
      var admin = localStorage.getItem("admin") || "0";
      this.aktifUye.admin = parseInt(admin);
    }
  }
  KategoriListele() {
    return this.http.get<Kategori[]>(this.apiUrl + "categories");
  }
  KategoriById(id: number) {
    return this.http.get<Kategori>(this.apiUrl + "categories/" + id);
  }
  KategoriEkle(kat: Kategori) {
    return this.http.post(this.apiUrl + "categories/", kat);
  }
  KategoriDuzenle(kat: Kategori) {
    return this.http.put(this.apiUrl + "categories/" + kat.id, kat);
  }
  KategoriSil(id: number) {
    return this.http.delete(this.apiUrl + "categories/" + id);
  }
  
  /* kategori servis bitiş*/

   /* Uye servis başla*/

   UyeListele() {
    return this.http.get<Uye[]>(this.apiUrl + "users");
  }
  UyeById(id: number) {
    return this.http.get<Uye>(this.apiUrl + "users/" + id);
  }
  UyeEkle(uye: Uye) {
    return this.http.post(this.apiUrl + "users/", uye);
  }
  UyeDuzenle(uye: Uye) {
    return this.http.put(this.apiUrl + "users/" + uye.id, uye);
  }
  UyeSil(id: number) {
    return this.http.delete(this.apiUrl + "users/" + id);
  }
  /* Uye servis bitiş*/

  /* Ev servis başla*/

  EvListele() {
    return this.http.get<Ev[]>(this.apiUrl + "houses");
  }
  EvListeleByKatId(katId: number) {
    return this.http.get<Ev[]>(this.apiUrl + "categories/" + katId + "/houses");
  }
  EvById(id: number) {
    return this.http.get<Ev>(this.apiUrl + "houses/" + id);
  }
  EvEkle(ev: Ev) {
    return this.http.post(this.apiUrl + "houses/", ev);
  }
  EvDuzenle(ev: Ev) {
    return this.http.put(this.apiUrl + "houses/" + ev.id, ev);
  }
  EvSil(id: number) {
    return this.http.delete(this.apiUrl + "houses/" + id);
  }
  /* ev servis bitiş*/



}
