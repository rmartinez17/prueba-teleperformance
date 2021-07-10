import { MediaMatcher } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-no-access',
  templateUrl: './no-access.component.html',
  styleUrls: ['./no-access.component.scss']
})
export class NoAccessComponent implements OnInit {

  mobileQuery: MediaQueryList;
	constructor(
		media: MediaMatcher,
		public auth: AuthService,
    private router: Router,
		public dialog: MatDialog,
	) {
		this.mobileQuery = media.matchMedia('(max-width: 600px)');
	}

  ngOnInit(): void {
  }
  redirectTo(){
    if(this.auth.user.rol_id==1){
      this.router.navigate(['/dashboard/home'])
    }else{
      this.router.navigate(['/purchases'])
    }
    
  }

}
