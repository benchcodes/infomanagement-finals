// ============================================
// MenuContext.jsx - Menu Items State Management
// ============================================
// This file manages the restaurant's menu items.
// Cashiers can add and delete menu items.
// Customers can see the menu and make reservations.
// ============================================

import { createContext, useState, useContext } from 'react'

// Create a React Context to share menu data across components
const MenuContext = createContext()

// ============================================
// useMenu Hook
// ============================================
// Custom hook to access menu data from any component.
// Usage: const { menuItems, addMenuItem, deleteMenuItem } = useMenu()
// ============================================
export const useMenu = () => {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error('useMenu must be used within MenuProvider')
  }
  return context
}

// ============================================
// MenuProvider Component
// ============================================
// Wraps the app and provides menu data to all child components.
// ============================================
export const MenuProvider = ({ children }) => {
  // ----------------------------------------
  // State: menuItems array
  // ----------------------------------------
  // Stores all menu items with id, name, and image.
  // Initialized with default items.
  // ----------------------------------------
  const [menuItems, setMenuItems] = useState([
    { id: 1, name: 'Burger', image: '' },
    { id: 2, name: 'Fries', image: '' },
    { id: 3, name: 'Pizza', image: '' },
    { id: 4, name: 'Soda', image: '' },
    { id: 5, name: 'Salad', image: '' },
    { id: 6, name: 'Ice Cream', image: '' }
  ])

  // ----------------------------------------
  // Function: addMenuItem
  // ----------------------------------------
  // Adds a new item to the menu.
  // Called by cashier from CashierDashboard.
  // ----------------------------------------
  const addMenuItem = (itemName) => {
    const newItem = {
      id: Date.now(),    // Unique ID based on timestamp
      name: itemName,    // Name of the food item
      image: ''          // Placeholder for image URL
    }
    setMenuItems([...menuItems, newItem])
  }

  // ----------------------------------------
  // Function: deleteMenuItem
  // ----------------------------------------
  // Removes an item from the menu.
  // Called by cashier from CashierDashboard.
  // ----------------------------------------
  const deleteMenuItem = (itemId) => {
    setMenuItems(menuItems.filter(item => item.id !== itemId))
  }

  // ----------------------------------------
  // Provide data to child components
  // ----------------------------------------
  return (
    <MenuContext.Provider value={{ menuItems, addMenuItem, deleteMenuItem }}>
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContext