import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObavjestenjaComponent } from './obavjestenja.component';

describe('ObavjestenjaComponent', () => {
  let component: ObavjestenjaComponent;
  let fixture: ComponentFixture<ObavjestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ObavjestenjaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObavjestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
