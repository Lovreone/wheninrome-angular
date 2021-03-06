import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-portal',
  templateUrl: './footer-portal.component.html',
  styleUrls: ['./footer-portal.component.css']
})
export class FooterPortalComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  getCopyrightYear(): string {
    const startYear = '2022'
    const currentYear = new Date().getFullYear().toString();
    return startYear === currentYear ? 
      startYear : 
      startYear.concat('-',currentYear);
  }
}
