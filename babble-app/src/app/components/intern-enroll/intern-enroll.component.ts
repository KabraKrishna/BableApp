import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators, AbstractControl } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-intern-enroll',
  templateUrl: './intern-enroll.component.html',
  styleUrls: ['./intern-enroll.component.scss']
})
export class InternEnrollComponent implements OnInit {

  internEnrollForm: FormGroup;
  isSelectedSlot: number = 0;
  bsModalRef: BsModalRef;
  interests = [
    {
      name: 'Sales',
      selected: false
    },
    {
      name: 'Content Writing',
      selected: false
    },
    {
      name: 'Graphics Designing',
      selected: false
    },
    {
      name: 'Management',
      selected: false
    },
    {
      name: 'Operations',
      selected: false
    },
    {
      name : 'Lead Generation',
      selected: false
    }
  ]

  constructor(private builder: FormBuilder, private db: AngularFireDatabase, private bsModalService: BsModalService) {

    this.internEnrollForm = this.builder.group({
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.email, Validators.required]),
      age: new FormControl('', [Validators.required, Validators.min(1)]),
      profession: new FormControl('', Validators.required),
      contactNumber: new FormControl('', [Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10), Validators.required]),
      address: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      timeSlot: 0,
      isCommitted: new FormControl(''),
      myIntrests: this.buildInterests(),
      explain: new FormControl('',Validators.required),
      intent: new FormControl('',Validators.required),
      describe: new FormControl('')
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
    this.internEnrollForm.controls.timeSlot.setValue(slot);
    this.isSelectedSlot = slot;
  }

  buildInterests(){
    let arr = this.interests.map( elem =>{
      return this.builder.control(elem.selected)
    })

    return this.builder.array(arr);
  }

  submitForm(template: TemplateRef<any>) {
    if (this.internEnrollForm.controls.firstName.value != "" && this.internEnrollForm.controls.email.value != "" && this.internEnrollForm.controls.contactNumber.value != "") {
      this.db.database.ref('/internEnroll/' + Date.now()).set(({
        firstName: this.internEnrollForm.controls.firstName.value,
        lastName: this.internEnrollForm.controls.lastName.value,
        email: this.internEnrollForm.controls.email.value,
        age: this.internEnrollForm.controls.age.value,
        profession: this.internEnrollForm.controls.profession.value,
        contactNumber: this.internEnrollForm.controls.contactNumber.value,
        address: this.internEnrollForm.controls.address.value,
        gender: this.internEnrollForm.controls.gender.value,
        availableHours: this.isSelectedSlot,
        isComittedToWork: this.internEnrollForm.controls.isCommitted.value,
        interests: this.getInterests(),
        understandingAboutUs: this.internEnrollForm.controls.explain.value,
        whyWokrForStartUp: this.internEnrollForm.controls.intent.value,
        aboutMe: this.internEnrollForm.controls.describe.value
      }))

      this.internEnrollForm.reset();
      window.scrollTo(0, 0);
      this.openModal(template);
    } else {
      console.log("Data Missing!");
    }
  }

  getInterests(){
    return this.internEnrollForm.value.myIntrests.map((selected,i) =>{
      return {
        name: this.interests[i].name,
        isSelected: selected
      }
    }).filter(e => e.isSelected); 
  }

}
