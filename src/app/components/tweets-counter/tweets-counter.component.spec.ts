import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetsCounterComponent } from './tweets-counter.component';

describe('TweetsCounterComponent', () => {
  let component: TweetsCounterComponent;
  let fixture: ComponentFixture<TweetsCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetsCounterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TweetsCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
