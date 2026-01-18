// ============================================
// UserContext.jsx - Global User State Management - FIXED
// ============================================
// This file manages all registered users in the app.
// CLEARED ON EVERY PAGE REFRESH (no localStorage persistence)
// BUT points are saved during the session
// ============================================

import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

export const useUsers = () => {
  const ctx = useContext(UserContext)
  if (!ctx) throw new Error('useUsers must be used within UserProvider')
  return ctx
}

export const UserProvider = ({ children }) => {
  // ----------------------------------------
  // State: users array
  // ----------------------------------------
  const [users, setUsers] = useState([])

  // ----------------------------------------
  // Function: addUser
  // ----------------------------------------
  const addUser = (user) => {
    const exists = users.some(u => u.username === user.username || u.email === user.email)
    if (exists) {
      console.log('User already exists')
      return
    }
    
    const newUser = { id: Date.now(), points: 100, ...user }
    const newUsers = [...users, newUser]
    
    setUsers(newUsers)
  }

  // ----------------------------------------
  // Function: getUser
  // ----------------------------------------
  const getUser = (usernameOrEmail) => {
    return users.find(u => u.username === usernameOrEmail || u.email === usernameOrEmail)
  }

  // ----------------------------------------
  // Function: updateUserPoints - NEW!
  // ----------------------------------------
  // Updates a user's loyalty points
  // Called when customer makes a reservation
  const updateUserPoints = (usernameOrEmail, newPoints) => {
    setUsers(prevUsers => 
      prevUsers.map(u => 
        (u.username === usernameOrEmail || u.email === usernameOrEmail)
          ? { ...u, points: newPoints }
          : u
      )
    )
  }

  // ----------------------------------------
  // Provide data to child components
  // ----------------------------------------
  return (
    <UserContext.Provider value={{ users, addUser, getUser, updateUserPoints }}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContext