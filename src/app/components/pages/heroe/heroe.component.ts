import { Component } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms'
@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {
    heroe : HeroeModel = new HeroeModel();



    onSubmit( form : NgForm ) {

        if ( form.invalid ){
          console.log("FORMULARIO INVALIDO")
          return;
        }

        console.log( this.heroe )
    }
}
