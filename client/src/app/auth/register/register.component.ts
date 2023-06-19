import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { handleError } from 'src/app/shared/errorHandler';
import { emailValidator, passwordValidator } from 'src/app/shared/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  errors: string | undefined = undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(10)]],
      email: ['', [Validators.required, emailValidator]],
      password: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
      rePassword: ['', [Validators.required, passwordValidator]],
      avatarImg: ['', [Validators.required]]
    });
  }

  async register() {
    this.userService.register(this.form.value).subscribe({
      next: () => {
        this.router.navigate(['/'])
      },
      error: (err) => {
        this.errors = handleError(err.error?.error);
      }
    });
  }
}
