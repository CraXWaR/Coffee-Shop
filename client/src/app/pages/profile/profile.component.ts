import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { UserInterface } from 'src/app/shared/interfaces/user-interface';

import jwt_decode from 'jwt-decode';
import { handleError } from 'src/app/shared/errorHandler';

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
  token: string | null = localStorage.getItem('token');

  constructor(private userService: UserService, private router: Router) {
    this.getUserInfo();
  }

  decodeToken(token: any) {
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    }
    return;
  }

  getUserInfo() {
    let token = localStorage.getItem('token');

    this.userService.getUserData({ token }).subscribe({
      next: (user) => {
        this.user = user;       
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onEditUser(form: NgForm) {

    const decoded = this.decodeToken(this.token) as { _id: string };
    const id = decoded._id;
    let value = form.value;
    value.token = this.token;

    this.userService.editUser(id, value).subscribe({
      next: () => {
        this.userService.logout();
        this.router.navigate(['login']);
      },
      error: (err) => {
        this.errors = handleError(err.error?.error);
      }
    });
  }
}