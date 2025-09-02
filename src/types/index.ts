export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: 'user' | 'owner' | 'admin'
  preferences: {
    currency: string
    language: string
    notifications: boolean
  }
  createdAt: Date
  updatedAt: Date
}

export interface Hotel {
  id: string
  name: string
  slug: string
  location: {
    address: string
    city: string
    state: string
    country: string
    coordinates: [number, number] // [lng, lat]
  }
  rating: number
  reviewCount: number
  priceRange: {
    min: number
    max: number
    currency: string
  }
  amenities: Amenity[]
  images: string[]
  description: string
  policies: {
    checkIn: string
    checkOut: string
    cancellation: string
    petPolicies: string[]
  }
  petTypes: ('dog' | 'cat' | 'bird' | 'rabbit' | 'other')[]
  capacity: number
  availability: boolean
  featured: boolean
  ownerId: string
  createdAt: Date
  updatedAt: Date
}

export interface Amenity {
  id: string
  name: string
  icon: string
  category: 'basic' | 'premium' | 'luxury'
}

export interface Booking {
  id: string
  hotelId: string
  userId: string
  petInfo: {
    name: string
    type: 'dog' | 'cat' | 'bird' | 'rabbit' | 'other'
    breed: string
    age: number
    weight: number
    specialNeeds?: string
  }
  dates: {
    checkIn: Date
    checkOut: Date
  }
  totalPrice: number
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  specialRequests?: string
  createdAt: Date
  updatedAt: Date
}

export interface Review {
  id: string
  hotelId: string
  userId: string
  bookingId: string
  rating: number
  comment: string
  images?: string[]
  date: Date
  userName: string
  verified: boolean
}

export interface SearchFilters {
  location: string
  checkIn: Date | null
  checkOut: Date | null
  petType: string
  priceRange: [number, number]
  amenities: string[]
  rating: number
}

export interface RegisterData {
  name: string
  email: string
  password: string
}

export interface LoginData {
  email: string
  password: string
  rememberMe?: boolean
}