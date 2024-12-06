"use strict";
const electron = require("electron");
const systemHandlers = {
  system: {
    async getInfo() {
      return electron.ipcRenderer.invoke("system:get-info");
    }
  }
};
const electronHandler = {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(
      channel,
      (event, ...args2) => listener(event, ...args2)
    );
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  },
  ...systemHandlers
};
electron.contextBridge.exposeInMainWorld("ipcRenderer", electronHandler);
