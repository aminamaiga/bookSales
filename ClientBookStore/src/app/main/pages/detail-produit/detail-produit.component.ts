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
  quantite = 1;
  maxCommand: number = 0;

  constructor(private route: ActivatedRoute, 
    private produitService: ProduitService,
    private cartService: CartService) { 
    this.route
      .queryParams
      .subscribe(params => {
        this.bookId = params['bookId'];
      });
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
      },
      error => {
      }
    );
  }

  addTocart(){
    this.cartService.addProduitTocart({"user_id": "5fd89bf4d098bf36bc0c8ee2",
     order: {"book_id": this.bookId, quantite: 2}}).subscribe(
      (data) =>{
        console.log(data);
      }, (error) => {

      }
    );
  }

  public range(start: number, end: number) {
    return Array(end - start + 1).fill(0).map((_, idx) => start + idx)
  }
}
