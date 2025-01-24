import { Router, Route } from 'electron-router-dom'


import { Home } from './src/pages/home'
import { Sobre } from './src/pages/sobre'

export function Routes() {
    return (
        <Router

            main={
                <>
                    <Route path="/" element={<Home />} />
                </>
            }
            about={
                <>
                    <Route path="/" element={<Sobre />} />
                </>
            }


        />
    )
}


