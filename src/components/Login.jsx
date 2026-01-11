import React, { useState } from 'react'

const Login = ({ role, onSwitchMode, onSuccess }) => {
  const [formData, setFormData] = useState({ identifier: '', password: '' })
  const [errorMessage, setErrorMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    setErrorMessage('')
  }

  const handleSubmit = () => {
    if (formData.identifier && formData.password) {
      console.log('Login submitted for', role || 'customer', formData)
      setErrorMessage('')
      
      // Simulate successful login
      const userRole = role || 'customer'
      alert(`Successfully logged in as ${userRole}!`)
      setFormData({ identifier: '', password: '' })
      
      // Redirect based on role
      if (onSuccess) onSuccess(userRole)
    } else {
      setErrorMessage('Please fill in all fields')
    }
  }

  return (
    <div className="absolute top-1/2 right-8 md:right-24 lg:right-32 transform -translate-y-1/2 bg-white border-2 border-black rounded-lg p-6 w-full max-w-md shadow-lg z-10 animate-slide-in-right">
      {!role && (
        <div className="flex justify-center gap-4 mb-4">
          <button
            onClick={() => onSwitchMode && onSwitchMode('create', null)}
            className="px-4 py-2 font-semibold rounded-md bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 transition duration-200"
          >
            Create Account
          </button>
          <button
            className="px-4 py-2 font-semibold rounded-md bg-orange-600 text-white"
          >
            Log In
          </button>
        </div>
      )}

      <h2 className="text-3xl font-bold text-center mb-6">
        LOG IN{role ? ` — ${role.charAt(0).toUpperCase() + role.slice(1)}` : ''}
      </h2>

      {errorMessage && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-center">
          {errorMessage}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="text"
          name="identifier"
          placeholder="Email or Username"
          value={formData.identifier}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
          required
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition duration-200"
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
  )
}

export default Login