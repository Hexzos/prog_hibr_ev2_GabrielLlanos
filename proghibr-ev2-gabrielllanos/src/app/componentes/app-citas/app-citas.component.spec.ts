import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AppCitasComponent } from './app-citas.component';

describe('AppCitasComponent', () => {
  let component: AppCitasComponent;
  let fixture: ComponentFixture<AppCitasComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [AppCitasComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
