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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="relative flex-1">
        <Hero />
        {mode === 'create' ? (
          <CreateAccount />
        ) : (
          <Login role={selectedRole} />
        )}
      </main>
      <Footer onSelectRole={handleSelectRole} />
    </div>
  )
}

export default App
