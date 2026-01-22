import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductService } from './services/product.service';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { name: '', price: 0, description: '' };
  editingProduct: Product | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts().subscribe({
      next: (data) => this.products = data,
      error: (err) => console.error('Error loading products:', err)
    });
  }

  addProduct() {
    if (!this.newProduct.name || !this.newProduct.price) return;
    
    this.productService.createProduct(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = { name: '', price: 0, description: '' };
      },
      error: (err) => console.error('Error creating product:', err)
    });
  }

  editProduct(product: Product) {
    this.editingProduct = { ...product };
  }

  updateProduct() {
    if (!this.editingProduct || !this.editingProduct._id) return;

    this.productService.updateProduct(this.editingProduct._id, this.editingProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.editingProduct = null;
      },
      error: (err) => console.error('Error updating product:', err)
    });
  }

  cancelEdit() {
    this.editingProduct = null;
  }

  deleteProduct(id: string | undefined) {
    if (!id || !confirm('Are you sure you want to delete this product?')) return;

    this.productService.deleteProduct(id).subscribe({
      next: () => this.loadProducts(),
      error: (err) => console.error('Error deleting product:', err)
    });
  }
}
