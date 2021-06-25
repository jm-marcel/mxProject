import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../orders/order';
import { Product } from '../products/product';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  API_SERVER = "http://localhost:3000";

  constructor(private httpClient: HttpClient) { }

  // Products

  public findByName(name: string) {
    return this.httpClient.get<Product>(`${this.API_SERVER}/products/${name}/findByName`);
  }

  public readProduct(id: number) {
    return this.httpClient.get<Product>(`${this.API_SERVER}/products/${id}/readOne`);
  }

  public readProducts() {
    return this.httpClient.get<Product[]>(`${this.API_SERVER}/products/readAll`);
  }

  public createProduct(product: Product) {
    return this.httpClient.post<Product>(`${this.API_SERVER}/products/create`, product);
  }

  public updateProduct(product: Product) {
    return this.httpClient.put<Product>(`${this.API_SERVER}/products/${product.id}/update`, product);
  }

  public deleteProduct(id: number) {
    return this.httpClient.delete(`${this.API_SERVER}/products/${id}/delete`);
  }

  // Orders

  public readOrder(id: number) {
    return this.httpClient.get<Order>(`${this.API_SERVER}/orders/${id}/readOne`);
  }

  public readOrders() {
    return this.httpClient.get<Order[]>(`${this.API_SERVER}/orders/readAll`);
  }

  public createOrder(order: Order) {
    return this.httpClient.post<Order>(`${this.API_SERVER}/orders/create`, order);
  }

  public updateOrder(order: Order) {
    return this.httpClient.put<Order>(`${this.API_SERVER}/orders/${order.id}/update`, order);
  }

  public deleteOrder(id: number) {
    return this.httpClient.delete(`${this.API_SERVER}/orders/${id}/delete`);
  }

}
