import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { promoCodeValidator } from './promocode.validator';
import { User } from './user';
import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';

const DEFAULT_DURATION = 300;

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  constructor(private db: AngularFireDatabase) {

  }

  //TODO: Pass promo code from database here
  promocode: string = 'BABBLE88';

  elemArray = [true,true,true];

  user = new User();
  myForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.email, Validators.required]),
    age: new FormControl('', [Validators.required, Validators.min(1)]),
    proffesion: new FormControl('', Validators.required),
    contactNumber: new FormControl('',[Validators.pattern("^[+][0-9]*$"), Validators.required]),
    address: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    isComfortableWithOppositeGender: new FormControl('', Validators.required),
    referredFrom: new FormControl(''),
    promoCode: new FormControl('', promoCodeValidator(this.promocode)),
    purpose: new FormControl('', Validators.required),
    isDeclarationAccepted: new FormControl('', Validators.required),  
  })

  submitForm(){
    console.log("Submitted!");
    console.log("firstName: "+this.myForm.controls.firstName.value);
    console.log("lastName: "+this.myForm.controls.lastName.value);
    console.log("email: "+this.myForm.controls.email.value);
    console.log("age: "+this.myForm.controls.age.value);
    console.log("proffesion: "+this.myForm.controls.proffesion.value);
    console.log("contactNumber: "+this.myForm.controls.contactNumber.value);
    console.log("address: "+this.myForm.controls.address.value);
    console.log("gender: "+this.myForm.controls.gender.value);
    console.log("isComfortableWithOppositeGender: "+this.myForm.controls.isComfortableWithOppositeGender.value);
    console.log("referredFrom: "+this.myForm.controls.referredFrom.value);
    console.log("promoCode: "+this.myForm.controls.promoCode.value);
    console.log("purpose: "+this.myForm.controls.purpose.value);
    console.log("isDeclarationAccepted: "+this.myForm.controls.isDeclarationAccepted.value);
    if (this.myForm.controls.firstName.value != "" && this.myForm.controls.email.value != "" && this.myForm.controls.contactNumber.value != "") {
      this.db.database.ref('/users').set(({
        firstName: this.myForm.controls.firstName.value,
        lastName: this.myForm.controls.lastName.value,
        email: this.myForm.controls.email.value,
        age: this.myForm.controls.age.value,
        profession: this.myForm.controls.proffesion.value,
        contactNumber: this.myForm.controls.contactNumber.value,
        address: this.myForm.controls.address.value,
        gender: this.myForm.controls.gender.value,
        isComfortableWithOppositeGender: this.myForm.controls.isComfortableWithOppositeGender.value,
        referredFrom: this.myForm.controls.referredFrom.value,
        promoCode: this.myForm.controls.promoCode.value,
        purpose: this.myForm.controls.purpose.value,
        isDeclarationAccepted: this.myForm.controls.isDeclarationAccepted.value,
      }));
    } else {
      console.log("Data Missing!");
    }
  }

  ngOnInit(): void {
  }

  isInvalid(control: AbstractControl): boolean {
    return (control.touched && control.invalid);
  }

  isValid(control: AbstractControl): boolean {
    return (control.touched && control.valid);
  }



}
