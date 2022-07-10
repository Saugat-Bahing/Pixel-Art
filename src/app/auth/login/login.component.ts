import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  Form!:any;

  constructor(private fb:FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {

    this.Form = this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', [Validators.required]]
    })
  }

  onSubmit() {

    this.Form.get('email').touched = true;
    this.Form.get('password').touched = true;
    if (this.Form.valid){

      const email = this.Form.get('email').value;
      const password = this.Form.get('password').value;

      this.authService.SignIn(email, password);
      console.log(this.Form.value);
    }
  }
}
