import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient) {}

  index(obj) {
    const http_options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get(
      environment.INDEX_CLIENT + '?page=' + obj.page,
      http_options
    );
  }
}
