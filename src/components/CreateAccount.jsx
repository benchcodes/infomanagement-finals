import React, { useState } from 'react'

const CreateAccount = () => {
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
    <div className="absolute top-1/2 left-1/2 md:left-auto md:right-24 lg:right-32 transform -translate-y-1/2 -translate-x-1/2 md:translate-x-0 bg-white border-2 border-gray-300 rounded-lg p-6 w-full max-w-md shadow-lg">
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
