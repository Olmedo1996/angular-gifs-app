import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  standalone: false,

  template:`
    <h4>Buscar:</h4>
    <input
      type="text"
      placeholder="Buscar gifs..."
      class="form-control"
      (keyup.enter)="searchTag()"
      #txtTagInput
    />
  `
})
export class SearchBoxComponent {
  constructor(private _gifsService: GifsService){}

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>;

  searchTag() {
    const newTag = this.tagInput.nativeElement.value

    this._gifsService.searchTag(newTag);

    this.tagInput.nativeElement.value = '';
  }
}
