import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTypeOfVehicleComponent } from './add-type-of-vehicle.component';

describe('AddTypeOfVehicleComponent', () => {
  let component: AddTypeOfVehicleComponent;
  let fixture: ComponentFixture<AddTypeOfVehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddTypeOfVehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddTypeOfVehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
