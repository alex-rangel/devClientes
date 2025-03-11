import { Menu, Tray, nativeImage, BrowserWindow } from 'electron';
import path from 'node:path';

export function createTray(window: BrowserWindow){
    const appIcon = path.join(__dirname, "resources", "icon.png");
    const icon = nativeImage.createFromPath(appIcon);

    const tray = new Tray(icon);


    // menu que vai aparecer ao clicar no icone no tray
    const menu = Menu.buildFromTemplate([
        { label: "Dev clientes", enabled: false },
        { type: "separator" },
        {
            label: "Cadastrar cliente",
            click: () => {
              // Enviar mensagem do processo (main) para o processo (renderer)
              window.webContents.send("new-customer");
            
              // consdicional para verificar se a janela está minimizada e restaurar ela caso a janela esteja minimizada
              if(window.isMinimized()){
                window.restore()
                window.focus()
              }
            }
          },
          { 
            label: "Abrir",
            click: () => {
              window.show();
            }
          },
          { type: "separator" },
          {
            label: "Sair",
            role: "quit"
          }
        ]);

        // nome que vai aparecer ao passar o mouse por cima do icone no tray
        tray.setToolTip("Dev clientes");
        tray.setContextMenu(menu);
}