import { Component, OnInit } from '@angular/core';
import { MDBResponse, Pelicula } from '../interfaces/interface';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
movies: Pelicula[] = [];
slideOpts = {
  slidesPerView: 1.1,
  freeMode: true
};



  constructor(private moviesService: MoviesService) {}

ngOnInit(){
this.moviesService.getFeacture().subscribe(
(resp: MDBResponse) =>{
  console.log(resp);
  this.movies = resp.results;
}

);
}

}
