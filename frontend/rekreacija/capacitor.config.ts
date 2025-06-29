import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.rekreacija.app',
  appName: 'rekreacija',
  webDir: 'dist/rekreacija/browser',
  server: {
    androidScheme: 'http',
    cleartext: true,
  },
};

export default config;
