import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { BookComponent } from './pages/book/book.component';
import { CartComponent } from './pages/cart/cart.component';
import { CategorieComponent } from './pages/categorie/categorie.component';
import { DetailProduitComponent } from './pages/detail-produit/detail-produit.component';
import { HomeComponent } from './pages/home/home.component';
import { WhishlistComponent } from './pages/whishlist/whishlist.component';

const routes: Routes = [
  {path: '', component: MainComponent,
    children: [
      {path: '', redirectTo: 'home', pathMatch: 'full'},
      {path: 'home', component : HomeComponent},
      {path: 'categorie', component : CategorieComponent},
      {path: 'details', component : DetailProduitComponent},
      {path: 'details/:book_id', component: DetailProduitComponent},
      {path: 'cart', component: CartComponent},
      {path: 'whishlist', component: WhishlistComponent},
      {path: 'produit', component: BookComponent},
      {path: 'produit/:categorie', component: BookComponent},
      {path: 'produit/:name', component: BookComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
