import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { trigger, style, animate, transition } from '@angular/animations';
import Swal from 'sweetalert2';
import { PassportService } from '../passport-service.service';
import { LoginModelService } from '../login-model-service'; // Import the LoginModelService
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class LoginComponent {
  currentDate: string = '';
  currentTime: string = '';


  loginModel: any = { email: '', password: '' }; // Initialize loginModel with email and password properties

  
  constructor(
    private router: Router,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private passportService: PassportService, // Inject PassportService
  ) {
    this.updateTimeAndDate();
    setInterval(() => this.updateTimeAndDate(), 1000);
  }

  updateTimeAndDate(): void {
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };
    this.currentDate = now.toLocaleDateString('en-US', options);
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }

  checkLogin(loginForm: NgForm): void {
    if (loginForm.valid) {
      // Use the data from the loginModel
      this.authService.authenticateUser(this.loginModel.email, this.loginModel.password)

        .subscribe(
          (response) => {  // Handle successful login
            Swal.fire({
              icon: 'success',
              title: 'Login Successful!',
              timer: 2000,
              showConfirmButton: false,
              customClass: {
                icon: 'your-custom-icon-class',
              },
            }).then(() => {
              this.router.navigate(['/Homepage']); // Navigate to home page
            });
          },
          (error: any) => {  // Handle login error
            if (error.status === 401) {
              Swal.fire({
                icon: 'error',
                title: 'Invalid Credentials',
                text: 'Please try again.',
              });
            } else {
              // Handle other errors
              Swal.fire({
                icon: 'error',
                title: 'Invalid Credentials',
                text: 'Please try again.',
              });
            }
          }
        );
    } else {
      // Display error messages for invalid form fields
      Swal.fire({
        icon: 'error',
        title: 'Form Validation Error',
        text: 'Please fill all the required fields correctly.',
      });
      Object.keys(loginForm.controls).forEach((key) => {
        loginForm.controls[key].markAsDirty();
      });
    }
  }
  

  cancelLogin(loginForm: NgForm): void {
    loginForm.resetForm(); // Reset the form
  }
  // In LoginComponent or a separate LogoutComponent


}
