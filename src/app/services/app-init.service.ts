import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as BasketActions from '../actions/basket.actions';
import { BasketService } from 'src/app/services/basket.service';
import { Product } from '../models/product';
import * as _ from 'lodash';

interface BasketState {
  basketItems: Product[];
}

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  constructor(private basketService: BasketService, private store: Store<BasketState>) { }

  Init() {
    return new Promise<void>(resolve => {
      if (!localStorage.getItem('token'))
        return resolve(); //todo naviagate
      this.basketService.GetBasket()
        .subscribe((resp: any) => {
          if (!resp) return;
          const basketResult =
            _(resp.content)
              .groupBy('_id')
              .map(items => (items[0].quantity = items.length, items[0]))
              .value();
              
          basketResult.forEach(item => {
            this.store.dispatch(new BasketActions.InitBasket(item));
          });
        });
      resolve();
    });
  }
}
