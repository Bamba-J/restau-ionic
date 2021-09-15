import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { User } from '../user';
import { NavController, ToastController } from '@ionic/angular';
import 'firebase/firestore';
import { Item } from '../item';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {
  valeur='';
  user: User = {
    email: '',
    password:'',
  }
  donnees: Item[];
  mail= "";

  
  
  ngOnInit(){
  
   
   this.fs.collection('service').snapshotChanges().subscribe(services=>{
     this.donnees = services.map(service=>{
      return{
        id: service.payload.doc.id,
        ...service.payload.doc.data
      } as unknown as Item;

     });
   });
      

  }

  constructor(private nav: NavController, private afauth: AngularFireAuth,
    private fs: AngularFirestore, private router: Router, private toaster: ToastController) { }


  liste : any;

  inscription(){
    this.nav.navigateForward('/register');
  }

  forgetpassword(){
    this.nav.navigateForward('/fpassword');
  }

  resetpassword(){
    this.nav.navigateForward('/resetpassword');
  }

 async login(user: User){
 
  try{
 const result= await this.afauth.auth.signInWithEmailAndPassword(user.email , user.password);

 
                if (result){
                  if(user.email == "admin@gmail.com"){
                    this.mail ="admin@gmail.com";
                    this.nav.navigateForward("/admin/" + this.mail);
                  }
                  else if(user.email == "khadimguisse19952016@gmail.com"){
                    this.mail ="khadimguisse19952016@gmail.com";
                    this.nav.navigateForward("/admin/" + this.mail);
                  }
                  else if(user.email == "osall@univ-thies.sn"){
                    this.mail ="osall@univ-thies.sn";
                    this.nav.navigateForward("/admin/" + this.mail);
                  }
                  else if(user.email == "general@gmail.com"){
                    
                    this.nav.navigateForward('/general');
                  }
                  else{
                  for(let services of this.donnees){
                    if(services.email == user.email)
                    this.liste = services;
                  }
                  
                 let navigationExtras : NavigationExtras = {
                   queryParams: {
                     special: JSON.stringify(this.liste)
                   }
                 }
                 console.log(this.liste.id);
                 this.router.navigate( ['student'], navigationExtras);
                 this.toaster.create({
                  message:'bienvenue dans votre profil !!',
                  duration: 5000,
                  color: 'light',
                }).then((toast)=>{
                  toast.present();
                });
                 
              }
 }

}
catch(e){
    if (this.user.password== "" || this.user.email== ""  ) 
        alert('remplir tous les champs');
    else
        alert("mot de passe ou login invalide ");
        console.error(e);
      }
    } 

  }