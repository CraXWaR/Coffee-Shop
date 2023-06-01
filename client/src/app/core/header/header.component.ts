import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  token: string | null = localStorage.getItem('token');

  get isLoggedIn(): boolean {
    if (this.userService.user) {
      return true
    } else {
      return false
    }
  }

  constructor(private userService: UserService, private router: Router) { }

  onLogout() {
    this.userService.logout();
    this.router.navigate(['/']);
  }
}