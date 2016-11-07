import { Directive, HostListener, Input, OnInit, OnDestroy } from '@angular/core';

@Directive({
  selector: '[offClick]'
})

export class OffClickDirective implements OnInit, OnDestroy {
  /* tslint:disable */
  @Input('offClick') public offClickHandler: any;
  /* tslint:enable */
  @HostListener('click', ['$event']) public onClick($event: MouseEvent): void {
    //$event.stopPropagation();
	
	// Permite propagar o evento de clique para fechar outras eventuais combos que estejam abertas.
	// Para não fechar a combo atual, remove temporariamente o handler responsável por fechar a combo atual a partir de um evento de clique.
	document.removeEventListener('click', this.offClickHandler);
	setTimeout(() => {
		document.addEventListener('click', this.offClickHandler);
	}, 0); 
  }

  public ngOnInit(): any {
    setTimeout(() => {document.addEventListener('click', this.offClickHandler);}, 0);
  }

  public ngOnDestroy(): any {
    document.removeEventListener('click', this.offClickHandler);
  }
}
