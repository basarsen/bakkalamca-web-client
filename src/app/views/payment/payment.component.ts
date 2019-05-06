import { Component, OnInit } from '@angular/core';
import { BasketState } from 'src/app/states/basket.state';
import { Store } from '@ngrx/store';
import { OrderService } from 'src/app/services/order.service';
import * as BasketActions from '../../actions/basket.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'bak-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent {
  basket: BasketState;
  constructor(
    private store: Store<BasketState>,
    private orderService: OrderService,
    private router: Router
  ) {
    this.store.select('basket')
      .subscribe(basket => this.basket = basket)
  }

  Total() {
    let gross = {
      total: 0,
      discount: 0
    }

    if (!this.basket || !this.basket.products.length) return null;
    this.basket.products.forEach(p => {
      gross.total += p.price * p.quantity;
      if (p.discount) {
        gross.discount += (p.price - p.discount) * p.quantity
      }
    });
    return gross;
  }

  Purchase() {
    const req = { total: this.Total().total };
    this.orderService.Purchase(req)
      .subscribe(resp => {
        alert('Siparişiniz alındı!');
        this.store.dispatch(new BasketActions.ResetBasket());
        this.router.navigate(['']);
      });
  }

}
