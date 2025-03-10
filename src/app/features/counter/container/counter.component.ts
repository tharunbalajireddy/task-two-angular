import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Counter } from '../store/counters.reducer';
import * as CounterActions from '../store/counters.actions';
import { selectAllCounters } from '../store/counters.selectors';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss'],
})
export class CounterComponent {
  counters$: Observable<Counter[]> = this.store.select(selectAllCounters);

  constructor(private store: Store) {}

  addCounter(): void {
    this.store.dispatch(CounterActions.addCounter());
  }

  resetCounters(): void {
    this.store.dispatch(CounterActions.resetCounters());
  }

  onIncrement(id: string): void {
    this.store.dispatch(CounterActions.incrementCounter({ id }));
  }

  onDecrement(id: string): void {
    this.store.dispatch(CounterActions.decrementCounter({ id }));
  }

  onDelete(id: string): void {
    this.store.dispatch(CounterActions.deleteCounter({ id }));
  }
}
