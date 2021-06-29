import { Component, OnInit } from '@angular/core';
import { MDBResponse, Pelicula } from '../interfaces/interface';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
peliculas: Pelicula[] = [];
populares: Pelicula[] = [];



  constructor(private moviesService: MoviesService) {}

ngOnInit(){
this.moviesService.getFeacture().subscribe(
(resp: MDBResponse) =>{
  console.log(resp);
  this.peliculas = resp.results;
}

);
this.getPopulares();
}
cargarMas() {
  this.getPopulares();
}

getPopulares(){
  this.moviesService.getPopulares().subscribe(
    resp => {
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    }
  );
}

}
