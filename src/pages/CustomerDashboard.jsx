import { useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useMenu } from '../context/MenuContext'
import { useReservations } from '../context/ReservationContext'  // Add this

const CustomerDashboard = ({ onLogout }) => {
  const { menuItems } = useMenu()
  const { addReservation, cancelReservation, getCustomerReservations } = useReservations()  // Add this
  
  const [customerName] = useState('Bench')
  const [loyaltyPoints, setLoyaltyPoints] = useState(100)
  
  const [reservation, setReservation] = useState({
    item: '',
    date: '',
    quantity: 1,
    time: ''
  })
  const [showSuccess, setShowSuccess] = useState(false)

  const myReservations = getCustomerReservations(customerName)  // Get customer's reservations

  const generateTimeSlots = () => {
    const slots = []
    for (let hour = 9; hour <= 20; hour++) {
      slots.push(`${hour}:00`)
      if (hour < 20) slots.push(`${hour}:30`)
    }
    return slots
  }

  const generateDates = () => {
    const dates = []
    for (let i = 0; i < 14; i++) {
      const date = new Date()
      date.setDate(date.getDate() + i)
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric' 
        })
      })
    }
    return dates
  }

  const handleReservationChange = (field, value) => {
    setReservation(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleReserve = () => {
    if (!reservation.item || !reservation.date || !reservation.time) {
      alert('Please fill in all fields')
      return
    }

    const itemName = menuItems.find(item => item.id === parseInt(reservation.item))?.name

    addReservation({
      ...reservation,
      itemName,
      customerName
    })
    
    setLoyaltyPoints(prev => prev + 10)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)

    setReservation({
      item: '',
      date: '',
      quantity: 1,
      time: ''
    })
  }

  const timeSlots = generateTimeSlots()
  const dates = generateDates()

  return (
    <div className="min-h-screen flex flex-col bg-white-100 pt-20">
      <Header isLoggedIn={true} onLogout={onLogout} />

      {showSuccess && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-fade-in-down">
          ✓ Reservation confirmed! +10 loyalty points
        </div>
      )}

      <main className="flex-1 flex">
        <aside className="w-96 bg-orange-300 p-6 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <img 
              src="/Welcome.png" 
              alt="Welcome Logo" 
              className="w-25 h-15"
            />
            <h2 className="text-2xl font-bold">Welcome, {customerName}!</h2>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <img 
                  src="/Loyalty.png" 
                  alt="Loyalty Logo" 
                  className="w-20 h-12"
                />
                <span className="text-xl font-bold">Your Loyalty Points:</span>
              </div>
              <div className="bg-orange-600 text-white px-6 py-3 rounded-full text-2xl font-bold">
                {loyaltyPoints}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <img 
                src="/Reservation.png" 
                alt="Reservation Logo" 
                className="w-20 h-12"
              />
              <h3 className="text-2xl font-bold">Reservation</h3>
            </div>

            <div className="space-y-3">
              <select 
                value={reservation.item}
                onChange={(e) => handleReservationChange('item', e.target.value)}
                className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold text-lg appearance-none cursor-pointer hover:bg-orange-700 transition"
              >
                <option value="">Select Item</option>
                {menuItems.map(item => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>

              <select 
                value={reservation.date}
                onChange={(e) => handleReservationChange('date', e.target.value)}
                className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold text-lg appearance-none cursor-pointer hover:bg-orange-700 transition"
              >
                <option value="">Select Date</option>
                {dates.map(date => (
                  <option key={date.value} value={date.value}>
                    {date.label}
                  </option>
                ))}
              </select>

              <select 
                value={reservation.quantity}
                onChange={(e) => handleReservationChange('quantity', parseInt(e.target.value))}
                className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold text-lg appearance-none cursor-pointer hover:bg-orange-700 transition"
              >
                <option value="">Select Quantity</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                  <option key={num} value={num}>
                    {num} {num === 1 ? 'item' : 'items'}
                  </option>
                ))}
              </select>

              <select 
                value={reservation.time}
                onChange={(e) => handleReservationChange('time', e.target.value)}
                className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg font-semibold text-lg appearance-none cursor-pointer hover:bg-orange-700 transition"
              >
                <option value="">Select Time</option>
                {timeSlots.map(time => (
                  <option key={time} value={time}>
                    {time}
                  </option>
                ))}
              </select>

              <button 
                onClick={handleReserve}
                disabled={!reservation.item || !reservation.date || !reservation.time}
                className="w-full bg-orange-700 hover:bg-orange-800 text-white py-3 rounded-lg font-bold text-xl transition duration-200 mt-4 disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                RESERVE
              </button>
            </div>
          </div>

          {myReservations.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="text-xl font-bold mb-4">My Reservations</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {myReservations.map(res => (
                  <div key={res.id} className="bg-orange-50 p-3 rounded-lg border-2 border-orange-200">
                    <div className="flex justify-between items-start mb-2">
                      <div className="font-bold text-lg">{res.itemName}</div>
                      <button 
                        onClick={() => cancelReservation(res.id)}
                        className="text-red-600 hover:text-red-800 font-bold"
                      >
                        ✕
                      </button>
                    </div>
                    <div className="text-sm text-gray-700 space-y-1">
                      <div>📅 {new Date(res.date).toLocaleDateString('en-US', { 
                        weekday: 'short', 
                        month: 'short', 
                        day: 'numeric' 
                      })}</div>
                      <div>🕐 {res.time}</div>
                      <div>📦 Quantity: {res.quantity}</div>
                      <div className="mt-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                          res.status === 'pending' ? 'bg-yellow-200 text-yellow-800' :
                          res.status === 'completed' ? 'bg-green-200 text-green-800' :
                          'bg-gray-200 text-gray-800'
                        }`}>
                          {res.status.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>

        <section className="flex-1 p-8">
          <div className="flex items-center gap-2 mb-2">
            <img 
              src="/Menu.png" 
              alt="Menu Logo" 
              className="w-32 h-auto"
            />
            <h2 className="text-3xl font-bold m-0">Today's Menu</h2>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {menuItems.map((item) => (
              <div 
                key={item.id} 
                className="bg-white border-2 border-gray-300 rounded-2xl p-6 flex items-center gap-4 shadow-md hover:shadow-lg hover:border-orange-400 transition duration-200 cursor-pointer"
                onClick={() => handleReservationChange('item', item.id.toString())}
              >
                <div className="w-20 h-20 bg-yellow-400 rounded-xl shrink-0"></div>
                <span className="text-xl font-bold">{item.name}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer showLinks={false} />
    </div>
  )
}

export default CustomerDashboard