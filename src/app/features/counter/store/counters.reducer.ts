import { createReducer, on } from '@ngrx/store';
import * as CounterActions from './counters.actions';

export interface Counter {
  id: string;
  count: number;
}

export interface CountersState {
  counters: Counter[];
}

export const initialState: CountersState = {
  counters: [],
};

export const countersReducer = createReducer(
  initialState,
  on(CounterActions.addCounter, (state) => {
    // Each new counter gets a generated id and starts with count 0
    const newCounter: Counter = {
      id: Math.random().toString(36).substr(2, 9),
      count: 0,
    };
    return {
      ...state,
      counters: [...state.counters, newCounter],
    };
  }),
  on(CounterActions.resetCounters, (state) => ({
    ...state,
    counters: [],
  })),
  on(CounterActions.incrementCounter, (state, { id }) => ({
    ...state,
    counters: state.counters.map((counter) =>
      counter.id === id ? { ...counter, count: counter.count + 1 } : counter
    ),
  })),
  on(CounterActions.decrementCounter, (state, { id }) => ({
    ...state,
    counters: state.counters.map((counter) =>
      counter.id === id ? { ...counter, count: counter.count - 1 } : counter
    ),
  })),
  on(CounterActions.deleteCounter, (state, { id }) => ({
    ...state,
    counters: state.counters.filter((counter) => counter.id !== id),
  }))
);
