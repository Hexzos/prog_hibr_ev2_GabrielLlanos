import { Component, OnInit } from '@angular/core';
import { CitaFormComponent } from "../cita-form/cita-form.component";
import { CitaListComponent } from "../cita-list/cita-list.component";
import { CitasService } from 'src/app/servicios/citas.service';
import { Citas } from 'src/app/modelo/citas';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-citas',
  templateUrl: './app-citas.component.html',
  styleUrls: ['./app-citas.component.scss'],
  standalone: true,
  imports: [CitaFormComponent, CitaListComponent, CommonModule],
})

export class AppCitasComponent implements OnInit {
  listaCitas: Citas[] = [];

  constructor(
    private citaService: CitasService
  ) { }

  async ngOnInit() {
    await this.citaService.iniciarPlugin(); 
    await this._actualizar();
  }
  

  async _actualizar() {
    this.listaCitas = await this.citaService.getCitas();
  }
  

  async onCreateCitas( $event: { cita: string, autor: string }) { 
      const cita: Citas = { id: 0, ...$event }; 
      await this.citaService.agregarCita(cita); 
      await this._actualizar(); 
  }

  async onDeleteCitas(cita: Citas) {
    await this.citaService.eliminarCita(cita);
    await this._actualizar();
  }
  
}
