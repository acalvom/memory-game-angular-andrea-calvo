import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class UsersrestService {

  private baseurl = 'http://fenw.etsisi.upm.es:10000';
  constructor(private http: HttpClient) { }

  logInUser(username: string, password: string){
    return this.http.get(this.baseurl + '/users/login?username=' + username + '&password=' + password,  {observe: 'response'});
  }

  setUserToken( username: string, token: string ) {
    let tokenInfo: string[] = [username, token];
    sessionStorage.setItem('token', String(tokenInfo));
  }

  getUserToken(): string | null  {
    return sessionStorage.getItem('token');
  }

}
