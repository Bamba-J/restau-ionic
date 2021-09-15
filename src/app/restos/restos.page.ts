import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-restos',
  templateUrl: './restos.page.html',
  styleUrls: ['./restos.page.scss'],
})
export class RestosPage implements OnInit {

  item : any;
  constructor(private routeactive: ActivatedRoute, private router: Router, private nav: NavController) { 

    this.routeactive.queryParams.subscribe(params => {
      console.log('params:', params);
        if(params && params.special){
            this.item = JSON.parse(params.special);
        }
  });

}

  ngOnInit() {
  }

  goback(){
  
    this.nav.navigateBack("/student");
   }

  manger(){
    let navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.item)
      }
    }
    this.router.navigate( ['manger'], navigationExtras);
  }
  manger1(){
    let navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.item)
      }
    }
    this.router.navigate( ['manger1'], navigationExtras);

  }
  manger2(){
    let navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.item)
      }
    }
    this.router.navigate( ['manger2'], navigationExtras);

  }
}
