import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { map, switchMap } from 'rxjs/operators';
import { Store, createFeatureSelector } from '@ngrx/store';
import { ROUTER_NAVIGATED, RouterReducerState } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';
import { setRouteParams } from '../actions/actions';

export const getRouterState = createFeatureSelector<RouterReducerState>('router');

export const {
  selectCurrentRoute
} = fromRouter.getSelectors(getRouterState);

@Injectable()
export class RouterEffects {

  setCurrentRouteParams = createEffect(() => this.actions$.pipe(
    ofType(ROUTER_NAVIGATED),
    switchMap(() => this.store.select(selectCurrentRoute as any)),
    map((params: any) => setRouteParams(params)),
  ), { dispatch: true });
  constructor(
    private actions$: Actions,
    private store: Store
  ) { }
}
