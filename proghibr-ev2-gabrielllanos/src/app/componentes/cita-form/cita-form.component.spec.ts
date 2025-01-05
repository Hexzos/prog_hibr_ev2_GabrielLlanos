import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { CitaFormComponent } from './cita-form.component';

describe('CitaFormComponent', () => {
  let component: CitaFormComponent;
  let fixture: ComponentFixture<CitaFormComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [CitaFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CitaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});