// ============================================
// CreateAccount.jsx - User Registration Form
// ============================================
// This component allows new users to create an account.
// It collects email, username, and password.
// On success, the user is added to UserContext and logged in.
// ============================================

import React, { useState } from 'react'
import { useUsers } from '../context/UserContext'

// Props:
// - onSwitchMode: Function to switch to Login form
// - onSuccess: Function called after successful registration (logs user in)
const CreateAccount = ({ onSwitchMode, onSuccess }) => {
  // ----------------------------------------
  // State: Form Data
  // ----------------------------------------
  // Stores the values from the input fields
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  })
  
  // State: Success message shown after account creation
  const [successMessage, setSuccessMessage] = useState('')

  // ----------------------------------------
  // Handler: Input Change
  // ----------------------------------------
  // Updates formData when user types in any input field.
  // Uses the input's 'name' attribute to know which field to update.
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Get addUser function from UserContext to save new users
  const { addUser } = useUsers()

  // ----------------------------------------
  // Handler: Form Submit
  // ----------------------------------------
  // Validates the form and creates the account.
  // Requirements: email, username, password (min 6 chars)
  const handleSubmit = () => {
    // Validate all fields are filled
    if (formData.email && formData.username && formData.password.length >= 6) {
      
      // Save values before they get cleared by setFormData
      const username = formData.username
      const email = formData.email
      
      // Add user to global store (UserContext)
      // This saves the user to localStorage for persistence
      if (addUser) addUser({ username, email })
      
      // Show success message
      setSuccessMessage('Account created successfully! Redirecting...')
      
      // Wait 1.5 seconds, then redirect to dashboard
      setTimeout(() => {
        setSuccessMessage('')
        setFormData({ email: '', username: '', password: '' })
        // Call onSuccess to log user in and navigate to dashboard
        if (onSuccess) onSuccess(username)
      }, 1500)
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 md:absolute md:inset-auto md:top-1/2 md:right-8 lg:right-24 xl:right-32 md:transform md:-translate-y-1/3 md:p-0 z-10">
      <div className="bg-white border-2 border-black rounded-lg p-4 sm:p-6 w-full max-w-sm sm:max-w-md shadow-lg animate-slide-in-right">
      <div className="flex justify-center gap-2 sm:gap-4 mb-4">
        <button
          className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold rounded-md bg-orange-600 text-white"
        >
          Create Account
        </button>
        <button
          onClick={() => onSwitchMode && onSwitchMode('login', null)}
          className="px-3 sm:px-4 py-2 text-sm sm:text-base font-semibold rounded-md bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 transition duration-200"
        >
          Log In
        </button>
      </div>
      
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 sm:mb-6">CREATE ACCOUNT</h2>
      
      {successMessage && (
        <div className="mb-4 p-2 sm:p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center text-sm sm:text-base">
          {successMessage}
        </div>
      )}
      
      <div className="space-y-3 sm:space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 text-sm sm:text-base"
          required
        />
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 text-sm sm:text-base"
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password (min. 6 characters)"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 sm:px-4 py-2 sm:py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600 text-sm sm:text-base"
          required
        />
        
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-600 text-white font-bold py-2 sm:py-3 rounded-lg hover:bg-orange-700 transition duration-200 text-sm sm:text-base"
        >
          Create Account
        </button>
      </div>
      </div>
    </div>
  )
}

export default CreateAccount