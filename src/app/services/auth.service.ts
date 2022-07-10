import { Injectable, NgZone } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { ToastrService } from "ngx-toastr";
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersRef: AngularFirestoreCollection;
  constructor(private afAuth: AngularFireAuth, public router: Router, public ngZone: NgZone, private db: AngularFirestore, private toastrService:ToastrService, private dataService:DataService) {

    this.usersRef = db.collection('users');
  }

  SendVerificationMail(): any {
    return this.afAuth.currentUser
      .then((user: any) => {
        return user.sendEmailVerification();
      })
      .then(() => {
        this.router.navigate(['validate-email']);
      });
  }

  SignUp(email: string, password: string): any {
    return this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {

        this.SendVerificationMail(); // Sending email verification notification, when new user registers
        this.dataService.setUserPixel(email, {'pixels':50});
        this.toastrService.info("Go to your email and verify it!");

      })
      .catch((error) => {

        this.toastrService.error(error.message);
      });
  }

  // Sign in with email/password
  SignIn(email: string, password: string): any {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result: any) => {
        if (result.user.emailVerified !== true) {

          this.toastrService.info("Go to your email and verify it!");
          this.SendVerificationMail();
        }
        else {
          this.ngZone.run(() => {
            sessionStorage.setItem('user', email);
            this.router.navigate(['']);
          })
        }
      }
      )
      .catch((error) => {

        //Handle Error
        this.toastrService.error(error.message);
      });
  }

  logOut() {

    sessionStorage.removeItem('user');
  }


  resetPassword(email:string) {
    const auth = getAuth();
    sendPasswordResetEmail(auth, email)
      .then(() => {
        
        this.toastrService.info("Reset password email sent!")
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        this.toastrService.error(errorMessage);
        // ..
      });
  }
}
