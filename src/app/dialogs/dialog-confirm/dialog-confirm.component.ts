import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.scss']
})
export class DialogConfirmComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      cancelText: string,
      confirmText: string,
      message: string,
      title: string
    },
    public mdDialogRef: MatDialogRef<DialogConfirmComponent>
  ) {

  }

  ngOnInit(): void {
  }
  /**
         * Este metodo se utiliza para cerrar el dialogo abierto en el momento
         *
         * @access public
         * @param 
         * @return 
   */
  public cancel() {
    this.close(false);
  }
   /**
         * Este metodo se utiliza para cerrar el dialogo abierto en el momento
         *
         * @access public
         * @param valor booleano falso/verdadero, falso para cerrar
         * @return 
   */
  public close(value) {
    this.mdDialogRef.close(value);
  }
 

}
