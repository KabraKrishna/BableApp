import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MatStepperModule } from '@angular/material/stepper';

import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { TutorEnquiryPageComponent } from './components/tutor-enquiry-page/tutor-enquiry-page.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { InternEnrollComponent } from './components/intern-enroll/intern-enroll.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegistrationPageComponent,
    TutorEnquiryPageComponent,
    InternEnrollComponent
  ],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MatStepperModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'babble'),
    AngularFireDatabaseModule,
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
