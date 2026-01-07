import Header from './components/Header'
import Hero from './components/Hero'
import CreateAccount from './components/CreateAccount'
import Footer from './components/Footer'
import './App.css'

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="relative flex-1">
        <Hero />
        <CreateAccount />
      </main>
      <Footer />
    </div>
  )
}

export default App
