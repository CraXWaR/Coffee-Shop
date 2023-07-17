import { Component } from '@angular/core';
import { CoffeeService } from 'src/app/services/coffee.service';
import { CoffeeInterface } from 'src/app/shared/interfaces/coffee-interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  cafes: CoffeeInterface[] | undefined;
  isEmpty: boolean = true;

  constructor(private coffeeService: CoffeeService) {
    this.getTopExpensiveCafes();
  }

  getTopExpensiveCafes() {
    this.coffeeService.getMostExpnesiveCafes().subscribe({
      next: (value) => {
        if (value.length > 0) {
          this.isEmpty = false;
          this.cafes = value;
        }
      },
      error: (err) => console.log(err),
    });
  }
}
