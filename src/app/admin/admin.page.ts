import { Component} from '@angular/core';
import { Router, NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Liste } from '../liste';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage{
  
  
  items : Liste[];
  item: any;
  mail: any;
  test: any;
  resto = "";
  constructor(private nav : NavController,private routeactive: ActivatedRoute, private router: Router, 
    private afauth : AngularFireAuth, private fs :AngularFirestore) {

this.mail= this.routeactive.snapshot.paramMap.get("mail");
if(this.mail == "admin@gmail.com"){
this.test = 1;
this.resto = "PRINCIPAL";
  this.fs.collection('liste').snapshotChanges().subscribe(services=>{
    this.items = services.map(service=>{
     return{
       id: service.payload.doc.id,
       ...service.payload.doc.data
     } as unknown as Liste;

    });
  });
}
else if(this.mail == "khadimguisse19952016@gmail.com"){
  this.test = 2;
  this.resto = "ESP";
  this.fs.collection('esp').snapshotChanges().subscribe(services=>{
    this.items = services.map(service=>{
     return{
       id: service.payload.doc.id,
       ...service.payload.doc.data
     } as unknown as Liste;

    });
  });

}
else{
  this.test = 3;
  this.resto = "CENTRAL";
  this.fs.collection('central').snapshotChanges().subscribe(services=>{
    this.items = services.map(service=>{
     return{
       id: service.payload.doc.id,
       ...service.payload.doc.data
     } as unknown as Liste;

    });
  });

}

    
    
}

   remove(){
     for(let services of this.items){
       this.item = services;
       if(this.test == 1)
       this.fs.doc<any>('liste/'+this.item.id).delete();
       else if (this.test== 2){
        this.fs.doc<any>('esp/'+this.item.id).delete();
       }
       else {
        this.fs.doc<any>('central/'+this.item.id).delete();
       }
     }
   }

   scanner(){
     
   }
  
  deconnexion(){
     
    this.afauth.auth.signOut().then(()=>{
      this.nav.navigateBack('/connexion');
    });
  }

}