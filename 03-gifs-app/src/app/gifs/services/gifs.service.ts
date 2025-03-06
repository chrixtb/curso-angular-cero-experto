
import { HttpClient} from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@environments/environment';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

    http= inject(HttpClient);
    
    searchHistory = signal<Record<string,Gif[]>>({})
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

    trendingGifs = signal<Gif[]>([])
    trendingGifsLoading = signal(true)
    
    constructor() {
        this.loadTrendingGifs();
    }
   
    loadTrendingGifs(){
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20
            }
        }).subscribe( (resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs);
            console.log(gifs)
            this.trendingGifsLoading.set(false);
        })
    }

    searchGifs(query: string) {
        if(query.length === 0) return;

        //this.organizeHistory(query)

        return this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                q: query,
            }
        }).pipe(
            map( ({data}) => data ),
            map( (items) => GifMapper.mapGiphyItemsToGifArray(items)),
            tap( items => {
                this.searchHistory.update( history => ({
                    ...history,
                    [query.toLocaleLowerCase()]: items,
                }))
            })
        );
    }

   
    // private organizeHistory(tag: string){
    //     tag = tag.toLowerCase();

    //     if(this._tagsHistory.includes(tag) ){
    //         this._tagsHistory= this._tagsHistory.filter( oldTag => oldTag !== tag);
    //     }

    //     this._tagsHistory.unshift(tag);
    //     this._tagsHistory = this._tagsHistory.splice(0,10);

    //     this.saveLocalStorage()
    // }

    // private saveLocalStorage(): void {
    //     localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    // }

    // private loadLocalStorage(): void {
    //     const temporal = localStorage.getItem('history');
    //     if(!temporal) return;
            
    //     this._tagsHistory = JSON.parse(temporal);

    //     if(this._tagsHistory.length > 0){
    //         this.searchTag(this._tagsHistory[0])
    //     }
    // }

    

}
