import { Injectable } from '@angular/core';
import { Citas } from '../modelo/citas';
import { Capacitor } from '@capacitor/core';
import { CapacitorSQLite, SQLiteDBConnection, SQLiteConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root'
})
export class CitasService {
  
  sqlite: SQLiteConnection = new SQLiteConnection(CapacitorSQLite);
  plataforma: string = "";

  DB_NAME: string = "CitasDB";
  TABLE_NAME: string = "CitasDB";
  COL_CITA: string = "cita";
  COL_AUTOR: string = "autor";
  DB_ENCRIPTADA: boolean = false;
  DB_MODE: string = "no-encryption";
  DB_VERSION: number = 1;
  DB_READ_ONLY: boolean = false;
  DB_SQL_TABLAS: string = `CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    ${this.COL_CITA} TEXT NOT NULL,
    ${this.COL_AUTOR} TEXT NOT NULL
  );`;

  db!: SQLiteDBConnection;

  constructor() { 
    this.iniciarPlugin().then(() => {
      console.log('Plugin inicializado');
    }).catch(error => {
      console.error('Error inicializando el plugin', error);
    });
  }

  private async _iniciarPluginWeb(): Promise<void> {    
    await customElements.whenDefined('jeep-sqlite');
    const jeepSqliteEl = document.querySelector("jeep-sqlite");
    if (jeepSqliteEl != null) {      
      await this.sqlite.initWebStore();
    }
  }

  async iniciarPlugin() {
    this.plataforma = Capacitor.getPlatform();
    if (this.plataforma === 'web') {
      await this._iniciarPluginWeb();
    }
    await this.abrirConexion();
    await this.db.execute(this.DB_SQL_TABLAS);
  }
  

  async abrirConexion() {
    const ret = await this.sqlite.checkConnectionsConsistency();
    const isConn = (await this.sqlite.isConnection(this.DB_NAME, this.DB_READ_ONLY)).result;
    if (ret.result && isConn) {
      this.db = await this.sqlite.retrieveConnection(this.DB_NAME, this.DB_READ_ONLY);
    } else {
      this.db = await this.sqlite.createConnection(
        this.DB_NAME,
        this.DB_ENCRIPTADA,
        this.DB_MODE,
        this.DB_VERSION,
        this.DB_READ_ONLY
      );
    }
    await this.db.open();
  }
  

  async agregarCita(c: Citas) {
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return;
    }
    const sql = `INSERT INTO ${this.TABLE_NAME} (${this.COL_CITA}, ${this.COL_AUTOR}) VALUES (?, ?)`;
    try {
      await this.db.run(sql, [c.cita, c.autor]);
      console.log('Cita agregada');
    } catch (e) {
      console.error('Error agregando cita', e);
    }
  }

  async getCitas(): Promise<Citas[]> {
    if (!this.db) {
      console.error('Base de datos no inicializada');
      return [];
    }
    const sql = `SELECT * FROM ${this.TABLE_NAME}`;
    try {
      const resultado = await this.db.query(sql);
      return resultado?.values ?? [];
    } catch (e) {
      console.error('Error obteniendo citas', e);
      return [];
    }
  }

  async eliminarCita(c: Citas) {
    if (!this.db) await this.abrirConexion();
    const sql = `DELETE FROM ${this.TABLE_NAME} WHERE id = ?`;
    await this.db.run(sql, [c.id]);
  }
  


  async getCitaAleatoria(): Promise<Citas | { cita: string, autor: string }> {
    try {
      const citas = await this.getCitas();
      if (citas.length === 0) {
        return { cita: "No hay citas disponibles", autor: "" };
      } else {
        const indiceAleatorio = Math.floor(Math.random() * citas.length);
        return citas[indiceAleatorio];
      }
    } catch (e) {
      console.error('Error obteniendo cita aleatoria', e);
      return { cita: "Error al obtener cita aleatoria", autor: "" };
    }
  }
  
  

}
