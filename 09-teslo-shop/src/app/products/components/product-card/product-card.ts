import { Component, input, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'product-card',
  imports: [RouterLink],
  templateUrl: './product-card.html',
})
export class ProductCard { 
  title = input.required<string>();
  description = input<string>('');

}
