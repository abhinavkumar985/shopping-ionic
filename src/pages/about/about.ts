import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  allProducts = [];

  constructor(public navCtrl: NavController, private service: ProductProvider) {

  }
  ionViewDidLoad(){
    this.service.getProducts().subscribe((res:[any])=>{
      this.allProducts = res.filter(product => product.bestseller);
    },err=>{
      console.error(err);
    });
  }
  gotoProductDetails(p){
    this.navCtrl.push(ProductDetailsPage,{productDetails:p});
  }
}
