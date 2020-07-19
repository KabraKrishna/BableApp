import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';

@Component({
  selector: 'app-tutor-enquiry-page',
  templateUrl: './tutor-enquiry-page.component.html',
  styleUrls: ['./tutor-enquiry-page.component.scss']
})
export class TutorEnquiryPageComponent implements OnInit {

  tutorEnquiryForm: FormGroup;
  isSelectedSlot: number = 0;

  constructor(private builder: FormBuilder, private db: AngularFireDatabase) {

    this.tutorEnquiryForm = this.builder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      profession: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10), Validators.required]),
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

  selectTimeSlot(slot: number) {
    this.tutorEnquiryForm.controls.timeSlot.setValue(slot);
    this.isSelectedSlot = slot;
  }

  submitForm() {
    if (this.tutorEnquiryForm.controls.firstName.value != "" && this.tutorEnquiryForm.controls.email.value != "" && this.tutorEnquiryForm.controls.contactNumber.value != "") {
      this.db.database.ref('/tutorEnquiry/' + Date.now()).set(({
        firstName: this.tutorEnquiryForm.controls.firstName.value,
        lastName: this.tutorEnquiryForm.controls.lastName.value,
        email: this.tutorEnquiryForm.controls.email.value,
        age: this.tutorEnquiryForm.controls.age.value,
        profession: this.tutorEnquiryForm.controls.profession.value,
        contactNumber: this.tutorEnquiryForm.controls.contactNumber.value,
        address: this.tutorEnquiryForm.controls.address.value,
        gender: this.tutorEnquiryForm.controls.gender.value,
        availableHours: this.isSelectedSlot,
        referredFrom: this.tutorEnquiryForm.controls.referredFrom.value
      })).then((response) => {
        //success alert
      }).catch(() => {
        //failure alert
      })

      this.tutorEnquiryForm.reset();
      window.scrollTo(0, 0);
    } else {
      console.log("Data Missing!");
    }
  }
}