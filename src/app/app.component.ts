import { Component } from '@angular/core';
import { ComicService } from '../store/comic';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  currentComic$ = this.comicService.getCurrentComic();
  loading$ = this.comicService.getComicLoading();
  virtualStars = 0;
  title = 'comicBooks';

  constructor(private readonly comicService: ComicService) {
    this.initialize();
  }

  private initialize(): void {
    this.nextComic();
  }

  nextComic(): void {
    this.comicService.generateComic()
      .pipe(first())
      .subscribe(() => {
        this.virtualStars = +(Math.random() * 4).toFixed(0) + 1;
      });
  }
}
