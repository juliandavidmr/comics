import { State, Action, Selector, StateContext } from '@ngxs/store';
import { GenerateComicAction } from './comic.actions';
import { ComicModel } from './comic.model';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface ComicStateModel {
  loading: boolean;
  currentComic: ComicModel;
}

@State<ComicStateModel>({
  name: 'comic',
  defaults: {
    loading: false,
    currentComic: void 0
  }
})
@Injectable()
export class ComicState {

  constructor(private readonly http: HttpClient) {
  }

  @Selector()
  public static getCurrentComic(state: ComicStateModel): ComicModel {
    return { ...state.currentComic };
  }

  @Selector()
  public static getComicLoading(state: ComicStateModel): boolean {
    return state.loading;
  }

  @Action(GenerateComicAction)
  public generateComic(ctx: StateContext<ComicStateModel>): Observable<ComicModel> {
    const req = (index: number = +(Math.random() * 2000 + 1).toFixed(0)) =>
      this.http.get<ComicModel>(`https://xkcd.com/${ index }/info.0.json`);

    ctx.patchState({ loading: true });

    return req()
      .pipe(delay(800))
      .pipe(map(response => {
        ctx.patchState({
          currentComic: response,
          loading: false
        });

        return response;
      }, error => {
        alert(`Error loading comic`);
        console.error(error);
        ctx.patchState({ loading: false });
      }));
  }
}
