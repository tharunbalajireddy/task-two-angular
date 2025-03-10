import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterLineComponent } from './counter-line.component';

describe('CounterLineComponent', () => {
  let component: CounterLineComponent;
  let fixture: ComponentFixture<CounterLineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CounterLineComponent],
    });
    fixture = TestBed.createComponent(CounterLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
