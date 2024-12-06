import { ElectronHandler } from '../electron/preload';

declare global {
  interface Window {
    ipcRenderer: ElectronHandler;
  }
}

export {};
