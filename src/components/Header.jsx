import React from 'react'

const Header = () => {
  return (
    <header className="bg-orange-600 text-white px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="bg-white rounded-lg p-2 w-10 h-10 flex items-center justify-center">
          <span className="text-orange-600 font-bold text-lg">📦</span>
        </div>
        <h1 className="text-2xl font-bold">SMART LOYALTY</h1>
      </div>
      <button className="text-white">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
    </header>
  )
}

export default Header