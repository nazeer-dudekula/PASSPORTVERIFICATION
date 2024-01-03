  import { Injectable } from '@angular/core';
  import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
  import { Observable, throwError } from 'rxjs';
  import { catchError, tap } from 'rxjs/operators';

  @Injectable({
    providedIn: 'root',
  })
  export class PassportService {
    private backendUrl = 'http://localhost:8089/manualpassportverify-0.0.1-SNAPSHOT'; // Replace with your backend API URL
  
    constructor(private http: HttpClient) {}

    savePassportDetails(formData: FormData): Observable<HttpResponse<string>> {
      return this.http.post<any>(`${this.backendUrl}/api/verify`, formData, {
        headers: { "Authorization": "Bearer " + localStorage.getItem("jwtToken") }
      }).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMessage = 'An error occurred';
    
          if (error.status === 409) {
            // Check if the error response contains a more detailed error message
            if (error.error && error.error.message) {
              errorMessage = error.error.message; // Use the detailed message if available
            } else {
              errorMessage = 'Passport number already exists in the database';
            }
          } else if (error.status === 400) {
            errorMessage = 'No match found in the extracted data';
          }
          
          return throwError(errorMessage);
        })
      );
    }
    
    getPassportDetailsByNumber(passportNumber: string): Observable<any> {
      const headers = this.getHeaders(); // Get headers with token if available
    
      return this.http.get<any>(`${this.backendUrl}/api/getDetailsByPassportNumber?passportNumber=${passportNumber}`, { headers:{"Authorization":"Bearer "+localStorage.getItem("jwtToken")} })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            if (error.status === 404) {
              return throwError('Sorry! Passport details are not found');
            }
            return throwError('An error occurred while fetching passport details');
          })
        );
    }
    
    // // Inside PassportService

    public authenticateUser(email: string, password: string): Observable<any> {
      const credentials = {
        email: email,
        password: password,
      };
    
      return this.http.post<any>(`${this.backendUrl}/api/authenticate`, credentials, { responseType: 'text' as 'json' })
        .pipe(
          catchError((error: HttpErrorResponse) => {
            let errorMessage = 'Something went wrong';
    
            if (error.status === 401) {
              errorMessage = 'Unauthorized access, invalid credentials';
            } else if (error.status === 500) {
              errorMessage = 'Internal server error';
            }
    
            console.error('HTTP Error:', error);
    
            return throwError(errorMessage);
          }),
          tap((response: any) => {
            if (response) {
              localStorage.setItem('token', response); // Assuming the response is the token string
            }
          })
        );
    }
    
    private getHeaders(): HttpHeaders {
      const token = localStorage.getItem('token'); // Retrieve token from localStorage
      if (token) {
        return new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include Bearer token in the Authorization header
        });
      }
      return new HttpHeaders({
        'Content-Type': 'application/json',
      });
    
    }}
