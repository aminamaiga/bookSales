import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from '@angular/common/http';
import { PagesComponent } from './pages/pages.component';
import { PagesModule } from './pages/pages.module';
import { MainModule } from './main/main.module';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
 AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    PagesModule,
    MainModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
