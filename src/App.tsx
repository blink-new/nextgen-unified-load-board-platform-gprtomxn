import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { blink } from './blink/client'
import { User } from './types/user'
import { Toaster } from './components/ui/toaster'

// Pages
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import OwnerOperatorDashboard from './pages/OwnerOperatorDashboard'
import CarrierDashboard from './pages/CarrierDashboard'
import BrokerShipperDashboard from './pages/BrokerShipperDashboard'
import LoadBoard from './pages/LoadBoard'
import PricingPage from './pages/PricingPage'
import AdminPanel from './pages/AdminPanel'

function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      console.log('Auth state changed:', state)
      if (state.user) {
        console.log('User authenticated:', state.user)
        // Convert Blink user to our User type
        const userData: User = {
          id: state.user.id,
          email: state.user.email,
          displayName: state.user.displayName || undefined,
          category: 'owner-operator', // Default, will be updated from database
          isAdmin: false,
          subscriptionStatus: 'trial',
          createdAt: new Date().toISOString()
        }
        setUser(userData)
      } else {
        console.log('User not authenticated')
        setUser(null)
      }
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading HaulCentral...</p>
        </div>
      </div>
    )
  }

  return (
    <Router>
      <div className="min-h-screen bg-background">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          
          {/* Protected routes */}
          {user ? (
            <>
              <Route path="/dashboard/owner-operator" element={<OwnerOperatorDashboard user={user} />} />
              <Route path="/dashboard/carrier" element={<CarrierDashboard user={user} />} />
              <Route path="/dashboard/broker-shipper" element={<BrokerShipperDashboard user={user} />} />
              <Route path="/load-board" element={<LoadBoard user={user} />} />
              <Route path="/admin" element={<AdminPanel user={user} />} />
              
              {/* Redirect based on user category */}
              <Route path="/dashboard" element={
                <Navigate to={`/dashboard/${user.category}`} replace />
              } />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" replace />} />
          )}
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App