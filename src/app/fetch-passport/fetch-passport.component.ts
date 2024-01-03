import { Component } from '@angular/core';
import { PassportService } from '../passport-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth-service.service';
import { FormBuilder, FormGroup } from '@angular/forms';

function startCarousel() {
  let myIndex = 0;
  carousel();

  function carousel() {
    const x: HTMLCollectionOf<Element> = document.getElementsByClassName("mySlides");
    for (let i = 0; i < x.length; i++) {
      (x[i] as HTMLElement).style.display = "none";
    }
    myIndex++;
    if (myIndex > x.length) {
      myIndex = 1;
    }
    try {
      (x[myIndex - 1] as HTMLElement).style.display = "block";
    } catch {
    } finally {
      setTimeout(carousel, 3000); // Change image every 2 seconds
    }
  }
}


@Component({
  selector: 'app-fetch-passport',
  templateUrl: './fetch-passport.component.html',
  styleUrls: ['./fetch-passport.component.css']
})
export class FetchPassportComponent {
  passportNumber: string = '';
  errorMessage: string = '';
  passportDetails: any = null; // Define the structure based on the response from the backend
  passportForm!: FormGroup;


  constructor(private passportService: PassportService,private router: Router,private authService: AuthService,private formBuilder: FormBuilder) { this.passportForm = this.formBuilder.group({
    passportNumber: ['']
    // ... other form controls
  });}
  currentTime: string = '';
  currentDate: string = '';
  ngOnInit(): void {
    this.startCarousel();
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

  startCarousel(): void {
    startCarousel();
  }

  navigateToFetchPassport() {
    this.router.navigate(['/fetchdetails']);
  }
  resetForm(): void {
    this.passportForm.reset(); // Reset the form using the form group
  }
  
  goToFormPage(): void {
    this.router.navigate(['/verification']); // Navigate to the 'form' route
  }
  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/passportseva']);
  }
  
  
  fetchPassportDetails(): void {
    if (!this.passportNumber.trim()) {
      this.errorMessage = 'Please enter the passport number.';
      return;
    }

    this.passportService.getPassportDetailsByNumber(this.passportNumber).subscribe(
      (data: any) => {
        if (data) {
          // If data is received successfully
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Retrieving Details...',
            confirmButtonText: 'OK'
          }).then(() => {
            this.passportDetails = data;
            this.errorMessage = '';
            //this.passportNumber = ''; // Reset the passport number field
          });
        }
        
         
      },
      (error: any) => {
        // If an error occurs
        this.errorMessage = 'Incorrect Passport Number.';
        this.passportDetails = null;
      }
    );
  }
  fields = [
    { key: 'firstName', label: 'First Name' },
    { key: 'lastName', label: 'Last Name' },
    { key: 'age', label: 'Age' },
    { key: 'state', label: 'State' },
    { key: 'city', label: 'City' },
    { key: 'pincode', label: 'Pincode' },
    { key: 'line1', label: 'Address Line 1' },
    { key: 'line2', label: 'Address Line 2' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'passportNumber', label: 'Passport Number' },
    { key: 'email', label: 'Email' },
    // Add more fields as needed
  ];
  
  
  }

