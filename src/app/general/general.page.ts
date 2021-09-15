import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Liste } from '../liste';
import { AngularFireAuth } from '@angular/fire/auth';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  tables: Liste[];
  item:any;
  listes: Liste[];
  collect: Liste[];
  num : number;
  num1 : number;
  num2 : number;
  num3 : number;
  constructor(private fs: AngularFirestore, private afauth: AngularFireAuth, private nav: NavController) { 
     
  }

  ngOnInit() {

    this.fs.collection('general').snapshotChanges().subscribe(services=>{
      this.listes = services.map(service=>{
       return{
         id: service.payload.doc.id,
         ...service.payload.doc.data
       } as unknown as Liste;
  
      });
    });

  }
  actualisation(){
    let n =0;
    let n1 =0;
    let n2 = 0;

    for (let services of this.listes){
      if (services.resto == "central"){
        n+=services.ticket;
      }
      else if(services.resto == "principal"){
        n1+=services.ticket;
      }
      else{
        n2+=services.ticket;
      }
    }
    this.num= n;
    this.num1=n1;
    this.num2=n2;
    this.num3 = (n + n1 + n2);
  }

  deconnexion(){
     
    this.afauth.auth.signOut().then(()=>{
      this.nav.navigateBack('/connexion');
    });
  }

  remove(){
    for(let services of this.listes){
      this.item = services;
      this.fs.doc<any>('general/'+this.item.id).delete();
  }


}

}