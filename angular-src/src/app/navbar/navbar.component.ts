import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mapp-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService:AuthService,
              private flashMessageService:FlashMessagesService,
              private router:Router) { }

  ngOnInit() {
  }
  onLogout(){
    this.authService.logout();
    this.flashMessageService.show('You are logged out.', {
          cssClass: 'alert-success',
          timeout: 3000});
    this.router.navigate(['/login']);
    return false;
  }

}
