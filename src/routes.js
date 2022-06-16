import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import SignUpPatient from './pages/SignUpPatient'
import Menu from './pages/Menu'
import Schedule from './pages/Schedule'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signupPatient" exact element={ <SignUpPatient />} />
                <Route path="/menu" element={ <Menu />} />
                <Route path="/schedule" element={ <Schedule />} />
            </Routes>
        </BrowserRouter>
    )
}