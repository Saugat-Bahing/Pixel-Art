import { Component, HostListener, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  toggleHeader = false;
  enableLogin = true;

  @Output() scrollPosChanged = new EventEmitter<number>();

  @HostListener("document:scroll")
  scrollFun() {
    let scrollPos = document.documentElement.scrollTop;
    this.scrollPosChanged.next(scrollPos);

    if (scrollPos > 120) {

      this.toggleHeader = true;
    }

    else {

      this.toggleHeader = false;
    }
  }
  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {

    let email = sessionStorage.getItem('user');

    if (email) {

      this.enableLogin = false;
    }

    else {

      this.enableLogin = true;
    }
  }

  navCanvas() {

    this.router.navigate(['canvas']);
  }

  navLogin() {
    
    this.router.navigate(['login']);
  }

  logOut() {

    this.authService.logOut();
    this.router.navigate(['login'])
  }
}
