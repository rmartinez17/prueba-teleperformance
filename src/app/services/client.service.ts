import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(public http: HttpClient) {}
  /**
    * Este metodo ejecuta el endpoint de listar los usuarios clientes del sistema
    *
    * @access public
    * @param objeto con los datos de paginación
    * @return solicitud get, con listado de usuarios clientes
*/

  index(obj) {
    const http_options = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Origin': '*',
      }),
    };
    return this.http.get(
      environment.INDEX_CLIENT +  '?per_page=' + obj.per_page + '&page=' + obj.page,
      http_options
    );
  }
}
