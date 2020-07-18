import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { promoCodeValidator } from '../registration-page/promocode.validator';

@Component({
  selector: 'app-tutor-enquiry-page',
  templateUrl: './tutor-enquiry-page.component.html',
  styleUrls: ['./tutor-enquiry-page.component.scss']
})
export class TutorEnquiryPageComponent implements OnInit {

  myForm: FormGroup;
  isSelectedSlot:number = 0;

  constructor(private builder: FormBuilder) {

    this.myForm = this.builder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      proffesion: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.pattern("^[+][0-9]*$"), Validators.required]),
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      timeSlot: 0,
      referredFrom: new FormControl('')
    })
  }

  ngOnInit(): void {
  }

  isInvalid(control: AbstractControl): boolean {
    return (control.touched && control.invalid);
  }

  isValid(control: AbstractControl): boolean {
    return (control.touched && control.valid);
  }

  selectTimeSlot(slot: number){
    this.myForm.controls.timeSlot.setValue(slot);
    this.isSelectedSlot = slot;
  }

  submitForm() {
    console.log("Submitted!");
    console.log("Details:");
    console.log("firstName: " + this.myForm.controls.firstName.value);
    console.log("lastName: " + this.myForm.controls.lastName.value);
    console.log("email: " + this.myForm.controls.email.value);
    console.log("age: " + this.myForm.controls.age.value);
    console.log("proffesion: " + this.myForm.controls.proffesion.value);
    console.log("contactNumber: " + this.myForm.controls.contactNumber.value);
    console.log("address: " + this.myForm.controls.address.value);
    console.log("gender: " + this.myForm.controls.gender.value);
    console.log("isComfortableWithOppositeGender: " + this.myForm.controls.isComfortableWithOppositeGender.value);
    console.log("referredFrom: " + this.myForm.controls.referredFrom.value);
    console.log('timeSlot: ', this.myForm.controls.timeSlot.value);
    console.log("promoCode: " + this.myForm.controls.promoCode.value);
    console.log("purpose: " + this.myForm.controls.purpose.value);
    console.log("isDeclarationAccepted: " + this.myForm.controls.isDeclarationAccepted.value);

  }

}
