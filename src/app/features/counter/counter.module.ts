import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { CounterLineComponent } from './components/counter-line/counter-line.component';
import { CounterComponent } from './container/counter.component';
import { countersReducer } from './store/counters.reducer';
import { CounterRoutingModule } from './counter-routing.module';

@NgModule({
  declarations: [CounterComponent, CounterLineComponent],
  imports: [
    CommonModule,
    CounterRoutingModule,
    StoreModule.forFeature('counters', countersReducer),
  ],
})
export class CounterModule {}
