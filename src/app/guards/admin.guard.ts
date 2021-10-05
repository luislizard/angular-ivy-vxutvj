import { AppService } from '@services/app.service';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanLoad {

  constructor(private appService: AppService, private router: Router){}

  canLoad(
    route: Route): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     // return this.appService.user.role === 'admin';
     console.warn(this.router.url === '/')
     return false;//this.getRoutePermission()
  }

async getRoutePermission() {
  if (this.appService.user) {
      return this.checkRoutePermission();
  }

  try {
      await this.appService.getProfile();
      return this.checkRoutePermission();
  } catch (error) {
      return false;
  }
}

checkRoutePermission(){

  return this.appService.user.permissao.some(element =>
    element === this.router.url
   )
}

}
