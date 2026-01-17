// ============================================
// App.jsx - Main Application Component
// ============================================
// This is the root component of the Smart Loyalty app.
// It handles:
// - User authentication (login/logout state)
// - Navigation between pages (landing, customer, cashier, admin)
// - Session persistence (stay logged in after refresh)
// ============================================

import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'
import Footer from './components/Footer'
import CustomerDashboard from './pages/CustomerDashboard'
import CashierDashboard from './pages/CashierDashboard'
import { MenuProvider } from './context/MenuContext'
import { ReservationProvider } from './context/ReservationContext'
import { UserProvider } from './context/UserContext'
import './App.css'

function App() {
  // ----------------------------------------
  // State Variables
  // ----------------------------------------
  
  // mode: Controls which form to show ('create' or 'login')
  const [mode, setMode] = useState('create')
  
  // selectedRole: Which role is logging in (null, 'customer', 'cashier', 'admin')
  const [selectedRole, setSelectedRole] = useState(null)
  
  // isLoggedIn: Whether user is currently logged in
  // Loads from localStorage so user stays logged in after refresh
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true'
  })
  
  // userRole: The role of the logged-in user ('customer', 'cashier', 'admin')
  const [userRole, setUserRole] = useState(() => {
    return localStorage.getItem('userRole') || null
  })
  
  // currentUsername: The username of the logged-in user (shown in "Welcome, ___!")
  const [currentUsername, setCurrentUsername] = useState(() => {
    return localStorage.getItem('currentUsername') || null
  })

  // ----------------------------------------
  // Handler: Select Role (from footer)
  // ----------------------------------------
  // Called when user clicks "Cashier" or "Admin" in the footer.
  // Switches to login mode with that role selected.
  const handleSelectRole = (role) => {
    setSelectedRole(role)
    setMode('login')
  }

  // ----------------------------------------
  // Handler: Logout / Go Home
  // ----------------------------------------
  // Called when user clicks "Logout" button.
  // Clears all login state and removes from localStorage.
  const handleGoHome = () => {
    setMode('create')
    setSelectedRole(null)
    setIsLoggedIn(false)
    setUserRole(null)
    setCurrentUsername(null)
    // Clear session from localStorage
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('userRole')
    localStorage.removeItem('currentUsername')
  }

  // ----------------------------------------
  // Handler: Switch Mode
  // ----------------------------------------
  // Switches between 'create' and 'login' forms.
  // Called when user clicks "Create Account" or "Log In" buttons.
  const handleSwitchMode = (newMode, role) => {
    setMode(newMode)
    if (role !== undefined) {
      setSelectedRole(role)
    }
  }

  // ----------------------------------------
  // Handler: Login Success
  // ----------------------------------------
  // Called after successful login.
  // Saves session to state and localStorage.
  const handleLoginSuccess = (role, username) => {
    setIsLoggedIn(true)
    setUserRole(role)
    setCurrentUsername(username)
    // Save session to localStorage (persists after refresh)
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userRole', role)
    localStorage.setItem('currentUsername', username)
  }

  // ----------------------------------------
  // Handler: Create Account Success
  // ----------------------------------------
  // Called after successful account creation.
  // Automatically logs in as customer and saves session.
  const handleCreateAccountSuccess = (username) => {
    setIsLoggedIn(true)
    setUserRole('customer')
    setCurrentUsername(username)
    // Save session to localStorage
    localStorage.setItem('isLoggedIn', 'true')
    localStorage.setItem('userRole', 'customer')
    localStorage.setItem('currentUsername', username)
  }

  // ----------------------------------------
  // Main Render
  // ----------------------------------------
  // Wraps everything in Context Providers so all components
  // can access menu items, reservations, and users.
  return (
    <MenuProvider>
      <ReservationProvider>
        <UserProvider>
          {renderContent()}
        </UserProvider>
      </ReservationProvider>
    </MenuProvider>
  )

  // ----------------------------------------
  // Function: Render Content Based on Login State
  // ----------------------------------------
  function renderContent() {
    // If logged in as customer, show CustomerDashboard
    if (isLoggedIn && userRole === 'customer') {
      return <CustomerDashboard onLogout={handleGoHome} username={currentUsername} />
    }

    // If logged in as cashier, show CashierDashboard
    if (isLoggedIn && userRole === 'cashier') {
      return <CashierDashboard onLogout={handleGoHome} username={currentUsername} />
    }

    // If logged in as admin, show Admin placeholder
    if (isLoggedIn && userRole === 'admin') {
      return (
        <div className="min-h-screen flex items-center justify-center bg-orange-100">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Admin Dashboard</h1>
            <p className="text-xl mb-4">Coming soon...</p>
            <button 
              onClick={handleGoHome}
              className="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700"
            >
              Logout
            </button>
          </div>
        </div>
      )
    }

    // Not logged in - show landing page with login/create forms
    return (
      <div className="min-h-screen flex flex-col">
        <Header isLoggedIn={false} />
        <main className="relative flex-1 pt-20">
          <Hero />
          {/* Show CreateAccount or Login form based on mode */}
          {mode === 'create' ? (
            <CreateAccount 
              onSwitchMode={handleSwitchMode} 
              onSuccess={handleCreateAccountSuccess}
            />
          ) : (
            <Login 
              role={selectedRole} 
              onSwitchMode={handleSwitchMode}
              onSuccess={handleLoginSuccess}
            />
          )}
        </main>
        <Footer onSelectRole={handleSelectRole} onGoHome={handleGoHome} />
      </div>
    )
  }
}

export default App