import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { handleError } from 'src/app/shared/errorHandler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  errors: string | undefined = undefined;

  constructor(private userService: UserService, private router: Router) {}

  login(form: NgForm): void {
    this.userService.login(form.value).subscribe({
      next: () => {
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.errors = handleError(err.error?.error);
      },
    });
  }
}
