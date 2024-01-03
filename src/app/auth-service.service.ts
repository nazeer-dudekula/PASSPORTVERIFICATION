import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = 'jwtToken';
  private backendUrl = 'http://localhost:8089/manualpassportverify-0.0.1-SNAPSHOT'; // Replace with your backend API URL
  

  constructor(private http: HttpClient,private jwtHelper: JwtHelperService) {}

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
            this.saveToken(response); // Save the token
          }
        })
      );
  }

  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
     return localStorage.getItem(this.tokenKey);
  }

  removeToken(): void {
    localStorage.removeItem('jwtToken');
  }
  decodeToken(): string | null {
    const token = this.getToken();
    if (token) {
      console.log(token);
      
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const decodedData = JSON.parse(window.atob(base64));
        console.log(decodedData.email);
        
        return decodedData.email; // Assuming email is stored in the token
      } catch (error) {
        console.error('Error decoding token:', error);
        return null;
      }
    } else {
      return null;
    }
  }
}
