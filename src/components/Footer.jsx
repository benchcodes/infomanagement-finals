import React from 'react'

const Footer = ({ onSelectRole }) => {
  const handleClick = (e, role) => {
    e.preventDefault()
    if (onSelectRole) onSelectRole(role)
  }

  return (
    <footer className="bg-orange-600 text-white text-center py-3">
      <p className="text-sm">© Smart Loyalty &nbsp;|&nbsp; 
        <a href="#" onClick={(e) => handleClick(e, 'cashier')} className="underline hover:text-orange-200">Cashier</a>
        <span className="mx-2">|</span>
        <a href="#" onClick={(e) => handleClick(e, 'admin')} className="underline hover:text-orange-200">Admin</a>
      </p>
    </footer>
  )
}

export default Footer
