import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeecardcomponentComponent } from './employeecardcomponent.component';

describe('EmployeecardcomponentComponent', () => {
  let component: EmployeecardcomponentComponent;
  let fixture: ComponentFixture<EmployeecardcomponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmployeecardcomponentComponent]
    });
    fixture = TestBed.createComponent(EmployeecardcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
