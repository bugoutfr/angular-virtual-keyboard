import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AngularVirtualKeyboardComponent } from './angular-virtual-keyboard.component';

describe('AngularVirtualKeyboardComponent', () => {
  let component: AngularVirtualKeyboardComponent;
  let fixture: ComponentFixture<AngularVirtualKeyboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AngularVirtualKeyboardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AngularVirtualKeyboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
