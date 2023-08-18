import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidefiltersComponent } from './leftfilters.component';

describe('SidefiltersComponent', () => {
  let component: SidefiltersComponent;
  let fixture: ComponentFixture<SidefiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SidefiltersComponent]
    });
    fixture = TestBed.createComponent(SidefiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
