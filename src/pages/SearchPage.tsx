import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Calendar, X, Dog, Cat } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Header } from '../components/layout/Header'
import { useAuthStore } from '../stores/authStore'

// Helper function to get base path
const getBasePath = () => {
  return import.meta.env.MODE === 'production' ? '/dogz' : ''
}


export function SearchPage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuthStore()
  const [location, setLocation] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [petType, setPetType] = useState<'dog' | 'cat'>('dog')
  const [guests, setGuests] = useState('1')
  const [pets, setPets] = useState('1')
  const [showResults, setShowResults] = useState(false)
  const [results, setResults] = useState<any[]>([])
  const [titleFontSize, setTitleFontSize] = useState(32)
  const [subtitleFontSize, setSubtitleFontSize] = useState(18)
  const [showAuthModal, setShowAuthModal] = useState(false)

  // Refs for the search card and text container to match widths
  const searchCardRef = useRef<HTMLDivElement>(null)
  const textContainerRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)

  // Dynamic font sizing to match search card width
  useEffect(() => {
    const adjustFontSizes = () => {
      if (!searchCardRef.current || !titleRef.current || !subtitleRef.current || !textContainerRef.current) return
      
      const searchCardWidth = searchCardRef.current.offsetWidth
      
      // Make text container match search card width exactly and center it
      textContainerRef.current.style.width = `${searchCardWidth}px`
      textContainerRef.current.style.margin = '0 auto'
      
      // Adjust title font size - start larger and fit to full card width
      let titleSize = window.innerWidth < 768 ? 38 : 42  // Increased mobile from 28 to 38 (+10px)
      titleRef.current.style.fontSize = `${titleSize}px`
      
      while (titleRef.current.scrollWidth > searchCardWidth && titleSize > 16) {
        titleSize -= 1
        titleRef.current.style.fontSize = `${titleSize}px`
      }
      setTitleFontSize(titleSize)
      
      // Adjust subtitle font size - ensure single line fit within card width
      let subtitleSize = window.innerWidth < 768 ? 16 : 24  // Reduced mobile from 18 to 16
      subtitleRef.current.style.fontSize = `${subtitleSize}px`
      
      // More aggressive sizing for subtitle to ensure single line
      while (subtitleRef.current.scrollWidth > searchCardWidth && subtitleSize > 10) {
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

  const mockHotels = [
    {
      id: 1,
      name: "Paws Paradise Resort",
      location: "San Francisco, CA",
      rating: 4.8,
      reviews: 124,
      price: 89,
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=300&h=200&fit=crop",
      amenities: ["Pool", "Grooming", "Training", "Pickup/Dropoff"]
    },
    {
      id: 2,
      name: "Happy Tails Hotel",
      location: "Los Angeles, CA",
      rating: 4.6,
      reviews: 89,
      price: 75,
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=300&h=200&fit=crop",
      amenities: ["Daycare", "Grooming", "Exercise", "Webcam"]
    },
    {
      id: 3,
      name: "Furry Friends Lodge",
      location: "Seattle, WA",
      rating: 4.9,
      reviews: 156,
      price: 95,
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=300&h=200&fit=crop",
      amenities: ["Luxury Suites", "Spa", "Training", "Vet Care"]
    }
  ]

  const handleSearch = () => {
    // Demo mode: Allow search without authentication
    console.log('Searching for:', { location, checkIn, checkOut })
    navigate('/hotels')
  }

  const handlePromoClick = () => {
    // Demo mode: Allow promo clicks without authentication
    navigate('/hotels')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Search Section */}
      <div 
        className="relative text-white pt-[83px] pb-8 sm:pb-12 md:pt-[148px] md:pb-[148px] bg-cover bg-left md:bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${getBasePath()}/images/bkg2m.jpeg)`
        }}
      >
        {/* Desktop background overlay */}
        <div 
          className="absolute inset-0 hidden md:block bg-cover bg-center bg-no-repeat"
          style={{
          backgroundImage: `url(${getBasePath()}/images/bkg2.jpeg)`
        }}
        ></div>
        {/* Black overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Text container that matches search card width */}
          <div className="mb-6 sm:mb-8">
            <div ref={textContainerRef} className="text-center mx-auto">
              <h1 
                ref={titleRef}
                className="font-bold mb-3 sm:mb-4 leading-tight text-white text-center"
                style={{ fontSize: `${titleFontSize}px` }}
              >
                Find the Perfect Pet Hotel
              </h1>
              <p 
                ref={subtitleRef}
                className="text-white/80 text-center px-2"
                style={{ fontSize: `${subtitleFontSize}px` }}
              >
                Book comfortable stays for your furry friends
              </p>
            </div>
          </div>

          <div ref={searchCardRef} className="search-card p-4 sm:p-6">
            <div className="search-grid">
              <div className="location-input">
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    placeholder="Where are you going?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="pl-10 text-gray-900"
                  />
                </div>
              </div>
              <div className="checkin-input">
                <Input
                  type="date"
                  placeholder="Check-in"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="text-gray-900"
                />
              </div>
              <div className="checkout-input">
                <Input
                  type="date"
                  placeholder="Check-out"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="text-gray-900"
                />
              </div>
            </div>
            
            {/* Pet Type Selection */}
            <div className="mt-4 flex justify-center">
              <div className="flex items-center space-x-6">
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="petType"
                    value="dog"
                    checked={petType === 'dog'}
                    onChange={(e) => setPetType(e.target.value as 'dog' | 'cat')}
                    className="sr-only"
                  />
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                    petType === 'dog'
                      ? 'border-primary bg-white text-primary shadow-sm'
                      : 'border-gray-300 text-gray-600 hover:border-primary/50 hover:text-primary/70'
                  }`}>
                    <Dog className="h-5 w-5" />
                    <span className="font-medium">Dogs</span>
                  </div>
                </label>
                
                <label className="flex items-center cursor-pointer group">
                  <input
                    type="radio"
                    name="petType"
                    value="cat"
                    checked={petType === 'cat'}
                    onChange={(e) => setPetType(e.target.value as 'dog' | 'cat')}
                    className="sr-only"
                  />
                  <div className={`flex items-center space-x-2 px-4 py-2 rounded-lg border-2 transition-all duration-200 ${
                    petType === 'cat'
                      ? 'border-primary bg-white text-primary shadow-sm'
                      : 'border-gray-300 text-gray-600 hover:border-primary/50 hover:text-primary/70'
                  }`}>
                    <Cat className="h-5 w-5" />
                    <span className="font-medium">Cats</span>
                  </div>
                </label>
              </div>
            </div>
            
            <div className="mt-4">
              <Button
                onClick={handleSearch}
                className="w-full sm:w-auto"
              >
                <Search className="h-5 w-5 mr-2" />
                Search Pet Hotels
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-6 gap-2">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Featured Pet Hotels</h2>
          <p className="text-gray-600 text-sm sm:text-base">{mockHotels.length} properties found</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {mockHotels.map((hotel) => (
            <div key={hotel.id} className="card overflow-hidden">
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 flex-1 mr-2">{hotel.name}</h3>
                  <div className="flex items-center flex-shrink-0">
                    <span className="text-sm font-medium text-gray-900">{hotel.rating}</span>
                    <span className="text-yellow-400 ml-1">★</span>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-3">{hotel.location}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {hotel.amenities.slice(0, 2).map((amenity) => (
                    <span
                      key={amenity}
                      className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                    >
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 2 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                      +{hotel.amenities.length - 2} more
                    </span>
                  )}
                </div>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                  <div>
                    <span className="text-xl sm:text-2xl font-bold text-gray-900">${hotel.price}</span>
                    <span className="text-gray-600 text-sm">/night</span>
                  </div>
                  <Button 
                    size="sm"
                    onClick={() => navigate(`/hotel/${hotel.id}`)}
                    className="w-full sm:w-auto"
                  >
                    Book Now
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-1">{hotel.reviews} reviews</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Partners / Promotions Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 sm:pb-12">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">Promotions, deals, and special offers</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
          {/* Left promo card */}
          <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-white min-h-[200px] sm:min-h-[250px]">
            <div className="absolute inset-0">
              <img
                src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=1600&auto=format&fit=crop"
                alt="Vacation rentals"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40" />
            </div>
            <div className="relative p-4 sm:p-6 lg:p-8 text-white h-full flex flex-col justify-end">
              <p className="text-sm font-medium mb-2">Vacation rentals</p>
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold leading-tight mb-3">Live the dream in a vacation home</h4>
              <p className="text-white/90 mb-4 sm:mb-6 text-sm sm:text-base">Choose from houses, villas, cabins, and more</p>
              <Button onClick={handlePromoClick} className="bg-primary hover:bg-primary/90 text-white w-full sm:w-auto">Book yours</Button>
            </div>
          </div>

          {/* Right promo card */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-lg border border-gray-200 bg-white p-4 sm:p-6 lg:p-8 min-h-[200px] sm:min-h-[250px]">
            <div className="flex-1 mb-4 sm:mb-0 sm:mr-4">
              <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Quick escape, quality time</h4>
              <p className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base">Save up to 20% with a Getaway Deal</p>
              <Button onClick={handlePromoClick} variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white w-full sm:w-auto">Save on stays</Button>
            </div>
            <img
              src={`${getBasePath()}/images/bkg.jpeg`}
              alt="Getaway deal"
              className="w-full sm:w-48 h-32 sm:h-32 object-cover rounded-md flex-shrink-0"
            />
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full mx-4 p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4 sm:mb-6">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Sign in to continue</h2>
              <button
                onClick={() => setShowAuthModal(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" />
              </button>
            </div>
            
            <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
              Please sign in or create an account to search and book pet hotels.
            </p>
            
            <div className="space-y-3">
              <Button
                onClick={() => navigate('/login')}
                className="w-full"
              >
                Sign In
              </Button>
              
              <Button
                onClick={() => navigate('/register')}
                variant="outline"
                className="w-full"
              >
                Create Account
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
