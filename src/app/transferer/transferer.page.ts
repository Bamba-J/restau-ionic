import { Component, OnInit } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { NavController, ToastController } from '@ionic/angular';
import { Item} from '../item';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-transferer',
  templateUrl: './transferer.page.html',
  styleUrls: ['./transferer.page.scss'],
})
export class TransfererPage implements OnInit {
    
email: string;
email2 : string;
tickets: number;
donnees: Item[];
datas: Item[];
liste: any; 
add : number;
item : any;
table: any;
  constructor(private fs: AngularFirestore, private nav : NavController, private routeactive :ActivatedRoute,
              private afauth: AngularFireAuth, private toaster: ToastController, private router: Router) { 
    
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
    

    /*for(let services of this.donnees){
      if(services.email == this.item.email)
      this.table = services;
    }
    
    let navigationExtras : NavigationExtras = {
      queryParams: {
        special: JSON.stringify(this.table)
      }
    }*/
    
    this.nav.navigateBack("/student");
   }

  async envoyer(){
       for(let services of this.donnees){
         if(services.email == this.email)
            {
              this.liste = services;
            }
       }
       

  if(this.item.ticket < this.tickets){
    this.toaster.create({
      message:'solde du compte insuffisant',
      duration: 7000,
      color: 'danger',
      position: 'top'
    }).then((toast)=>{
      toast.present();
    });
  }
  else if(this.email== "" || this.tickets== null){
    this.toaster.create({
      message:'Remplir tous les champs',
      duration: 3000,
      color: 'danger',
      position: 'top'
    }).then((toast)=>{
      toast.present();
    });
  }

 else{
   try{
    const result= this.liste.email;
    //await this.afauth.auth.signInWithEmailAndPassword(this.liste.email , this.liste.password);

    if(result){
      if(this.item.email == this.liste.email){
        this.toaster.create({
          message:'vous ne pouvez pas  vous transferer des crédits',
          duration: 7000,
          color: 'danger',
          position: 'top',
        }).then((toast)=>{
          toast.present();
        });
      }
      else{
  this.fs.doc('service/'+this.liste.id).update({
    ticket : this.liste.ticket -= -(this.tickets),
  })

  console.log(this.liste.ticket);

  this.fs.doc('service/'+this.item.id).update({
    ticket : this.item.ticket -= this.tickets,
  })

  console.log(this.item.ticket);
  this.toaster.create({
    message:'transfert effectué',
    duration: 7000,
    color: 'primary',
    position: 'top',
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
      
}catch(e){
  console.error(e);
  alert("l'email saisi n'existe pas dans le serveur");
   }
}
}
}

