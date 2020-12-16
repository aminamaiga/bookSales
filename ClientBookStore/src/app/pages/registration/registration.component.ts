import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
})
export class RegistrationComponent implements OnInit {

  public registrationForm: FormGroup = new FormGroup({});

  constructor(private authSrvice: AuthService, private router: Router) { }
   response: any;

  ngOnInit(): void {
    this.initform();
  }

 public onRegister(){
    this.authSrvice.addUser(this.registrationForm.value).subscribe(
      (dataRec: any) => {
         this.response = dataRec;
         if(this.response.resultat == 1){
           this.router.navigate(['/login']);
         }
      },
      (errors) => {
          this.response = errors;  
      }
    );
  }

  initform(){
    this.registrationForm = new FormGroup({
      login: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      prenom: new FormControl('', [Validators.required]),
      nom: new FormControl('', Validators.required),
      confirm: new FormControl('', [Validators.required, Validators.required, Validators.minLength(4)])
    });
  }
}
