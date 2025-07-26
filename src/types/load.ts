export interface Load {
  id: string
  loadId: string
  pickupCity: string
  pickupState: string
  dropoffCity: string
  dropoffState: string
  pickupDate: string
  deliveryDate?: string
  equipmentType: string
  weight?: number
  length?: number
  rate: number
  rateType: 'per_mile' | 'flat_rate'
  miles: number
  deadheadMiles?: number
  description?: string
  specialRequirements?: string
  postedBy: string
  postedByCompany: string
  contactPhone?: string
  contactEmail?: string
  status: 'available' | 'booked' | 'in_transit' | 'delivered'
  isBackhaul?: boolean
  createdAt: string
  updatedAt: string
}

export interface Truck {
  id: string
  truckId: string
  currentCity: string
  currentState: string
  destinationCity?: string
  destinationState?: string
  equipmentType: string
  availableDate: string
  driverId: string
  driverName: string
  driverPhone?: string
  companyName: string
  postedBy: string
  status: 'available' | 'booked' | 'in_transit'
  createdAt: string
  updatedAt: string
}

export interface BackhaulAlert {
  id: string
  loadId: string
  truckId: string
  matchScore: number
  distance: number
  estimatedDeadhead: number
  alertSentAt: string
  status: 'pending' | 'viewed' | 'dismissed' | 'booked'
}