import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Item } from '../item';
import { ToastOptions } from '@ionic/core';

@Component({
  selector: 'app-consulter',
  templateUrl: './consulter.page.html',
  styleUrls: ['./consulter.page.scss'],
})
export class ConsulterPage implements OnInit {
  
tickets: number;
code : number;
donnees: Item[];
datas: Item[];
item : any;
liste : any;

  constructor(private fs: AngularFirestore, private nav : NavController, private routeactive :ActivatedRoute,
    private afauth: AngularFireAuth, private toaster : ToastController, private router: Router) { 

          this.routeactive.queryParams.subscribe(params => {
          console.log('params:', params);
          if(params && params.special){
             this.item = JSON.parse(params.special);
           }
          });
          //console.log(this.item.id);  
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

goback(){
  this.nav.navigateBack("/student");
}
acheter(){
  if(this.item.compte < (this.tickets*50)){
    this.toaster.create({
      message:'le solde de votre compte ecobank est insuffisant' ,
      duration: 7000,
      color: 'danger',
      position : 'top'
    }).then((toast)=>{
      toast.present();
    }); 

  }
  else if(this.code== null || this.tickets== null){
    this.toaster.create({
      message:'Remplir tous les champs',
      duration: 3000,
      color: 'danger',
      position: 'top'
    }).then((toast)=>{
      toast.present();
    });
  }
  else if(this.item.numdossier != this.code){
    this.toaster.create({
      message:'code incorrecte',
      duration: 3000,
      color: 'danger',
      position: 'top'
    }).then((toast)=>{
      toast.present();
    });
  }

  else{
    this.fs.doc('service/'+this.item.id).update({
      compte : this.item.compte -= (this.tickets*50),
      ticket : this.item.ticket -= -(this.tickets),
    })
    console.log(this.item.compte);
    console.log(this.item.ticket);
    this.toaster.create({
      message:'vous venez de recharger votre compte ',
      duration: 7000,
      color: 'primary',
      position: 'top'
    }).then((toast)=>{
        toast.present();
    });
    let navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.item)
      }
   }
   this.router.navigate( ['student'], navigationExtras);
  }

}

}
