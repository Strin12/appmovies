import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Pelicula } from 'src/app/interfaces/interface';
import { DetalleComponent } from '../detalle/detalle.component';

@Component({
  selector: 'app-slideshow-pares-series',
  templateUrl: './slideshow-pares-series.component.html',
  styleUrls: ['./slideshow-pares-series.component.scss'],
})
export class SlideshowParesSeriesComponent implements OnInit {
  @Input() series: Pelicula[] = [];
  @Output() cargarMas = new EventEmitter();
  @Input() dato: boolean = true;
  slideOpts = {
    slidesPerView: 3.3,
    freeMode: true,
    spaceBetween: -10
  };
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  onClick() {
    this.cargarMas.emit();
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
}

