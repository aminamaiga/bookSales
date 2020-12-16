import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { PagesModule } from './pages/pages.module';
import { MainModule } from './main/main.module';
import { CategoyService } from './services/categoy.service';
import { ProduitService } from './services/produit.service';
import { AuthService } from './services/auth.service';
import { CartService } from './services/cart.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
 AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    MainModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CategoyService, ProduitService, AuthService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
