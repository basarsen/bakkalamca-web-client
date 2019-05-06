import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { BasketState } from 'src/app/states/basket.state';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'bak-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrls: ['./bottom-nav.component.scss'],
  providers: [HeaderComponent]
})
export class BottomNavComponent {
  basket: BasketState;
  @Input('header') header;
  
  constructor(
    private store: Store<BasketState>,
    private headerComponent: HeaderComponent
  ) {
    this.store.select('basket')
      .subscribe(basket => this.basket = basket);
  }

  ShowModal() {
    this.header.showModal = true;
  }
}
