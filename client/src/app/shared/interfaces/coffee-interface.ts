import { UserInterface } from './user-interface';

export interface CoffeeInterface {
  make: string;
  type: string;
  intensity: number;
  imageUrl: string;
  description: string;
  price: number;
  _id: string;
  owner: UserInterface;
  addedBy: UserInterface[];
}
