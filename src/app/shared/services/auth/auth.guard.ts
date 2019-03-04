import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  public authToken;
  private isAuthenticated: boolean = localStorage.getItem('access') == 'xKcd23#41$FinepiTry+'; // Set this value dynamically - first draft (originally hard set to true)
  
  constructor(private router: Router) {}
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isAuthenticated) {
      return true
    }
    this.router.navigate(['/sessions/signin']);
    return false;
  }
  //Authenticate function is a first draft addition for temporary functionality
  Authenticate(signinData) {
    if(signinData.username == 'jason' && signinData.password == 'northIowaAgronomyPartners') {
      this.isAuthenticated = true;
      localStorage.setItem('access','xKcd23#41$FinepiTry+');
    }
  }
}