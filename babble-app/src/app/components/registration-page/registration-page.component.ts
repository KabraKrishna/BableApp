import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { promoCodeValidator } from './promocode.validator';
import { User } from './user';
import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';

const DEFAULT_DURATION = 300;

export interface TimeSlotModel {
  slot: string,
  isBooked: boolean,
  isAvailable: boolean
}

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent implements OnInit {

  //TODO: Pass promo code from database here
  promocode: string = 'BABBLE10';
  timeSlotArray: Array<TimeSlotModel> = [];
  isPromoCodeValid: boolean;
  elemArray = [true, true, true];

  user = new User();
  myForm: FormGroup;
  isSelectedSlot: TimeSlotModel = null;

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
      isComfortableWithOppositeGender: new FormControl('', Validators.required),
      referredFrom: new FormControl(''),
      timeSlot: '',
      promoCode: new FormControl('', promoCodeValidator(this.promocode)),
      purpose: new FormControl('', Validators.required),
      isDeclarationAccepted: new FormControl('', Validators.required),
    })


    let hourS: number = 11;
    let minS: number = 0;
    let hourE: number = 20;
    let minE: number = 0;
    this.timeSlotArray = this.getTimeSlotsBetween(hourS, minS, hourE, minE);
  }

  getTimeSlotsBetween(hourS: number, minS: number, hourE: number, minE: number): any {
    let slotArray: TimeSlotModel[] = [];
    let start = hourS;
    while (start < hourE) {

      for (let min = 0; min <= 60; min = min + 20) {

        let slotObject: TimeSlotModel = null;
        let slot: string;
        let book: boolean = false;
        let available: boolean = true;
        if (min === 60) {
          start = start + 1;
        }
        if (start < 12) {
          slot = min === 60 || min === 0 ? start + ':' + '00' + ' AM' : start + ':' + min + ' AM';
          book = true;
        } else if (start === 12) {
          slot = min === 60 || min === 0 ? start + ':' + '00' + ' PM' : start + ':' + min + ' PM';
        }
        else if(start > 12) {
          slot = min === 60 || min === 0 ? (start - 12) + ':' + '00' + ' PM' : (start - 12) + ':' + min + ' PM';
          if(start === 13 || start === 14){
            available = false;
            book = false;
          }
        }
        slotObject = {
          slot: slot,
          isBooked: book,
          isAvailable: available
        }
        slotArray.push(slotObject);
        console.log("Slot: ", slot);

      }
    }
    return slotArray;
  }

  selectTimeSlot(slot: TimeSlotModel) {
    this.myForm.controls.timeSlot.setValue(slot.slot);
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

  ngOnInit(): void {
  }

  isInvalid(control: AbstractControl): boolean {
    return (control.touched && control.invalid);
  }

  isValid(control: AbstractControl): boolean {
    return (control.touched && control.valid);
  }

  validatePromoCode(control: AbstractControl){
    this.isPromoCodeValid = control.value === this.promocode;
  }



}
