import { useParams, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Star, MapPin, Calendar, Users } from 'lucide-react'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Header } from '../components/layout/Header'

export function HotelDetailPage() {
  const { hotelId } = useParams()
  const navigate = useNavigate()
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [guests, setGuests] = useState('1')

  // Mock hotel data
  const hotels = {
    '1': {
      id: 1,
      name: "Paws Paradise Resort",
      location: "San Francisco, CA",
      rating: 4.8,
      reviews: 124,
      price: 89,
      images: [
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=400&fit=crop"
      ],
      amenities: ["Pool", "Grooming", "Training", "Pickup/Dropoff", "24/7 Care", "Exercise Yard"],
      description: "A luxury pet resort offering premium accommodation for your beloved pets. Our facility features spacious suites, professional grooming services, and round-the-clock care from certified pet specialists.",
      address: "123 Pet Paradise Lane, San Francisco, CA 94102"
    },
    '2': {
      id: 2,
      name: "Happy Tails Hotel",
      location: "Los Angeles, CA",
      rating: 4.6,
      reviews: 89,
      price: 75,
      images: [
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=400&fit=crop"
      ],
      amenities: ["Daycare", "Grooming", "Exercise", "Webcam", "Vet Care", "Training"],
      description: "A modern pet hotel with state-of-the-art facilities and caring staff. We provide comfortable accommodations and fun activities to keep your pets happy during their stay.",
      address: "456 Happy Street, Los Angeles, CA 90210"
    },
    '3': {
      id: 3,
      name: "Furry Friends Lodge",
      location: "Seattle, WA",
      rating: 4.9,
      reviews: 156,
      price: 95,
      images: [
        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=800&h=400&fit=crop",
        "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=800&h=400&fit=crop"
      ],
      amenities: ["Luxury Suites", "Spa", "Training", "Vet Care", "Gourmet Meals", "Play Areas"],
      description: "The ultimate luxury experience for your pets. Our lodge offers premium suites, spa treatments, gourmet meals, and personalized care in a beautiful natural setting.",
      address: "789 Forest Way, Seattle, WA 98101"
    }
  }

  const hotel = hotels[hotelId as keyof typeof hotels]

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
          <Button onClick={() => navigate('/search')}>Back to Search</Button>
        </div>
      </div>
    )
  }

  const handleBooking = () => {
    // Mock booking logic
    alert(`Booking ${hotel.name} from ${checkIn} to ${checkOut} for ${guests} guest(s)`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-24">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <div className="card overflow-hidden">
              <img
                src={hotel.images[0]}
                alt={hotel.name}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

            {/* Hotel Info */}
            <div className="card p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.name}</h1>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{hotel.address}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-1 mb-1">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="font-semibold text-gray-900">{hotel.rating}</span>
                  </div>
                  <p className="text-sm text-gray-600">{hotel.reviews} reviews</p>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{hotel.description}</p>

              {/* Amenities */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Amenities</h3>
                <div className="grid md:grid-cols-2 gap-2">
                  {hotel.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div className="h-2 w-2 bg-primary rounded-full"></div>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Booking */}
          <div className="lg:col-span-1">
            <div className="card p-6 sticky top-8">
              <div className="mb-6">
                <div className="flex items-baseline space-x-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">${hotel.price}</span>
                  <span className="text-gray-600">/night</span>
                </div>
                <p className="text-sm text-gray-600">Includes all amenities</p>
              </div>

              {/* Booking Form */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-in
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Check-out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pets
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <select
                      value={guests}
                      onChange={(e) => setGuests(e.target.value)}
                      className="w-full pl-9 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="1">1 pet</option>
                      <option value="2">2 pets</option>
                      <option value="3">3 pets</option>
                      <option value="4">4+ pets</option>
                    </select>
                  </div>
                </div>

                <Button 
                  onClick={handleBooking}
                  className="w-full"
                  disabled={!checkIn || !checkOut}
                >
                  Book Now
                </Button>

                <div className="text-center text-sm text-gray-600">
                  You won't be charged yet
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}