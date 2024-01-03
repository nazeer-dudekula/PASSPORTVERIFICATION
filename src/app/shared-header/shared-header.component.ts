import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';

@Component({
  selector: 'app-shared-header',
  templateUrl: './shared-header.component.html',
  styleUrls: ['./shared-header.component.css']
})
export class SharedHeaderComponent {
  currentDate: string = '';
  currentTime: string = '';
 

  constructor(private router: Router, private authService: AuthService) {
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

  goToFormPage(): void {
    this.router.navigate(['/verification']); // Navigate to the 'form' route
  }
  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/passportseva']);
  }
}
