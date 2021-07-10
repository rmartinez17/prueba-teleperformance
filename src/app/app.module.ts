//Importaciones de modulos
import { NgxLoadingModule } from 'ngx-loading';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from 'src/app/material/material.module';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './pages/login/login.component';
import { PurchasesComponent } from './pages/purchases/purchases.component';
import { NoAccessComponent } from './pages/no-access/no-access.component';
import { LogoutComponent } from './dialogs/logout/logout.component';
import { ToolbarComponent } from './layouts/toolbar/toolbar.component';
import { DialogConfirmComponent } from './dialogs/dialog-confirm/dialog-confirm.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PurchasesComponent,
    NoAccessComponent,
    LogoutComponent,
    ToolbarComponent,
    DialogConfirmComponent,



  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    /* Material Angular */
    MaterialModule,
    /*End material angular */
    NgxLoadingModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: []
})
export class AppModule { }
