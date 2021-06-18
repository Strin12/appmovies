import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MDBResponse } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private http : HttpClient) { }

getFeacture(){
return this.http.get<MDBResponse>('https://api.themoviedb.org/3/discover/movie?api_key=250002632c9e4856f59fbbde68307306&primary_release_date.gte=2021-06-01&primary_release_date.lte=2021-06-30&language=es&include_image_language=es');
}

}
