import { ipcRenderer } from 'electron';
import { SystemInfo } from './services';

export const systemHandlers = {
  system: {
    async getInfo() {
      return ipcRenderer.invoke('system:get-info') as SystemInfo;
    },
  },
};
export type SystemHandlers = typeof systemHandlers;
