import { useState } from 'react'
import Dashboard from './Dashboard/Dashboard'
import CitizenPortal from './Citizen/CitizenPortal'
import AdminDashboard from './Admin/AdminDashboard'
import './App.css'

function App() {
  const [currentView, setCurrentView] = useState('dashboard')
  const [userRole, setUserRole] = useState(null)

  const handleLogin = (role) => {
    setUserRole(role)
    
    // Navigate to appropriate portal based on role
    if (role === 'citizen') {
      setCurrentView('citizen')
    } else if (role === 'admin') {
      setCurrentView('admin')
    } else if (role === 'dataanalysts') {
      setCurrentView('dataanalysts')
    } else if (role === 'electionobserver') {
      setCurrentView('electionobserver')
    }
  }

  const handleLogout = () => {
    setUserRole(null)
    setCurrentView('dashboard')
  }

  return (
    <>
      {currentView === 'dashboard' && <Dashboard onLogin={handleLogin} />}
      {currentView === 'citizen' && <CitizenPortal onLogout={handleLogout} />}
      {currentView === 'admin' && <AdminDashboard onLogout={handleLogout} />}
      {/* Add other role portals here as needed */}
    </>
  )
}

export default App

