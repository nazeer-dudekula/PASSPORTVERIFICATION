
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}
  currentTime: string = '';
  currentDate: string = '';
  

  ngOnInit(): void {
  
    this.updateTimeAndDate();
    setInterval(() => this.updateTimeAndDate(), 1000);
  }
  goToFormPage(): void {
    this.router.navigate(['/form']); // Navigate to the 'form' route
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
    this.currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  logout(): void {
    this.router.navigate(['/login']);
  }

}
