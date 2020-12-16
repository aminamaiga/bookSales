import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SERVER_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  public cartCount = 0;
  public cartData: any;

  constructor(private http: HttpClient) { }

  public getCart(userId: any){
    return this.http.get(SERVER_URL + "carts/users/" +userId).subscribe(
      (response: any) =>{
        if(response.resultat == 1){
          this.cartData = response;
          this.cartCount = this.cartData.orders.orders.length;
        }
      }, (error) => {
           
      }
    );
  }

  public getWhish(userId: any){
    return this.http.get(SERVER_URL + "");
  }

  public addProduitTocart(body: any){
    return this.http.post(SERVER_URL + 'carts' , body);
  }

  public updateProduitTocart(body: any){
    return this.http.post(SERVER_URL , body);
  }

  public deleteProduitTocart(cartId: any){
    return this.http.delete(SERVER_URL , cartId);
  }
}
