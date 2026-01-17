// ============================================
// CashierDashboard.jsx - Cashier's Main Page
// ============================================
// This is the main dashboard for logged-in cashiers.
// Features:
// - View and manage pending reservations
// - Add items to cart and checkout
// - Add/delete menu items
// - Look up customer information and points
// - View all registered customers
// ============================================

import { useState, useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useMenu } from '../context/MenuContext'
import { useReservations } from '../context/ReservationContext'
import { useUsers } from '../context/UserContext'

// Props:
// - onLogout: Function to log out and return to landing page
// - username: The logged-in cashier's username
const CashierDashboard = ({ onLogout, username }) => {
  // ----------------------------------------
  // Context Hooks
  // ----------------------------------------
  // Menu functions: view items, add new items, delete items
  const { menuItems, addMenuItem, deleteMenuItem } = useMenu()
  // Reservation functions: view pending, complete, cancel
  const { getPendingReservations, completeReservation, cancelReservation, getCustomerReservations } = useReservations()
  // User data: list of all registered customers
  const { users } = useUsers()
  
  // ----------------------------------------
  // State Variables
  // ----------------------------------------
  
  // Input for adding new menu items
  const [newItemName, setNewItemName] = useState('')
  
  // Shopping cart items
  const [cart, setCart] = useState([])
  
  // Customer lookup input
  const [searchUsername, setSearchUsername] = useState(username || '')
  
  // Currently displayed customer info
  const [customerInfo, setCustomerInfo] = useState({
    name: username || 'Bench',
    points: 100
  })
  
  // Toggle for reservations panel visibility
  const [showReservations, setShowReservations] = useState(true)

  // ----------------------------------------
  // Effect: Sync with username prop
  // ----------------------------------------
  // When username changes, update the customer info display
  useEffect(() => {
    if (username) {
      setCustomerInfo(prev => ({ ...prev, name: username }))
      setSearchUsername(username)
      // Calculate points based on reservations
      const reservations = getCustomerReservations ? getCustomerReservations(username) : []
      const points = reservations.length * 10
      setCustomerInfo({ name: username, points })
    }
  }, [username])

  // ----------------------------------------
  // Handler: Look Up Customer
  // ----------------------------------------
  // Searches for a customer and displays their info/points
  const handleLookupCustomer = () => {
    if (!searchUsername) {
      alert('Please enter a username to look up')
      return
    }

    // Calculate points: base 100 + 10 per reservation
    const reservations = getCustomerReservations ? getCustomerReservations(searchUsername) : []
    const foundUser = users.find(u => u.username === searchUsername || u.email === searchUsername)
    const basePoints = foundUser?.points || 100
    const points = basePoints + (reservations.length * 10)

    setCustomerInfo({ name: searchUsername, points })
  }

  // Get all pending reservations to display
  const pendingReservations = getPendingReservations()

  // ----------------------------------------
  // Handler: Add Item to Cart
  // ----------------------------------------
  // Adds a menu item to the shopping cart
  // If item already exists, increases quantity
  const addToCart = (item) => {
    const existingItem = cart.find(cartItem => cartItem.name === item.name)
    if (existingItem) {
      // Increase quantity of existing item
      setCart(cart.map(cartItem => 
        cartItem.name === item.name 
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ))
    } else {
      // Add new item to cart
      setCart([...cart, { id: item.id, name: item.name, quantity: 1, price: 5 }])
    }
  }

  // ----------------------------------------
  // Helper: Calculate Cart Total
  // ----------------------------------------
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  // ----------------------------------------
  // Handler: Checkout
  // ----------------------------------------
  // Completes the order and clears the cart
  const handleCheckout = () => {
    alert('Checkout successful!')
    setCart([])
  }

  // ----------------------------------------
  // Handler: Add New Menu Item
  // ----------------------------------------
  // Adds a new item to the menu
  const handleAddNewItem = () => {
    if (newItemName.trim()) {
      addMenuItem(newItemName.trim())
      setNewItemName('')
      alert(`"${newItemName}" added to menu!`)
    }
  }

  // ----------------------------------------
  // Handler: Complete Reservation
  // ----------------------------------------
  // Marks a reservation as completed
  const handleCompleteReservation = (id) => {
    completeReservation(id)
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 pt-20">
      <Header isLoggedIn={true} onLogout={onLogout} />

      <main className="flex-1 flex p-6 gap-6">
        <aside className="w-96 space-y-6">
          {/* Reservations Panel - NEW! */}
          <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-md">
            <div 
              className="bg-purple-700 text-white px-6 py-4 flex items-center justify-between cursor-pointer hover:bg-purple-800 transition"
              onClick={() => setShowReservations(!showReservations)}
            >
              <h2 className="text-2xl font-bold">
                RESERVATIONS ({pendingReservations.length})
              </h2>
              <span className="text-2xl">{showReservations ? '▼' : '▶'}</span>
            </div>
            
            {showReservations && (
              <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
                {pendingReservations.length === 0 ? (
                  <p className="text-gray-500 text-center py-4">No pending reservations</p>
                ) : (
                  pendingReservations.map(res => (
                    <div key={res.id} className="bg-purple-50 border-2 border-purple-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="font-bold text-lg">{res.itemName}</div>
                          <div className="text-sm text-gray-600">by {res.customerName}</div>
                        </div>
                        <span className="bg-yellow-400 text-yellow-900 px-2 py-1 rounded-full text-xs font-bold">
                          PENDING
                        </span>
                      </div>
                      <div className="text-sm space-y-1 mb-3">
                        <div>📅 {new Date(res.date).toLocaleDateString('en-US', { 
                          weekday: 'short', 
                          month: 'short', 
                          day: 'numeric' 
                        })}</div>
                        <div>🕐 {res.time}</div>
                        <div>📦 Qty: {res.quantity}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleCompleteReservation(res.id)}
                          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded-lg transition"
                        >
                          ✓ Complete
                        </button>
                        <button
                          onClick={() => cancelReservation(res.id)}
                          className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg transition"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Today's Menu */}
          <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-md">
            <div className="bg-orange-700 text-white px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold">TODAY'S MENU</h2>
              <span className="text-2xl">▼</span>
            </div>
            
            <div className="px-6 py-4 bg-orange-50 border-b-2 border-gray-300">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddNewItem()}
                  placeholder="New item name..."
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-600"
                />
                <button
                  onClick={handleAddNewItem}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg transition duration-200"
                >
                  Add Item
                </button>
              </div>
            </div>
            
            <div className="divide-y-2 divide-gray-300">
              {menuItems.map((item) => (
                <div key={item.id} className="px-6 py-5 flex items-center justify-between hover:bg-gray-50 transition duration-200">
                  <span className="text-xl text-gray-700">{item.name}</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-2 rounded-full transition duration-200"
                    >
                      ADD
                    </button>
                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-full transition duration-200"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customers Section */}
          <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-md">
            <div className="bg-orange-700 text-white px-6 py-4">
              <h2 className="text-2xl font-bold">CUSTOMERS</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-3">
                <label className="text-lg font-medium whitespace-nowrap">Username:</label>
                <input
                  type="text"
                  value={searchUsername}
                  onChange={(e) => setSearchUsername(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleLookupCustomer()}
                  className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-orange-600"
                  placeholder=""
                />
                <button
                  onClick={handleLookupCustomer}
                  className="bg-orange-600 hover:bg-orange-700 text-white font-bold px-4 py-2 rounded-lg transition duration-200"
                >
                  Lookup
                </button>
              </div>
              
              {customerInfo && (
                <div className="pt-4">
                  <div className="flex items-center justify-between text-lg">
                    <span className="font-medium">{customerInfo.name}</span>
                    <span>Points: <span className="font-bold">{customerInfo.points}</span></span>
                  </div>
                </div>
              )}

              {/* Live customers list */}
              {users && users.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-semibold mb-2">All Customers</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {users.map(u => (
                      <div key={u.id} className="flex items-center justify-between text-sm bg-orange-50 p-2 rounded">
                        <span className="truncate">{u.username || u.email}</span>
                        <button
                          onClick={() => {
                            setSearchUsername(u.username || u.email)
                            const reservations = getCustomerReservations ? getCustomerReservations(u.username || u.email) : []
                            const basePoints = u.points || 100
                            setCustomerInfo({ name: u.username || u.email, points: basePoints + (reservations.length * 10) })
                          }}
                          className="text-orange-700 font-semibold ml-2"
                        >
                          Select
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* Right Section - Cart */}
        <section className="flex-1">
          <div className="bg-white border-2 border-gray-300 rounded-xl overflow-hidden shadow-md h-full flex flex-col">
            <div className="bg-orange-700 text-white px-6 py-4">
              <h2 className="text-2xl font-bold">CART</h2>
            </div>
            
            <div className="flex-1 flex flex-col">
              <div className="flex-1 divide-y-2 divide-gray-300">
                {cart.map((item) => (
                  <div key={item.id} className="px-6 py-5 flex items-center justify-between">
                    <span className="text-xl text-gray-700">{item.name}</span>
                    <span className="text-xl text-gray-700">x{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="border-t-2 border-gray-300 p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold">Total</span>
                  <span className="text-2xl font-bold">${calculateTotal()}</span>
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={handleCheckout}
                    className="bg-orange-700 hover:bg-orange-800 text-white font-bold px-8 py-3 rounded-lg text-xl transition duration-200"
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer showLinks={false} />
    </div>
  )
}

export default CashierDashboard