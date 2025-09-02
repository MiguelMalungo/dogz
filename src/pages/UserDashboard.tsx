import React from 'react'
import { useState } from 'react'
import { Header } from '../components/layout/Header'
import type { User } from '../types'
import { Calendar, MapPin, Star, Heart, Settings, LogOut } from 'lucide-react'

interface UserDashboardProps {
  user: User | null
  onLogout: () => void
}

const UserDashboard = ({ user, onLogout }: UserDashboardProps) => {
  const [activeTab, setActiveTab] = useState('bookings')

  // Mock data
  const mockBookings = [
    {
      id: '1',
      hotelName: 'Pawsome Palace',
      location: 'New York, NY',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      petName: 'Buddy',
      status: 'confirmed',
      totalPrice: 135,
    },
    {
      id: '2',
      hotelName: 'Cozy Critter Cottage',
      location: 'Los Angeles, CA',
      checkIn: '2024-02-01',
      checkOut: '2024-02-03',
      petName: 'Whiskers',
      status: 'pending',
      totalPrice: 85,
    },
  ]

  const mockFavorites = [
    {
      id: '1',
      name: 'Luxury Pet Resort',
      location: 'Miami, FL',
      rating: 4.9,
      price: 150,
      image: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800',
    },
    {
      id: '2',
      name: 'Furry Friends Farm',
      location: 'Austin, TX',
      rating: 4.7,
      price: 95,
      image: 'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800',
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name}!</h1>
          <p className="text-gray-600">Manage your pet hotel bookings and preferences</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{mockBookings.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">{mockFavorites.length}</p>
              </div>
              <Heart className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">
                  {mockBookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
              <MapPin className="w-8 h-8 text-primary" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${mockBookings.reduce((sum, b) => sum + b.totalPrice, 0)}
                </p>
              </div>
              <Star className="w-8 h-8 text-primary" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                My Bookings
              </button>
              <button
                onClick={() => setActiveTab('favorites')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'favorites'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Favorites
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'profile'
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Profile
              </button>
            </nav>
          </div>

          <div className="p-6">
            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Bookings</h2>
                <div className="space-y-4">
                  {mockBookings.map((booking) => (
                    <div key={booking.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-semibold text-gray-900">{booking.hotelName}</h3>
                          <p className="text-sm text-gray-600">{booking.location}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Pet: {booking.petName}</span>
                            <span>Check-in: {booking.checkIn}</span>
                            <span>Check-out: {booking.checkOut}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">${booking.totalPrice}</div>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {booking.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Favorite Pet Hotels</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {mockFavorites.map((hotel) => (
                    <div key={hotel.id} className="border border-gray-200 rounded-lg overflow-hidden">
                      <img
                        src={hotel.image}
                        alt={hotel.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-1">{hotel.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{hotel.location}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                            <span className="text-sm text-gray-600">{hotel.rating}</span>
                          </div>
                          <div className="text-lg font-bold text-gray-900">${hotel.price}/night</div>
                        </div>
                        <button className="w-full mt-3 btn-primary">
                          Book Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Profile Settings</h2>
                <div className="max-w-2xl">
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        defaultValue={user?.name}
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        defaultValue={user?.email}
                        className="input-field"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        defaultValue={user?.phone}
                        className="input-field"
                      />
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <button className="btn-primary">
                        <Settings className="w-4 h-4 mr-2" />
                        Save Changes
                      </button>
                      <button
                        onClick={onLogout}
                        className="btn-secondary"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDashboard

