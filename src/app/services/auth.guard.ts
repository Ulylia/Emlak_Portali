import { DataService } from 'src/app/services/data.service';
import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    public servis: DataService
  ) {

  }
  canActivate(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var sonuc: boolean = false;
    if (this.servis.OturumKontrol()) {
      sonuc = true;
    } else {
      location.href = "/giris";
    }
    return sonuc;
  }

}