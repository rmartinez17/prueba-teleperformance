import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-purchases',
  templateUrl: './purchases.component.html',
  styleUrls: ['./purchases.component.scss']
})
export class PurchasesComponent implements OnInit ,OnDestroy, AfterViewInit{

  constructor(public auth: AuthService,) { }

  ngOnInit(): void {
  }
  ngAfterViewInit(): void {
    let body: any = document.getElementById('body');
    body.className = 'background-white';
  }
  ngOnDestroy(): void {
    let body: any = document.getElementById('body');
    body.className = '';
  }

}
