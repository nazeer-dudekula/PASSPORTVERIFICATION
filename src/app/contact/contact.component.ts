import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service.service';



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
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  navigateToFormPage() {
    this.router.navigateByUrl('/verification');
  }
  constructor(private router: Router, private authService: AuthService) {}
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
  goToFormPage(): void {
    this.router.navigate(['/verification']); // Navigate to the 'form' route
  }
  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['/passportseva']);
  }
}



