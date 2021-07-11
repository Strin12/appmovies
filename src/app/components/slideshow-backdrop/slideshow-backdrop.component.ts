import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interface';
import { DataLocalService } from 'src/app/services/data-local.service';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-backdrop',
  templateUrl: './slideshow-backdrop.component.html',
  styleUrls: ['./slideshow-backdrop.component.scss'],
})
export class SlideshowBackdropComponent implements OnInit {
  @Input() peliculas: Pelicula[] = [];
  @Input() series: Pelicula[] = [];
  perfil:any;

  slideOpts = {
    slidesPerView: 1.3,
    freeMode: true
  };

  constructor(private modalCtrl: ModalController, private dataLocal: DataLocalService) { }

  ngOnInit() {
    this.login_sesion

  }
  async verDetalle( id: string ) {

    const modal = await this.modalCtrl.create({
      component: DetalleComponent,
      componentProps: {
        id
      }
    });
    
    modal.present();
  }
  login_sesion(){
    if(this.dataLocal.Load_sesion() != ""){
      this.perfil = this.dataLocal.LoadPerfil()
      console.log(this.perfil);
    }
  }
}
