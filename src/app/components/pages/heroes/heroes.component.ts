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
    this.heroeService.obtenerHeroes()
        .subscribe( ( data:any )=> {
            this.heroes = data;
            this.loading = false;
            console.log( this.heroes )
        })
  }

  eliminarHeroe( heroe: HeroeModel ){

    Swal.fire({
      title:'Eliminar',
      icon:'error',
      text:`Seguro que desea eliminar a ${ heroe.nombre } `,
      showDenyButton: true,
      denyButtonText: `Salir`,
      confirmButtonText:"Si, eliminar"
    }).then( result => {
        if ( result.isConfirmed ) {
          this.heroeService.eliminarHeroe( heroe.id! )
              .subscribe( data => {
                Swal.fire({
                  title:'Exito',
                  icon:'success',
                  text:'Heroe eliminado con extio'
                })
              })
        }
    })
    console.log( heroe.id );
  }
  editarHeroe( heroe : HeroeModel ){
    console.log('click')
    this.router.navigate([`/heroe/editar/${heroe.id}`])
  }
}
