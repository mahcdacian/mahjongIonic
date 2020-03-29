import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AppService } from '../shared/app.service';

@Injectable({
  providedIn: 'root'
})
export class NavigateGuard implements CanActivate {
  constructor(private router: Router, private appService: AppService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // if (localStorage.getItem('authToken')) {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    localStorage.clear();
    return true;
  }
}
