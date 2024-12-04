import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  standalone: false,

  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string
  @Input()
  public alt: string = ''
  @Input()
  public height = '35'
  @Input()
  public width = '35'

  public hasLoaded: boolean = false

  onLoad() {
    this.hasLoaded = true
    /* setTimeout(() => {
    }, 1000) */
  }

  ngOnInit(): void {
    if (!this.url) throw new Error('Url property is required.');
  }


}
