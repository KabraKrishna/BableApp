import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { TutorEnquiryPageComponent } from './components/tutor-enquiry-page/tutor-enquiry-page.component';
import { InternEnrollComponent } from './components/intern-enroll/intern-enroll.component';


const routes: Routes = [{
  path: 'home', component: LandingPageComponent
}, {
  path: '', redirectTo: 'home', pathMatch: 'full'
},{
  path: 'register', component: RegistrationPageComponent
},{
  path: 'tutor-enquiry', component: TutorEnquiryPageComponent
},{
  path: 'intern-enroll', component: InternEnrollComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
