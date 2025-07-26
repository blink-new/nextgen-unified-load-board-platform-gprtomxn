import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Slider } from '../components/ui/slider'
import { 
  MapPin, 
  Navigation, 
  DollarSign, 
  Clock, 
  Filter, 
  Search, 
  RefreshCw,
  ArrowLeft,
  Truck,
  Building2,
  Users
} from 'lucide-react'
import { User } from '../types/user'
import { Load } from '../types/load'
import { blink } from '../blink/client'
import { Link } from 'react-router-dom'

interface Props {
  user: User
}

export default function LoadBoard({ user }: Props) {
  const [loads, setLoads] = useState<Load[]>([])
  const [filteredLoads, setFilteredLoads] = useState<Load[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    pickupState: '',
    dropoffState: '',
    equipmentType: '',
    minRate: 0,
    maxRate: 10000,
    radius: 200,
    searchTerm: ''
  })

  const loadBoardData = async () => {
    try {
      setLoading(true)
      const loadsData = await blink.db.loads.list({
        where: { status: 'available' },
        orderBy: { createdAt: 'desc' },
        limit: 100
      })
      setLoads(loadsData)
      setFilteredLoads(loadsData)
    } catch (error) {
      console.error('Error loading load board data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadBoardData()
  }, [])

  useEffect(() => {
    // Apply filters
    let filtered = loads

    if (filters.pickupState) {
      filtered = filtered.filter(load => load.pickupState === filters.pickupState)
    }

    if (filters.dropoffState) {
      filtered = filtered.filter(load => load.dropoffState === filters.dropoffState)
    }

    if (filters.equipmentType) {
      filtered = filtered.filter(load => load.equipmentType === filters.equipmentType)
    }

    if (filters.minRate > 0) {
      filtered = filtered.filter(load => load.rate >= filters.minRate)
    }

    if (filters.maxRate < 10000) {
      filtered = filtered.filter(load => load.rate <= filters.maxRate)
    }

    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase()
      filtered = filtered.filter(load => 
        load.pickupCity.toLowerCase().includes(term) ||
        load.dropoffCity.toLowerCase().includes(term) ||
        load.loadId.toLowerCase().includes(term) ||
        load.postedByCompany.toLowerCase().includes(term)
      )
    }

    setFilteredLoads(filtered)
  }, [loads, filters])

  const getUserIcon = () => {
    switch (user.category) {
      case 'owner-operator':
        return <Truck className="w-5 h-5 text-white" />
      case 'carrier':
        return <Building2 className="w-5 h-5 text-white" />
      case 'broker-shipper':
        return <Users className="w-5 h-5 text-white" />
      default:
        return <Truck className="w-5 h-5 text-white" />
    }
  }

  const getDashboardPath = () => {
    return `/dashboard/${user.category}`
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link to={getDashboardPath()} className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                {getUserIcon()}
              </div>
              <span className="text-xl font-bold text-primary">HaulCentral Load Board</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-accent/10 text-accent border-accent/20">
              {filteredLoads.length} loads available
            </Badge>
            <Button 
              variant="outline" 
              size="sm"
              onClick={loadBoardData}
              disabled={loading}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="flex items-center space-x-2 mb-6">
                  <Filter className="w-5 h-5 text-accent" />
                  <h2 className="text-lg font-semibold">Filters</h2>
                </div>

                <div className="space-y-6">
                  {/* Search */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Search</label>
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
                      <Input
                        placeholder="City, Load ID, Company..."
                        className="pl-10"
                        value={filters.searchTerm}
                        onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                      />
                    </div>
                  </div>

                  {/* Pickup State */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Pickup State</label>
                    <Select 
                      value={filters.pickupState} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, pickupState: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any state</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Dropoff State */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Dropoff State</label>
                    <Select 
                      value={filters.dropoffState} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, dropoffState: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any state</SelectItem>
                        <SelectItem value="TX">Texas</SelectItem>
                        <SelectItem value="CA">California</SelectItem>
                        <SelectItem value="FL">Florida</SelectItem>
                        <SelectItem value="NY">New York</SelectItem>
                        <SelectItem value="IL">Illinois</SelectItem>
                        <SelectItem value="PA">Pennsylvania</SelectItem>
                        <SelectItem value="OH">Ohio</SelectItem>
                        <SelectItem value="GA">Georgia</SelectItem>
                        <SelectItem value="NC">North Carolina</SelectItem>
                        <SelectItem value="MI">Michigan</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Equipment Type */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Equipment Type</label>
                    <Select 
                      value={filters.equipmentType} 
                      onValueChange={(value) => setFilters(prev => ({ ...prev, equipmentType: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Any equipment" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="">Any equipment</SelectItem>
                        <SelectItem value="Dry Van">Dry Van</SelectItem>
                        <SelectItem value="Reefer">Reefer</SelectItem>
                        <SelectItem value="Flatbed">Flatbed</SelectItem>
                        <SelectItem value="Step Deck">Step Deck</SelectItem>
                        <SelectItem value="Lowboy">Lowboy</SelectItem>
                        <SelectItem value="Tanker">Tanker</SelectItem>
                        <SelectItem value="Container">Container</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Rate Range */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Rate Range: ${filters.minRate} - ${filters.maxRate}
                    </label>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs text-muted-foreground">Min Rate</label>
                        <Slider
                          value={[filters.minRate]}
                          onValueChange={([value]) => setFilters(prev => ({ ...prev, minRate: value }))}
                          max={10000}
                          step={100}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-muted-foreground">Max Rate</label>
                        <Slider
                          value={[filters.maxRate]}
                          onValueChange={([value]) => setFilters(prev => ({ ...prev, maxRate: value }))}
                          max={10000}
                          step={100}
                          className="mt-2"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Radius */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Search Radius: {filters.radius} miles
                    </label>
                    <Slider
                      value={[filters.radius]}
                      onValueChange={([value]) => setFilters(prev => ({ ...prev, radius: value }))}
                      min={50}
                      max={500}
                      step={25}
                      className="mt-2"
                    />
                  </div>

                  {/* Clear Filters */}
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => setFilters({
                      pickupState: '',
                      dropoffState: '',
                      equipmentType: '',
                      minRate: 0,
                      maxRate: 10000,
                      radius: 200,
                      searchTerm: ''
                    })}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Load List */}
          <div className="lg:col-span-3">
            <div className="space-y-4">
              {loading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
                  <p className="text-muted-foreground">Loading available loads...</p>
                </div>
              ) : filteredLoads.length === 0 ? (
                <Card>
                  <CardContent className="p-12 text-center">
                    <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No loads found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or check back later for new loads
                    </p>
                    <Button 
                      onClick={loadBoardData}
                      className="bg-accent hover:bg-accent/90"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Load Board
                    </Button>
                  </CardContent>
                </Card>
              ) : (
                filteredLoads.map((load) => (
                  <Card key={load.id} className="hover:shadow-md transition-shadow border-l-4 border-l-accent/20 hover:border-l-accent">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <Badge variant="outline" className="font-mono">
                              {load.loadId}
                            </Badge>
                            <Badge className="bg-accent/10 text-accent border-accent/20">
                              {load.equipmentType}
                            </Badge>
                            <span className="text-sm text-muted-foreground">
                              Posted by {load.postedByCompany}
                            </span>
                            {load.isBackhaul && (
                              <Badge className="bg-warning/10 text-warning border-warning/20">
                                Backhaul
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-8 mb-4">
                            <div className="flex items-center space-x-3">
                              <MapPin className="w-5 h-5 text-muted-foreground" />
                              <div className="flex items-center space-x-2">
                                <span className="font-semibold text-lg">
                                  {load.pickupCity}, {load.pickupState}
                                </span>
                                <Navigation className="w-4 h-4 text-muted-foreground" />
                                <span className="font-semibold text-lg">
                                  {load.dropoffCity}, {load.dropoffState}
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{load.miles} miles</span>
                              {load.deadheadMiles && (
                                <span className="text-sm text-muted-foreground">
                                  ({load.deadheadMiles} DH)
                                </span>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-8 mb-4">
                            <div className="flex items-center space-x-2">
                              <DollarSign className="w-5 h-5 text-accent" />
                              <span className="text-2xl font-bold text-accent">
                                ${load.rate.toLocaleString()}
                              </span>
                              <span className="text-lg text-muted-foreground">
                                (${(load.rate / load.miles).toFixed(2)}/mi)
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm">
                                Pickup: {new Date(load.pickupDate).toLocaleDateString()}
                              </span>
                              {load.deliveryDate && (
                                <span className="text-sm text-muted-foreground">
                                  | Delivery: {new Date(load.deliveryDate).toLocaleDateString()}
                                </span>
                              )}
                            </div>
                          </div>

                          {load.description && (
                            <div className="mb-4">
                              <p className="text-sm text-muted-foreground">
                                {load.description}
                              </p>
                            </div>
                          )}

                          {load.specialRequirements && (
                            <div className="mb-4">
                              <Badge variant="outline" className="text-xs">
                                Special Requirements: {load.specialRequirements}
                              </Badge>
                            </div>
                          )}

                          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                            {load.weight && (
                              <span>Weight: {load.weight.toLocaleString()} lbs</span>
                            )}
                            {load.length && (
                              <span>Length: {load.length} ft</span>
                            )}
                            <span>Posted: {new Date(load.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col items-end space-y-2 ml-6">
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              Contact Broker
                            </Button>
                            <Button className="bg-accent hover:bg-accent/90" size="sm">
                              Book Load
                            </Button>
                          </div>
                          <div className="text-xs text-muted-foreground text-right">
                            {load.contactPhone && (
                              <div>Phone: {load.contactPhone}</div>
                            )}
                            {load.contactEmail && (
                              <div>Email: {load.contactEmail}</div>
                            )}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>

            {/* Load More Button */}
            {filteredLoads.length > 0 && (
              <div className="text-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Loads
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}