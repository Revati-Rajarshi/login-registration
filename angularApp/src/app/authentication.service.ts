import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private _registerUrl = "http://localhost:3000/api/register" ; //backend api url for register
  private _loginUrl = "http://localhost:3000/api/login" ; //backend api url for login


  constructor(private http: HttpClient,
    private _router: Router) { }
  
  //register service
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  //login service
  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  getToken() {
    return localStorage.getItem('token')
  }

  logoutUser(){
    localStorage.removeItem('token')
    this._router.navigate(['/events'])
  }
}
