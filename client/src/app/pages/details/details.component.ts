import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeService } from 'src/app/services/coffee.service';
import { CoffeeInterface } from 'src/app/shared/interfaces/coffee-interface';

import jwt_decode from 'jwt-decode';
import { handleError } from 'src/app/shared/errorHandler';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent {
  coffee: CoffeeInterface | undefined;
  errors: Object | undefined;
  editMode: boolean = false;
  isOwner: boolean = false;
  token: string | null = localStorage.getItem('token');
  alreadyInCart: boolean = false;

  constructor(
    private coffeeService: CoffeeService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.getCoffee();
  }

  decodeToken(token: any) {
    if (token) {
      const decodedToken = jwt_decode(token);
      return decodedToken;
    }
    return;
  }

  getCoffee(): void {
    this.coffee = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    const decoded = this.decodeToken(this.token) as { _id: string };
    let userId = decoded._id;

    this.coffeeService.getOneCoffee(id).subscribe({
      next: (coffee) => {
        this.coffee = coffee;
        this.alreadyInCart = coffee.addedBy.some((user) => user._id == userId);

        if (userId == coffee.owner._id) {
          this.isOwner = true;
        } else {
          this.isOwner = false;
        }
      },
      error: (err) => {
        this.errors = handleError(err.error?.error);
      },
    });
  }

  onDelete() {
    const id = this.coffee?._id;

    let token = localStorage.getItem('token');
    let data = {};
    data = { token: token };

    this.coffeeService.deleteCoffee(id, data).subscribe({
      next: () => this.router.navigate(['/catalog']),
      error: (err) => {
        this.errors = handleError(err.error?.error);
      },
    });
  }

  async onEdit(form: NgForm) {
    const id = this.coffee?._id;

    let token = localStorage.getItem('token');
    let value = form.value;
    value.token = token;

    this.coffeeService.editCoffee(id, value).subscribe({
      next: (coffee) => {
        this.coffee = coffee;
        this.editMode = false;
      },
      error: (err) => {
        this.errors = handleError(err.error?.error);
      },
    });
  }

  addToCart() {
    const id = this.coffee?._id;

    let token = localStorage.getItem('token');
    let data = {};
    data = { token: token };

    this.coffeeService.addToCart(id, data).subscribe({
      next: () => {
        this.alreadyInCart = true;
      },
    });
  }
}
