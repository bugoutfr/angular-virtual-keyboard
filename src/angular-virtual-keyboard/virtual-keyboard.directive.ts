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
import { VirtualKeyboardComponent } from './virtual-keyboard.component';

@Directive({
  selector: '[virtualKeyboard]',
})
export class VirtualKeyboardDirective implements OnInit, OnDestroy {
  @Input() lang: string = 'en';

  private static clavierVirtuelRef: ComponentRef<VirtualKeyboardComponent> | null =
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
      VirtualKeyboardDirective.clavierVirtuelRef &&
      VirtualKeyboardDirective.clavierVirtuelRef.location.nativeElement.contains(
        event.relatedTarget
      );

    // Si l'élément cible n'est pas un enfant du clavier virtuel, alors on cache le clavier
    if (!isChildOfClavierVirtuel) {
      this.hideClavierVirtuel();
    }
  }

  private showClavierVirtuel(): void {
    // Init if virtual keyboard doesn't exist
    if (!VirtualKeyboardDirective.clavierVirtuelRef) this.init();

    // Set language depending on directive on target input
    VirtualKeyboardDirective.clavierVirtuelRef!.instance.language = this.lang;
    VirtualKeyboardDirective.clavierVirtuelRef!.instance.focusedInputElement =
      this.inputElementRef.nativeElement;
    VirtualKeyboardDirective.clavierVirtuelRef!.instance.show();
  }

  private hideClavierVirtuel(): void {
    if (VirtualKeyboardDirective.clavierVirtuelRef) {
      VirtualKeyboardDirective.clavierVirtuelRef.instance.hide();
    }
  }

  private init(): void {
    if (!VirtualKeyboardDirective.clavierVirtuelRef) {
      // this is a div outside the selected input's DOM Tree to avoid messing local styles
      VirtualKeyboardDirective.hostRef = document.createElement('div');
      document.body.appendChild(VirtualKeyboardDirective.hostRef);

      VirtualKeyboardDirective.clavierVirtuelRef = createComponent(
        VirtualKeyboardComponent,
        {
          hostElement: VirtualKeyboardDirective.hostRef,
          environmentInjector: this.app.injector,
        }
      );

      this.app.attachView(VirtualKeyboardDirective.clavierVirtuelRef.hostView);

      VirtualKeyboardDirective.clavierVirtuelRef.instance.blur.subscribe(
        (event: FocusEvent) => {
          if (event.relatedTarget != this.inputElementRef.nativeElement)
            this.hideClavierVirtuel();
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (
      VirtualKeyboardDirective.clavierVirtuelRef &&
      VirtualKeyboardDirective.clavierVirtuelRef.instance.focusedInputElement ==
        this.inputElementRef.nativeElement
    ) {
      VirtualKeyboardDirective.clavierVirtuelRef.destroy();
      VirtualKeyboardDirective.clavierVirtuelRef = null;
      VirtualKeyboardDirective.hostRef?.remove();
    }
  }
}
