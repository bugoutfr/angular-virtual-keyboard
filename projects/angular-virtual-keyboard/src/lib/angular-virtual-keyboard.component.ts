import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  Input,
  Output,
} from '@angular/core';
import { VirtualKeyboardLayouts } from './angular-virtual-keyboard-layouts';

@Component({
  selector: 'ng-virtual-keyboard',
  templateUrl: './angular-virtual-keyboard.component.html',
  styleUrls: ['./angular-virtual-keyboard.component.scss'],
})
export class AngularVirtualKeyboardComponent {
  @Input() language: string = 'en';
  @Output() inputChange: EventEmitter<string> = new EventEmitter<string>();
  @Output() blur: EventEmitter<FocusEvent> = new EventEmitter<FocusEvent>();

  public isVisible: boolean = false;
  public focusedInputElement: HTMLInputElement | null = null;

  private static inputsWithSelection: string[] = [
    'text',
    'search',
    'url',
    'tel',
    'password',
  ];

  constructor(private elementRef: ElementRef) {}

  get currentLayout(): string[][] {
    const layout = VirtualKeyboardLayouts.find(
      (layout) => layout.lang === this.language
    );

    return layout?.layout ?? VirtualKeyboardLayouts[0].layout;
  }

  @HostBinding('style.display') get display(): string {
    return this.isVisible ? 'block' : 'none';
  }

  show(): void {
    this.isVisible = true;
  }

  hide(): void {
    this.isVisible = false;
  }

  /** Simule un événement blur sur le composant entier */
  onKeyBlur(event: FocusEvent): void {
    if (!this.elementRef.nativeElement.contains(event.relatedTarget))
      this.blur.emit(event);
  }

  onKeyPress(key: string): void {
    console.log('Key pressed', key);
    if (this.focusedInputElement) {
      if (
        AngularVirtualKeyboardComponent.inputsWithSelection.indexOf(
          this.focusedInputElement.type
        ) === -1
      ) {
        console.warn(
          `${this.focusedInputElement.type} inputs don't support selecting text with javascript. User input will be added to the end of the existing value.`
        );
        this.focusedInputElement.value += key;
        return;
      }

      const start = this.focusedInputElement.selectionStart ?? 0;
      const end = this.focusedInputElement.selectionEnd ?? start;

      const value = this.focusedInputElement.value;
      const newValue = value.slice(0, start) + key + value.slice(end);

      this.focusedInputElement.value = newValue;

      this.focusedInputElement.selectionStart =
        this.focusedInputElement.selectionEnd = start + key.length;

      this.focusedInputElement.dispatchEvent(
        new Event('input', { bubbles: true })
      );
      this.inputChange.emit(newValue);

      // Rétablir le focus sur l'élément après l'insertion du texte
      this.focusedInputElement.focus();
    }
  }
}
