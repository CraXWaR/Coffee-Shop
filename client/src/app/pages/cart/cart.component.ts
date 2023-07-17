import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  constructor () {};

  openModal() {
    // Open the Bootstrap modal
    // const modalElement = document.getElementById('buyModal');
    // modalElement.classList.add('show');
    // modalElement.style.display = 'block';
    // document.body.classList.add('modal-open');
  }

  closeModal() {
    // Close the Bootstrap modal
    // const modalElement = document.getElementById('buyModal');
    // modalElement.classList.remove('show');
    // modalElement.style.display = 'none';
    // document.body.classList.remove('modal-open');
  }

  buyProduct() {
    // Perform the buy logic here
    // ...

    // Close the modal
    this.closeModal();
  }

  removeProduct() {
    // Perform the remove logic here
    // ...
  }
}
