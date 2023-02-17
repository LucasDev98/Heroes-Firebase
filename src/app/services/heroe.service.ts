import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HeroeModel } from '../models/heroe.model';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroeService {
  //URL a la REST API de Firebase
  url : string = "https://i-s-p-bd097.firebaseio.com";

  constructor( private http : HttpClient ) { }

  obtenerHeroes(){
    //Obtener Heroes

    return this.http.get(`${this.url}/heroes.json`)
      .pipe( map( this.crearArr  ) ) //Resp de Firebase la convierte en array para poder iterar
  }

  private crearArr( heroesObj : any ){
      const heroes : HeroeModel []= []
      if( heroesObj == null ) {
        return []
      }
      Object.keys( heroesObj ).forEach(  key   =>{

          const heroe : HeroeModel  = heroesObj[key] ;
          heroe.id = key;

          heroes.push(heroe);
      })

      return heroes;
  }
  crearHeroe( heroe : HeroeModel ){
      return this.http.post(`${ this.url }/heroes.json`, heroe )
        .pipe( map( ( data : any ) => {
            heroe.id = data.name;
            return heroe;
        }))
  }

  actualizarHeroe( heroe : HeroeModel ){
      let heroeTemplate  = {
        ...heroe
      };

      delete(heroeTemplate.id);

      return this.http.put(`${this.url}/heroes/${heroe.id}.json`, heroeTemplate)
          .pipe( map( data => {

              return data;
          }))
  }

  eliminarHeroe( id : string ){
      return this.http.delete(`${this.url}/heroes/${id}.json`)
        .pipe( map( data => {
            return data
        }))
  }
}
