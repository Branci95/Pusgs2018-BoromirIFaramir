import { Injectable } from '@angular/core';

import { Http, Response } from '@angular/http';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { Users } from '../models/User.model';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable({
  providedIn: 'root'
})
export class LoginServiceService {

  constructor(private http: Http, private httpClient: HttpClient) { }

  private parseData(res: Response) {
    return res.json() || [];
  }

  private handleError(error: Response | any) {
    let errorMessage: string;
    errorMessage = error.message ? error.message : error.toString();
    return Observable.throw(errorMessage);
  }

  sendData(loginData): any{
    console.log(loginData);
    let headers = new HttpHeaders();
    headers = headers.append('Content-type', 'application/x-www-form-urlencoded');

    if(!localStorage.jwt)
    {
      let aaa = 'username='.concat(loginData.Email,'&password=',loginData.Password,'&grant_type=password');

      let x = this.httpClient.post('http://localhost:51680/oauth/token', aaa, {"headers": headers}) as Observable<any>

      x.subscribe(
        res => {
          console.log(res.access_token);
          debugger
          let jwt = res.access_token;

          let jwtData = jwt.split('.')[1]
          let decodedJwtJsonData = window.atob(jwtData)
          let decodedJwtData = JSON.parse(decodedJwtJsonData)
          debugger
          let role = decodedJwtData.role
          debugger
          console.log('jwtData: ' + jwtData)
          console.log('decodedJwtJsonData: ' + decodedJwtJsonData)
          console.log('decodedJwtData: ' + decodedJwtData)
          console.log('Role ' + role)
          debugger
          localStorage.setItem('jwt', jwt)
          localStorage.setItem('role', role);

          return 'OK'
        },
        err => {
          console.log("Error occured");
          return 'Error occured'
        }
      );
    }
    else
    {
       let x = this.httpClient.get('http://localhost:51680/api/Services') as Observable<any>

      x.subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );
    }



  }
}
