import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataLocalService } from '../services/data-local.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {
perfil:any;
  constructor(private dataLocal: DataLocalService) {
    this.login_sesion();
  }

  login_sesion(){
  if(this.dataLocal.Load_sesion() != ""){
    this.perfil = this.dataLocal.LoadPerfil()
    console.log(this.perfil);
  }
}
}
