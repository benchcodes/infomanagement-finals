import React, { useState } from 'react'

const CreateAccount = ({ onSwitchMode }) => {
  const [formData, setFormData] = useState({
    email: '',
    username: '',
    password: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
  }

  return (
    <div className="relative md:absolute top-auto md:top-1/2 left-1/2 md:left-auto md:right-24 lg:right-32 transform md:-translate-y-1/2 -translate-x-1/2 md:translate-x-0 bg-white border-3 border-black rounded-lg p-6 w-full max-w-md shadow-lg mx-4 md:mx-0">
      <div className="flex justify-center gap-4 mb-4">
        <button
          onClick={() => onSwitchMode && onSwitchMode('create')}
          className="px-4 py-2 font-semibold rounded-md bg-orange-600 text-white"
        >
          Create Account
        </button>
        <button
          onClick={() => onSwitchMode && onSwitchMode('login')}
          className="px-4 py-2 font-semibold rounded-md bg-white text-orange-600 border-2 border-orange-600"
        >
          Log In
        </button>
      </div>
        <h2 className="text-3xl font-bold text-center mb-8">CREATE ACCOUNT</h2>
        
        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-orange-600"
            required
          />
          
          <button
            type="submit"
            className="w-full bg-orange-600 text-white font-bold py-3 rounded-lg hover:bg-orange-700 transition duration-200"
          >
            Sign In
          </button>
        </form>
      </div>
  )
}

export default CreateAccount
