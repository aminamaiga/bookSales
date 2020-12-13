import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html'
})
export class TopBarComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

   public onConnexion(){
      this.router.navigate(['/identify/login']);
   }
  
   public onCreateAccount(){
    this.router.navigate(['/identify/registration']);
   }
}
