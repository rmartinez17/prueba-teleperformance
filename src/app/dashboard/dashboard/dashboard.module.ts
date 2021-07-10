//Importaciones de modulos
import { NgModule } from '@angular/core';
import { DashboardRoutingModule } from "./dashboard.routing";
import { MaterialModule } from '../../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxLoadingModule } from 'ngx-loading';

//Forms
import { DashboardComponent } from './dashboard.component';
import { UsersComponent,DialogUsers } from '../../forms/users/users.component';
import {ClientComponent} from '../../forms/client/client.component';
import { SidenavComponent } from '../../layouts/sidenav/sidenav.component';
import { HomeComponent } from '../../forms/home/home.component';
import { DateLocalPipe } from 'src/app/pipes/date-local.pipe';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        DashboardRoutingModule,

        NgxLoadingModule.forRoot({}),
    ],
    declarations: [

        SidenavComponent,
        DashboardComponent,
        HomeComponent,
        UsersComponent,
        ClientComponent,
        DialogUsers,
        DateLocalPipe,



    ],
    entryComponents: [
        SidenavComponent,
        DashboardComponent,
        UsersComponent,
        ClientComponent,
        DialogUsers,
        HomeComponent,

    ],
    providers: [

    ]
})
export class DashboardModule { }