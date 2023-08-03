import { NgModule } from '@angular/core';
import { AngularVirtualKeyboardComponent } from './angular-virtual-keyboard.component';
import { AngularVirtualKeyboardDirective } from './angular-virtual-keyboard.directive';



@NgModule({
  declarations: [
    AngularVirtualKeyboardComponent,
    AngularVirtualKeyboardDirective
  ],
  imports: [
  ],
  exports: [
    AngularVirtualKeyboardComponent,
    AngularVirtualKeyboardDirective
  ]
})
export class AngularVirtualKeyboardModule { }
