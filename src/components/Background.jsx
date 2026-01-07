import React from 'react'

const Background = ({ children }) => {
  return (
    <div className="w-full bg-gradient-to-r from-orange-500 to-orange-300 flex items-center justify-end pr-32 -mt-10 relative z-10 mb-0 py-3 overflow-hidden">
      {children}
    </div>
  )
}

export default Background
