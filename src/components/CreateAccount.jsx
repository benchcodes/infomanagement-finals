import React, { useState } from 'react'

const CreateAccount = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  })
  const [successMessage, setSuccessMessage] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = () => {
    if (formData.email && formData.username && formData.password.length >= 6) {
      console.log('Account created:', formData)
      setSuccessMessage('Account created successfully!')
      setTimeout(() => {
        setSuccessMessage('')
        setFormData({ email: '', username: '', password: '' })
      }, 2000)
    }
  }

  return (
    <div className="absolute top-1/2 right-8 md:right-24 lg:right-32 transform -translate-y-1/2 bg-white border-2 border-black rounded-lg p-6 w-full max-w-md shadow-lg z-10 animate-slide-in-right">
      <div className="flex justify-center gap-4 mb-4">
        <button
          className="px-4 py-2 font-semibold rounded-md bg-orange-600 text-white"
        >
          Create Account
        </button>
        <button
          onClick={() => onSwitchMode && onSwitchMode('login', null)}
          className="px-4 py-2 font-semibold rounded-md bg-white text-orange-600 border-2 border-orange-600 hover:bg-orange-50 transition duration-200"
        >
          Log In
        </button>
      </div>
      
      <h2 className="text-3xl font-bold text-center mb-6">CREATE ACCOUNT</h2>
      
      {successMessage && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded-lg text-center">
          {successMessage}
        </div>
      )}
      
      <div className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
          required
        />
        
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password (min. 6 characters)"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
          required
        />
        
        <button
          onClick={handleSubmit}
          className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition duration-200"
        >
          Create Account
        </button>
      </div>
    </div>
  )
}

export default CreateAccount