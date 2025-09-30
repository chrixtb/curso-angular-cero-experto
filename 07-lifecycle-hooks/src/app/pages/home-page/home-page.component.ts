import { afterNextRender, afterRender, Component, effect, signal } from '@angular/core';
import { TitleComponent } from '../../components/Title/Title.component';

const log = ( ...messages: string[]) => {
  console.log(
    `${messages[0]} %c${messages.slice(1).join(', ')} `,
    'color: #bada55'
  );
};

@Component({
  selector: 'app-home-page',
  imports: [TitleComponent],
  templateUrl: './home-page.component.html',
})
export class HomePageComponent { 

  traditionalProperty = 'Christian';
  signalProperty = signal('Christian');


  constructor() {
    log('Constructor llamado');

    // setTimeout(() => {
    //   this.traditionalProperty = 'Nicolas';
    //   this.signalProperty.set('Nicolas');
    //   console.log('Cambio tradicionalProperty');
    // }, 1500);
  }

  changeTraditional() {
    this.traditionalProperty =  'Ana';
  }
  
  changeSignal() {
    this.signalProperty.set('Ana');
  }

  basicEffect = effect(( onCleanUp) => {
    log('Basic effect', 'Disparar efectos secundarios');

    onCleanUp(() => {
      log('Basic effect cleanup', 'Limpieza de efectos secundarios');
    });
  });

  ngOnInit() {
    log('ngOnInit', "Runs once after Angular has initialized all the component's inputs.");
  }	
  ngOnChanges() {
    log('ngOnChanges', "Runs every time the component's inputs have changed.");
  }	
  ngDoCheck() {
    log('ngDoCheck', "Runs every time this component is checked for changes.");
  }
  ngAfterContentInit() {
    log('ngAfterContentInit', "Runs once after the component's content has been initialized.");
  }
  ngAfterContentChecked() {
    log('ngAfterContentChecked', "Runs every time this component content has been checked for changes.");
  }
  ngAfterViewInit	() {
    log('ngAfterViewInit', "Runs once after the component's view has been initialized.");
  }
  ngAfterViewChecked() {
    log('ngAfterViewChecked', "Runs every time the component's view has been checked for changes.");
  }

  afterNextRenderEffect = afterNextRender(() => {
    log('afterNextRender', "Runs once the next time that all components have been rendered to the DOM.");
  });

  afeterRender = afterRender(() => {
    log('afterRender', "Runs every time all components have been rendered to the DOM.");
  });
  
  ngOnDestroy() {
    log('ngOnDestroy', "Runs once before the component is destroyed.");
  }
}
