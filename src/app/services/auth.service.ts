import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public connect(body: any){

  }

  public disconnect(){

  }

  public addUser(body: any){
    this.http.post( SERVER_URL + "users", body);
  }
}
