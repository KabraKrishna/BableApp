import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { YouTubePlayerModule } from "@angular/youtube-player";
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';
import { TutorEnquiryPageComponent } from './components/tutor-enquiry-page/tutor-enquiry-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    RegistrationPageComponent,
    TutorEnquiryPageComponent
  ],
  imports: [
    BrowserModule,
    YouTubePlayerModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
