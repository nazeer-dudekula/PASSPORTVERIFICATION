import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportExistsComponent } from './passport-exists.component';

describe('PassportExistsComponent', () => {
  let component: PassportExistsComponent;
  let fixture: ComponentFixture<PassportExistsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PassportExistsComponent]
    });
    fixture = TestBed.createComponent(PassportExistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
