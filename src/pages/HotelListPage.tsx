import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import Header from '../components/layout/Header'
import HotelCard from '../components/hotels/HotelCard'
import { mockHotels } from '../data/hotels'
import { User, Hotel } from '../types'
import { Filter, Grid, List, Star } from 'lucide-react'

interface HotelListPageProps {
  user: User | null
  onLogout: () => void
}

const HotelListPage = ({ user, onLogout }: HotelListPageProps) => {
  const [searchParams] = useSearchParams()
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    priceRange: [0, 500],
    rating: 0,
    amenities: [] as string[],
  })

  useEffect(() => {
    // Simulate API call with search params
    const location = searchParams.get('location')
    const petType = searchParams.get('petType')
    
    let filtered = mockHotels
    
    if (location) {
      filtered = filtered.filter(hotel => 
        hotel.location.city.toLowerCase().includes(location.toLowerCase()) ||
        hotel.location.state.toLowerCase().includes(location.toLowerCase())
      )
    }
    
    if (petType) {
      filtered = filtered.filter(hotel => 
        hotel.petTypes.includes(petType)
      )
    }
    
    setHotels(filtered)
    setFilteredHotels(filtered)
  }, [searchParams])

  const applyFilters = () => {
    let filtered = hotels

    // Price filter
    filtered = filtered.filter(hotel => 
      hotel.priceRange.min >= filters.priceRange[0] && 
      hotel.priceRange.max <= filters.priceRange[1]
    )

    // Rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(hotel => hotel.rating >= filters.rating)
    }

    // Amenities filter
    if (filters.amenities.length > 0) {
      filtered = filtered.filter(hotel =>
        filters.amenities.every(amenity => hotel.amenities.includes(amenity))
      )
    }

    setFilteredHotels(filtered)
  }

  useEffect(() => {
    applyFilters()
  }, [filters, hotels])

  const allAmenities = Array.from(
    new Set(mockHotels.flatMap(hotel => hotel.amenities))
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={onLogout} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Pet Hotels
          </h1>
          <p className="text-gray-600">
            Found {filteredHotels.length} pet hotels
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-xl shadow-sm p-6 sticky top-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
                <Filter className="w-5 h-5 text-gray-400" />
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Price Range</h3>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="500"
                    value={filters.priceRange[1]}
                    onChange={(e) => setFilters({
                      ...filters,
                      priceRange: [filters.priceRange[0], parseInt(e.target.value)]
                    })}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${filters.priceRange[0]}</span>
                    <span>${filters.priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Minimum Rating</h3>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating}
                        onChange={(e) => setFilters({
                          ...filters,
                          rating: parseInt(e.target.value)
                        })}
                        className="mr-2"
                      />
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="ml-1 text-sm text-gray-600">& up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Amenities Filter */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">Amenities</h3>
                <div className="space-y-2">
                  {allAmenities.slice(0, 8).map((amenity) => (
                    <label key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={filters.amenities.includes(amenity)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFilters({
                              ...filters,
                              amenities: [...filters.amenities, amenity]
                            })
                          } else {
                            setFilters({
                              ...filters,
                              amenities: filters.amenities.filter(a => a !== amenity)
                            })
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-600">{amenity}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => setFilters({
                  priceRange: [0, 500],
                  rating: 0,
                  amenities: [],
                })}
                className="w-full text-sm text-primary hover:text-primary/80"
              >
                Clear all filters
              </button>
            </div>
          </div>

          {/* Hotel List */}
          <div className="lg:w-3/4">
            {/* View Toggle */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-600 hover:text-primary'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list' 
                      ? 'bg-primary text-white' 
                      : 'bg-white text-gray-600 hover:text-primary'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Hotels Grid/List */}
            {filteredHotels.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid md:grid-cols-2 xl:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredHotels.map((hotel) => (
                  <HotelCard key={hotel.id} hotel={hotel} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Filter className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No hotels found
                </h3>
                <p className="text-gray-600">
                  Try adjusting your filters or search criteria
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HotelListPage

