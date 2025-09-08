import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { LoginPage } from './pages/LoginPage'
import { DashboardPage } from './pages/DashboardPage'
import { SearchPage } from './pages/SearchPage'
import { HotelDetailPage } from './pages/HotelDetailPage'
import { useAuthStore } from './stores/authStore'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
})

// Demo mode: Authentication disabled, all routes are accessible
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  // In demo mode, always render children without authentication check
  return <>{children}</>
}

function AppRoutes() {
  // Demo mode: No authentication checks needed
  return (
    <Routes>
      {/* Redirect root to search page */}
      <Route 
        path="/" 
        element={<Navigate to="/search" replace />} 
      />
      
      {/* Public routes */}
      <Route 
        path="/login" 
        element={<LoginPage />}
      />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/search" 
        element={<SearchPage />} 
      />
      
      <Route 
        path="/hotel/:hotelId" 
        element={
          <ProtectedRoute>
            <HotelDetailPage />
          </ProtectedRoute>
        } 
      />
      
      {/* Catch all - redirect to search page for demo */}
      <Route path="*" element={<Navigate to="/search" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <AppRoutes />
        </div>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App