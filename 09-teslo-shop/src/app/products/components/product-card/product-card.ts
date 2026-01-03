import { SlicePipe } from '@angular/common';
import { Component, input, signal, computed } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Product } from '@products/interfaces/product.interface';
import { ProductImagePipe } from '@products/pipes/product-image.pipe';
import { environment } from 'src/environments/environment';

const BASER_URL = environment.baseUrl;

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  templateUrl: './product-card.html',
})
export class ProductCard { 

  product = input.required<Product>();

  imageUrl = computed(() => {
    return BASER_URL + '/files/product/' + (this.product().images?.[0] || 'no-image.png');
  });
}
