import { useState, useEffect, useRef } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { User, Settings, ArrowLeft } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'

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
                <ArrowLeft className="h-5 w-5" />
                <span>Back</span>
              </button>
            )}
            <button 
              onClick={() => navigate('/search')}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity cursor-pointer"
            >
              <img 
                src="/images/logo_main.png" 
                alt="stay.me logo" 
                className="h-8 w-8"
                style={{ 
                  filter: isSearchPage 
                    ? (isScrolled 
                        ? 'brightness(0) saturate(100%) invert(59%) sepia(83%) saturate(2066%) hue-rotate(334deg) brightness(91%) contrast(90%)' 
                        : 'brightness(0) invert(1)')
                    : 'brightness(0) saturate(100%) invert(59%) sepia(83%) saturate(2066%) hue-rotate(334deg) brightness(91%) contrast(90%)'
                }}
              />
              <span className={`text-xl font-bold transition-colors ${
                isSearchPage 
                  ? (isScrolled 
                      ? 'text-primary' 
                      : 'text-white')
                  : 'text-primary'
              }`}>
                stay.me
              </span>
            </button>
          </div>
          
          <div className="flex items-center space-x-4">
            {user ? (
              /* Authenticated User Profile */
              <>
                <span className={`text-sm hidden md:block transition-colors ${
                  isSearchPage 
                    ? (isScrolled ? 'text-gray-700' : 'text-white')
                    : 'text-gray-700'
                }`}>
                  Hello, {user?.name}
                </span>
                
                {/* Profile Dropdown */}
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className={`flex items-center space-x-2 transition-colors ${
                      isSearchPage 
                        ? (isScrolled 
                            ? 'text-black hover:text-gray-700' 
                            : 'text-white hover:text-gray-200')
                        : 'text-black hover:text-gray-700'
                    }`}
                  >
                    <User className="h-5 w-5" />
                    <span className="hidden md:block">{user?.name}</span>
                  </button>
              
                  {showProfileMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                      <button
                        onClick={() => {
                          navigate('/dashboard')
                          setShowProfileMenu(false)
                        }}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <Settings className="h-4 w-4" />
                        <span>Dashboard</span>
                      </button>
                      <hr className="my-1" />
                      <button
                        onClick={logout}
                        className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                      >
                        <User className="h-4 w-4" />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              /* Login Button for Unauthenticated Users */
              <button
                onClick={() => navigate('/login')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  isSearchPage 
                    ? (isScrolled 
                        ? 'bg-primary text-white hover:bg-primary/90' 
                        : 'bg-white text-primary hover:bg-gray-100')
                    : 'bg-primary text-white hover:bg-primary/90'
                }`}
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}