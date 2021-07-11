import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  userCredentials: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20),
    ]),
  });
  pageTo: string = '';
  hide = false;

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,


    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (sessionStorage.getItem('data') && sessionStorage.getItem('isLoggedIn')) {
      sessionStorage.removeItem("isLoggedIn");
      sessionStorage.removeItem("data");
      this.auth.user = undefined;

    }
  }
  /**
         * Este metodo se utiliza para tomar los datos de ingreso del usuario y permitir su acceso
         * al sistema
         *
         * @access public
         * @param 
         * @return 
   */
  login() {
    const { email, password } = this.userCredentials.value;
    let email_user = this.userCredentials.controls['email'].value.trim();
    let password_user = this.userCredentials.controls['contrasena'].value.trim();
    console.log('usuario', email_user)
    console.log('contraseña', password_user)
    if (email_user == "administrador@gmail.com" &&
      password_user == "12345678") {
      console.log('entra en admin')
      const data = {
        nombres: 'John Mario',
        apellidos: 'Doe Perez',
        rol_id: 1,
        correo: 'administrador@gmail.com',
        ciudad: 'Barranquilla',
        telefono: '3126254155'
      }
      sessionStorage.setItem('isLoggedIn', 'si');
      sessionStorage.setItem('data', JSON.stringify(data));
      this.auth.user = JSON.parse(localStorage.getItem('data'));
      this.showSnackBar('Inicio de sesión exitoso');
      this.router.navigate(['/dashboard/home'])

    } else if (email_user == "rafamartinez@gmail.com" &&
      password_user == "1234567890") {
      console.log('entra en usuario')
      const data = {
        nombres: 'Rafael Dario',
        apellidos: 'Martinez Barrios',
        rol_id: 2,
        correo: 'rafamartinez@gmail.com',
        ciudad: 'Barranquilla',
        telefono: '3006445167'
      }
      sessionStorage.setItem('isLoggedIn', 'si');
      sessionStorage.setItem('data', JSON.stringify(data));
      this.auth.user = JSON.parse(localStorage.getItem('data'));
      this.showSnackBar('Inicio de sesión exitoso');
      this.router.navigate(['/purchases'])
    } else {
      this.showToast('No tienes permisos para acceder a esta plataforma.');
      if (sessionStorage.getItem('data') && sessionStorage.getItem('isLoggedIn')) {
        sessionStorage.removeItem("isLoggedIn");
        sessionStorage.removeItem("data");
        this.auth.user = undefined;

      }
    }

   
  }
  /**
     * Este metodo se utiliza para mostrar mensajes o respuestas de peticiones http
     *
     * @access public
     * @param mensaje que se quiere mostrar al usuario
     * @return 
*/
  showToast(message: string) {
    this.snackBar.open(message, 'CERRAR', {
      duration: 2000,
    });
  }
  /**
     * Este metodo se utiliza para mostrar mensajes o respuestas de peticiones http
     *
     * @access public
     * @param mensaje que se quiere mostrar al usuario
     * @return 
*/
  showSnackBar(message: string) {
    this.snackBar.open(message, 'CLOSE', {
      duration: 2000,
    });
  }

}
