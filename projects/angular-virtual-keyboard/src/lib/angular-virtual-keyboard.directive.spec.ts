import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { AngularVirtualKeyboardDirective } from './angular-virtual-keyboard.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: '<input virtualKeyboard lang="fr" type="text"/>',
})
class TestComponent {}

describe('VirtualKeyboardDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestComponent, AngularVirtualKeyboardDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges(); // initial binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
