import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-image-perfil',
  templateUrl: './image-perfil.component.html',
  styleUrls: ['./image-perfil.component.scss'],
})
export class ImagePerfilComponent implements OnInit {
  @Output() avatarSel = new EventEmitter();
  @Input() avatarActual = 'avatar1.jpg';

  avatars = [
    {
      nombre: 'Mi perfil',
      img: 'avatar1.jpg',
      seleccionado: true
    },
    {
      nombre: 'Invitado',
      img: 'avatar2.jpg',
      seleccionado: true
    },
    {
      nombre: 'Kids',
      img: 'avatar3.jpg',
      seleccionado: true
    },
];
avatarSlide = {
  slidesPerView: 3.0,
  freeMode: true
};
  constructor() { }

  ngOnInit() {

    this.avatars.forEach( avatar => avatar.seleccionado = false );

    for ( const avatar of this.avatars ) {

      if ( avatar.img === this.avatarActual ) {
        avatar.seleccionado = true;
        break;
      }
    }

  }

  seleccionarAvatar( avatar ) {

    this.avatars.forEach( av => av.seleccionado = false  );
    avatar.seleccionado = true;

    console.log(avatar.img);
    this.avatarSel.emit( avatar.img );

  }
}
