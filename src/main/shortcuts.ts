import { BrowserWindow, app, globalShortcut } from "electron";

export function createShortcuts(window: BrowserWindow) {

    app.on("browser-window-focus", () => {
        globalShortcut.register("CommandOrControl+N", () => {
            // Enviar mensagem do processo (main) para o processo (renderer)
            window.webContents.send("new-customer");
        });
    });

    app.on("browser-window-blur", () => {
        globalShortcut.unregisterAll();
    });

}