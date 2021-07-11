import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { MDBResponse, Pelicula } from '../interfaces/interface';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
peliculas: Pelicula[] = [];
populares: Pelicula[] = [];
dato: boolean = true;
perfil:any;
series: Pelicula[] = [];

  constructor(private moviesService: MoviesService, private toasController: ToastController,
              private route: Router, private dataLocal: DataLocalService) {}

ngOnInit(){
  if(this.dataLocal.Load_sesion() != ""){
    this.perfil = this.dataLocal.LoadPerfil()
    console.log(this.perfil);
  }

  if(this.perfil == "my_profile" || this.perfil == "adulto"){

this.moviesService.getFeacture().subscribe(
(resp: MDBResponse) =>{
  this.peliculas = resp.results;
}
);
this.getPopulares();
}else{
this.moviesService.Series_new().subscribe(
  (resp: MDBResponse) =>{
    this.peliculas = resp.results;
  }
);
this.getSeriesPopulares();
}
}
cargarMas() {
  this.getPopulares();
}

getPopulares(){
  this.moviesService.getPopulares().subscribe(
    resp => {
      const arrTemp = [...this.populares, ...resp.results];
      this.populares = arrTemp;
    },err =>{
      this.presentToast();
      this.dato = false;
    }
  );
}
getSeriesPopulares(){
  this.moviesService.getSeriespopulars().subscribe(
    resp => {
      const arrTemps = [...this.series, ...resp.results];
      this.series = arrTemps;
    },err =>{
      this.presentToast();
      this.dato = false;
    }
  );
}
async presentToast(){
  const toast = await this.toasController.create(
    {
      message:'LLegaste al limite de peliculas te recomiendo ver la sección de cartelera',
      duration: 800,
      position: 'top'
    }
  );
  toast.present();
}
salir(){
  localStorage.removeItem('Perfil');
  localStorage.removeItem('Sesion');
  this.route.navigateByUrl('login');

}

}
