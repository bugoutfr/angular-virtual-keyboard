import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClavierVirtuelComponent } from './clavier-virtuel.component';

describe('ClavierVirtuelComponent', () => {
  let component: ClavierVirtuelComponent;
  let fixture: ComponentFixture<ClavierVirtuelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClavierVirtuelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClavierVirtuelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
