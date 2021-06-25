import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../providers/api/api.service';
import { Product } from '../../providers/products/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  dataSource: Product[] = [];
  product: any = {};
  isEditing: boolean = false;
  missingData: boolean = false;
  noData: boolean = false;

  settings = {
    mode: "external",
    noDataMessage: "There are no products registered!",
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
      name: {
        title: "Name",
        sort: true,
        filter: true
      },
      price: {
        title: "Price",
        sort: true,
        filter: true
      },
      category: {
        title: "Category",
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
    this.dataSource = await this.apiService.readProducts().toPromise();
    // New Product
    this.newProduct();
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  newProduct() {
    this.product = {};
    this.isEditing = false;
    this.missingData = false;
    this.noData = false;
  }

  selectProduct(product: Product) {
    this.product = product;
  }

  editProduct(event: any) {
    this.isEditing = true;
    this.product = event.data;
  }

  async createProduct(form: any) {
    if (form.value.name && form.value.price && form.value.category) {
      // Creating Product
      await this.apiService.createProduct(form.value).subscribe((result) => {
        console.log(result);
      });
      // Updating Table
      this.dataSource = await this.apiService.readProducts().toPromise();
      this.dataSource = await this.apiService.readProducts().toPromise();
      // New Product
      this.newProduct();
    } else if (!form.value.name || !form.value.price || !form.value.category) {
      this.missingData = true;
      this.noData = false;
    } else if (!form.value.name && !form.value.price && !form.value.category) {
      this.missingData = false;
      this.noData = true;
    }
  }

  async updateProduct(form: any) {
    if (form.value.name && form.value.price && form.value.category) {
      const product = await this.apiService.findByName(form.value.name).toPromise();
      form.value.id = product.id;
      // Updating Product
      await this.apiService.updateProduct(form.value).subscribe((result) => {
        console.log(result);
      });
      // Updating Table
      this.dataSource = await this.apiService.readProducts().toPromise();
      this.dataSource = await this.apiService.readProducts().toPromise();
      // New Product
      this.newProduct();
    } else if (!form.value.name || !form.value.price || !form.value.category) {
      this.missingData = true;
      this.noData = false;
    } else if (!form.value.name && !form.value.price && !form.value.category) {
      this.missingData = false;
      this.noData = true;
    }
  }

  async deleteProduct(event: any) {
    // Deleting Product
    await this.apiService.deleteProduct(event.data.id).subscribe((result) => {
      console.log(result);
    });
    // Updating Table
    this.dataSource = await this.apiService.readProducts().toPromise();
    this.dataSource = await this.apiService.readProducts().toPromise();
    // New Product
    this.newProduct();
  }

}
