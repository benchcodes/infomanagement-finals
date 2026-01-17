// ============================================
// UserContext.jsx - Global User State Management
// ============================================
// This file manages all registered users in the app.
// It stores users in localStorage so they persist after page refresh.
// ============================================

import React, { createContext, useContext, useState } from 'react'

// Create a React Context to share user data across all components
const UserContext = createContext()

// ============================================
// useUsers Hook
// ============================================
// Custom hook to access user data from any component.
// Usage: const { users, addUser, getUser } = useUsers()
// ============================================
export const useUsers = () => {
  const ctx = useContext(UserContext)
  // Throw error if used outside of UserProvider
  if (!ctx) throw new Error('useUsers must be used within UserProvider')
  return ctx
}

// ============================================
// UserProvider Component
// ============================================
// Wraps the app and provides user data to all child components.
// This is used in App.jsx to wrap the entire application.
// ============================================
export const UserProvider = ({ children }) => {
  // ----------------------------------------
  // State: users array
  // ----------------------------------------
  // Initialize users from localStorage (so data survives page refresh)
  // If no data exists, start with empty array []
  const [users, setUsers] = useState(() => {
    try {
      const raw = localStorage.getItem('users')
      const parsed = raw ? JSON.parse(raw) : []
      return parsed
    } catch (e) {
      return []
    }
  })

  // ----------------------------------------
  // Function: addUser
  // ----------------------------------------
  // Adds a new user to the users array.
  // Called when someone creates an account.
  // - Checks if username/email already exists (prevents duplicates)
  // - Assigns a unique ID and 100 starting loyalty points
  // ----------------------------------------
  const addUser = (user) => {
    setUsers(prev => {
      // Check if user already exists by username or email
      const exists = prev.some(u => u.username === user.username || u.email === user.email)
      if (exists) {
        return prev // Don't add duplicate, return unchanged array
      }
      // Create new user with ID and 100 starting points
      const newUser = { id: Date.now(), points: 100, ...user }
      return [...prev, newUser] // Add to array
    })
  }

  // ----------------------------------------
  // Function: getUser
  // ----------------------------------------
  // Finds a user by their username OR email.
  // Called during login to verify account exists.
  // Returns the user object, or undefined if not found.
  // ----------------------------------------
  const getUser = (usernameOrEmail) => {
    return users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail)
  }

  // ----------------------------------------
  // Effect: Auto-save to localStorage
  // ----------------------------------------
  // Whenever users array changes, save it to localStorage.
  // This ensures data persists after page refresh.
  // ----------------------------------------
  React.useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users))
    } catch (e) {
      // Ignore errors (e.g., localStorage full)
    }
  }, [users])

  // ----------------------------------------
  // Provide data to child components
  // ----------------------------------------
  // Any component inside UserProvider can access:
  // - users: array of all registered users
  // - addUser: function to register a new user
  // - getUser: function to find a user by username/email
  // ----------------------------------------
  return (
    <UserContext.Provider value={{ users, addUser, getUser }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext
