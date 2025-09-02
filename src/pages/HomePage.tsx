import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Header } from '../components/layout/Header'
import SearchBar from '../components/search/SearchBar'
import HotelCard from '../components/hotels/HotelCard'
import { mockHotels } from '../data/hotels'
import type { User } from '../types'
import { Star, Shield, Clock, Heart } from 'lucide-react'

const HomePage = () => {
  const navigate = useNavigate()
  const [featuredHotels] = useState(mockHotels.slice(0, 3))
  const [titleFontSize, setTitleFontSize] = useState(48)
  const [subtitleFontSize, setSubtitleFontSize] = useState(20)
  
  const searchBarRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  // Dynamic font sizing to match search bar width
  useEffect(() => {
    const adjustFontSizes = () => {
      if (!searchBarRef.current || !titleRef.current || !subtitleRef.current) return
      
      const searchBarWidth = searchBarRef.current.offsetWidth
      
      // Adjust title font size - start larger and fit to full card width
      let titleSize = window.innerWidth < 768 ? 28 : 42
      titleRef.current.style.fontSize = `${titleSize}px`
      
      while (titleRef.current.scrollWidth > searchBarWidth && titleSize > 16) {
        titleSize -= 1
        titleRef.current.style.fontSize = `${titleSize}px`
      }
      setTitleFontSize(titleSize)
      
      // Adjust subtitle font size - start larger and fit to full card width
      let subtitleSize = window.innerWidth < 768 ? 18 : 24
      subtitleRef.current.style.fontSize = `${subtitleSize}px`
      
      while (subtitleRef.current.scrollWidth > searchBarWidth && subtitleSize > 12) {
        subtitleSize -= 1
        subtitleRef.current.style.fontSize = `${subtitleSize}px`
      }
      setSubtitleFontSize(subtitleSize)
    }

    // Initial adjustment with longer delay to ensure elements are rendered
    setTimeout(adjustFontSizes, 300)
    
    // Adjust on window resize
    window.addEventListener('resize', adjustFontSizes)
    return () => window.removeEventListener('resize', adjustFontSizes)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section with Search */}
      <section className="bg-gradient-to-br from-primary/10 to-primary/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Container that matches SearchBar width */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 
                ref={titleRef}
                className="font-bold text-gray-900 mb-6 whitespace-nowrap text-center"
                style={{ fontSize: `${titleFontSize}px` }}
              >
                Find the Perfect Pet Hotel
              </h1>
              <p 
                ref={subtitleRef}
                className="text-gray-600 whitespace-nowrap text-center"
                style={{ fontSize: `${subtitleFontSize}px` }}
              >
                Book luxurious accommodations for your furry friends. From cozy cottages to luxury resorts.
              </p>
            </div>
            
            <div ref={searchBarRef}>
              <SearchBar />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hotels */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Featured Pet Hotels
            </h2>
            <button
              onClick={() => navigate('/hotels')}
              className="text-primary hover:text-primary/80 font-medium"
            >
              View All →
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredHotels.map((hotel) => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Pet Parents Trust stay.me
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

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Book Your Pet's Perfect Stay?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Join thousands of happy pet parents who trust stay.me for their furry friends' accommodations.
          </p>
          <button
            onClick={() => navigate('/hotels')}
            className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
          >
            Start Searching
          </button>
        </div>
      </section>
    </div>
  )
}

export default HomePage

