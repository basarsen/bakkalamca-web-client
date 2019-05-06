import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { BasketState } from 'src/app/states/basket.state';
import { Product } from 'src/app/models/product';
import { Basket } from 'src/app/models/basket';
import { BasketService } from 'src/app/services/basket.service';
import * as BasketActions from '../../actions/basket.actions';
import { BasketAbstract } from 'src/app/shared/basket.abstract';
import { Router } from '@angular/router';

@Component({
  selector: 'bak-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showModal: boolean = false;
  basket: BasketState;
  constructor(
    private store: Store<BasketState>,
    private basketService: BasketService,
    private router: Router
  ) {
    this.store.select('basket')
      .subscribe(basket => this.basket = basket);
  }

  Total() {
    let total = 0;
    if (!this.basket.products.length) return null;
    this.basket.products.forEach(p => {
      total += p.price * p.quantity;
    });
    return total > 0 ? total : null;
  }

  BasketAction(insert: boolean, product: Product) {
    const req: Basket = {
      productId: product._id,
      remove: !insert
    }
    this.basketService.BasketAction(req)
      .subscribe(resp => {
        if (insert) {
          this.store.dispatch(new BasketActions.AddToBasket(product));
        } else {
          this.store.dispatch(new BasketActions.RemoveFromBasket(product));
          if(this.basket.products.length == 0) 
            this.showModal = false;
        }
      })
  }

  ResetBasket() {
    const c = confirm('Sepeti boşaltmak istediğinize emin misiniz?');
    if(c) {
      this.basketService.ResetBasket()
        .subscribe(resp => {
          this.showModal = false;
          this.store.dispatch(new BasketActions.ResetBasket);
        })
    }
  }

  GoPayment() {
    this.showModal = false;
    this.router.navigate(['payment']);
  }

}
