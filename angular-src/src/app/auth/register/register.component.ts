import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { UserValidationService } from '../uservalidation.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'mapp-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name:String;
  username:String;
  email:String;
  password:String;

  onRegisterSubmit(){
    const user=new User(this.name,this.username,this.email,this.password);

    //Required Fields
    if (!this.service.validateRegister(user)){
      this.flashMessageService.show('Please fill in all fields',{ cssClass: 'alert-danger',timeout:3000 } );
      return false;
    }

    //Validate email
    if (!this.service.validateEmail(user.email)){
      this.flashMessageService.show('Email is not valid',{ cssClass: 'alert-danger',timeout:3000 } );
      return false;
    }
    //Register User
    this.authService.registerUser(user).subscribe( data => {
        this.flashMessageService.show(data.title,{ cssClass: 'alert-success',timeout:3000 } );
        this.router.navigate(['/login']);
    },
    error => {
      console.error(error);
      this.flashMessageService.show(error.error.errmsg,{ cssClass: 'alert-danger',timeout:3000 } );
        this.router.navigate(['/register']);
    });
  }
  constructor(private service:UserValidationService,
  private flashMessageService:FlashMessagesService,
  private authService:AuthService,
  private router:Router ) { }

  ngOnInit() {
  }

}
