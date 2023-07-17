import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CoffeeService } from 'src/app/services/coffee.service';
import { handleError } from 'src/app/shared/errorHandler';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent {
  errors: string | undefined = undefined;

  constructor(private coffeeService: CoffeeService, private router: Router) {}

  async addCoffee(form: NgForm) {
    let token = localStorage.getItem('token');
    let value = form.value;
    value.token = token;

    this.coffeeService.addCoffee(value).subscribe({
      next: () => {
        this.router.navigate(['/catalog']);
      },
      error: (err) => {
        this.errors = handleError(err.error?.error);
      },
    });
  }
}
