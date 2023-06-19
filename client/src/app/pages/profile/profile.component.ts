import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/shared/interfaces/user-interface';
import { emailValidator } from 'src/app/shared/validator';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  user: UserInterface | undefined;
  onEdit: boolean = false;
  form!: FormGroup;
  errors: string | undefined = undefined;

  constructor(private userService: UserService, private fb: FormBuilder, private router: Router) {

    this.getUserInfo();

    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, emailValidator]],
      avatar: ['', [Validators.required]]
    });

  }

  getUserInfo() {
    let token = localStorage.getItem('token');

    this.userService.getUserData({ token }).subscribe({
      next: (user) => {
        this.user = user
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
