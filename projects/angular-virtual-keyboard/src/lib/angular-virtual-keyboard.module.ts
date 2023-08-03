import { NgModule } from '@angular/core';
import { AngularVirtualKeyboardComponent } from './angular-virtual-keyboard.component';
import { AngularVirtualKeyboardDirective } from './angular-virtual-keyboard.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AngularVirtualKeyboardComponent,
    AngularVirtualKeyboardDirective,
  ],
  imports: [CommonModule],
  exports: [AngularVirtualKeyboardComponent, AngularVirtualKeyboardDirective],
})
export class AngularVirtualKeyboardModule {}
