import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'

import SignUpPatient from './pages/SignUpPatient'
import Menu from './pages/Menu'
import Schedule from './pages/Schedule'
import Login from './pages/Login'
import Profile from './pages/Profile'
import PacientList from './pages/PacientList'
import Staff from './pages/Staff'
import ReportGraphic from './pages/ReportGraphic'
import PacientSearch from './pages/PacientSearch'
import Users from './pages/Users'
import RegisterStaff from './pages/RegisterStaff'

export default function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" exact element={ <Login />} />
                <Route path="/menu" element={ <Menu />} />
                <Route path="/signupPatient" element={ <SignUpPatient />} />
                <Route path="/schedule" element={ <Schedule />} />
                <Route path="/profile" element={ <Profile />} />
                <Route path="/pacientList" element={ <PacientList />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/reportGraphic" element={<ReportGraphic />} />
                <Route path="/pacientSearch" element={<PacientSearch />} />
                <Route path="/users" element={<Users />} />
                <Route path="/registerStaff" element={<RegisterStaff />} />
            </Routes>
        </BrowserRouter> 
    )
}