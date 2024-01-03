import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchPassportComponent } from './fetch-passport.component';

describe('FetchPassportComponent', () => {
  let component: FetchPassportComponent;
  let fixture: ComponentFixture<FetchPassportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FetchPassportComponent]
    });
    fixture = TestBed.createComponent(FetchPassportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
