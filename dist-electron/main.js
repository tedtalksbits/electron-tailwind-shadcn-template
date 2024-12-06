import { app, ipcMain, BrowserWindow } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "node:path";
import os from "os";
const getSystemInfo = async () => {
  const { version, arch, platform } = process;
  const {
    cpus,
    totalmem,
    freemem,
    homedir,
    type,
    release,
    userInfo,
    hostname
  } = os;
  const env = app.isPackaged ? "production" : "development";
  return {
    version,
    arch,
    platform,
    cpus: cpus(),
    totalMemory: totalmem(),
    freeMemory: freemem(),
    homeDir: homedir(),
    osType: type(),
    osRelease: release(),
    osUserInfo: userInfo(),
    osHostname: hostname(),
    env
  };
};
const systemListeners = () => {
  ipcMain.handle("system:get-info", async () => getSystemInfo());
};
const configureListeners = () => {
  systemListeners();
};
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
configureListeners();
app.whenReady().then(createWindow);
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
