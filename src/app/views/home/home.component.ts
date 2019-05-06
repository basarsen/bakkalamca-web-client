import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Category } from 'src/app/models/category';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'bak-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  categories: Category[];

  constructor(private categoryService: ProductService) { }

  ngOnInit() {
    this.categoryService.GetCategories()
      .subscribe(resp => {
        this.categories = resp;
        this.categories.forEach(c => {
          c.image = environment.imageEndPoint + '/category/' + c._id + '.jpg';
        });
      });
  }

}
