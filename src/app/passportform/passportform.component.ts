import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { PassportService } from '../passport-service.service';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../auth-service.service';
@Component({
  selector: 'app-passportform',
  templateUrl: './passportform.component.html',
  styleUrls: ['./passportform.component.css']
})
export class PassportformComponent {
  passportDetails = {
    firstName: '',
    lastName: '',
    age: null,
    line1: '', // Add line1 field
    line2: '', // Add line2 field
    city: '',
  state: '',
  pincode: '',
    phoneNumber: '',
    passportNumber: '',
    email: '',
    
    passportDocumentFile: null as File | null,
  
    // Add other properties or modify types as needed
  };
  errorMessage:string='';
  successMessage: string | undefined;
  
  constructor(
    private passportService: PassportService,
    private snackBar: MatSnackBar,
    private router: Router,
    private authService: AuthService
  ) {}


  // Update submitForm method in your component
  submitForm() {
    const formData = new FormData();
    formData.append('firstName', this.passportDetails.firstName);
  formData.append('lastName', this.passportDetails.lastName);
  formData.append('age', String(this.passportDetails.age));
  formData.append('line1', this.passportDetails.line1); // Add line1
  formData.append('line2', this.passportDetails.line2); // Add line2
  formData.append('state', this.passportDetails.state);
  formData.append('city', this.passportDetails.city);
  formData.append('pincode', this.passportDetails.pincode);
  formData.append('phoneNumber', this.passportDetails.phoneNumber);
  formData.append('passportNumber', this.passportDetails.passportNumber);
  formData.append('email', this.passportDetails.email);
  
    if (this.passportDetails.passportDocumentFile) {
      formData.append('passportDocumentFile', this.passportDetails.passportDocumentFile);
    }
    
    this.passportService.savePassportDetails(formData).subscribe(
      () => {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Data matches successfully!',
          confirmButtonText: 'OK'
        }).then(() => {
          this.router.navigate(['/Homepage']);
          this.resetForm();
        });
      },
      (error: HttpErrorResponse) => {
        // Convert the error object to a string and log it in the console
        const errorString = JSON.stringify(error);
        console.error('Error occurred:', errorString);

        // Assign a general error message if the specific message is not available
        this.errorMessage = errorString;
      }
    );
  }
  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/passportseva']);
  }

  

  // Reset form after submission (Optional)
  //this.resetForm();

  resetForm() {
    this.passportDetails = {
      firstName: '',
      lastName: '',
      age: null,
      line1: '', // Reset line1 field
      line2: '', // Reset line2 field
      state:'',
      city:'',
      pincode:'',
      phoneNumber: '',
      passportNumber: '',
      email: '',
      passportDocumentFile: null
      // Reset other form fields
    };
  }

  // Assuming passportDetails is an object in your component
// Declare a variable to track if drag is over the drop area
isDragOver: boolean = false;

handleFileInput(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    this.passportDetails.passportDocumentFile = target.files[0];
  }
}

allowDrop(event: Event) {
  event.preventDefault();
  event.stopPropagation();
  this.isDragOver = true;
}

handleFileDrop(event: DragEvent) {
  event.preventDefault();
  event.stopPropagation();
  this.isDragOver = false;
  const files = event.dataTransfer?.files;
  if (files && files.length > 0) {
    this.passportDetails.passportDocumentFile = files[0];
  }
}

onDragLeave() {
  this.isDragOver = false;
}






}