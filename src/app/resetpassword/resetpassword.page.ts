import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import {Item} from '../item';
import { NavController, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.page.html',
  styleUrls: ['./resetpassword.page.scss'],
})
export class ResetpasswordPage implements OnInit {

  email : string;
  donnees: Item[];
  liste : boolean = false;

  constructor( private fs: AngularFirestore, private nav: NavController, 
          private toaster : ToastController) { }

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
  gohome(){
    this.nav.navigateBack('/connexion');
  }
   valider(){

  for (let service of this.donnees){
    if(service.email == this.email){
      this.liste = true;
      firebase.auth().sendPasswordResetEmail(this.email);
      this.toaster.create({
      message: "un mail de réénitialisation vous a été envoyé à l'adresse indiquée. informez y votre nouveau mot de passe",
      duration : 7000,
      color :"success",
    }).then((toast)=>{
      toast.present();
    });
    this.nav.navigateBack('/connexion');
    }
     
  }
  if (this.liste == false){
    if(this.email == " "){
      
      this.toaster.create({
        message: "champs vide",
        duration : 7000,
        color :"danger",
      }).then((toast)=>{
        toast.present();
      });
  }
  else{
    this.toaster.create({
      message: "le mail saisi n'est pas pris en compte ",
      duration : 7000,
      color :"danger",
    }).then((toast)=>{
      toast.present();
    });
  }
  }

}

}
