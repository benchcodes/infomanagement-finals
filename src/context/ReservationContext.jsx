// ============================================
// ReservationContext.jsx - Reservation State Management
// ============================================
// This file manages all reservations made by customers.
// Reservations can be created, cancelled, or completed.
// Cashiers can see pending reservations and mark them done.
// ============================================

import { createContext, useState, useContext } from 'react'

// Create a React Context to share reservation data across components
const ReservationContext = createContext()

// ============================================
// useReservations Hook
// ============================================
// Custom hook to access reservation functions from any component.
// Usage: const { addReservation, getPendingReservations } = useReservations()
// ============================================
export const useReservations = () => {
  const context = useContext(ReservationContext)
  if (!context) {
    throw new Error('useReservations must be used within ReservationProvider')
  }
  return context
}

// ============================================
// ReservationProvider Component
// ============================================
// Wraps the app and provides reservation data to all child components.
// ============================================
export const ReservationProvider = ({ children }) => {
  // ----------------------------------------
  // State: reservations array
  // ----------------------------------------
  // Stores all reservations (pending, completed, cancelled)
  const [reservations, setReservations] = useState([])

  // ----------------------------------------
  // Function: addReservation
  // ----------------------------------------
  // Creates a new reservation.
  // Called when a customer submits the reservation form.
  // Adds unique ID, timestamp, and 'pending' status.
  // ----------------------------------------
  const addReservation = (reservation) => {
    const newReservation = {
      id: Date.now(),                        // Unique ID based on timestamp
      ...reservation,                         // Spread the form data (item, date, time, quantity)
      createdAt: new Date().toISOString(),   // When it was created
      status: 'pending'                       // Status: pending, completed, or cancelled
    }
    setReservations(prev => [...prev, newReservation])
    return newReservation
  }

  // ----------------------------------------
  // Function: cancelReservation
  // ----------------------------------------
  // Removes a reservation completely.
  // Called when customer or cashier clicks the X button.
  // ----------------------------------------
  const cancelReservation = (id) => {
    setReservations(prev => prev.filter(r => r.id !== id))
  }

  // ----------------------------------------
  // Function: completeReservation
  // ----------------------------------------
  // Marks a reservation as completed.
  // Called when cashier clicks "Complete" button.
  // ----------------------------------------
  const completeReservation = (id) => {
    setReservations(prev => prev.map(r => 
      r.id === id ? { ...r, status: 'completed' } : r
    ))
  }

  // ----------------------------------------
  // Function: getPendingReservations
  // ----------------------------------------
  // Returns only reservations with status 'pending'.
  // Used by CashierDashboard to show what needs to be prepared.
  // ----------------------------------------
  const getPendingReservations = () => {
    return reservations.filter(r => r.status === 'pending')
  }

  // ----------------------------------------
  // Function: getCustomerReservations
  // ----------------------------------------
  // Returns all reservations for a specific customer.
  // Used to show "My Reservations" in CustomerDashboard.
  // ----------------------------------------
  const getCustomerReservations = (customerName) => {
    return reservations.filter(r => r.customerName === customerName)
  }

  // ----------------------------------------
  // Provide functions to child components
  // ----------------------------------------
  return (
    <ReservationContext.Provider value={{ 
      reservations,              // All reservations array
      addReservation,            // Create new reservation
      cancelReservation,         // Delete a reservation
      completeReservation,       // Mark as completed
      getPendingReservations,    // Get only pending ones
      getCustomerReservations    // Get reservations by customer
    }}>
      {children}
    </ReservationContext.Provider>
  )
}

export default ReservationContext