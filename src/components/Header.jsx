import React from 'react'

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="bg-orange-600 text-white px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="flex items-center gap-3">
        <div className="bg-white rounded-full p-2 w-20 h-20 flex items-center justify-center">
          <img 
            src="/logo.png" 
            alt="Smart Loyalty Logo" 
            className="w-full h-full object-contain rounded-full"
          />
        </div>
        <h1 className="text-3xl font-bold">SMART LOYALTY</h1>
      </div>
      
      {isLoggedIn ? (
        // Navigation for logged-in users (CustomerDashboard)
        <nav className="flex items-center gap-8">
          <button className="text-white hover:text-orange-200 font-semibold text-lg transition duration-200">
            Menu
          </button>
          <button className="text-white hover:text-orange-200 font-semibold text-lg transition duration-200">
            Reservation
          </button>
          <button className="text-white hover:text-orange-200 font-semibold text-lg transition duration-200">
            Points
          </button>
          <button 
            onClick={onLogout}
            className="bg-orange-800 hover:bg-orange-900 text-white px-6 py-2 rounded-lg font-bold text-lg transition duration-200"
          >
            Logout
          </button>
        </nav>
      ) : (
        // Hamburger menu for landing page
        <button className="text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}
    </header>
  )
}

export default Header