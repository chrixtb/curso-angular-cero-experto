import { ScrollStateService } from './../../../shared/services/scroll-state.service';
import { GifService } from './../../services/gifs.service';
import { AfterViewInit, Component, ElementRef, inject, signal, viewChild } from '@angular/core';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
})
export default class TrendingPageComponent implements AfterViewInit{


    gifService = inject(GifService);  
    scrollStateService = inject(ScrollStateService);

    scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

    ngAfterViewInit(): void {
        const scrollDiv = this.scrollDivRef()?.nativeElement;
        if( !scrollDiv) return; 

        scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
    }

    onScroll(event: Event) {
        const scrollDiv = this.scrollDivRef()?.nativeElement;
        if( !scrollDiv) return; 

        const scrollTop = scrollDiv.scrollTop;
        const clientHeight = scrollDiv.clientHeight;
        const scrollHeight = scrollDiv.scrollHeight;

        //console.log({ scrollTata: scrollTop + clientHeight, scrollHeight })
        
        const isAtBottom = scrollTop +  clientHeight >= scrollHeight;
        this.scrollStateService.trendingScrollState.set(scrollTop);
        
        console.log({isAtBottom});
 
        if(isAtBottom){
            this.gifService.loadTrendingGifs()
        }

    } 
}
