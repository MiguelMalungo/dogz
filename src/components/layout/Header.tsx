import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { User, Settings, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

// Helper function to get base path
const getBasePath = () => {
  return import.meta.env.MODE === 'production' ? '/dogz' : ''
}

interface HeaderProps {
  showBackButton?: boolean
  onBack?: () => void
}

export function Header({ showBackButton = false, onBack }: HeaderProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuthStore()
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const isSearchPage = location.pathname === '/search'

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleBack = () => {
    if (onBack) {
      onBack()
    } else {
      navigate('/search')
    }
  }

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isSearchPage 
          ? (isScrolled 
              ? 'bg-white shadow-sm border-b border-gray-200' 
              : 'bg-transparent')
          : (isScrolled 
              ? 'bg-white shadow-sm border-b border-gray-200' 
              : 'bg-white/90 backdrop-blur-sm shadow-sm')
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button 
                onClick={handleBack}
                className={`flex items-center space-x-2 transition-colors ${
                  isSearchPage 
                    ? (isScrolled 
                        ? 'text-gray-600 hover:text-gray-900' 
                        : 'text-white hover:text-gray-200')
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowLeft className="h-5 w-5 flex-shrink-0" />
                <span>Back</span>
              </button>
            )}
            <button 
              onClick={() => navigate('/search')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src={`${getBasePath()}/images/logo_main.png`} 
                alt="stay.me logo" 
                className="h-8 w-8 object-contain transition-all duration-300"
                style={{ 
                  filter: isScrolled 
                    ? 'brightness(0) saturate(100%) invert(55%) sepia(85%) saturate(2029%) hue-rotate(346deg) brightness(95%) contrast(89%)' 
                    : 'brightness(0) saturate(100%) invert(100%)'
                }}
              />
              <span className={`text-xl font-bold transition-colors ${
                isScrolled 
                  ? 'text-primary' 
                  : 'text-white'
              }`}>
                stay.me
              </span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Demo mode: Always show profile icon that leads to login */}
            <button
              onClick={() => navigate('/login')}
              className={`flex items-center space-x-2 transition-colors ${
                isSearchPage 
                  ? (isScrolled 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-white hover:text-gray-200')
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="h-5 w-5" />
              <span className="hidden md:block">Profile</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}