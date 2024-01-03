import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PassportformComponent } from './passportform/passportform.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { FailurePageComponent } from './failure-page/failure-page.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { PassportExistsComponent } from './passport-exists/passport-exists.component';
import { LoginComponent } from './login/login.component';
import { FetchPassportComponent } from './fetch-passport/fetch-passport.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { Contact1Component } from './contact1/contact1.component';
import { AuthorizationService } from './authorization.service';
 // Import your fetch-passport component

const routes: Routes = [
  { path: 'Homepage', component: HomeComponent , canActivate:[AuthorizationService]}, // your home page
  { path: 'verification', component: PassportformComponent },
  { path: 'success', component: SuccessPageComponent },
  { path: 'failure', component: FailurePageComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'contact1', component: Contact1Component },
  { path: 'passport-exists', component: PassportExistsComponent },
  { path: 'passportseva', component: LandingpageComponent },
  { path: '', redirectTo: '/passportseva', pathMatch: 'full' },
  { path: 'login', component: LoginComponent }, 
  { path: 'fetchdetails', component: FetchPassportComponent },

  // Add more routes for other components if needed
  // Example: { path: 'another-component', component: AnotherComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
