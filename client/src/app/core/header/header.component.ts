import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @ViewChild('dropdown') dropdown: any;

  toggleDropdown(dropdown: any): void {
    dropdown.nativeElement.classList.toggle('show');
  }
}
