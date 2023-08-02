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
import { ClavierVirtuelComponent } from './clavier-virtuel.component';

@Directive({
  selector: '[appClavierVirtuel]',
})
export class ClavierVirtuelDirective implements OnInit, OnDestroy {
  @Input() lang: string = 'en';

  private static clavierVirtuelRef: ComponentRef<ClavierVirtuelComponent> | null =
    null;
  private hostRef: HTMLElement | undefined;

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
      ClavierVirtuelDirective.clavierVirtuelRef &&
      ClavierVirtuelDirective.clavierVirtuelRef.location.nativeElement.contains(
        event.relatedTarget
      );

    // Si l'élément cible n'est pas un enfant du clavier virtuel, alors on cache le clavier
    if (!isChildOfClavierVirtuel) {
      this.hideClavierVirtuel();
    }
  }

  private showClavierVirtuel(): void {
    // Init if clavier doesn't exist
    if (!ClavierVirtuelDirective.clavierVirtuelRef) this.init();

    // Set language depending on directive on target input
    ClavierVirtuelDirective.clavierVirtuelRef!.instance.language = this.lang;
    ClavierVirtuelDirective.clavierVirtuelRef!.instance.focusedInputElement =
      this.inputElementRef.nativeElement;
    ClavierVirtuelDirective.clavierVirtuelRef!.instance.show();
  }

  private hideClavierVirtuel(): void {
    if (ClavierVirtuelDirective.clavierVirtuelRef) {
      ClavierVirtuelDirective.clavierVirtuelRef.instance.hide();
    }
  }

  private init(): void {
    if (!ClavierVirtuelDirective.clavierVirtuelRef) {
      this.hostRef = document.createElement('div');
      document.body.appendChild(this.hostRef);

      ClavierVirtuelDirective.clavierVirtuelRef = createComponent(
        ClavierVirtuelComponent,
        {
          hostElement: this.hostRef,
          environmentInjector: this.app.injector,
        }
      );

      this.app.attachView(ClavierVirtuelDirective.clavierVirtuelRef.hostView);

      ClavierVirtuelDirective.clavierVirtuelRef.instance.blur.subscribe(
        (event: FocusEvent) => {
          if (event.relatedTarget != this.inputElementRef.nativeElement)
            this.hideClavierVirtuel();
        }
      );
    }
  }

  ngOnDestroy(): void {
    if (
      ClavierVirtuelDirective.clavierVirtuelRef &&
      ClavierVirtuelDirective.clavierVirtuelRef.instance.focusedInputElement ==
        this.inputElementRef.nativeElement
    ) {
      ClavierVirtuelDirective.clavierVirtuelRef.destroy();
      ClavierVirtuelDirective.clavierVirtuelRef = null;
    }
  }
}
