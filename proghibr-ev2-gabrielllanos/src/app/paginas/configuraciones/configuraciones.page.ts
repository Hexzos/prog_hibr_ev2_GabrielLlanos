import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonItem, IonLabel, IonToggle } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConfiguracionService } from 'src/app/servicios/configuracion.service';
import { IonToggleCustomEvent, ToggleChangeEventDetail } from '@ionic/core';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonItem, IonLabel, IonToggle]
})

export class ConfiguracionesPage {


  activarSwitch: boolean = false;

  
  constructor(private configuracionService: ConfiguracionService) { 
    
  } 


  async ngOnInit() { 
    this.activarSwitch = await this.configuracionService.activarSwitch(); 
  }


  ionChange($event: IonToggleCustomEvent<ToggleChangeEventDetail<any>>) {
    const valor = $event.detail.value;
    console.dir({valor});
    this.configuracionService.setActivarSwitch($event.detail.checked);
  } 

  
}