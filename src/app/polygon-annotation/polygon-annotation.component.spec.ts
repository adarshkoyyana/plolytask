import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolygonAnnotationComponent } from './polygon-annotation.component';

describe('PolygonAnnotationComponent', () => {
  let component: PolygonAnnotationComponent;
  let fixture: ComponentFixture<PolygonAnnotationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PolygonAnnotationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PolygonAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
