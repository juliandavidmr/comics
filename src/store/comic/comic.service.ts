import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { GenerateComicAction } from './comic.actions';
import { Observable } from 'rxjs';
import { ComicModel } from './comic.model';
import { ComicState } from './comic.state';

@Injectable({
  providedIn: 'root'
})
export class ComicService {

  constructor(private readonly store: Store) { }

  getCurrentComic(): Observable<ComicModel> {
    return this.store.select(ComicState.getCurrentComic);
  }

  getComicLoading(): Observable<boolean> {
    return this.store.select(ComicState.getComicLoading);
  }

  generateComic(): Observable<void> {
    return this.store.dispatch(new GenerateComicAction());
  }
}
