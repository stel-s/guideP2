// // counter.ts
// import { Action } from '@ngrx/store';
//
// export const INCREMENT = 'INCREMENT';
// export const DECREMENT = 'DECREMENT';
// export const RESET = 'RESET';
//
// export function counterReducer(state: number = 0, action: Action) {
//     console.log(action)
//     switch (action.type) {
//         case INCREMENT:
//             return state + 1;
//
//         case DECREMENT:
//             return state - 1;
//
//         case RESET:
//             return 0;
//
//         default:
//             return state;
//     }
// }
//
// export function visibilityFilter ( state = 'SHOW_ALL', action ) {
//     switch( action.type ) {
//         case 'SET_VISIBILITY_FILTER':
//             return action.payload;
//         default:
//             return state;
//     }
// }
//
// export const reducers = {
//     counterReducer,
//     visibilityFilter,
//
// }
//
