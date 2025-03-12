
import { HttpClient} from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { environment } from '@environments/environment';
import { GifMapper } from '../mapper/gif.mapper';
import { Gif } from '../interfaces/gif.interface';
import { map, Observable, tap } from 'rxjs';

const LOCAL_STORAGE_HISTORY_KEY = 'history';

@Injectable({
  providedIn: 'root'
})
export class GifService {

    http= inject(HttpClient);
    
    searchHistory = signal<Record<string,Gif[]>>(this.loadFromLocalStorage())
    searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

    trendingGifs = signal<Gif[]>([])
    trendingGifsLoading = signal(true)
    
    constructor() {
        this.loadTrendingGifs();
        //this.loadLocalStorage();
    }

    saveGifsToLocalStorage = effect( () => {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(this.searchHistory()));localStorage.setItem('history', JSON.stringify(this.searchHistory()));
    });
   
    loadTrendingGifs(){
        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20
            }
        }).subscribe( (resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.set(gifs);
            //console.log(gifs)
            this.trendingGifsLoading.set(false);
        })
    }

    searchGifs(query: string) : Observable<Gif[]> {
        // if(query.length === 0) return;

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
                this.saveLocalStorage()
            })
        );
    }

    getHistoryGifs(query: string) : Gif[] {
        return this.searchHistory()[query] ?? [];
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

    private saveLocalStorage(): void {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(this.searchHistory()));
    }

    private loadlocalStorage(): void {
        const temporal = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
        if(!temporal) return;
        
        console.log(JSON.parse(temporal))
        this.searchHistory.set(JSON.parse(temporal));
    }

    private loadFromLocalStorage(): Record<string,Gif[]> {
        const gifsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
        if(!gifsFromLocalStorage) return {};
        
        const gifs = JSON.parse(gifsFromLocalStorage)
        console.log(gifs);

        return gifs;
    }

}
