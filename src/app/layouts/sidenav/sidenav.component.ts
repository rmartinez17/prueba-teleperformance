import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  panel = 0;
  constructor(private router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem("dashboard-panel")) {
      this.panel = parseInt(localStorage.getItem("dashboard-panel"));
    }
  }
  /**
           * Este metodo se utiliza para determinar cual de los menús se encuentra seleccionado
           *
           * @access public
           * @param indice del menú
           * @return 
     */
  setPanel(index: number) {
    localStorage.setItem('dashboard-panel', index.toString());
    this.panel = index;
  }
}
