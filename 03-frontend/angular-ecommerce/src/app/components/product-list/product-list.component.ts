import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list-grid.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

   products: Product[] = [];
   currentCategoryId: number | undefined;
   searchMode: boolean = false;

  constructor(private productListService: ProductService , private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.listProducts();
    });
  }

   listProducts() {
     this.searchMode = this.route.snapshot.paramMap.has('keyword');
        if(this.searchMode){
          this.handleSearchProducts()
        }else{
          this.handleListProducts();
        }


   }
  handleSearchProducts() {
   const theKeyword : string| null = this.route.snapshot.paramMap.get('keyword');
   //now search for the product using keyword
   this.productListService.searchProducts(theKeyword).subscribe(
     data=>{
       this.products=data;
     }
   );
  }

  handleListProducts(){
         //check if "id" parameter is available
    const hasCategoryId : boolean = this.route.snapshot.paramMap.has('id');
    const gotCategory: String | null = this.route.snapshot.paramMap.get('id');
    if(hasCategoryId && gotCategory){
       //get the "id" param string convert string to a number using the "+" symbol
       this.currentCategoryId = +gotCategory;

    }else{
      //not category id available ...default to category id 1
      this.currentCategoryId=1;

    }
   //now get the products for the given category id
    this.productListService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    )

  }
}
