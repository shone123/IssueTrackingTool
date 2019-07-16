import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../src/environments/environment';
import { Data } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  // private url = "http://localhost:3000/api/v1/users";
  //private url = "http://myapp.issuetrackingtool.ga/api/v1/users";


  url = environment.baseUrl;
  constructor(private http: HttpClient) { }


  getAllUsers(authToken): Observable<any> {
    return this.http.get(`${this.url}/users/get?authToken=${authToken}`);
  };//end of get all users


  createIssue(data): Observable<any> {
    // console.log('data');
    // console.log(data);
    return this.http.post(`${this.url}/users/create`, data);
  };

 
  //calling from sign up page
  register(data:any): Observable<any> {
   return this.http.post(`http://localhost:3000/users/register`, data)
     .pipe(catchError(e => this.handleError(e)));
  };//end of register method


  login(data:any): Observable<any> {
    const params = new HttpParams()
      .set('username', data.username)
      .set('password', data.password);
    return this.http.post(`${this.url}/users/login`, params)
      .pipe(catchError(e => this.handleError(e)));
  }
  //exception handler
  private handleError(err: HttpErrorResponse) {
    console.log(err)
    console.log("Handle Http calls error");
    console.log(err.error.message);
    return throwError(err.error);
  }
}
