import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  public conForm: FormGroup = new FormGroup({});

  constructor(private authSrvice: AuthService, private router: Router) { }
   response: any;

  ngOnInit(): void {
    this.initform();
  }

 public onLogin(){
   this.authSrvice.connect(this.conForm.value).subscribe(
     (dataRec: any) => {
        this.response = dataRec;
        if(this.response.resultat == 1){
          localStorage.setItem("user", JSON.stringify(dataRec.data));
          localStorage.setItem("isLogin", "true");
          this.router.navigate(['/main/produit']);
        }
     },
     (errors) => {
         this.response = errors;  
     }
   );
  }

  initform(){
    this.conForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', Validators.required),
    });
  }

}
