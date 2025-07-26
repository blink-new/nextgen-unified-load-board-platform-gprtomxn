export type UserCategory = 'owner-operator' | 'carrier' | 'broker-shipper'

export interface User {
  id: string
  email: string
  displayName?: string
  category: UserCategory
  companyName?: string
  dotNumber?: string
  mcNumber?: string
  keycode?: string
  isAdmin: boolean
  trialEndsAt?: string
  subscriptionTier?: 'standard' | 'pro' | 'premium'
  subscriptionStatus?: 'trial' | 'active' | 'expired'
  createdAt: string
}

export interface Company {
  id: string
  name: string
  category: UserCategory
  dotNumber?: string
  mcNumber?: string
  address?: string
  phone?: string
  email?: string
  adminUserId: string
  trialEndsAt?: string
  subscriptionTier?: 'standard' | 'pro' | 'premium'
  subscriptionStatus?: 'trial' | 'active' | 'expired'
  createdAt: string
}