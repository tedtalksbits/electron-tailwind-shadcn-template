import { ipcMain } from 'electron';
import { getSystemInfo } from './services';

export const systemListeners = () => {
  ipcMain.handle('system:get-info', async () => getSystemInfo());
};
