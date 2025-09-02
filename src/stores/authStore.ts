import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User, LoginData, RegisterData } from '../types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  error: string | null
  login: (data: LoginData) => Promise<void>
  logout: () => void
  register: (data: RegisterData) => Promise<void>
  clearError: () => void
}

// Mock API functions
const mockLogin = async (data: LoginData): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock successful login
  return {
    id: '1',
    email: data.email,
    name: 'John Doe',
    role: 'user',
    preferences: {
      currency: 'USD',
      language: 'en',
      notifications: true,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

const mockRegister = async (data: RegisterData): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Mock successful registration
  return {
    id: '1',
    email: data.email,
    name: data.name,
    role: 'user',
    preferences: {
      currency: 'USD',
      language: 'en',
      notifications: true,
    },
    createdAt: new Date(),
    updatedAt: new Date(),
  }
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,

      login: async (data: LoginData) => {
        set({ isLoading: true, error: null })
        try {
          const user = await mockLogin(data)
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Login failed',
            isLoading: false 
          })
          throw error
        }
      },

      logout: () => {
        set({ 
          user: null, 
          isAuthenticated: false,
          error: null 
        })
      },

      register: async (data: RegisterData) => {
        set({ isLoading: true, error: null })
        try {
          const user = await mockRegister(data)
          set({ 
            user, 
            isAuthenticated: true, 
            isLoading: false,
            error: null 
          })
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Registration failed',
            isLoading: false 
          })
          throw error
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ 
        user: state.user, 
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
)
