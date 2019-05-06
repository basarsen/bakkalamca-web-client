import { Component, Input } from '@angular/core';
import { Product } from 'src/app/models/product';
import { Basket } from 'src/app/models/basket';
import { BasketService } from 'src/app/services/basket.service';
import { Store } from '@ngrx/store';
import { BasketState } from 'src/app/states/basket.state';
import * as BasketActions from '../../actions/basket.actions';

@Component({
  selector: 'bak-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent {
  selectedProduct: Product;
  @Input('products') products: Product[];

  constructor(
    private basketService: BasketService,
    private store: Store<BasketState>
  ) { }

  BasketAction(insert: boolean, product: Product) {
    const req: Basket = {
      productId: product._id,
      remove: !insert
    }
    
    this.basketService.BasketAction(req)
      .subscribe(resp => {
        if (insert)
          this.store.dispatch(new BasketActions.AddToBasket(product));
        else
          this.store.dispatch(new BasketActions.RemoveFromBasket(product));

        this.store.select('basket')
          .subscribe();
      })
  }

}
