import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCountersCount } from 'src/app/features/counter/store/counters.selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  countersCount$: Observable<number>;

  constructor(private store: Store) {
    this.countersCount$ = this.store.select(selectCountersCount);
  }
}
