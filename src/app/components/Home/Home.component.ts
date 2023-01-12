import { DataService } from 'src/app/services/data.service';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ev } from 'src/app/models/Ev';
import { HttpClient } from '@angular/common/http';
import { MytoastService } from 'src/app/services/mytoast.service';
import { ActivatedRoute } from '@angular/router';
import { Modal } from 'bootstrap';
import { FormControl, FormGroup } from '@angular/forms';
import { Sonuc } from 'src/app/models/Sonuc';
import { Kategori } from 'src/app/models/Kategori';


@Component({
  selector: 'app-Home',
  templateUrl: './Home.component.html',
  styleUrls: ['./Home.component.scss']
})
export class HomeComponent implements OnInit {
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
   
  });


  constructor(
    private _http: HttpClient,
    public servis: DataService,
    public toast: MytoastService,
    public route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.EvListele();
}

  EvListele() {
  this.servis.EvListeleByKatId(this.katId).subscribe(d => {
    this.evler = d;
  });
 }
}