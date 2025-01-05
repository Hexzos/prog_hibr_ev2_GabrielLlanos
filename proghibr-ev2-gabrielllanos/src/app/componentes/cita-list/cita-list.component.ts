import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Citas } from 'src/app/modelo/citas';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel, IonButtons, IonButton, IonIcon, IonText } from "@ionic/angular/standalone";
import { trashOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-cita-list',
  templateUrl: './cita-list.component.html',
  styleUrls: ['./cita-list.component.scss'],
  standalone: true,
  imports: [IonText, IonIcon, IonButton, IonLabel, IonItem, IonList, CommonModule]
})

export class CitaListComponent implements OnInit {

  @Input() citas: Citas[] = [];
  @Output() onDelete = new EventEmitter<Citas>();

  constructor() {
     addIcons({
      trashOutline
      });
   }

  ngOnInit() {}

  onClick(cita: Citas) {
     this.onDelete.emit(cita); }
}
