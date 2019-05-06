import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Order } from 'src/app/models/order';
import 'moment/locale/tr';
import { CustomerService } from 'src/app/services/customer.service';
import { Customer } from 'src/app/models/customer';
import * as _ from 'lodash';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'bak-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  me: Customer;
  orders: Order[] = [];
  constructor(
    private customerService: CustomerService,
    private orderSerivce: OrderService,
    private authService: AuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    var arr = [];
    this.customerService.GetCustomer()
      .subscribe(resp => this.me = resp);

    this.orderSerivce.GetOrders()
      .subscribe((resp: any) => {
        this.orders = resp;
        // resp.forEach(r => {
        //   const basketResult =
        //     _(r.content)
        //       .groupBy('_id')
        //       .map(items => (items[0].quantity = items.length, items[0]))
        //       .value();
        //       this.orders.push(basketResult)
        // });
        // console.log(this.orders)
        // const basketResult =
        //   _(resp)
        //     .groupBy('_id')
        //     .map(items => (items[0].quantity = items.length, items[0]))
        //     .value();
      });
  }

  UpdateMe() {
    this.customerService.UpdateCustomer(this.me)
      .subscribe(resp => this.toastr.success('Bilgileriniz güncellendi.'));
  }

  Logout() {
    this.authService.Logout();
  }

}
