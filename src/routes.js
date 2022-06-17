import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import SignUpPatient from './pages/SignUpPatient'
import Menu from './pages/Menu'
import Schedule from './pages/Schedule'
import Login from './pages/Login/Login'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={ <Login />} />
                <Route path="/menu" element={ <Menu />} />
                <Route path="/signupPatient" element={ <SignUpPatient />} />
                <Route path="/schedule" element={ <Schedule />} />
            </Routes>
        </BrowserRouter>
    )
}