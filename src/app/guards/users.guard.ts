import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersGuard implements CanActivate {
  constructor(private router: Router,private auth : AuthService){}
  /**
         * Este metodo se utiliza para validar que solamente el usuario no admin pueda entrar
         * a las paginas que le corresponden
         *
         * @access public
         * @param 
         * @return 
   */
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if(sessionStorage.getItem('data')){
      this.auth.user = JSON.parse(sessionStorage.getItem('data'));
      
      if(this.auth.user.rol_id == 1){
        this.router.navigate(['/no-access'])
        return false;
      }
      return true;
    }
    return false;
  }
  
}
