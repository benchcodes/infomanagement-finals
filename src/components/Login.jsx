// ============================================
// Login.jsx - User Login Form - FIXED
// ============================================
// This component allows existing users to log in.
// Users can log in with either their username OR email.
// For customers, it verifies the account exists in UserContext.
// For cashier/admin, it allows login without verification (demo mode).
// ============================================

import React, { useState } from 'react'
import { useUsers } from '../context/UserContext'

// Props:
// - role: Pre-selected role ('cashier', 'admin') or null for customer
// - onSwitchMode: Function to switch to CreateAccount form
// - onSuccess: Function called after successful login
const Login = ({ role, onSwitchMode, onSuccess }) => {
  // ----------------------------------------
  // State: Form Data
  // ----------------------------------------
  // identifier: Can be username OR email
  // password: User's password
  const [formData, setFormData] = useState({ identifier: '', password: '' })
  
  // State: Error message shown when login fails
  const [errorMessage, setErrorMessage] = useState('')
  
  // Get getUser function from UserContext to verify account exists
  const { getUser } = useUsers()

  // ----------------------------------------
  // Handler: Input Change
  // ----------------------------------------
  // Updates formData and clears any error message
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrorMessage('') // Clear error when user types
  }

  // ----------------------------------------
  // Handler: Form Submit (Login) - FIXED
  // ----------------------------------------
  const handleSubmit = () => {
    // Validate: Both fields must be filled
    if (!formData.identifier || !formData.password) {
      setErrorMessage('Please fill in all fields')
      return
    }

    // Determine the role (default to 'customer' if none specified)
    const userRole = role || 'customer'
    
    // This will hold the name to display in "Welcome, ___!"
    let displayName = formData.identifier
    
    // For customers, verify the account exists
    if (userRole === 'customer') {
      // Look up user by username or email
      const user = getUser(formData.identifier)
      
      // If user not found, show error
      if (!user) {
        setErrorMessage('Account not found. Please create an account first.')
        return
      }
      
      // FIXED: Use the stored username for display, prioritize username over email
      displayName = user.username || user.email
    }
    // For cashier/admin, use what they typed as the display name
    else {
      displayName = formData.identifier
    }
    
    // Clear error and form
    setErrorMessage('')
    setFormData({ identifier: '', password: '' })
    
    // Call onSuccess to complete login
    if (onSuccess) onSuccess(userRole, displayName)
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 md:absolute md:inset-auto md:top-1/2 md:right-8 lg:right-24 xl:right-32 md:transform md:-translate-y-1/2 md:p-0 z-10">
      <div className="bg-white border-2 border-black rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-lg animate-slide-in-right">
      {!role && (
        <div className="flex justify-center gap-2 sm:gap-4 mb-4">
          <button
            onClick={() => onSwitchMode && onSwitchMode('create', null)}
            className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold rounded-md bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 transition duration-200"
          >
            Create Account
          </button>
          <button
            className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold rounded-md bg-orange-600 text-white"
          >
            Log In
          </button>
        </div>
      )}

      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">
        LOG IN{role ? ` — ${role.charAt(0).toUpperCase() + role.slice(1)}` : ''}
      </h2>

      {errorMessage && (
        <div className="mb-4 p-2 sm:p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center text-sm sm:text-base">
          {errorMessage}
        </div>
      )}

      <div className="space-y-3 sm:space-y-4">
        <input
          type="text"
          name="identifier"
          placeholder="Email or Username"
          value={formData.identifier}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 text-sm sm:text-base"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 text-sm sm:text-base"
          required
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-600 text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-orange-700 transition duration-200 text-sm sm:text-base"
        >
          Log In
        </button>
      </div>

      <div className="mt-4 text-center">
        <button className="text-sm text-orange-600 hover:underline">
          Forgot password?
        </button>
      </div>
      </div>
    </div>
  )
}

export default Login