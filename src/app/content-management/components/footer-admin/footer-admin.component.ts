import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-admin',
  templateUrl: './footer-admin.component.html',
  styleUrls: ['./footer-admin.component.css']
})
export class FooterAdminComponent implements OnInit {

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
