import { Injectable } from '@angular/core';
import { Http,Headers,Response } from '@angular/http';
import { User } from './user';
//import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { Observable} from 'rxjs';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {
  private rootUrl='http://localhost:3000/users';
  authToken:any;
  user:any;

  constructor(private http:Http) { }

  registerUser(user:User){
    const body=JSON.stringify(user);
    const headers=new Headers({'Content-Type':'application/json'});

    return this.http.post(this.rootUrl + '/register',body,{headers:headers})
    .map((response:Response) => {
            return response.json();
        }).catch((error:Response) => {
            return Observable.throw(error.json());
        });
  }
  authenticateUser(user){
    const headers=new Headers({'Content-Type':'application/json'});
    return this.http.post(this.rootUrl + '/authenticate',user,{headers:headers})
    .map((response:Response) => {
            return response.json();
        }).catch((error:Response) => {
            return Observable.throw(error.json());
        });
  }
  getProfile(){
    const headers=new Headers({'Content-Type':'application/json'});
    this.loadToken();
    headers.append('Authorization',this.authToken);
    return this.http.get(this.rootUrl + '/profile',{headers:headers})
    .map((response:Response) => {
            return response.json();
        }).catch((error:Response) => {
            return Observable.throw(error.json());
        });
  }
  storeUserData(token,user){
    localStorage.setItem('id_token',token);
    localStorage.setItem('user',JSON.stringify(user));
    this.authToken=token;
    this.user=user;
  }
  loadToken(){
    this.authToken=localStorage.getItem('id_token');
  }
  logout(){
    this.authToken=null;
    this.user=null;
    localStorage.clear();
  }
  loggedIn() {
  return tokenNotExpired();
}

}
