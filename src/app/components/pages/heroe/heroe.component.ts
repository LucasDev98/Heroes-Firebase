import { Component } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms'
import { HeroeService } from 'src/app/services/heroe.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent {
    heroe : HeroeModel = new HeroeModel();

    constructor( private heroeService : HeroeService ){

    }

    onSubmit( form : NgForm ) {

        if ( form.invalid ){
          console.log("FORMULARIO INVALIDO")
          return;
        }
        Swal.fire({
          title:'Espere por favor',
          icon:'info',
          text:'Cargando datos',
          allowOutsideClick: true,
        })

        Swal.showLoading();

       if( this.heroe.id ) {
          //Actualizar Heroe
          this.heroeService.actualizarHeroe( this.heroe );
          Swal.fire({
            title: this.heroe.nombre,
            icon:'success',
            text:'Se actualizado Correctamente'
          })
       }else {
          //Crear Heroe
          this.heroeService.crearHeroe( this.heroe )
            .subscribe( data => this.heroe = data );
          Swal.fire({
              title: this.heroe.nombre,
              icon:'success',
              text:'Creado con exito'
          })
       }

    }
}
