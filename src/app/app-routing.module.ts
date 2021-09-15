import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'connexion', pathMatch: 'full' },
  { path: 'connexion', loadChildren: './connexion/connexion.module#ConnexionPageModule' },
  { path: 'admin/:mail', loadChildren: './admin/admin.module#AdminPageModule' },
  { path: 'register', loadChildren: './register/register.module#RegisterPageModule' },
  { path: 'student', loadChildren: './student/student.module#StudentPageModule' },
  { path: 'transferer', loadChildren: './transferer/transferer.module#TransfererPageModule' },
  { path: 'consulter', loadChildren: './consulter/consulter.module#ConsulterPageModule' },
  { path: 'manger', loadChildren: './manger/manger.module#MangerPageModule' },
  { path: 'resetpassword', loadChildren: './resetpassword/resetpassword.module#ResetpasswordPageModule' },
  { path: 'restos', loadChildren: './restos/restos.module#RestosPageModule' },
  { path: 'manger1', loadChildren: './manger1/manger1.module#Manger1PageModule' },
  { path: 'manger2', loadChildren: './manger2/manger2.module#Manger2PageModule' },
  { path: 'general', loadChildren: './general/general.module#GeneralPageModule' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
