import { contextBridge, ipcRenderer } from 'electron'
import { ElectronAPI, electronAPI } from '@electron-toolkit/preload'

// criando uma interface global para o window e adicionando o electron e api para serem acessados no renderer
declare global {
  export interface Window{
    electron: ElectronAPI
    api: typeof api
  }
}

// Custom APIs for renderer
const api = {
  onNewCustomer: (callback: () => void) => {
    ipcRenderer.on('new-customer', callback)

    // O retorno da função é uma função que remove o listener
    return () => {
      ipcRenderer.off('new-customer', callback)
    }
  },
  fetchUsers: () => {
    //INVOKE -> Envia uma mensagem para o processo principal e espera uma resposta
    return ipcRenderer.invoke('fetch-users')
  }
}

// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
