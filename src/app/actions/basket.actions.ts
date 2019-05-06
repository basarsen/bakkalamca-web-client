import { Action } from '@ngrx/store';
import { Product } from '../models/product';

export const ADD_TO_BASKET = '[Basket] Add';
export const REMOVE_FROM_BASKET = '[Basket] Remove';
export const INIT_BASKET = '[Basket] Init';
export const RESET_BASKET = '[Basket] Reset';

export class AddToBasket implements Action {
    readonly type = ADD_TO_BASKET;
    constructor(public payload: Product) {}
}

export class RemoveFromBasket implements Action {
    readonly type = REMOVE_FROM_BASKET;
    constructor(public payload: Product) {}
}

export class InitBasket implements Action {
    readonly type = INIT_BASKET;
    constructor(public payload: Product) {}
}

export class ResetBasket implements Action {
    readonly type = RESET_BASKET;
    constructor() {}
}

export type All = AddToBasket | RemoveFromBasket | InitBasket | ResetBasket;