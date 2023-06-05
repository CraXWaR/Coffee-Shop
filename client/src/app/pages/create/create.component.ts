import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { CoffeeService } from 'src/app/services/coffee.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {

  errors: string | undefined = undefined;

  constructor(private coffeeService: CoffeeService, private router: Router) { }

  async addCoffee(form: NgForm){
    this.coffeeService.addCoffee(form.value).subscribe({
      next: () => {
        this.router.navigate(['/catalog'])
      },
      error: (err) => {
       console.log(err);
       
      }
    })
  }
}
