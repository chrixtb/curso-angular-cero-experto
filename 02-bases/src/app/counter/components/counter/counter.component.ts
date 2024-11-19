import { Component,  } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  private initialCounter: number = 10;
  public counter: number = 10;

  increaseBy(amount: number): void{
    this.counter += amount;
  }

  resetCounter(): void{
    this.counter = this.initialCounter;
  }
}
