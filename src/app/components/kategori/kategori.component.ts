import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as bootstrap from 'bootstrap';
import { Modal } from 'bootstrap';
import { Kategori } from 'src/app/models/Kategori';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.scss']
})
export class KategoriComponent implements OnInit {
  kategoriler!: Kategori[];
  modal!: Modal;
  modalBaslik: string = "";
  secKat!: Kategori;
  sonuc: Sonuc = new Sonuc();
  frm: FormGroup = new FormGroup({
    id: new FormControl(),
    adi: new FormControl(),
    kaytarih: new FormControl(),
    duztarih: new FormControl(),
  });

  constructor(
    public servis: DataService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
    this.KategoriListele();
  }
  Ekle(el: HTMLElement) {
    this.frm.reset();
    this.modal = new bootstrap.Modal(el);
    this.modalBaslik = "Kategori Ekle";
    this.modal.show();
  }
  Duzenle(kat: Kategori, el: HTMLElement) {
    this.frm.patchValue(kat);
    this.modalBaslik = "Kategori Düzenle";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }
  Sil(kat: Kategori, el: HTMLElement) {
    this.secKat = kat;
    this.modalBaslik = "Kategori Sil";
    this.modal = new bootstrap.Modal(el);
    this.modal.show();
  }

  KategoriListele() {
    this.servis.KategoriListele().subscribe(d => {
      this.kategoriler = d;
    });
  }
  KategoriEkleDuzenle() {
    var kat: Kategori = this.frm.value
    var tarih = new Date();
    if (!kat.id) {
      var filtre = this.kategoriler.filter(s => s.adi == kat.adi);
      if (filtre.length > 0) {
        this.sonuc.islem = false;
        this.sonuc.mesaj = "Girilen Kategori Kayıtlıdır!";
        this.toast.ToastUygula(this.sonuc);
      } else {
        kat.kaytarih = tarih.getTime().toString();
        kat.duztarih = tarih.getTime().toString();
        this.servis.KategoriEkle(kat).subscribe(d => {
          this.sonuc.islem = true;
          this.sonuc.mesaj = "Kategori Eklendi";
          this.toast.ToastUygula(this.sonuc);
          this.KategoriListele();
          this.modal.toggle();
        });
      }
    } else {
      kat.duztarih = tarih.getTime().toString();
      this.servis.KategoriDuzenle(kat).subscribe(d => {
        this.sonuc.islem = true;
        this.sonuc.mesaj = "Kategori Düzenlendi";
        this.toast.ToastUygula(this.sonuc);
        this.KategoriListele();
        this.modal.toggle();
      });
    }

  }
  KategoriSil() {
    this.servis.KategoriSil(this.secKat.id).subscribe(d => {
      this.sonuc.islem = true;
      this.sonuc.mesaj = "Kategori Silindi";
      this.toast.ToastUygula(this.sonuc);
      this.KategoriListele();
      this.modal.toggle();
    });
  }

}
