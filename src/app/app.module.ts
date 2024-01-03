import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { PassportformComponent } from './passportform/passportform.component';


import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
// Angular Material modules
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { FailurePageComponent } from './failure-page/failure-page.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { SharedHeaderComponent } from './shared-header/shared-header.component';
import { PassportExistsComponent } from './passport-exists/passport-exists.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FetchPassportComponent } from './fetch-passport/fetch-passport.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { Contact1Component } from './contact1/contact1.component';
import { JwtModule } from '@auth0/angular-jwt';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PassportformComponent,
    HomeComponent,
    ContactComponent,
    SharedHeaderComponent,
    PassportExistsComponent,
    LoginComponent,
    FetchPassportComponent,
    LandingpageComponent,
    Contact1Component
  ],
  imports: [
    BrowserModule,
    MatSnackBarModule,
    AppRoutingModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    RouterModule.forRoot([ 
      { path: '', component: HomeComponent }, // Update to the appropriate component for your landing page
    { path: 'form', component: PassportformComponent },
    { path: 'success', component: SuccessPageComponent },
    { path: 'failure', component: FailurePageComponent },
    { path: 'contact', component: ContactComponent },
    // Add more routes for other compone
      // Your routes here...
    ]),
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatTabsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('auth_token');
        },
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
