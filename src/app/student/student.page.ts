import { Component, OnInit} from '@angular/core';
import { NavController, ToastController} from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Item } from '../item';
import {ActivatedRoute, NavigationExtras} from '@angular/router';
import 'firebase/firestore';
import { Router} from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
@Component({
  selector: 'app-student',
  templateUrl: './student.page.html',
  styleUrls: ['./student.page.scss'],
})
export class StudentPage  implements OnInit{

  datas: Item[];
  liste : any;
  item : any;
  donnees: Item[];

  constructor(private fs: AngularFirestore, private nav : NavController,
     private routeactive: ActivatedRoute, private router: Router,private toaster: ToastController,
     private afauth : AngularFireAuth ) { 

      this.routeactive.queryParams.subscribe(params => {
        console.log('params:', params);
        if(params && params.special){
          this.item = JSON.parse(params.special);
        }
      });
      
      
  }
  ngOnInit() {

    this.fs.collection('service').snapshotChanges().subscribe(services=>{
      this.donnees = services.map(service=>{
       return{
         id: service.payload.doc.id,
         ...service.payload.doc.data
       } as unknown as Item;
  
      });
    });
  
  }
  manger(){
    let navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.item)
      }
    }
    
    this.router.navigate( ['restos'], navigationExtras);
  }
   deconnexion(){
     
    this.afauth.auth.signOut().then(()=>{
      this.nav.navigateBack('/connexion');
    });
  }
  actualiser(){
  
    for(let services of this.donnees){
      if(services.email == this.item.email)
         {
           this.liste = services;
         }
    }
    let navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.liste)
      }
   }

   this.toaster.create({
    message: "actualisé !!" ,
    duration: 3000,
    color: 'success',
    position : 'top'
  }).then((toast)=>{
    toast.present();
  });
  
    this.router.navigate( ['student'], navigationExtras);
  }
  solde(){
    this.toaster.create({
      message: this.item.compte ,
      duration: 3000,
      color: 'light',
      position : 'top'
    }).then((toast)=>{
      toast.present();
    });
  }

/*manger(){
  this.router.navigateByUrl('/tranferer');
}*/
consulter(){
  let navigationExtras : NavigationExtras = {
    queryParams: {
      special: JSON.stringify(this.item)
    }
  }
  
  this.router.navigate( ['consulter'], navigationExtras);
}
transferer(){
  
  let navigationExtras : NavigationExtras = {
    queryParams: {
      special: JSON.stringify(this.item)
    }
  }
  
  this.router.navigate( ['transferer'], navigationExtras);
  
}


}
