import { useState } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [mode, setMode] = useState('create')
  const [selectedRole, setSelectedRole] = useState(null)

  const handleSelectRole = (role) => {
    setSelectedRole(role)
    setMode('login')
  }

  const handleGoHome = () => {
    setMode('create')
    setSelectedRole(null)
  }

  const handleSwitchMode = (newMode, role) => {
    setMode(newMode)
    if (role !== undefined) {
      setSelectedRole(role)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="relative flex-1">
        <Hero />
        {mode === 'create' ? (
          <CreateAccount onSwitchMode={handleSwitchMode} />
        ) : (
          <Login role={selectedRole} onSwitchMode={handleSwitchMode} />
        )}
      </main>
      <Footer onSelectRole={handleSelectRole} onGoHome={handleGoHome} />
    </div>
  )
}

export default App