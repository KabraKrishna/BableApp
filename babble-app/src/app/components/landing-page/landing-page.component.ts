import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TeamBabbleApp } from "./babbleapp-team";
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnChanges {

  //for mobile device
  isMenuOpen:boolean = false;

  contactForm: FormGroup;

  displayElememnt = {
    mode: 'home'
  }

  appTeam: any = [];
  teamBabbleApp = new TeamBabbleApp();

  constructor(public builder: FormBuilder,
    public router: Router){

    this.contactForm = this.builder.group({
      name: new FormControl(null,Validators.required),
      contact: new FormControl(null,Validators.required),
      email: new FormControl(null,Validators.required),
      message: [''],
    });

    this.appTeam = this.teamBabbleApp.team;
  }


  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    
  }

  scrollToElement($element,selectedElement: string): void {
    this.displayElememnt.mode = selectedElement;
    $element.scrollIntoView({behavior: "smooth", block: "center"});
    this.isMenuOpen = false;
  }

  setDisplayElement(mode: string){
    console.log(mode);
    this.displayElememnt.mode = mode;
  }

  onRegisterCalled(){
    this.router.navigate(['register']);
  }

  onEnquiryCalled(){
    this.router.navigate(['tutor-enquiry']);
  }

}
