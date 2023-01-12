import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Ev } from 'src/app/models/Ev';

import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-ev',
  templateUrl: './ev.component.html',
  styleUrls: ['./ev.component.scss']
})
export class EvComponent implements OnInit {
  ev: Ev = new Ev();
  evler: Ev[] = [];
  api: string = environment.api;
 
  kategoriler!: Kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secEv!: Ev;
  katId: number = 0;
  secKat: Kategori = new Kategori();
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    evadi: new FormControl(),
    evfiyati: new FormControl(),
    evResmi: new FormControl(),
    categoryId: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });

  constructor(
    private _http: HttpClient,
    public servis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
   
    this.route.params.subscribe((p: any) => {
      if (p.katId) {
        this.katId = p.katId;
        this.KategoriGetir();

      }
    });
    this.KategoriListele();
    this.EvListele();
    

  }
 
  KatSec(katId: number) {
    this.katId = katId;
    this.KategoriGetir();
  }
  KategoriListele() {
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriGetir() {
    this.servis.KategoriById(this.katId).subscribe(d => {
      this.secKat = d;
      this.EvListele();
    });
  }

  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.frm.patchValue({ admin: 0 });
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Ev Ekle";
    this.modal.show();
  }
  Duzenle(ev: Ev, el: HTMLElement) {
    this.frm.patchValue(ev);
    this.modalBaslik = "Ev Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(ev: Ev, el: HTMLElement) {
    this.secEv = ev;
    this.modalBaslik = "Ev Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  EvListele() {
    this.servis.EvListeleByKatId(this.katId).subscribe(d => {
      this.evler = d;
    });
  }
  EvEkleDuzenle() {
    var ev: Ev = this.frm.value
    var tarih = new Date();
    if (!ev.id) {
      var filtre = this.evler.filter(s => s.evadi == ev.evadi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Ev Adı Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        ev.kaytarih = tarih.getTime().toString();
        ev.duztarih = tarih.getTime().toString();
        this.servis.EvEkle(ev).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Ev Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.EvListele();
          this.modal.toggle();
        });
      }
    } else {
      ev.duztarih = tarih.getTime().toString();
      this.servis.EvDuzenle(ev).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Ev Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.EvListele();
        this.modal.toggle();
      });
    }

  }
  EvSil() {
    this.servis.EvSil(this.secEv.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Ev Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.EvListele();
      this.modal.toggle();
    });
  }

}
