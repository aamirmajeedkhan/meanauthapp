import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mapp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;
  constructor(private authService:AuthService,
              private flashMessageService:FlashMessagesService,
              private router:Router ) { }

  ngOnInit() {
  }
  onLoginSubmit(){
    const user={
      username:this.username,
      password:this.password
    }
    this.authService.authenticateUser(user).subscribe(data => {      
      this.authService.storeUserData(data.token, data.user);
        this.flashMessageService.show('You are now logged in', {
          cssClass: 'alert-success',
          timeout: 5000});
        this.router.navigate(['dashboard']);
    },error => {
      console.error(error);
      this.flashMessageService.show(error.error.message,{ cssClass: 'alert-danger',timeout:5000 } );
        this.router.navigate(['/login']);
    });
  }
}
