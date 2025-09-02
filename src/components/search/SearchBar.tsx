import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Calendar, MapPin, PawPrint } from 'lucide-react'

const SearchBar = () => {
  const navigate = useNavigate()
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    petType: 'Dogs'
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      location: searchData.location,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      petType: searchData.petType
    })
    navigate(`/hotels?${params.toString()}`)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="grid md:grid-cols-4 gap-4">
          {/* Location */}
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Where are you going?"
              value={searchData.location}
              onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
              className="input-field pl-10"
              required
            />
          </div>

          {/* Check-in Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={searchData.checkIn}
              onChange={(e) => setSearchData({ ...searchData, checkIn: e.target.value })}
              className="input-field pl-10"
              required
            />
          </div>

          {/* Check-out Date */}
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="date"
              value={searchData.checkOut}
              onChange={(e) => setSearchData({ ...searchData, checkOut: e.target.value })}
              className="input-field pl-10"
              required
            />
          </div>

          {/* Pet Type */}
          <div className="relative">
            <PawPrint className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={searchData.petType}
              onChange={(e) => setSearchData({ ...searchData, petType: e.target.value })}
              className="input-field pl-10"
            >
              <option value="Dogs">Dogs</option>
              <option value="Cats">Cats</option>
              <option value="Birds">Birds</option>
              <option value="Small Animals">Small Animals</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full btn-primary flex items-center justify-center space-x-2"
        >
          <Search className="w-5 h-5" />
          <span>Search Pet Hotels</span>
        </button>
      </form>
    </div>
  )
}

export default SearchBar

