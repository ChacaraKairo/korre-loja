import { app, BrowserWindow, ipcMain } from "electron";
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = Boolean(process.env.VITE_DEV_SERVER_URL) || !app.isPackaged;
const repoRoot = path.resolve(__dirname, "../../../..");
const categoryFiltersPath = path.join(repoRoot, "apps/web-store/src/category-filters.ts");

type CategoryFilterPayload = {
  id: string;
  name: string;
  slug: string;
  subcategories: string[];
};

function quote(value: string) {
  return JSON.stringify(value);
}

function renderCategoryFilters(filters: CategoryFilterPayload[]) {
  const items = filters
    .map((category) => `  {
    id: ${quote(category.id)},
    name: ${quote(category.name)},
    slug: ${quote(category.slug)},
    subcategories: [${category.subcategories.map((item) => quote(item)).join(", ")}]
  }`)
    .join(",\n");

  return `export type CategoryFilter = {
  id: string;
  name: string;
  slug: string;
  subcategories: string[];
};

export const categoryFilters: CategoryFilter[] = [
${items}
];
`;
}

ipcMain.handle("category-filters:save", async (_event, filters: CategoryFilterPayload[]) => {
  await fs.writeFile(categoryFiltersPath, renderCategoryFilters(filters), "utf8");

  return {
    ok: true,
    path: categoryFiltersPath
  };
});

function createWindow() {
  const window = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 1024,
    minHeight: 700,
    title: "Loja do Korre Admin",
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  if (isDev) {
    void window.loadURL("http://localhost:5174");
    window.webContents.openDevTools({ mode: "detach" });
    return;
  }

  void window.loadFile(path.join(__dirname, "../renderer/index.html"));
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
