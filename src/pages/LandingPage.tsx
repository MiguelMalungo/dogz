import { useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import { Heart, Star, Shield, Clock } from 'lucide-react'

interface LandingPageProps {
  onEnter: () => void
}

const LandingPage = ({ onEnter }: LandingPageProps) => {
  const navigate = useNavigate()

  const handleEnter = () => {
    onEnter()
    navigate('/home')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 to-primary/5">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Find the Perfect
            <span className="text-primary block">Pet Hotel</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Book luxurious accommodations for your furry friends. From cozy cottages to luxury resorts, 
            we have the perfect stay for every pet.
          </p>

          <button
            onClick={handleEnter}
            className="btn-primary text-lg px-12 py-4 text-xl font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
          >
            Enter stay.me
          </button>
        </div>
      </main>

      {/* Features Section */}
      <section className="px-6 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose stay.me?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Verified Quality
              </h3>
              <p className="text-gray-600">
                All pet hotels are carefully vetted and rated by real pet parents
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Safe & Secure
              </h3>
              <p className="text-gray-600">
                Your pets' safety is our top priority with 24/7 monitoring
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Instant Booking
              </h3>
              <p className="text-gray-600">
                Book instantly with real-time availability and instant confirmation
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-gray-400">
            © 2024 stay.me - Pet Hotel Booking Platform. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage

