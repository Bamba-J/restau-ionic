import { EmailValidator } from '@angular/forms';

export interface Item{
    key?: string;
    prenom : String;
    nom: String;
    email: string;
    password: string;
    cpassword: string;
    numdossier: number;
    ticket: number;
    compte: number;
}