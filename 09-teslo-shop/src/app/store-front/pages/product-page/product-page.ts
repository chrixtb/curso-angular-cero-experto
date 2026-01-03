import { Component, inject, signal, computed } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '@products/services/products.service';
import { ProductCarousel } from "@products/components/product-carousel/product-carousel";

@Component({
  selector: 'app-product-page',
  imports: [ProductCarousel],
  templateUrl: './product-page.html',
})
export class ProductPage {

  private activatedRoute = inject(ActivatedRoute);
  private productService = inject(ProductsService);

  id = signal<string>('');

  productResponse = rxResource({
    params: () => ({ idSlug: this.id() }),
    stream: ({ params }) => {
      return this.productService.getProductById(params.idSlug);
    }
  })

  constructor() {
    this.activatedRoute.params.subscribe(params => {
      this.id.set(params['idSlug']);
    });
  }

}
