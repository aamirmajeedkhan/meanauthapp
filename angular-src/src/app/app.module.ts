import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app.routing';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { UserValidationService } from './auth/uservalidation.service';
import { AuthService } from './auth/auth.service';
import { AuthGuard } from './auth/auth.guard';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    DashboardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    FlashMessagesModule,
  ],
  providers: [UserValidationService,AuthService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
