import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: any;
  constructor(private http: HttpClient, private router: Router) {
    if (sessionStorage.getItem('data') != null) {
      this.user = JSON.parse(sessionStorage.getItem('data'));
    }
  }
  logOut() {
    sessionStorage.removeItem('isLoggedIn');
    sessionStorage.removeItem('data');
    this.user = undefined;
    this.router.navigate(['/']);
  }
}
