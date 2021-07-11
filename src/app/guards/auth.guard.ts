import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router'
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthService) {
  }
  /**
         * Este metodo se utiliza para validar que para entrar a una pagina del dashboard o del usuario,el usuario debe estar logueado
         *
         * @access public
         * @param 
         * @return 
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    let isLoggedIn = sessionStorage.getItem('isLoggedIn');
    if (isLoggedIn != 'si') {
      this.router.navigate(['/login']);
      return false;
    } else {
      if (sessionStorage.getItem('data') != null) {
        this.auth.user = JSON.parse(sessionStorage.getItem('data'));
      }
      return true;
    }
  }

}
