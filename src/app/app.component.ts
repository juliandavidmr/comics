import { Component } from '@angular/core';
import { ComicService } from '../store/comic';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentComic$ = this.comicService.getCurrentComic();
  title = 'comicBooks';

  constructor(private readonly comicService: ComicService) {
    this.nextComic();
  }

  nextComic(): void {
    this.comicService.generateComic();
  }
}
