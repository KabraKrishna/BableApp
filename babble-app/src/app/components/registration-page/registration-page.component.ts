import { Component, OnInit, ChangeDetectorRef, resolveForwardRef } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { FormGroup, FormControl, Validators, AbstractControl, FormBuilder } from '@angular/forms';
import { promoCodeValidator } from './promocode.validator';
import { User } from './user';
import { trigger, state, style, AUTO_STYLE, transition, animate } from '@angular/animations';

export interface TimeSlotModel {
  id: number,
  slot: string,
  isBooked: boolean,
  isAvailable: boolean,
  count: number
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
  userRegistration: FormGroup;
  isSelectedSlot: TimeSlotModel = null;

  constructor(private builder: FormBuilder, private db: AngularFireDatabase, private cd: ChangeDetectorRef) {

    this.getTimeSlots().then((res: boolean) => {
      if(res)
        cd.detectChanges();
    });
    this.userRegistration = this.builder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      profession: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10), Validators.required]),
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      isComfortableWithOppositeGender: new FormControl('', Validators.required),
      referredFrom: new FormControl(''),
      timeSlot: '',
      promoCode: new FormControl('', promoCodeValidator(this.promocode)),
      purpose: new FormControl('', Validators.required),
      isDeclarationAccepted: new FormControl('', Validators.required),
    })
  }

  getTimeSlots(): any {
    return new Promise((resolve, reject) => {
      this.db.database.ref('/timeSlots/').once('value').then((snapshot) => {
        for(let entry in snapshot.toJSON()){
          snapshot.toJSON()[entry].id = entry;
          this.timeSlotArray.push(snapshot.toJSON()[entry]);
          if(entry === "10"){
            console.log("Now resolved.")
            resolve(true);
          }
        }
      })
      
    })
  }

  selectTimeSlot(slot: TimeSlotModel) {
    this.userRegistration.controls.timeSlot.setValue(slot.id);
    console.log(slot.id)
    this.isSelectedSlot = slot;
  }

  submitForm() {
    if (this.userRegistration.controls.firstName.value != "" && this.userRegistration.controls.email.value != "" && this.userRegistration.controls.contactNumber.value != "" && this.userRegistration.controls.timeSlot) {
      if(this.isSelectedSlot.count < 3){
        this.isSelectedSlot.count++;
        if(this.isSelectedSlot.count == 3){
          this.isSelectedSlot.isAvailable = false;
        }
      }
      
      this.db.database.ref('/timeSlots/' + this.isSelectedSlot.id).update(this.isSelectedSlot).then(() => {
        this.db.database.ref('/users/' + Date.now()).set(({
          firstName: this.userRegistration.controls.firstName.value,
          lastName: this.userRegistration.controls.lastName.value,
          email: this.userRegistration.controls.email.value,
          age: this.userRegistration.controls.age.value,
          slotTime: this.isSelectedSlot.slot,
          profession: this.userRegistration.controls.profession.value,
          contactNumber: this.userRegistration.controls.contactNumber.value,
          address: this.userRegistration.controls.address.value,
          gender: this.userRegistration.controls.gender.value,
          isComfortableWithOppositeGender: this.userRegistration.controls.isComfortableWithOppositeGender.value,
          referredFrom: this.userRegistration.controls.referredFrom.value,
          promoCode: this.userRegistration.controls.promoCode.value,
          purpose: this.userRegistration.controls.purpose.value,
          isDeclarationAccepted: this.userRegistration.controls.isDeclarationAccepted.value
        }));
        this.userRegistration.reset();
        window.scrollTo(0, 0);
      }).then(() => {
        let index = this.timeSlotArray.findIndex((timeSlotObject) => {
          return timeSlotObject.id === this.isSelectedSlot.id;
        });
        this.timeSlotArray[index] = this.isSelectedSlot;
      }).then((response) => {
        //success alert
      }).catch(() => {
        //failure alert
      })
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

  validatePromoCode(control: AbstractControl) {
    this.isPromoCodeValid = control.value === this.promocode;
  }

}
