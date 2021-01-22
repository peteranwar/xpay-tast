import { Component, OnInit, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Store } from '../modals/storeModal';
import {StoreService } from '../services/store.service';
 
import { take,takeUntil, map } from 'rxjs/operators';
import { Observable, of, from } from 'rxjs';

@Component({
  selector: 'app-store-details',
  templateUrl: './store-details.component.html',
  styleUrls: ['./store-details.component.scss']
})
export class StoreDetailsComponent implements OnInit{
id: number;
item: Store;
start_opening: number ;
end_opening: number ;

products: Observable<[]> ;
ourProducts: any = [];
productsDom: [] = [];
showAllProducts: boolean = false;


  constructor(private route: ActivatedRoute, private storeService: StoreService) { }

   
   

  ngOnInit(): void {
   this.id = +this.route.snapshot.paramMap.get('id'); //to catch selected id from route
   this.storeService.getStore().subscribe(data =>{
   data.map(item => {
    if(item.id !== this.id) return null;
     this.item = item;

     // convert seconds to hours and minutes
     if(this.item.opening_hours?.start){     
      this.start_opening = new Date(this.item.opening_hours.start  * 1000).toISOString().substr(11, 8)
      this.end_opening = new Date(this.item.opening_hours.end  * 1000).toISOString().substr(11, 8)
    }

    this.products = of(this.item.products); // made products observable and subscribe to them
    this.products
    .subscribe(product=> {
        this.ourProducts = product;   //save all products in ourProducts
         this.productsDom = this.ourProducts.slice(0, 4);   // return the first 4 items
        })
      })

    });
  }

 
  // toggle show more & less func
  showAll() {
    this.showAllProducts = !this.showAllProducts;
       if(this.showAllProducts){
             this.productsDom = this.ourProducts.slice(4);
        }else {
           this.productsDom = this.ourProducts.slice(0, 4);
        }
   };
}
