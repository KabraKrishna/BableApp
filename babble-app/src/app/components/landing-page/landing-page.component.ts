import { Component, OnInit, OnChanges, SimpleChanges, TemplateRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { TeamBabbleApp } from "./babbleapp-team";
import { Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { environment } from "../../../environments/environment";

declare var $: any;
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

  //for mobile device
  isMenuOpen:boolean = false;
  bsModalRef: BsModalRef;
  contactForm: FormGroup;
  @ViewChild('advertiseTemplate') advertiseModel: TemplateRef<any>;

  displayElememnt = {
    mode: 'home'
  }

  appTeam: any = [];
  teamBabbleApp = new TeamBabbleApp();

  constructor(public builder: FormBuilder,
    public router: Router, private db: AngularFireDatabase, private bsModalService: BsModalService){

    this.contactForm = this.builder.group({
      name: new FormControl(null,Validators.required),
      contact: new FormControl(null,Validators.required),
      message: [''],
    });

    this.appTeam = this.teamBabbleApp.team;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    console.log("change",changes)
  }

  ngOnInit(): void {
    console.log("init")
    
  }

  ngAfterViewInit(): void {

    if(environment.isFirst){
      environment.isFirst = false;
      this.openModal(this.advertiseModel);
    }
  }

  ngOnDestroy(): void {
    console.log("Destroy");
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

  onJoinUsCalled(){
    this.router.navigate(['intern-enroll']);
  }

  submitEnquiry(template: TemplateRef<any>){
    if (this.contactForm.controls.name.value != "" &&
      this.contactForm.controls.contact.value != "" &&
      this.contactForm.controls.message.value != "") {
      this.db.database.ref('/contactUs/' + Date.now()).set({
        name: this.contactForm.controls.name.value,
        contact: this.contactForm.controls.contact.value,
        message: this.contactForm.controls.message.value
      })
      this.contactForm.reset();
      window.scrollTo(0, 0);
      this.openModal(template);
    } else{
      console.log("Data Missing!");
    }
  }

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template, { class: 'modal-dialog-centered' });
  }
  closeModal() {
    this.bsModalRef.hide();
  }

}
