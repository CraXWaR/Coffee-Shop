import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  form!: FormGroup;
  errors: string | undefined = undefined;

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  async register() {
    this.userService.register(this.form.value).subscribe({
      next:() => {
        this.router.navigate(['/'])
      },
      error:(err) => {
        console.log(err);
        
      }
    });
  }
}
