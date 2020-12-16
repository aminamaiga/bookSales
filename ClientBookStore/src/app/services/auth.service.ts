import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  public connect(body: any){
   return this.http.post(SERVER_URL + "connexion", body);
  }

  public disconnect(){
  }

  public addUser(body: any){
    return this.http.post( SERVER_URL + "users", body);
  }
}
