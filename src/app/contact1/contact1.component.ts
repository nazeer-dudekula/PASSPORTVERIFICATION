import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact1',
  templateUrl: './contact1.component.html',
  styleUrls: ['./contact1.component.css']
})
export class Contact1Component {
  currentDate: string = '';
  currentTime: string = '';
  constructor(private router: Router) {
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
    this.router.navigate(['/login']);
  }
  goToHome(): void {
    this.router.navigate(['/passportseva']); // Redirects to the same landing page
  }

  goToContact(): void {
    this.router.navigate(['/contact1']); // Redirects to the Contact1Component
  }
}


