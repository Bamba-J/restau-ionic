import {Injectable} from "@angular/core";
import { AngularFireDatabase} from 'angularfire2/database';
import { Item } from '../item';



@Injectable()
export class mylist{
    private mylistref=this.db.list<Item>('services'); 

    constructor(private db: AngularFireDatabase){
        
    }
    getlist(){
        return this.mylistref;
    }
    additem(liste: Item){
        return this.mylistref.push(liste);
    }

}