import { createAction, props } from '@ngrx/store';

export const addCounter = createAction('[Counter] Add');

export const resetCounters = createAction('[Counter] Reset');

export const incrementCounter = createAction(
  '[Counter] Increment',
  props<{ id: string }>()
);

export const decrementCounter = createAction(
  '[Counter] Decrement',
  props<{ id: string }>()
);

export const deleteCounter = createAction(
  '[Counter] Delete',
  props<{ id: string }>()
);
