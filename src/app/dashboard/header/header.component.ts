import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  tenant: any = 'Tenant';

  constructor(private router: Router){}

  navigateToProfile() {
    this.router.navigate(['/dashboard/profile']);
  }

}
