import { Component, signal } from '@angular/core';

import { ToggleCasePipe } from '../../pipes/toggle-case.pipe';
import { heroes } from '../../data/heroes.data';
import { CanflyPipe } from '../../pipes/canfly.pipe';

@Component({
  selector: 'app-custom-page',
  imports: [ToggleCasePipe, CanflyPipe],
  templateUrl: './custom-page.component.html',
})
export default class CustomPageComponent {

    name = signal('Fernando Herrera');
    upperCase = signal(true);

    heroes = signal(heroes);

    changeToggle() {
        this.upperCase.update(value => !value);
    }

    //---------------------


}
