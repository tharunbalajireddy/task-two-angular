import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Counter } from '../../store/counters.reducer';

@Component({
  selector: 'app-counter-line',
  templateUrl: './counter-line.component.html',
  styleUrls: ['./counter-line.component.scss'],
})
export class CounterLineComponent {
  @Input() counter!: Counter;
  @Output() increment = new EventEmitter<string>();
  @Output() decrement = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onIncrement(): void {
    this.increment.emit(this.counter.id);
  }

  onDecrement(): void {
    this.decrement.emit(this.counter.id);
  }

  onDelete(): void {
    this.delete.emit(this.counter.id);
  }
}
