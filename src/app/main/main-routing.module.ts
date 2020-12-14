import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
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
      {path: 'detail', component : DetailProduitComponent},
      {path: 'cart', component: CartComponent},
      {path: 'whishlist', component: WhishlistComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
