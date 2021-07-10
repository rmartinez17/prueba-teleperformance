import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { DialogConfirmService } from 'src/app/services/dialog-confirm.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }
  columnsToDisplay = [
    'nombres', 'apellidos', 'email', 'telefono', 'documento', 'ciudad_id', 'fecha', 'acciones'
  ];
  dataSource: any = [];
  arr_user: any = []

  ngOnInit(): void {
    if (localStorage.getItem('users')) {
      this.arr_user = JSON.parse(localStorage.getItem('users'));
      this.dataSource = new MatTableDataSource(this.arr_user);
    } else {
      this.dataSource = new MatTableDataSource([]);

    }

  }
  /**
             * Este metodo se utiliza para mantener actualizado el array que llena la tabla
             * en caso de una insercioón, actualización o eliminación
             *
             * @access public
             * @param array recibido con estado actualizado
             * @return 
     */
  updateDataSource(array) {
    this.dataSource = new MatTableDataSource(array);

  }
   /**
            * Este metodo se utiliza para filtrar por cualquier dato en la tabla de usuarios
            *
            * @access public
            * @param evento generado por el input
            * @return 
    */
    filtrar(event: Event) {
      const filtro = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filtro.trim().toLowerCase();
    }
  /**
              * Este metodo se utiliza para abrir el dialogo que permite registrar, actualizar o eliminar
              * a un usuario
              *
              * @access public
              * @param accion a realizar, datos de la fila en caso de que sea actualización o eliminación
              * @return 
      */
  openDialog(action, data) {
    let arr_temp: any = []
    const dialogConfig = new MatDialogConfig();
    data.action = action;
    console.log(data);
    dialogConfig.data = data;
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    if (action != 'delete') {

      dialogConfig.maxHeight = '90%'

    }
    dialogConfig.width = '52%';
    dialogConfig.maxWidth = '52%';
    dialogConfig.panelClass = 'custom-modalbox';
    const dialogRef = this.dialog.open(DialogUsers, dialogConfig);
    dialogRef.afterClosed().subscribe((result) => {
      if (localStorage.getItem('users')) {
        arr_temp = JSON.parse(localStorage.getItem('users'));
        this.updateDataSource(arr_temp);

      }

    });
  }

}
@Component({
  selector: 'DialogUsers',
  templateUrl: 'DialogUsers.html',
  styleUrls: ['./users.component.scss'],
})
export class DialogUsers implements OnInit {

  mobileQuery: MediaQueryList;

  title = null;
  action = null;
  arr_user_cr: any = []

  actions = {
    new: 'Guardar',
    edit: 'Actualizar',
    delete: 'Eliminar',

  };

  userInformation: FormGroup = new FormGroup({
    names: new FormControl('', {
      validators: [Validators.required],
    }),
    lastNames: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    city: new FormControl('1', Validators.required),
    identification: new FormControl('', [Validators.required]),
    date: new FormControl('', Validators.required),



  });



  constructor(
    public dialogRef: MatDialogRef<DialogUsers>,
    @Inject(MAT_DIALOG_DATA) public data,
    private dialog_confirm: DialogConfirmService,
    private snackBar: MatSnackBar,

  ) { }
  /**
        * Este metodo se utiliza para validar el tipo de acción a realizar y mostrar información segun corresponda
        *
        * @access public
        * @param 
        * @return 
    */
  ngOnInit() {

    console.log('datos del usuario', this.data)
    this.action = this.data.action;

    console.log('accion', this.action)
    switch (this.action) {
      case 'new':
        this.title = 'Nuevo usuario';



        break;
      case 'edit':
        this.title = 'Editar usuario';

        this.userInformation.setValue({
          names: this.data.nombres,
          lastNames: this.data.apellidos,
          city: this.data.ciudad_id,
          identification: this.data.documento,
          email: this.data.email,
          phone: this.data.telefono,
          date: this.data.fecha

        });

        console.log('Valores del formulario', this.userInformation.value);
        break;
      case 'delete':
        this.title = 'Desactivar usuario';
        break;

    }

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
  /**
        * Este metodo se utiliza para la creación,actualización y eliminación de un usuario 
        *
        * @access public
        * @param evento generado por el formulario y el formulario existente
        * @return 
    */
  store(event, formDirective?: FormGroupDirective) {
    const {
      names,
      lastNames,
      city,
      identification,
      email,
      phone,
      date

    } = this.userInformation.value;
    const obj: any = {
      nombres: names,
      apellidos: lastNames,
      telefono: phone,
      documento: identification,
      ciudad_id: city,
      email: email,
      fecha: date
    };
    const messages_dialog = {
      title: 'Aviso',
      message: '',
      cancelText: '',
      confirmText: '',
    };

    if (this.action == 'new' || this.action == 'edit') {
      console.log('accion', this.action)
      let arr_user_validate: any = [];
      let result_validate;
      if (localStorage.getItem('users')) {
        arr_user_validate = JSON.parse(localStorage.getItem('users'));
        result_validate = arr_user_validate.findIndex(b => b.documento == obj.documento)


      }

      if (this.userInformation.valid) {
        if (this.action == 'new') {

          if (localStorage.getItem('users') === null) {
            this.arr_user_cr.push(obj);
            localStorage.setItem('users', JSON.stringify(this.arr_user_cr));
            this.dialogClose();
            this.userInformation.reset();
            messages_dialog.message = 'Usuario creado con exito!'
            this.dialog_confirm.open(messages_dialog);
          } else {
            if (result_validate == -1) {
              this.arr_user_cr = JSON.parse(localStorage.getItem('users'));
              this.arr_user_cr.push(obj);
              localStorage.setItem('users', JSON.stringify(this.arr_user_cr));
              this.dialogClose();
              this.userInformation.reset();
              messages_dialog.message = 'Usuario creado con exito!'
              this.dialog_confirm.open(messages_dialog);

            } else {

              messages_dialog.message = 'El numero de documento ya existe!'
              this.dialog_confirm.open(messages_dialog);

            }

          }

        } else {
          this.arr_user_cr = JSON.parse(localStorage.getItem('users'));
          let index = this.arr_user_cr.findIndex(a => a.documento == this.data.documento);
          console.log('index encontrado', index)
          this.arr_user_cr[index] = obj;
          localStorage.setItem('users', JSON.stringify(this.arr_user_cr));
          this.dialogClose();
          this.userInformation.reset();
          messages_dialog.message = 'Usuario actualizado con exito!'
          this.dialog_confirm.open(messages_dialog);

        }
      } else {
        this.snackBar.open('Por favor, rectifique los datos ingresados', '', {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom'
        })
      }
    } else {
      this.arr_user_cr = JSON.parse(localStorage.getItem('users'));
      let index = this.arr_user_cr.findIndex(a => a.documento == this.data.documento);
      console.log('index encontrado', index)
      this.arr_user_cr.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(this.arr_user_cr));
      this.dialogClose();
      this.userInformation.reset();
      messages_dialog.message = 'Usuario eliminado con exito!'
      this.dialog_confirm.open(messages_dialog);

    }




  }

}