import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  Form!:any;

  constructor(private fb:FormBuilder, private authService:AuthService) { }

  ngOnInit(): void {

    this.Form = this.fb.group({
      email:['', [Validators.required, Validators.email]]
    })
  }

  resetPassword() {

    const email = this.Form.get('email').value;
    this.Form.get('email').touched = true;

    if (this.Form.get('email').valid) {

      this.authService.resetPassword(email);
    }
  }
}

