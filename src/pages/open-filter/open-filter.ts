import { Component } from '@angular/core';
import { NavController, NavParams ,ViewController} from 'ionic-angular';

/**
 * Generated class for the OpenFilterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-open-filter',
  templateUrl: 'open-filter.html',
})
export class OpenFilterPage {
  public maleSelected: boolean = true;
  public femaleSelected: boolean = true;
  constructor(public navCtrl: NavController, public navParams: NavParams, private viewCntrl:ViewController) {
    this.femaleSelected = this.navParams.get('femaleSelected');
    this.maleSelected = this.navParams.get('maleSelected');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenFilterPage');
  }
  close(){
    let filterState = {maleSelected: this.maleSelected, femaleSelected:this.femaleSelected}
    this.viewCntrl.dismiss(filterState);
  }
}
