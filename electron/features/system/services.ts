import { app } from 'electron';
import os from 'os';

export const getSystemInfo = async () => {
  const { version, arch, platform } = process;
  const {
    cpus,
    totalmem,
    freemem,
    homedir,
    type,
    release,
    userInfo,
    hostname,
  } = os;
  const env = app.isPackaged ? 'production' : 'development';
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
    env,
  };
};

export type SystemInfo = ReturnType<typeof getSystemInfo>;
