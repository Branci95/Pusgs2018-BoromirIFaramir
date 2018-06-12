import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRegularComponent } from './home-regular.component';

describe('HomeRegularComponent', () => {
  let component: HomeRegularComponent;
  let fixture: ComponentFixture<HomeRegularComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeRegularComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeRegularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
