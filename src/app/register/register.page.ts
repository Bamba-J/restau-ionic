import { Component, OnInit} from '@angular/core';
import { Item } from '../item';
import {NavController, ToastController} from '@ionic/angular';
import 'firebase/firestore';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit{
  
   liste: Item = {
     
   nom: '',
   prenom:'',
   email: '',
   password:'',
   cpassword:'',
   numdossier: undefined,
   ticket: 20,
   compte : 40000,
  }
  table: any;
  donnees: Item[];
  gohome(){
    this.nav.navigateBack('/connexion');
  }

  ngOnInit(){

    
       
 
  }
   
  constructor( private afauth: AngularFireAuth, private nav: NavController, private fs: AngularFirestore, 
              private router: Router, private toaster: ToastController){}

 async ajouter(liste: Item){
  if ( this.liste.cpassword!= this.liste.password){
    alert ("vous avez retaper un mauvais mot de passe");
       }
  else if(this.liste.password.length < 6 || this.liste.cpassword.length < 6 ){
       alert ("le mot de passe doit dépassé 6 caractéres");
  }
  else if (this.liste.nom== "" || this.liste.prenom== "" || this.liste.password==""|| this.liste.numdossier== null || 
  this.liste.email=="" || this.liste.cpassword=="" )
    alert('remplir tous les champs');
  
  else{
    try{
      const result= await this.afauth.auth.createUserWithEmailAndPassword(this.liste.email, this.liste.password);
      console.log(result);
      if (result){

        this.fs.collection('service').add(this.liste).then((data)=>{
          console.log(data)}).catch((error)=>{
            console.log
          });
          console.log(this.liste);

          this.toaster.create({
            message:"compte crée avec success !!",
            duration: 4000,
            color: 'success',
            position: 'top'
          }).then((toast)=>{
            toast.present();
          });

          this.router.navigateByUrl('/connexion');

          this.toaster.create({
            message:"saisissez vos identifiants !!",
            duration: 5000,
            color: 'light',
          }).then((toast)=>{
            toast.present();
          });

      }
      
     }
     catch(e){
           console.error(e);
           alert("ce compte existe deja");
  }
    
  
}
   /*if ( this.liste.cpassword!= this.liste.password){
        alert ("vous avez retaper un mauvais mot de paase");
           }
      else{
          this.fs.collection('services').add(this.liste);
          try{
           const result= await this.afauth.auth.createUserWithEmailAndPassword(this.liste.email, this.liste.password);
           console.log(result);
           this.nav.navigateForward('student');
          }
          catch(e){
                console.error(e);
          }
      }*/

 }
 
}