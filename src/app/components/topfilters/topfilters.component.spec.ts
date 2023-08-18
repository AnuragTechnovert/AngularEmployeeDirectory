import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopfiltersComponent } from './topfilters.component';

describe('TopfiltersComponent', () => {
  let component: TopfiltersComponent;
  let fixture: ComponentFixture<TopfiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TopfiltersComponent]
    });
    fixture = TestBed.createComponent(TopfiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
