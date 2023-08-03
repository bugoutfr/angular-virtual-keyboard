import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewContainerRef,
  createComponent,
} from '@angular/core';
import { AngularVirtualKeyboardComponent } from './angular-virtual-keyboard.component';

@Directive({
  selector: '[virtualKeyboard]',
})
export class AngularVirtualKeyboardDirective implements OnInit, OnDestroy {
  @Input() lang: string = 'en';

  private static clavierVirtuelRef: ComponentRef<AngularVirtualKeyboardComponent> | null =
    null;
  private static hostRef: HTMLElement | undefined;

  constructor(
    private app: ApplicationRef,
    private inputElementRef: ElementRef<HTMLInputElement>
  ) {}

  public ngOnInit(): void {
    this.init();
  }

  @HostListener('focus')
  onFocus(): void {
    this.showClavierVirtuel();
  }

  @HostListener('focusout', ['$event'])
  onFocusOut(event: FocusEvent): void {
    // On vérifie si l'élément cible du focusOut est un enfant du clavier virtuel
    const isChildOfClavierVirtuel =
      AngularVirtualKeyboardDirective.clavierVirtuelRef &&
      AngularVirtualKeyboardDirective.clavierVirtuelRef.location.nativeElement.contains(
        event.relatedTarget
      );

    // Si l'élément cible n'est pas un enfant du clavier virtuel, alors on cache le clavier
    if (!isChildOfClavierVirtuel) {
      this.hideClavierVirtuel();
    }
  }

  private showClavierVirtuel(): void {
    // Init if virtual keyboard doesn't exist
    if (!AngularVirtualKeyboardDirective.clavierVirtuelRef) this.init();

    // Set language depending on directive on target input
    AngularVirtualKeyboardDirective.clavierVirtuelRef!.instance.language = this.lang;
    AngularVirtualKeyboardDirective.clavierVirtuelRef!.instance.focusedInputElement =
      this.inputElementRef.nativeElement;
    AngularVirtualKeyboardDirective.clavierVirtuelRef!.instance.show();
  }

  private hideClavierVirtuel(): void {
    if (AngularVirtualKeyboardDirective.clavierVirtuelRef) {
      AngularVirtualKeyboardDirective.clavierVirtuelRef.instance.hide();
    }
  }

  private init(): void {
    if (!AngularVirtualKeyboardDirective.clavierVirtuelRef) {
      // this is a div outside the selected input's DOM Tree to avoid messing local styles
      AngularVirtualKeyboardDirective.hostRef = document.createElement('div');
      document.body.appendChild(AngularVirtualKeyboardDirective.hostRef);

      AngularVirtualKeyboardDirective.clavierVirtuelRef = createComponent(
        AngularVirtualKeyboardComponent,
        {
          hostElement: AngularVirtualKeyboardDirective.hostRef,
          environmentInjector: this.app.injector,
        }
      );

      this.app.attachView(AngularVirtualKeyboardDirective.clavierVirtuelRef.hostView);

      AngularVirtualKeyboardDirective.clavierVirtuelRef.instance.blur.subscribe(
        (event: FocusEvent) => {
          if (event.relatedTarget != this.inputElementRef.nativeElement)
            this.hideClavierVirtuel();
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (
      AngularVirtualKeyboardDirective.clavierVirtuelRef &&
      AngularVirtualKeyboardDirective.clavierVirtuelRef.instance.focusedInputElement ==
        this.inputElementRef.nativeElement
    ) {
      AngularVirtualKeyboardDirective.clavierVirtuelRef.destroy();
      AngularVirtualKeyboardDirective.clavierVirtuelRef = null;
      AngularVirtualKeyboardDirective.hostRef?.remove();
    }
  }
}
