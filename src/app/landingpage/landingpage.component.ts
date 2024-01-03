import { Component } from '@angular/core';
import { Router } from '@angular/router';

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
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent {
  constructor(private router: Router) {}
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
  navigateToLandingPage(): void {
    this.router.navigate(['/passportseva']);
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
