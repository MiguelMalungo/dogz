import { Link } from 'react-router-dom'
import { Star, MapPin, Heart } from 'lucide-react'
import { Hotel } from '../../types'

interface HotelCardProps {
  hotel: Hotel
}

const HotelCard = ({ hotel }: HotelCardProps) => {
  return (
    <div className="card overflow-hidden">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={hotel.images[0]}
          alt={hotel.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
        <button className="absolute top-3 right-3 p-2 bg-white/80 rounded-full hover:bg-white transition-colors">
          <Heart className="w-5 h-5 text-gray-600" />
        </button>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Hotel Info */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            {hotel.name}
          </h3>
          <div className="flex items-center text-gray-600 mb-2">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">
              {hotel.location.city}, {hotel.location.state}
            </span>
          </div>
          
          {/* Rating */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm font-medium">{hotel.rating}</span>
            </div>
            <span className="text-sm text-gray-500">
              ({hotel.reviewCount} reviews)
            </span>
          </div>
        </div>

        {/* Amenities */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {hotel.amenities.slice(0, 3).map((amenity, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                {amenity}
              </span>
            ))}
            {hotel.amenities.length > 3 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                +{hotel.amenities.length - 3} more
              </span>
            )}
          </div>
        </div>

        {/* Price and Action */}
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${hotel.priceRange.min}
            </span>
            <span className="text-gray-500 text-sm">/night</span>
          </div>
          <Link
            to={`/hotels/${hotel.id}`}
            className="btn-primary"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  )
}

export default HotelCard

