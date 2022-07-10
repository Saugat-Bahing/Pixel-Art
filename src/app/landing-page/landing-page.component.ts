import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  rulesTransition = false;
  sampleArt = false;
  sampleImgOne = false;
  sampleImgTwo = false;
  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  scrollPos(event:number) {

    console.log(event);
    this.showRules(event);
    this.showSampleArt(event);
    this.showImgOne(event);
    this.showImgTwo(event);
  }

  showRules(scrollPos:number) {

    if (scrollPos > 130) {

      this.rulesTransition = true;
    }

    else {

      this.rulesTransition = false;
    }
  }

  showSampleArt(scrollPos:number) {

    if (scrollPos > 250) {

      this.sampleArt = true;
    }

    else {
      
      this.sampleArt = false;
    }
  }

  showImgOne(scrollPos:number) {

    if (scrollPos > 380) {

      this.sampleImgOne = true;
    }

    else {
      
      this.sampleImgOne = false;
    }
  }

  showImgTwo(scrollPos:number) {

    if (scrollPos > 710) {

      this.sampleImgTwo = true;
    }

    else {
      
      this.sampleImgTwo = false;
    }
  }

  navToCanvas() {

    this.router.navigate(['canvas'])
  }

}
