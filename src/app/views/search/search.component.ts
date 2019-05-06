import { Component } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment';
import { Store } from '@ngrx/store';
import { BasketState } from 'src/app/states/basket.state';

@Component({
  selector: 'bak-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {

  products: Product[];
  constructor(
    private productService: ProductService,
    private store: Store<BasketState>
    ) { }

  Search(searchParam: HTMLInputElement) {
    if (searchParam.value.length > 1) {
      this.productService.Search(searchParam.value)
        .subscribe(resp => {
          this.products = resp;
          this.products.forEach(p => {
            p.image = environment.imageEndPoint + '/product/' + p._id + '.jpg';
          });

          this.store.select('basket')
            .subscribe(basket => {
              if (basket.products.length) {
                basket.products.forEach(b => {
                  this.products.forEach(p => {
                    if (b._id === p._id)
                      p.quantity = b.quantity;
                  });
                });
              }
            });
        });
    }
    else this.products = [];

  }

}
