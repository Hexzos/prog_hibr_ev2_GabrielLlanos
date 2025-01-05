import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { CitasService } from 'src/app/servicios/citas.service';
import { Citas } from 'src/app/modelo/citas';
import { CitaFormComponent } from '../../componentes/cita-form/cita-form.component';
import { CitaListComponent } from '../../componentes/cita-list/cita-list.component';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.page.html',
  styleUrls: ['./gestion.page.scss'],
  standalone: true,
  imports: [IonBackButton, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule,
    CitaFormComponent, CitaListComponent
  ]
})

export class GestionPage implements OnInit {

  listaCitas: Citas[] = [];

  constructor(private citaService: CitasService) { }

  ngOnInit() {
    this._actualizar();
  }

  private async _actualizar() {
    this.listaCitas = await this.citaService.getCitas();
    console.log('Citas actualizadas en Gestión:', this.listaCitas);
  }

  async onCreateCitas(cita: Citas) {
    await this.citaService.agregarCita(cita);
    await this._actualizar();
  }

  async onDeleteCitas(cita: Citas) {
    await this.citaService.eliminarCita(cita);
    await this._actualizar();
  }
}
