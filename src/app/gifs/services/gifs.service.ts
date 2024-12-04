import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'Qn9xKYy6ymlMpdmt2xcNFFiLhJ0jukkB';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  public gifList: Gif[] = [];

  private _tagHistory: string[] = [];
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';
  private apikey: string = GIPHY_API_KEY;
  private limit: number = 10;

  constructor(private http: HttpClient) {
    this.loadLocalStorage();
  }

  get tagHistory() {
    return [...this._tagHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLocaleLowerCase();
    if (this._tagHistory.includes(tag)) {
      this._tagHistory = this._tagHistory.filter((oldTag) => oldTag.toLocaleLowerCase() != tag);
    }

    this._tagHistory.unshift(tag);
    this._tagHistory = this._tagHistory.splice(0, 10);
  }

  private saveLocalStorage(): void {
    localStorage.setItem('history', JSON.stringify(this._tagHistory));
  }

  private loadLocalStorage(): void {
    let history = localStorage.getItem('history');
    if (!history) return;
    this._tagHistory = JSON.parse(history);
    if (this._tagHistory.length === 0) return
    this.searchTag(this._tagHistory[0]);
  }

  public searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.apikey)
      .set('q', tag)
      .set('limit', this.limit);

    let apiURL = `${this.serviceUrl}/search`
    this.http.get<SearchResponse>(apiURL, { params }).subscribe(resp => {
      this.gifList = resp.data
    })

    this.saveLocalStorage();
  }
}
