import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Cast, PeliculaDetalle } from 'src/app/interfaces/interface';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
})
export class DetalleComponent implements OnInit {
  @Input() id;

  pelicula: PeliculaDetalle = {};
  actores: Cast[] = [];
  oculto = 150;
  estrella = 'star-outline';
  
  slideOptActores = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: 0
  };


  constructor(private moviesService: MoviesService,
               private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.moviesService.getPeliculaDetalle( this.id )
    .subscribe( resp => {
      console.log( resp );
      this.pelicula = resp;
    });

    this.moviesService.getActoresPelicula( this.id )
    .subscribe( resp => {
      console.log( resp );
      this.actores = resp.cast;
    });

  }
  regresar() {
    this.modalCtrl.dismiss();
  }

}
