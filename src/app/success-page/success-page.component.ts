import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.css']
})
export class SuccessPageComponent implements OnInit {
  successMessage: string | undefined;
  

  constructor(private router: Router) {}

  navigateToMainPage() {
    this.router.navigate(['home']);
  }

  ngOnInit(): void {
    // Fetch data from ActivatedRoute or any service to get success message
    this.successMessage = 'Data matches successfully!'; // Get message dynamically if needed
  }
}
