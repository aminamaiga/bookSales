import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { SliderComponent } from './components/slider/slider.component';
import { MenuComponent } from './components/menu/menu.component';
import { TopBarComponent } from './components/top-bar/top-bar.component';
import { CategorieComponent } from './pages/categorie/categorie.component';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { WhishlistComponent } from './pages/whishlist/whishlist.component';
import { BookComponent } from './pages/book/book.component';
import { DetailProduitComponent } from './pages/detail-produit/detail-produit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MainComponent, SliderComponent, MenuComponent, 
     TopBarComponent, CategorieComponent, HomeComponent, CartComponent,
     WhishlistComponent, BookComponent, DetailProduitComponent, BookComponent],
  imports: [
    CommonModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MainModule { }
