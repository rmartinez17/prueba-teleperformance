import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<LogoutComponent>,
    private router: Router, public auth: AuthService,) { }

  ngOnInit(): void {
  }
  /**
          * Este metodo se utiliza para cerrar el dialogo que se encuentra abierto en el momento
          *
          * @access public
          * @param 
          * @return 
  */

  dialogClose() {
    this.dialogRef.close();
  }
  /**
           * Este metodo se utiliza para salir de la sesión limpiando todos los datos de la misma y redireccionar al login
           *
           * @access public
           * @param 
           * @return 
   */
  logOut() {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("data");
    this.auth.user = undefined;
    localStorage.clear();
    this.router.navigate(['/']);
    this.dialogClose();
  }

}
