import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { Item } from '../item';
import { Liste } from '../liste';
@Component({
  selector: 'app-manger',
  templateUrl: './manger.page.html',
  styleUrls: ['./manger.page.scss'],
})
export class MangerPage implements OnInit {

  createdcode =  null;
  item: any;
  donnees: Item[];
  liste: boolean;
  tables: Liste[];
  table : Liste = {
    resto:'',
    nom: '',
    prenom:'',
    ticket: undefined,
    email : '',
  }

  constructor(private fs: AngularFirestore, private nav : NavController, private routeactive :ActivatedRoute,
     private toaster: ToastController, private router: Router) { 

    this.routeactive.queryParams.subscribe(params => {
        console.log('params:', params);
          if(params && params.special){
              this.item = JSON.parse(params.special);
          }
    });
    this.liste = false;
    

}
ngOnInit() {

  this.fs.collection('liste').snapshotChanges().subscribe(services=>{
    this.tables = services.map(service=>{
     return{
       id: service.payload.doc.id,
       ...service.payload.doc.data
     } as unknown as Liste;

    });
  });

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
  
  this.nav.navigateBack("/restos");
 }

 /*createcode(){
  this.createdcode = this.item.email;
 }*/
 repas(){


  if(this.item.ticket < 2){
    this.toaster.create({
      message:'solde du compte credit insuffisant',
      duration: 7000,
      color: 'danger',
      position: 'top'
    }).then((toast)=>{
      toast.present();
    });
  }
  
  
  
  else{
    for(let services of this.tables){
      if(this.item.email == services.email){
        this.liste= true;
      }
    }

      if(this.liste == true){
        this.toaster.create({
          message:'vous avez deja souscrit',
          duration: 7000,
          color: 'danger',
          position: 'top'
        }).then((toast)=>{
          toast.present();
        });
      }
    
      else{
        this.fs.doc('service/'+this.item.id).update({
          ticket : this.item.ticket -= 2,
        })
        this.table.resto = "principal";
        this.table.nom = this.item.nom;
        this.table.prenom = this.item.prenom;
        this.table.ticket = 2;
        this.table.email = this.item.email;
    
        this.fs.collection('liste').add(this.table).then((data)=>{
          console.log(data)}).catch((error)=>{
            console.log(error)
          });
          this.fs.collection('general').add(this.table).then((data)=>{
            console.log(data)}).catch((error)=>{
              console.log(error)
            });
    
        console.log(this.item.ticket);
        this.toaster.create({
          message:'vous venez de débiter 2 credits pour le repas ',
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
 petit(){


  if(this.item.ticket < 1){
    this.toaster.create({
      message:'solde du compte credit insuffisant',
      duration: 7000,
      color: 'danger',
      position: 'top'
    }).then((toast)=>{
      toast.present();
    });
  }
  
  
  
  else{
    for(let services of this.tables){
      if(this.item.email == services.email){
        this.liste= true;
      }
    }

      if(this.liste == true){
        this.toaster.create({
          message:'vous avez deja souscrit',
          duration: 7000,
          color: 'danger',
          position: 'top'
        }).then((toast)=>{
          toast.present();
        });
      }
      else{
        this.fs.doc('service/'+this.item.id).update({
          ticket : this.item.ticket -= 1,
        })
    
        this.table.nom = this.item.nom;
        this.table.prenom = this.item.prenom;
        this.table.ticket = 1;
        this.table.email = this.item.email;
    
        this.fs.collection('liste').add(this.table).then((data)=>{
          console.log(data)}).catch((error)=>{
            console.log
          });
    
    
        console.log(this.item.ticket);
        this.toaster.create({
          message:'vous venez de débiter 1 credits pour le repas ',
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
}
