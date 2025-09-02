import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { Button } from '../components/ui/Button'
import { Header } from '../components/layout/Header'
import { User, LogOut, Settings, Heart } from 'lucide-react'

export function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout } = useAuthStore()

  const handleLogout = () => {
    logout()
  }

  const handleFindHotels = () => {
    navigate('/search')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">
            Manage your pet hotel bookings and preferences
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Heart className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Bookings</p>
                <p className="text-2xl font-bold text-gray-900">0</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <Settings className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">$0</p>
              </div>
              <div className="h-8 w-8 bg-primary/10 rounded-lg flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="card p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Button className="justify-start h-12" onClick={handleFindHotels}>
              <Heart className="h-5 w-5 mr-2" />
              Find Pet Hotels
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <Settings className="h-5 w-5 mr-2" />
              Manage Profile
            </Button>
            <Button variant="outline" className="justify-start h-12">
              <User className="h-5 w-5 mr-2" />
              View Bookings
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
