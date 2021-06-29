import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MDBResponse } from '../interfaces/interface';
const URL    = environment.url;
const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage = 0;

  constructor(private http : HttpClient) { }

getFeacture(){
  const hoy = new Date();
    const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
    const month = hoy.getMonth() + 1;

    let mesString = month < 10 ? `0${month}`: month;

    const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
    const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;
    


    return this.ejecutarQuery<MDBResponse>(`/discover/movie?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
}
private ejecutarQuery<T>( query: string ) {

  query = URL + query;
  query += `&api_key=${apiKey}&language=es&include_image_language=es`;

  return this.http.get<T>(query);

}
getPopulares() {

  this.popularesPage++;

  const query = `/discover/movie?sort_by=popularity.desc&page=${ this.popularesPage }`;

  return this.ejecutarQuery<MDBResponse>(query);

}
}
