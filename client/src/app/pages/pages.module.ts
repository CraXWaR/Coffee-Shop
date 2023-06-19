import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateComponent } from './create/create.component';
import { CatalogComponent } from './catalog/catalog.component';
import { DetailsComponent } from './details/details.component';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [
    CreateComponent,
    CatalogComponent,
    DetailsComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class PagesModule { }
