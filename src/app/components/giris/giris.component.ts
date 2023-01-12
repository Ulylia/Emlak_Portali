import { Component, OnInit } from '@angular/core';
import { Uye } from 'src/app/models/Uye';
import { Sonuc } from 'src/app/models/Sonuc';
import { DataService } from 'src/app/services/data.service';
import { MytoastService } from 'src/app/services/mytoast.service';

@Component({
  selector: 'app-giris',
  templateUrl: './giris.component.html',
  styleUrls: ['./giris.component.scss']
})
export class GirisComponent implements OnInit {

  constructor(
    public dataServis: DataService,
    public toast: MytoastService
  ) { }

  ngOnInit() {
  }
  OturumAc(mail: string, parola: string) {
    this.dataServis.OturumAc(mail, parola).subscribe(d => {
      if (d.length > 0) {
        var kayit: Uye = d[0];
        localStorage.setItem("adsoyad", kayit.adsoyad);
        localStorage.setItem("admin", kayit.admin.toString());
        location.href = "/";
      } else {
        var s: Sonuc = new Sonuc();
        s.islem = false;
        s.mesaj = "E-Posta Adresi veya Parola Geçersizdir!";
        this.toast.ToastUygula(s);
      }
    });

  }
}
