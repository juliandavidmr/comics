import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ComicState, ComicStateModel } from './comic.state';
import { GenerateComicAction } from './comic.actions';

describe('Comic store', () => {
  let store: Store;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([ComicState])]
    }).compileComponents();
    store = TestBed.get(Store);
  }));

  it('should create an action and add an item', () => {
    const expected: ComicStateModel = {
      items: ['item-1']
    };
    store.dispatch(new GenerateComicAction('item-1'));
    const actual = store.selectSnapshot(ComicState.getState);
    expect(actual).toEqual(expected);
  });

});
