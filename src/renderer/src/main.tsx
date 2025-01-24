import './styles/global.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { Home } from './pages/home'
import { Routes } from './routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Routes/>
  </React.StrictMode>
)
