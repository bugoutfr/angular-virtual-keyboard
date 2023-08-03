import { TestBed } from '@angular/core/testing';

import { AngularVirtualKeyboardService } from './angular-virtual-keyboard.service';

describe('AngularVirtualKeyboardService', () => {
  let service: AngularVirtualKeyboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AngularVirtualKeyboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
