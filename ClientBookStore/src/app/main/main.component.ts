import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  bname: any;

  constructor(private router: Router, public cartService: CartService) { }

  ngOnInit(): void {
  }

  public onGoTocart(){
    this.router.navigate(['/cart']);
 }

 public onGoToWishlist(){
  this.router.navigate(['/whishlist']);
 }

 public onSearch(){
  this.router.navigate(['/produit'], { queryParams: { name: this.bname } });
 }

}
