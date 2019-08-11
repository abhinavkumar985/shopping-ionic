import { Component } from '@angular/core';
import { NavController , ModalController} from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailsPage } from '../product-details/product-details';
import { OpenFilterPage } from '../open-filter/open-filter';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  allProducts = <any>[];
  femaleSelected: boolean = true;
  maleSelected: boolean = true;
  constructor(public navCtrl: NavController, private service :ProductProvider, private modalCntrl: ModalController) {

  }
  ionViewDidLoad(){
    this.service.getProducts().subscribe(res=>{
      console.table(res);
      this.allProducts = res;
    },err=>{
      console.error(err);
    });
  }
  gotoProductDetails(p){
    this.navCtrl.push(ProductDetailsPage,{productDetails:p});
  }
  openFilterModal(){
    let filterState = {femaleSelected: this.femaleSelected, maleSelected: this.maleSelected};
    let filterModal = this.modalCntrl.create(OpenFilterPage, filterState);
    filterModal.onDidDismiss((filter)=>{
      this.femaleSelected = filter.femaleSelected;
      this.maleSelected = filter.maleSelected;
      this.service.getProducts().subscribe((allProducts:any)=>{
        if(filter.maleSelected && filter.femaleSelected){
          this.allProducts = allProducts;
          return;
        }else if(!filter.maleSelected && !filter.femaleSelected){
          this.allProducts = [];
          return;
        }else if(filter.femaleSelected && !filter.maleSelected){
          // female product and unisex  
          this.allProducts = allProducts.filter((p)=>{
            return p.gender !=='male';
          });
        }else if(!filter.femaleSelected && filter.maleSelected){
          // male product and unisex
          this.allProducts = allProducts.filter((p)=>{
            return p.gender !=='female';
          })
        }
      },err=>{
        console.error(err);
      });
    });
    filterModal.present();
  }
}
