import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonFab, IonCardContent, IonCard, IonText, IonCol, IonRow, IonGrid, IonFabButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { settingsOutline, add, trashOutline } from 'ionicons/icons';
import { RouterModule } from '@angular/router';
import { CitasService } from 'src/app/servicios/citas.service';
import { Citas } from 'src/app/modelo/citas';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonFabButton, IonGrid, IonRow, IonCol, IonText, IonCard, IonCardContent, IonFab, IonIcon, IonButton, IonButtons, CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, RouterModule],
})

export class HomePage implements OnInit {
  
  citaAleatoria: { cita: string, autor: string } = { cita: "", autor: "" };
  activarSwitch: boolean = false;

  constructor(private citasService: CitasService, 
              private configuracionService: ConfiguracionService) {

    addIcons({
      settingsOutline,
      trashOutline,
      add,
     });
  }

  async ngOnInit() {
    await this.citasService.iniciarPlugin();
    this.citaAleatoria = await this.citasService.getCitaAleatoria();
    console.log('Cita aleatoria:', this.citaAleatoria);
  }

  async ionViewWillEnter() {
    this.activarSwitch = await this.configuracionService.activarSwitch();
    await this.actualizarCitaAleatoria();
  }

  async actualizarCitaAleatoria() {
    this.citaAleatoria = await this.citasService.getCitaAleatoria();
    console.log('Cita aleatoria:', this.citaAleatoria);
  }

  async eliminarCitaAleatoria() {
    if (this.citaAleatoria && 'cita' in this.citaAleatoria) {
    await this.citasService.eliminarCita(this.citaAleatoria as Citas);
      await this.actualizarCitaAleatoria();
    }
  }
}
