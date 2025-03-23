import { app, shell, BrowserWindow, ipcMain } from 'electron'
import path, { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { createFileRoute, createURLRoute } from 'electron-router-dom'
import { createTray } from './tray'
import './ipc'
import '../database/runMigrations'
import './store'
import { createShortcuts } from './shortcuts'



function createWindow(): void {
  
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    backgroundColor: '#030712',
    //mudar o icone para linux
    ...(process.platform === 'linux' ? { 
      icon: join(__dirname, "resources", "icon.png")
    } : process.platform === 'win32' ? {
      icon: join(__dirname, "resources", "icon.png")
    } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  // chamar para exibir o tray
  createTray(mainWindow)
  createShortcuts(mainWindow)

  //mudar icone para mac
  if(process.platform === 'darwin') {
    const iconPath = path.resolve(__dirname, 'resources', 'icon.png')
    app.dock.setIcon(iconPath)
  }

  

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const devServerUrl = createURLRoute(process.env['ELECTRON_RENDERER_URL']!, 'main')
  const fileRoute = createFileRoute(
    join(__dirname, '../renderer/index.html'),
    'main'
  )

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(devServerUrl)
  } else {
    mainWindow.loadFile(...fileRoute)
  }
}

function createAboutWindow(): void {
  
  const aboutWindow = new BrowserWindow({
    width: 500,
    height: 600,
    show: true,
    autoHideMenuBar: false,
    //mudar o icone para linux
    ...(process.platform === 'linux' ? { 
      icon: join(__dirname, "resources", "icon.png")
    } : process.platform === 'win32' ? {
      icon: join(__dirname, "resources", "icon.png")
    } : {}),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  //mudar icone para mac
  if(process.platform === 'darwin') {
    const iconPath = path.resolve(__dirname, 'resources', 'icon.png')
    app.dock.setIcon(iconPath)
  }

  aboutWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  const devServerUrl = createURLRoute(process.env['ELECTRON_RENDERER_URL']!, 'about')
  const fileRoute = createFileRoute(
    join(__dirname, '../renderer/index.html'),
    'about'
  )

  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    aboutWindow.loadURL(devServerUrl)
  } else {
    aboutWindow.loadFile(...fileRoute)
  }
}


app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  // IPC test
  ipcMain.on('ping', () => console.log('pong'))
  ipcMain.on('create-page-about', () => console.log('Alex Rangel'))

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
