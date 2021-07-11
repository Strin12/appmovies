import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { DataLocalService } from '../services/data-local.service';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  @Output() avatarSel = new EventEmitter();
  user = {
    perfil: 'my_profile',
    perfil2: 'invitado',
    perfil3: 'kids',
    perfil4: 'adulto'
  };

  constructor(private router: Router,
              private moviesService:MoviesService,
              private dataLocal:DataLocalService,
              private toasController:ToastController) { }

  ngOnInit() {
  }
Login(user:any){
//this.router.navigateByUrl('tabs');
this.moviesService.Autentication().subscribe(
  resp =>{
    this.dataLocal.save_perfil(user);
    this.dataLocal.save_sesion(resp);
    console.log(user);
    console.log(resp);
   this.router.navigateByUrl('tabs'); 
   this.presentToast();
  }
);
}
async presentToast(){
  const toast = await this.toasController.create(
    {
      message:'Bienvenido',
      duration: 800,
      position: 'top'
    }
  );
  toast.present();
}
}
