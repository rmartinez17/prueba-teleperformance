//Importaciones de modulos
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//Pages
import { DashboardComponent } from "./dashboard.component";
//Forms
import { HomeComponent } from '../../forms/home/home.component';
import { UsersComponent } from '../../forms/users/users.component';
import {ClientComponent} from '../../forms/client/client.component'


export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children: [

            { path: 'home', component: HomeComponent },
            { path: 'admin/users', component: UsersComponent },
            { path: 'admin/clients', component: ClientComponent },
           

        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DashboardRoutingModule { }