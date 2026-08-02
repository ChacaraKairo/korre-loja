import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("korre", {
  platform: process.platform
});
