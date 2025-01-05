import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonItem, IonInput, IonButton, IonIcon, IonText, IonCard, IonCardContent, IonTitle } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { add } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { Citas } from 'src/app/modelo/citas';

@Component({
  selector: 'app-cita-form',
  templateUrl: './cita-form.component.html',
  styleUrls: ['./cita-form.component.scss'],
  standalone: true,
  imports: [IonTitle, IonCardContent, IonCard, CommonModule, IonText, IonIcon, IonButton, IonInput, IonItem,  FormsModule]
})


export class CitaFormComponent implements OnInit {

  citaStr: string = "";
  autorStr: string = "";

  @Output() onCreate = new EventEmitter<Citas>();

  constructor() { 
    addIcons({
      add
    });
  }

  ngOnInit() {}

  onClick() { 
    const nuevaCita: Citas = { 
      cita: this.citaStr, 
      autor: this.autorStr }; 
      this.onCreate.emit(nuevaCita); }
}
