import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'proghibr.ev2.gabrielllanos',
  appName: 'proghibr-ev2-gabrielllanos',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    CapacitorSQLite: {
      iosDatabaseLocation: 'Library/CapacitorDatabase',
      webUseIndexedDB: true
    }
    }

};

export default config;
