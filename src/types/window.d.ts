import { Google } from 'google.maps';

declare global {
  interface Window {
    google: typeof Google;
  }
}

export {}; 