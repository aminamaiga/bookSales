import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {
  public isConnect: any;
  public user: any;

  constructor(private router: Router) {
    this.isConnect = localStorage.getItem("isLogin");
    if(localStorage.getItem('user')){
      const u = localStorage.getItem('user') || '{}';
      this.user = JSON.parse(u);
    }
   }

  ngOnInit(): void {
  }

   public onConnexion(){
     this.router.navigate(['/identify/login']);
   }
  
  public onCreateAccount(){
     this.router.navigate(['/identify/registration']);
   }

   public onLogOut(){
    localStorage.removeItem("user");
    localStorage.removeItem("isLogin");
    localStorage.setItem("isLogin", "false");
    this.router.navigate(['/identify/login']);
   }
}
