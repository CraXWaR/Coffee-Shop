import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoffeeService } from 'src/app/services/coffee.service';
import { CoffeeInterface } from 'src/app/shared/interfaces/coffee-interface';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {

  coffee: CoffeeInterface | undefined;
  errors: Object | undefined;

  constructor(private coffeeService: CoffeeService, private activatedRoute: ActivatedRoute, private router: Router) {
    this.getCoffee();
  }

  getCoffee(): void {
    this.coffee = undefined;
    const id = this.activatedRoute.snapshot.params['id'];
    //TODO add if user is owner
    this.coffeeService.getOneCoffee(id).subscribe({
      next: (coffee) => {
        this.coffee = coffee;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
