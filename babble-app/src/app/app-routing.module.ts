import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { RegistrationPageComponent } from './components/registration-page/registration-page.component';


const routes: Routes = [{
  path: 'home', component: LandingPageComponent
}, {
  path: '', redirectTo: 'home', pathMatch: 'full'
},{
  path: 'register', component: RegistrationPageComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
