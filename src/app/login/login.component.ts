import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { AppStateService } from '../app-state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit { 
    loginForm!:FormGroup;

    constructor(private fb:FormBuilder,
      private authService:AuthService,
      private router:Router,
      private appstate:AppStateService
    ){

    }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email:['', Validators.required],
      password:['', Validators.required]
    });
  }


    HandleLogin(){
        if(this.loginForm.valid){
          console.log(this.loginForm.value.password);
            this.authService.login(this.loginForm.value).subscribe(
              data => {
                console.log(data);
                this.appstate.setUsesState({
                  isAuthenticated:true,
                  UserId: data.id,
                  UserEmail: data.email,
                  CartList:data.cart,
                })
                if(data.role === 'ADMIN'){
                  this.router.navigateByUrl(`/update`);
                }else{
                  this.router.navigateByUrl(`/`);
                }
                
               
              }, err => {
                console.log(err);
              }
            )
        }
    }



}
