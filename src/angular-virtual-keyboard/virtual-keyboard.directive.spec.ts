import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
} from '@angular/core';
import { VirtualKeyboardDirective } from './virtual-keyboard.directive';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: '<input virtualKeyboard lang="fr" type="text"/>',
})
class TestComponent {}

describe('VirtualKeyboardDirective', () => {
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [TestComponent, VirtualKeyboardDirective],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).createComponent(TestComponent);
    fixture.detectChanges(); // initial binding
  });
});
