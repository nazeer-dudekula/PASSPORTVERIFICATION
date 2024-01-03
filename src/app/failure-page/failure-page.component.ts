import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';


@Component({
  selector: 'app-failure-page',
  templateUrl: './failure-page.component.html',
  styleUrls: ['./failure-page.component.css']
})
export class FailurePageComponent implements OnInit {
  failureMessage: string | undefined;
  route: any;
  

  constructor(private router: Router) {}


  navigateToMainPage() {
    this.router.navigate(['']);
  }

  ngOnInit(): void {
    this.failureMessage = this.route.snapshot.paramMap.get('failureMessage') || 'Data Did not Match';
  }
}