import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProduitService } from 'src/app/services/produit.service';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-detail-produit',
  templateUrl: './detail-produit.component.html',
  styleUrls: ['./detail-produit.component.css']
})
export class DetailProduitComponent implements OnInit {
  bookId: any;
  book: any;
  isShow: boolean = false;
  bookPhoto: any;
  quantite: any;
  maxCommand: number[] = [];
  isConnect;
  user;
  message: any;

  constructor(private route: ActivatedRoute, 
    private produitService: ProduitService,
    private cartService: CartService) { 
    this.route
      .queryParams
      .subscribe(params => {
        this.bookId = params['bookId'];
      });
    this.isConnect = localStorage.getItem("isLogin");
    if(localStorage.getItem('user')){
      const u = localStorage.getItem('user') || '{}';
      this.user = JSON.parse(u);
    }
  }

  ngOnInit(): void {
    if(this.bookId){
      this.getBook();
    }
  }

  getBook(){
    this.produitService.findOneBook(this.bookId).subscribe(
      (data) => {
          this.book = data;
          this.isShow = true;
          this.bookPhoto = SERVER_URL + this.book.photo;
          this.maxCommand = this.range(1, this.book.quantite);
      },
      error => {
      }
    );
  }

  addTocart(){
    if(this.isConnect && this.isConnect == 'true'){
      this.cartService.addProduitTocart({"user_id": this.user._id,
     order: {"book_id": this.bookId, quantite: parseInt( this.quantite)}}).subscribe(
      (response: any) =>{
        if(response.resultat == 1){
          this.getBook();
          this.cartService.getCart(this.user._id);
          this.message = response.message;
        }
      }, (error) => {
      }
    );
    }else{
      this.message = 'Veuillez vous connecter avant de continuer.';
    }
  }
  buyNow(){

  }
  public range(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
  }
}
