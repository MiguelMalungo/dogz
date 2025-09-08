import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '../ui/Button'
import { Input } from '../ui/Input'

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false)
  // Demo mode: No authentication processing
  
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Demo mode: Form submission disabled
  }

  return (
    <form onSubmit={handleFormSubmit} className="space-y-6">
      <div>
        <Input
          type="email"
          label="Email Address"
          placeholder="Enter your email"
          disabled
        />
      </div>

      <div>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            label="Password"
            placeholder="Enter your password"
            disabled
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-9 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <EyeOff className="h-5 w-5" />
            ) : (
              <Eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            disabled
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:text-primary/80"
        >
          Forgot password?
        </Link>
      </div>

      <div className="p-3 text-sm text-blue-600 bg-blue-50 border border-blue-200 rounded-lg">
        Demo Mode: Click anywhere on the card above to continue
      </div>

      <Button
        type="submit"
        className="w-full"
        disabled
      >
        Sign In
      </Button>

      <div className="text-center">
        <span className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link
            to="/register"
            className="text-primary hover:text-primary/80 font-medium"
          >
            Sign up
          </Link>
        </span>
      </div>
    </form>
  )
}
