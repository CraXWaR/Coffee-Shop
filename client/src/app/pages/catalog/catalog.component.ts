import { Component } from '@angular/core';
import { CoffeeService } from 'src/app/services/coffee.service';
import { CoffeeInterface } from 'src/app/shared/interfaces/coffee-interface';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css']
})
export class CatalogComponent {

  cafes: CoffeeInterface[] | undefined;
  cafesLength: any;
  isEmpty: boolean = false;

  constructor(private coffeeService: CoffeeService) {

  }

  getAllCafes() {
    this.cafes = undefined;
    this.coffeeService.getAllCafes().subscribe({
      next:(cafes) => {
        this.cafes=cafes;
        this.cafesLength = cafes.length || 0;
        if (cafes.length == 0) {
          this.isEmpty = true;
        }
      }
    });
  }
}
