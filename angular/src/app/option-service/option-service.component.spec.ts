import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionServiceComponent } from './option-service.component';

describe('OptionServiceComponent', () => {
  let component: OptionServiceComponent;
  let fixture: ComponentFixture<OptionServiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OptionServiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
