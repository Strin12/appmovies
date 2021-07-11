import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Genre, MDBResponse, PeliculaDetalle, RespuestaCredits } from '../interfaces/interface';
import { DataLocalService } from './data-local.service';
const URL    = environment.url;
const apiKey = environment.apiKey;
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private popularesPage = 485;
  private series = 485;
  generos: Genre[] = [];
  peliculas: any[] = [];
 QR: string = 'http://api.qrserver.com/v1/create-qr-code/'
  constructor(private http : HttpClient, private DataLocal: DataLocalService) { }

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
  const query = `/discover/movie?sort_by=popularity.desc&page=${this.popularesPage}`;
  return this.ejecutarQuery<MDBResponse>(query);
}
getPeliculaDetalle( id: string ) {
  return this.ejecutarQuery<PeliculaDetalle>(`/movie/${ id }?a=1`);
}
///debo terminarlo
GetQRPelicula(peliculas:any){
return this.http.get(`${this.QR}?data=${peliculas}&size=100x100`);
}

getActoresPelicula( id: string ) {
  return this.ejecutarQuery<RespuestaCredits>(`/movie/${ id }/credits?a=1`);
}

cargarGeneros(): Promise<Genre[]> {

  return new Promise( resolve => {

    this.ejecutarQuery(`/genre/movie/list?a=1`)
      .subscribe( resp => {
        this.generos = resp['genres'];
        resolve(this.generos);
      });

  });


}
buscarPeliculas( texto: string ) {
  return this.ejecutarQuery(`/search/movie?query=${ texto }`);

}
Autentication(){
 return this.http.get(`${URL}/authentication/guest_session/new?api_key=${apiKey}`); 
}
series_invitados(){
  const query = `/discover/tv?sort_by=popularity.desc`;
  return this.ejecutarQuery<MDBResponse>(query);
}
Series_new(){
  const hoy = new Date();
  const ultimoDia = new Date( hoy.getFullYear(), hoy.getMonth() + 1, 0 ).getDate();
  const month = hoy.getMonth() + 1;

  let mesString = month < 10 ? `0${month}`: month;

  const inicio = `${ hoy.getFullYear() }-${ mesString }-01`;
  const fin = `${ hoy.getFullYear() }-${ mesString }-${ ultimoDia }`;
  


  return this.ejecutarQuery<MDBResponse>(`/discover/tv?primary_release_date.gte=${ inicio }&primary_release_date.lte=${ fin }`);
}
getSerieDetalle( id: string ) {
  return this.ejecutarQuery<PeliculaDetalle>(`/tv/${ id }?a=1`);
}
getActorestSerie( id: string ) {
  return this.ejecutarQuery<RespuestaCredits>(`/tv/${ id }/credits?a=1`);
}
getSeriespopulars(){
  this.series++;
  const query = `/discover/tv?sort_by=popularity.desc&page=${this.series}`;
  return this.ejecutarQuery<MDBResponse>(query);
}
}
