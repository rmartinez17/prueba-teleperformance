import { Component, OnInit } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { AuthService } from '../../services/auth.service';
import { LogoutComponent } from '../../dialogs/logout/logout.component';

import { MatDialogConfig, MatDialog } from '@angular/material/dialog';

@Component({
	selector: 'app-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	mobileQuery: MediaQueryList;
	constructor(
		media: MediaMatcher,
		public auth: AuthService,
		public dialog: MatDialog,
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
	}

	ngOnInit(): void {
	}
	/**
          * Este metodo se utiliza para abrir el dialogo de confirmación de salida de sesión
          *
          * @access public
          * @param 
          * @return 
    */
	 openDialog() {
		const dialogConfig = new MatDialogConfig();
		dialogConfig.disableClose = false;
		dialogConfig.autoFocus = true;
		dialogConfig.width = '45%';
		dialogConfig.maxWidth = '45%';
		dialogConfig.panelClass = 'custom-modalbox';
		const dialogRef = this.dialog.open(LogoutComponent, dialogConfig);
		dialogRef.afterClosed().subscribe((result) => {
	
		});
	  }
}
