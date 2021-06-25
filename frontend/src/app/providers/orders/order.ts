
export class Order {
  id: number;

  // MySQL Relations Don't Support Arrays :/
  // productsList: Product[];

  productsList: string;

  totalPrice: number;
}
