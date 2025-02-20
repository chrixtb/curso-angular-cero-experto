import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Gif, SearchResponse } from "../interfaces/gifs.interfaces";

@Injectable({providedIn: 'root'})
export class GifsService {

    private apiKey: string = "y85ja9mwvEU2HOMxHv3QnwiT2aKaoXCe";
    private serviceUrl: string = "https://api.giphy.com/v1/gifs";
    
    private _tagsHistory: string[] = [];

    public gifList: Gif[] = [];

    constructor(private http: HttpClient){
        this.loadLocalStorage()
     }

    get tagsHistory(){
        // Operador spread para devolver copia. Los arrays se pasan por referencia.
        return [...this._tagsHistory];
    }

    private organizeHistory(tag: string){
        tag = tag.toLowerCase();

        if(this._tagsHistory.includes(tag) ){
            this._tagsHistory= this._tagsHistory.filter( oldTag => oldTag !== tag);
        }

        this._tagsHistory.unshift(tag);
        this._tagsHistory = this._tagsHistory.splice(0,10);

        this.saveLocalStorage()
    }

    private saveLocalStorage(): void {
        localStorage.setItem('history', JSON.stringify(this._tagsHistory));
    }

    private loadLocalStorage(): void {
        const temporal = localStorage.getItem('history');
        if(!temporal) return;
            
        this._tagsHistory = JSON.parse(temporal);

        if(this._tagsHistory.length > 0){
            this.searchTag(this._tagsHistory[0])
        }
    }

    searchTag(tag: string): void {
        if(tag.length === 0) return;
        this.organizeHistory(tag)

        const params = new HttpParams()
            .set('api_key', this.apiKey)
            .set('limit', 10)
            .set('q', tag);

        this.http.get<SearchResponse>(`${this.serviceUrl}/search?`, {params})
            .subscribe(resp => {
                this.gifList = resp.data;
            });
    }


}