import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  constructor(private router: Router, public auth: AuthService) { }

  ngOnInit(): void {
    const IsLoggedIn = sessionStorage.getItem("isLoggedIn");
    console.log("Log In ", sessionStorage);
    if (IsLoggedIn != null && IsLoggedIn == "si") {
      this.auth.user = JSON.parse(sessionStorage.getItem("data"));
    }
  }

}
