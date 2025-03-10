import { createSelector, createFeatureSelector } from '@ngrx/store';
import { CountersState } from './counters.reducer';

export const selectCountersFeature =
  createFeatureSelector<CountersState>('counters');

export const selectAllCounters = createSelector(
  selectCountersFeature,
  (state) => state.counters
);

export const selectCountersCount = createSelector(
  selectAllCounters,
  (counters) => counters.length
);
