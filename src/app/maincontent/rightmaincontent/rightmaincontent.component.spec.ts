import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RightmaincontentComponent } from './rightmaincontent.component';

describe('RightmaincontentComponent', () => {
  let component: RightmaincontentComponent;
  let fixture: ComponentFixture<RightmaincontentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RightmaincontentComponent]
    });
    fixture = TestBed.createComponent(RightmaincontentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
