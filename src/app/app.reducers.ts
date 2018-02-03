// import { createSelector } from 'reselect';
// import { ActionReducer } from '@ngrx/store';
// import {  routerReducer } from '@ngrx/router-store';
// import { environment } from '../environments/environment';
// import { compose } from '@ngrx/core/compose';
// import { combineReducers } from '@ngrx/store';
// // import { storeFreeze } from 'ngrx-store-freeze';
//
// import * as shared from './shared/shared.reducers'
//
// import { counterReducer }from './state-management/main-reducer'
//
// import {RouterState} from "@angular/router";
//
// export interface State {
//     router: RouterState;
//     shared: shared.State;
// }
//
// const reducers = {
//     router: routerReducer,
//     shared: shared.reducer,
//     counterReducer: counterReducer
// };
//
// // const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
// const productionReducer: ActionReducer<State> = combineReducers(reducers);
//
// export function reducer(state: any, action: any) {
//     if (environment.production) {
//         return productionReducer(state, action);
//     } else {
//         return productionReducer(state, action);
//     }
// }
//
// /**
//  * Shared Reducers
//  */
// export const getSharedState = (state: State) => state.shared;
// export const getShowSidenav = createSelector(getSharedState, shared.getShowSidenav);
