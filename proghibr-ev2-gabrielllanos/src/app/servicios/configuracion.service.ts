import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences'

@Injectable({
  providedIn: 'root'
})
export class ConfiguracionService {

  private readonly KEY_ACTIVAR = "ACTIVAR_SWITCH";


  constructor() { }


  async activarSwitch(): Promise<boolean> {
    const resultado = await Preferences.get({ key: this.KEY_ACTIVAR })
    return resultado?.value == "true" || false;
  }

  async setActivarSwitch(deboActivar: boolean):Promise<void> {

    await Preferences.set({
      key: this.KEY_ACTIVAR,
      value: deboActivar ? "true" : "false"
    });
  }

 


}
