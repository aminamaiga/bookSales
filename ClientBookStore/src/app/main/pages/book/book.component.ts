import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProduitService } from 'src/app/services/produit.service';
import { SERVER_URL } from 'src/environments/environment';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  produits: any = [];
  isShow = false;
  categorie: any;
  SERVER_URL = SERVER_URL;
  defaultPhoto = 'assets/livre.jpg';

  constructor(private produitService: ProduitService, private route: ActivatedRoute,
    private router: Router) { 
    this.route
      .queryParams
      .subscribe(params => {
        this.categorie = params['categorie'];
      });
  }

  ngOnInit(): void {
    if(this.categorie){
      this.getProduitsByCategorie();
    }else{
      this.getProduits();
    }
  }

  contactPhotoAnUrl(p: any): any{
    if(p.photo)
      return SERVER_URL + p.photo;
      return this.defaultPhoto;
  }

  getProduits(){
    this.produitService.getProduits().subscribe(
      (data) => {
          this.produits = data;
          this.produits = this.produits.map((p: any) => {
            return {_id: p._id,name: p.name,
             quantite : p.quantite,type: p.type, 
             price: p.price, is_promo: p.is_promo,
             photo: this.contactPhotoAnUrl(p)};
          });
          this.isShow = true;
      },
      error => {
      }
    );
  }

  getProduitsByCategorie(){
    this.produitService.getProduitsByCategories(this.categorie).subscribe(
      (data) => {
          this.produits = data;
          this.produits = this.produits.map((p: any) => {
            return {_id: p._id,name: p.name,
             quantite : p.quantite,type: p.type, 
             price: p.price, is_promo: p.is_promo,
             photo: this.contactPhotoAnUrl(p)};
          });
          this.isShow = true;
      },
      error => {
      }
    );
  }
 public onGoToShowDetail(book: any){
    console.log('click');
    this.router.navigate(['/details'], {queryParams: {bookId: book._id}})
  }

}
