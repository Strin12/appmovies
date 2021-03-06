import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { PeliculaDetalle } from '../interfaces/interface';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {
  peliculas: PeliculaDetalle[] = [];
  sesion:any;
  perfil:any;

  constructor( private storage: Storage,
               private toastCtrl: ToastController) {
    this.cargarFavoritos();
  }

  async presentToast( message: string ) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 1500
    });
    toast.present();
  }

  guardarPelicula( pelicula: any ) {

    let existe = false;
    let mensaje = '';

    for ( const peli of this.peliculas ) {
      if ( peli.id === pelicula.id ) {
        existe = true;
        break;
      }
    }

    if ( existe ) {
      this.peliculas = this.peliculas.filter( peli => peli.id !== pelicula.id );
      mensaje = 'Removido de favoritos';
    } else {
      this.peliculas.push( pelicula );
      mensaje = 'Agregada a favoritos';
    }


    this.presentToast( mensaje );
   /// this.set('Favoritos', this.peliculas);
   localStorage.setItem('Favoritos', JSON.stringify(this.peliculas));
    return !existe;


  }

  async cargarFavoritos() {
    //const peliculas = await this.storage.get('Favoritos');
    //this.peliculas = peliculas || [];
    const peliculas = JSON.parse(localStorage.getItem('Favoritos'));
    this.peliculas = peliculas || [];
    return this.peliculas;
  }

  async existePelicula( id ) {

    await this.cargarFavoritos();
    const existe = this.peliculas.find( peli => peli.id === id );

    return (existe) ? true : false;
  }
  save_perfil(user:any){
    localStorage.setItem('Perfil', JSON.stringify(user));

  }
  save_sesion(sesion:any){
    localStorage.setItem('Sesion', JSON.stringify(sesion));
    
  }
  LoadPerfil(){
   const perfil = JSON.parse(localStorage.getItem('Perfil'));
    this.perfil = perfil || [];
    return this.perfil;
  }
  Load_sesion(){
    const sesion = JSON.parse(localStorage.getItem('Sesion'));
    this.sesion = sesion || [];
    return this.sesion;
  }
}