import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("korre", {
  platform: process.platform,
  saveCategoryFilters: (filters: unknown) => ipcRenderer.invoke("category-filters:save", filters)
});
