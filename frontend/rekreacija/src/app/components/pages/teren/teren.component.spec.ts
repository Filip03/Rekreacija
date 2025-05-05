import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerenComponent } from './teren.component';

describe('TerenComponent', () => {
  let component: TerenComponent;
  let fixture: ComponentFixture<TerenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerenComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
