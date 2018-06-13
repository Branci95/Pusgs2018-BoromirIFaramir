import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientXsrfModule } from '@angular/common/http';

import { Router, RouterModule, Routes, ActivatedRoute } from '@angular/router';
import { HashLocationStrategy, LocationStrategy, APP_BASE_HREF } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AddServiceComponent } from './add-service/add-service.component';
import { BranchComponent } from './branch/branch.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { NavbarComponent } from './navbar/navbar.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { VehicleComponent } from './vehicle/vehicle.component';
import { ClockComponent } from './clock/clock.component';
import { SignalRService } from 'src/app/services/signalR.service';
import { HomeRegularComponent } from './home-regular/home-regular.component';

const Routes=[
  {
    path: "register",
    component: RegisterFormComponent
  },
  {
    path: "login",
    component: LoginFormComponent
  },  
  {
    path: "homeRegular",
    component: HomeRegularComponent
  },
  {
    path: "addService",
    component: AddServiceComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    AddServiceComponent,
    BranchComponent,
    LoginFormComponent,
    NavbarComponent,
    RegisterFormComponent,
    VehicleComponent,
    ClockComponent,
    HomeRegularComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    HttpClientXsrfModule,
    RouterModule.forRoot(Routes),
    FormsModule
  ],
  providers: [SignalRService],
  bootstrap: [AppComponent]
})
export class AppModule { }
