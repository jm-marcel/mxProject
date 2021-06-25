import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { NgSelectComponent } from '@ng-select/ng-select';
import { ApiService } from '../../providers/api/api.service';
import { Order } from '../../providers/orders/order';
import { Product } from '../../providers/products/product';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  dataSource: Order[] = [];
  allProducts: Product[] = [];
  products: Product[] = [];
  selectedProducts: Product[] = [];
  order: any = {};
  isEditing: boolean = false;
  noProducts: boolean = false;

  @ViewChild(NgSelectComponent)
  ngSelect: NgSelectComponent;

  settings = {
    mode: "external",
    noDataMessage: "There are no orders registered!",
    actions: {
      add: false,
      position: "right",
      columnTitle: "Actions"
    },
    edit: {
      editButtonContent: '<img src="../../../assets/images/edit.png">'
    },
    delete: {
      deleteButtonContent: '<img src="../../../assets/images/delete.png">'
    },
    pager: {
      perPage: 5
    },
    columns: {
      id: {
        title: "ID",
        sort: true,
        filter: true
      },
      totalPrice: {
        title: "Total Price",
        sort: true,
        filter: true
      }
    }
  }

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async ngOnInit() {
    // Populating Table
    this.dataSource = await this.apiService.readOrders().toPromise();
    this.allProducts = await this.apiService.readProducts().toPromise();
    // New Order
    this.newOrder();
  }

  goToProducts() {
    this.router.navigate(['/products']);
  }

  newOrder() {
    this.order = {};
    this.products = [];
    this.ngSelect.handleClearClick();
    this.isEditing = false;
    this.noProducts = false;
  }

  selectOrder(order: Order) {
    this.order = order;
  }

  async editOrder(event: any) {
    this.isEditing = true;
    this.order = event.data;
    const order = await this.apiService.readOrder(event.data.id).toPromise();
    const ids = order.productsList.split("|");
    ids.forEach(async id => {
      if (id !== "") {
        let product: Product = await this.apiService.readProduct(parseInt(id)).toPromise();
        let item = this.ngSelect.itemsList.findByLabel(product.name);
        this.ngSelect.select(item);
      }
    });
  }

  async addProducts(value: any) {
    this.selectedProducts = value;
    this.allProducts = value.length > 0 ?
      this.allProducts.filter(product => product.category === value[0].category) :
      this.allProducts = await this.apiService.readProducts().toPromise();
  }

  async showProducts(event: any) {
    const order = await this.apiService.readOrder(event.data.id).toPromise();
    const ids = order.productsList.split("|");
    if (ids) {
      ids.forEach(async id => {
        if (id !== "") {
          this.products.push(await this.apiService.readProduct(parseInt(id)).toPromise());
        }
      });
    }
  }

  async createOrder() {
    if (this.selectedProducts.length > 0) {
      // Creating Order
      const order = new Order();
      order.productsList = '';
      order.totalPrice = 0;
      this.selectedProducts.forEach(product => {
        order.productsList += product.id.toString() + '|';
        order.totalPrice += product.price;
      });
      console.log(order);
      await this.apiService.createOrder(order).subscribe((result) => {
        console.log(result);
      });
      // Updating Table
      this.dataSource = await this.apiService.readOrders().toPromise();
      this.dataSource = await this.apiService.readOrders().toPromise();
      // New Order
      this.newOrder();
    } else {
      this.noProducts = true;
    }
  }

  async updateOrder() {
    if (this.selectedProducts.length > 0) {
      // Updating Order
      const order = new Order();
      order.id = this.order.id;
      order.productsList = '';
      order.totalPrice = 0;
      this.selectedProducts.forEach(product => {
        order.productsList += product.id.toString() + '|';
        order.totalPrice += product.price;
      });
      console.log(order);
      await this.apiService.updateOrder(order).subscribe((result) => {
        console.log(result);
      });
      // Updating Table
      this.dataSource = await this.apiService.readOrders().toPromise();
      this.dataSource = await this.apiService.readOrders().toPromise();
      // New Order
      this.newOrder();
    } else {
      this.noProducts = true;
    }
  }

  async deleteOrder(event: any) {
    // Deleting Order
    await this.apiService.deleteOrder(event.data.id).subscribe((result) => {
      console.log(result);
    });
    // Updating Table
    this.dataSource = await this.apiService.readOrders().toPromise();
    this.dataSource = await this.apiService.readOrders().toPromise();
    // New Order
    this.newOrder();
  }

}
