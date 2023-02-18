import { Component, OnInit } from '@angular/core';
import { HeroeModel } from 'src/app/models/heroe.model';
import { NgForm } from '@angular/forms'
import { HeroeService } from 'src/app/services/heroe.service';
import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styleUrls: ['./heroe.component.css']
})
export class HeroeComponent implements OnInit {
    heroe : HeroeModel = new HeroeModel();
    constructor( private heroeService : HeroeService,
                 private activateRoute : ActivatedRoute,
                 private router : Router ){

        if( this.router.url.includes('editar') ){
          this.activateRoute.params.subscribe( ( data :any ) => {
              this.heroeService.obtenerHeroe( data.id )
                .subscribe( ( resp : any ) => {
                  resp.id = data.id;
                  this.heroe = resp;
                })
        })
        }
    }
    ngOnInit() {
      const id = this.activateRoute.snapshot.paramMap.get('id');
      console.log(id)
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
          console.log( this.heroe )
          this.heroeService.actualizarHeroe( this.heroe )
              .subscribe( data =>{
                console.log( data )
                Swal.fire({
                  title: this.heroe.nombre,
                  icon:'success',
                  text:'Se actualizado Correctamente'
                })
              })

       }else {
          //Crear Heroe
          this.heroeService.crearHeroe( this.heroe )
            .subscribe( ( ) => {
                Swal.fire({
                  title: this.heroe.nombre,
                  icon:'success',
                  text:'Creado con exito'
              })
            })
            console.log( this.heroe )
            form.reset();
       }
    }

}
