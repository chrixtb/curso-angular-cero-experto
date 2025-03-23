
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
    trendingGifsLoading = signal(false)
    private trendingPage = signal(0);

    trendingGifGroup = computed<Gif[][]>( () => {
        const groups = [];

        for (let i = 0; i < this.trendingGifs().length; i++) {
            groups.push(this.trendingGifs().slice(i, i+3));
        }

        return groups;
    })
    
    constructor() {
        this.loadTrendingGifs();
    }

    saveGifsToLocalStorage = effect( () => {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(this.searchHistory()));localStorage.setItem('history', JSON.stringify(this.searchHistory()));
    });
   
    loadTrendingGifs(){

        if(this.trendingGifsLoading()) return;

        this.trendingGifsLoading.set(true);

        this.http.get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
            params: {
                api_key: environment.giphyApiKey,
                limit: 20,
                offset: this.trendingPage() * 20,
            }
        }).subscribe( (resp) => {
            const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
            this.trendingGifs.update( currentGifs => [...currentGifs, ...gifs]);
            this.trendingGifsLoading.set(false);
            this.trendingPage.update( page => page + 1);
        })
    }

    searchGifs(query: string) : Observable<Gif[]> {

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
   
    private saveLocalStorage(): void {
        localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(this.searchHistory()));
    }

    private loadFromLocalStorage(): Record<string,Gif[]> {
        const gifsFromLocalStorage = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
        if(!gifsFromLocalStorage) return {};
        
        const gifs = JSON.parse(gifsFromLocalStorage)

        return gifs;
    }

}
