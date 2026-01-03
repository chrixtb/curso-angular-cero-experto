
import { Component, computed, inject, resource, signal } from '@angular/core';
import { ProductCard } from '@products/components/product-card/product-card';
import { ProductsService } from '@products/services/products.service';
import { rxResource} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-home-page',
  imports: [ProductCard],
  templateUrl: './home-page.html',
})
export class HomePage { 

  productService = inject(ProductsService);
  
  productsResorce = rxResource({
    params: () => ({}),
    stream: ({params}) => {return this.productService.getProducts({});}
  });

}


