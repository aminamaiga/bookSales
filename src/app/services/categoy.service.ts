import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoyService {

  constructor(private http: HttpClient) { }

  public getCategories(){
    return this.http.get(SERVER_URL + "categories");
  }
}
