import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  Form!:any;
  passwordMatch = false;

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router) { }

  ngOnInit(): void {

    this.Form = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]],
      confirm_password:['', [Validators.required]]
    })
  }

  onSubmit() {

    this.Form.get('email').touched = true;
    this.Form.get('password').touched = true;
    this.Form.get('confirm_password').touched = true;
    if (this.Form.valid && this.passwordMatch){

      const email = this.Form.get('email').value;
      const password = this.Form.get('password').value;

      this.authService.SignUp(email, password).
      then(

        this.router.navigate(['login'])
      );
    }
  }

  verifyPasswordMatch():void {

    console.log("a")
    if (this.Form.get('password').value == this.Form.get('confirm_password').value) {

      this.passwordMatch = true;
    }

    else {
      this.passwordMatch = false;
    }
  }
}
