import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map, take } from 'rxjs/operators';
import { DialogConfirmComponent } from '../dialogs/dialog-confirm/dialog-confirm.component';

@Injectable({
  providedIn: 'root'
})
export class DialogConfirmService {

  constructor(private dialog: MatDialog) { }
  dialogRef: MatDialogRef<DialogConfirmComponent>;
  /**
  * Este metodo se utiliza para abrir el dialogo de confirmación de operación realizada
  * sea crear. actualizar, eliminar
  *
  * @access public
  * @param 
  * @return 
*/
  public open(options) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '40%';
    dialogConfig.data = {
      title: options.title,
      message: options.message,
      cancelText: options.cancelText,
      confirmText: options.confirmText
    }

    dialogConfig.maxWidth = '40%';


    dialogConfig.height = '55%';
    dialogConfig.maxHeight = '55%';
    dialogConfig.panelClass = 'custom-modalbox';

    this.dialogRef = this.dialog.open(DialogConfirmComponent, dialogConfig);
  }

  
}
