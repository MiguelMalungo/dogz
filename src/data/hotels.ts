import type { Hotel } from '../types';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'Pawsome Palace',
    slug: 'pawsome-palace',
    location: {
      address: '123 Bark Street',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      coordinates: [-74.0060, 40.7128],
    },
    rating: 4.8,
    reviewCount: 156,
    priceRange: {
      min: 45,
      max: 120,
      currency: 'USD',
    },
    amenities: [
      { id: '1', name: 'Outdoor Play Area', icon: '🏞️', category: 'basic' },
      { id: '2', name: 'Grooming Services', icon: '✂️', category: 'premium' },
      { id: '3', name: 'Vet on Site', icon: '🏥', category: 'premium' },
      { id: '4', name: '24/7 Care', icon: '🕐', category: 'basic' },
      { id: '5', name: 'Webcam Access', icon: '📹', category: 'premium' }
    ],
    images: [
      'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800',
      'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800',
      'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800',
    ],
    description: 'Luxury pet hotel with spacious suites, professional grooming, and round-the-clock care. Your pets will feel like royalty!',
    policies: {
      checkIn: '2:00 PM',
      checkOut: '11:00 AM',
      cancellation: 'Free cancellation up to 24 hours before check-in',
      petPolicies: ['All pets must be up to date on vaccinations', 'Maximum 2 pets per booking']
    },
    petTypes: ['dog', 'cat'],
    capacity: 50,
    availability: true,
    featured: true,
    ownerId: 'owner1',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  },
  {
    id: '2',
    name: 'Cozy Critter Cottage',
    slug: 'cozy-critter-cottage',
    location: {
      address: '456 Meow Avenue',
      city: 'Los Angeles',
      state: 'CA',
      country: 'USA',
      coordinates: [-118.2437, 34.0522],
    },
    rating: 4.6,
    reviewCount: 89,
    priceRange: {
      min: 35,
      max: 85,
      currency: 'USD',
    },
    amenities: [
      { id: '6', name: 'Indoor Play Area', icon: '🏠', category: 'basic' },
      { id: '7', name: 'Feeding Schedule', icon: '🍽️', category: 'basic' },
      { id: '8', name: 'Medication Administered', icon: '💊', category: 'premium' },
      { id: '9', name: 'Daily Updates', icon: '📱', category: 'basic' }
    ],
    images: [
      'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800',
      'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800',
      'https://images.unsplash.com/photo-1587764379873-97837921fd44?w=800',
    ],
    description: 'A home-like environment for your pets with personalized care and attention. Perfect for anxious pets who need extra TLC.',
    policies: {
      checkIn: '3:00 PM',
      checkOut: '10:00 AM',
      cancellation: 'Free cancellation up to 48 hours before check-in',
      petPolicies: ['Quiet environment for sensitive pets', 'Individual attention guaranteed']
    },
    petTypes: ['dog', 'cat', 'bird'],
    capacity: 25,
    availability: true,
    featured: false,
    ownerId: 'owner2',
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-01-01')
  }
];

