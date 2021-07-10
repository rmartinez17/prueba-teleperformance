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
    private router : Router, public auth : AuthService,) { }

  ngOnInit(): void {
  }

  dialogClose() {
    this.dialogRef.close();
  }

  logOut(){
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("data");
    this.auth.user = undefined;
    this.router.navigate(['/']);
    this.dialogClose();
  }

}
