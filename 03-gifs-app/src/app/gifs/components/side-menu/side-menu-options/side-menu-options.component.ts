import { GifService } from './../../../services/gifs.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  icon: string;
  label: string;
  sublabel: string;
  route:string;
}

@Component({
  selector: 'gifs-side-menu-options',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuOptionsComponent { 

    gifService = inject(GifService);
    
    menuOptions:MenuOption[] = [
        {
            icon: 'fa-solid fa-chart-line',
            label: 'Trending',
            sublabel: 'Gifs Populares',
            route: '/dashboard/trending',
        },
        {
            icon: 'fa-solid fa-magnifying-glass',
            label: 'Buscador',
            sublabel: 'Buscar gifs',
            route: '/dashboard/search',
        }
    ]

  
}
