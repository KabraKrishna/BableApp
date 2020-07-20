import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-tutor-enquiry-page',
  templateUrl: './tutor-enquiry-page.component.html',
  styleUrls: ['./tutor-enquiry-page.component.scss']
})
export class TutorEnquiryPageComponent implements OnInit {

  tutorEnquiryForm: FormGroup;
  isSelectedSlot: number = 0;
  bsModalRef: BsModalRef;

  constructor(private builder: FormBuilder, private db: AngularFireDatabase, private bsModalService: BsModalService) {

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

  openModal(template: TemplateRef<any>) {
    this.bsModalRef = this.bsModalService.show(template, { class: 'modal-dialog-centered' });
  }
  closeModal() {
    this.bsModalRef.hide();
  }

  selectTimeSlot(slot: number) {
    this.tutorEnquiryForm.controls.timeSlot.setValue(slot);
    this.isSelectedSlot = slot;
  }

  submitForm(template: TemplateRef<any>) {
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
      }))

      this.tutorEnquiryForm.reset();
      window.scrollTo(0, 0);
      this.openModal(template);
    } else {
      console.log("Data Missing!");
    }
  }
}