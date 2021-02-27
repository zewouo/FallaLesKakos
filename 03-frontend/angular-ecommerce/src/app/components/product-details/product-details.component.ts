import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Product } from 'src/app/common/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {


 product: Product | undefined;
 theProductId : number | undefined ;
 available : boolean = false;



  constructor(private productService:ProductService,
          private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(()=>{
      this.handleProductDetail();
    })
  }


handleProductDetail(){

   const rout : ActivatedRoute  = this.route;
   const snap : ActivatedRouteSnapshot = rout.snapshot;
   const getP : string | null = snap.paramMap.get('id');
  //get the "id" param string convert string to a number using the "+" symbol
  if(getP){
    this.theProductId = +getP;
  }else{
    this.theProductId=1;
  }
//now get the products for the given category id
this.productService.getProduct(this.theProductId).subscribe(
  data => {
      this.product = data;

     })

     }
}
