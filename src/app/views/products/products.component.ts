import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/product';
import { environment } from 'src/environments/environment.prod';
import { Store } from '@ngrx/store';
import { BasketState } from 'src/app/states/basket.state';

@Component({
  selector: 'bak-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {

  products: Product[];

  constructor(
    private productService: ProductService,
    private router: ActivatedRoute,
    private store: Store<BasketState>
  ) { }

  ngOnInit() {
    this.router.params.subscribe(params => {
      this.productService.GetProducts(params.categoryId)
        .subscribe(resp => {
          this.products = resp;
          this.products.forEach(p => {
            p.image = environment.imageEndPoint + '/product/' + p._id + '.jpg';
            p.quantity = 0;
          });

          this.store.select('basket')
            .subscribe(basket => {
              if (basket && basket.products.length) {
                basket.products.forEach(b => {
                  this.products.forEach(p => {
                    if (b._id === p._id)
                      p.quantity = b.quantity;
                  });
                });
              }
            });
        });
    });
  }
}
