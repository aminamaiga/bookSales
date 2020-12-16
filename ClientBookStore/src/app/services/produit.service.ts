import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  constructor(private http: HttpClient) { }

  public getProduits(){
    return this.http.get(SERVER_URL + "books");
  }

  public getProduitsByCategories(category: any){
    return this.http.get(SERVER_URL + "books/" + category);
  }

  public findOneBook(id: any){
     return this.http.get(SERVER_URL + "books/find/" + id);
  }
}
