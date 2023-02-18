import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { HeroeModel } from 'src/app/models/heroe.model';
import { HeroeService } from 'src/app/services/heroe.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent {
  heroes :  HeroeModel [] = [];
  loading : boolean = true;

  constructor( private heroeService : HeroeService,
               private router : Router ){
      this.mostrarHeroes()
  }

  eliminarHeroe( heroe: HeroeModel ){

    Swal.fire({
      title:'Eliminar',
      icon:'error',
      text:`Seguro que desea eliminar a ${ heroe.nombre } `,
      showCancelButton:true,
      showConfirmButton:false,
      showDenyButton:true,
      cancelButtonText: `Salir`,
      denyButtonText:'Eliminar'
    }).then( result => {
        if ( result.isDenied ) {
          this.heroeService.eliminarHeroe( heroe.id! )
              .subscribe( data => {
                Swal.fire({
                  title:'Exito',
                  icon:'success',
                  text:'Heroe eliminado con extio'
                })
                this.mostrarHeroes()
              })
        }
    })
  }
  editarHeroe( heroe : HeroeModel ){

    this.router.navigate([`/heroe/editar/${heroe.id}`])
  }

  mostrarHeroes(){
    this.heroeService.obtenerHeroes()
        .subscribe( ( data:any )=> {
            this.heroes = data;
            this.loading = false;
        })
  }

  buscarHeroe( heroeText : string ){

    let heroesBusqueda = [];

    this.heroes.forEach( heroe => {

        let heroeNombre = heroe.nombre.toLocaleLowerCase()

        if ( heroe.nombre.indexOf( heroeText.toLocaleLowerCase() ) >= 0 ) {

        }
    })


  }
}
