import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Truck, 
  MapPin, 
  Clock, 
  DollarSign, 
  Bell, 
  Settings,
  Plus,
  Search,
  Filter,
  AlertCircle,
  CheckCircle,
  Navigation,
  Fuel
} from 'lucide-react'
import { User } from '../types/user'
import { Load, Truck as TruckType, BackhaulAlert } from '../types/load'
import { blink } from '../blink/client'

interface Props {
  user: User
}

export default function OwnerOperatorDashboard({ user }: Props) {
  const [loads, setLoads] = useState<Load[]>([])
  const [trucks, setTrucks] = useState<TruckType[]>([])
  const [backhaulAlerts, setBackhaulAlerts] = useState<BackhaulAlert[]>([])
  const [loading, setLoading] = useState(true)
  const [trialDaysLeft, setTrialDaysLeft] = useState(14)

  const loadDashboardData = async () => {
    try {
      // Load available loads
      const loadsData = await blink.db.loads.list({
        where: { status: 'available' },
        orderBy: { createdAt: 'desc' },
        limit: 20
      })
      setLoads(loadsData)

      // Load user's trucks
      const trucksData = await blink.db.trucks.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      setTrucks(trucksData)

      // Load backhaul alerts
      const alertsData = await blink.db.backhaulAlerts.list({
        where: { userId: user.id, status: 'pending' },
        orderBy: { alertSentAt: 'desc' },
        limit: 10
      })
      setBackhaulAlerts(alertsData)

    } catch (error) {
      console.error('Error loading dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">HaulCentral</span>
            </div>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Owner-Operator
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Trial Counter */}
            <div className="flex items-center space-x-2 px-3 py-1 bg-warning/10 rounded-lg border border-warning/20">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-sm font-medium text-warning">
                {trialDaysLeft} days left in trial
              </span>
            </div>
            
            <Button variant="ghost" size="sm">
              <Bell className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              className="bg-accent hover:bg-accent/90"
              onClick={() => blink.auth.logout()}
            >
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Available Loads</p>
                  <p className="text-2xl font-bold">{loads.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">My Trucks</p>
                  <p className="text-2xl font-bold">{trucks.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Backhaul Alerts</p>
                  <p className="text-2xl font-bold text-accent">{backhaulAlerts.length}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Bell className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rate/Mile</p>
                  <p className="text-2xl font-bold">$2.45</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="load-board" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="load-board">Load Board</TabsTrigger>
            <TabsTrigger value="my-trucks">My Trucks</TabsTrigger>
            <TabsTrigger value="backhaul-alerts">
              Backhaul Alerts
              {backhaulAlerts.length > 0 && (
                <Badge className="ml-2 bg-accent text-white text-xs">
                  {backhaulAlerts.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="rest-easy">RestEasy</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          {/* Load Board Tab */}
          <TabsContent value="load-board" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Loads</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search loads..." className="w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
                <Link to="/load-board">
                  <Button className="bg-accent hover:bg-accent/90">
                    View Full Load Board
                  </Button>
                </Link>
              </div>
            </div>

            <div className="grid gap-4">
              {loads.slice(0, 5).map((load) => (
                <Card key={load.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <Badge variant="outline">{load.loadId}</Badge>
                          <Badge className="bg-accent/10 text-accent">
                            {load.equipmentType}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Posted by {load.postedByCompany}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-6 mb-3">
                          <div className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span className="font-medium">
                              {load.pickupCity}, {load.pickupState}
                            </span>
                            <span className="text-muted-foreground">→</span>
                            <span className="font-medium">
                              {load.dropoffCity}, {load.dropoffState}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Navigation className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">{load.miles} miles</span>
                            {load.deadheadMiles && (
                              <span className="text-sm text-muted-foreground">
                                ({load.deadheadMiles} DH)
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <DollarSign className="w-4 h-4 text-accent" />
                            <span className="text-lg font-bold text-accent">
                              ${load.rate.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              (${(load.rate / load.miles).toFixed(2)}/mi)
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock className="w-4 h-4 text-muted-foreground" />
                            <span className="text-sm">
                              Pickup: {new Date(load.pickupDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                        <Button className="bg-accent hover:bg-accent/90" size="sm">
                          Book It Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* My Trucks Tab */}
          <TabsContent value="my-trucks" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Trucks</h2>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                Post New Truck
              </Button>
            </div>

            {trucks.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No trucks posted yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Post your truck availability to get matched with loads automatically
                  </p>
                  <Button className="bg-accent hover:bg-accent/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Truck
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {trucks.map((truck) => (
                  <Card key={truck.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <Badge variant="outline">{truck.truckId}</Badge>
                            <Badge className="bg-accent/10 text-accent">
                              {truck.equipmentType}
                            </Badge>
                            <Badge 
                              className={
                                truck.status === 'available' 
                                  ? 'bg-success/10 text-success' 
                                  : 'bg-warning/10 text-warning'
                              }
                            >
                              {truck.status}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-6 mb-3">
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>
                                {truck.currentCity}, {truck.currentState}
                              </span>
                              {truck.destinationCity && (
                                <>
                                  <span className="text-muted-foreground">→</span>
                                  <span>
                                    {truck.destinationCity}, {truck.destinationState}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-sm">
                              Driver: {truck.driverName}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Available: {new Date(truck.availableDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Backhaul Alerts Tab */}
          <TabsContent value="backhaul-alerts" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Smart Backhaul Alerts</h2>
              <Badge className="bg-accent/10 text-accent">
                AI-Powered Matching
              </Badge>
            </div>

            {backhaulAlerts.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No backhaul alerts yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Post your truck location and destination to receive smart backhaul matches
                  </p>
                  <Button className="bg-accent hover:bg-accent/90">
                    Post Truck Location
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {backhaulAlerts.map((alert) => (
                  <Card key={alert.id} className="border-accent/20 bg-accent/5">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <AlertCircle className="w-4 h-4 text-accent" />
                            <span className="font-semibold text-accent">
                              High Match Score: {Math.round(alert.matchScore * 100)}%
                            </span>
                            <Badge className="bg-accent text-white">
                              {alert.distance.toFixed(0)} miles away
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-3">
                            Perfect backhaul opportunity detected for your route
                          </p>
                          
                          <div className="flex items-center space-x-4">
                            <span className="text-sm">
                              Estimated deadhead: {alert.estimatedDeadhead?.toFixed(0)} miles
                            </span>
                            <span className="text-sm text-muted-foreground">
                              Alert sent: {new Date(alert.alertSentAt).toLocaleString()}
                            </span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Dismiss
                          </Button>
                          <Button className="bg-accent hover:bg-accent/90" size="sm">
                            View Load
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* RestEasy Tab */}
          <TabsContent value="rest-easy" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">RestEasy - Truck Stops</h2>
              <div className="flex items-center space-x-2">
                <Input placeholder="Enter city or zip code..." className="w-64" />
                <Button className="bg-accent hover:bg-accent/90">
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Sample truck stops */}
              {[
                { name: "TA Travel Center", city: "Dallas", state: "TX", fuel: "$3.45", parking: "Available" },
                { name: "Pilot Flying J", city: "Oklahoma City", state: "OK", fuel: "$3.42", parking: "Limited" },
                { name: "Love's Travel Stop", city: "Amarillo", state: "TX", fuel: "$3.48", parking: "Full" }
              ].map((stop, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">{stop.name}</h3>
                      <Badge 
                        className={
                          stop.parking === 'Available' 
                            ? 'bg-success/10 text-success'
                            : stop.parking === 'Limited'
                            ? 'bg-warning/10 text-warning'
                            : 'bg-destructive/10 text-destructive'
                        }
                      >
                        {stop.parking}
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Location:</span>
                        <span className="text-sm">{stop.city}, {stop.state}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Fuel Price:</span>
                        <span className="text-sm font-medium">{stop.fuel}/gal</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Parking:</span>
                        <span className="text-sm">{stop.parking}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 mt-4">
                      <Button variant="outline" size="sm" className="flex-1">
                        <Navigation className="w-4 h-4 mr-2" />
                        Directions
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1">
                        <Fuel className="w-4 h-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Admin Tab */}
          <TabsContent value="admin" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Company Admin</h2>
              <Badge className="bg-primary/10 text-primary">
                Admin Access
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Update your company details and DOT/MC numbers
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input id="company-name" defaultValue={user.companyName || ''} />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dot">DOT Number</Label>
                      <Input id="dot" defaultValue={user.dotNumber || ''} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mc">MC Number</Label>
                      <Input id="mc" defaultValue={user.mcNumber || ''} />
                    </div>
                  </div>
                  <Button className="w-full">Update Information</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription & Billing</CardTitle>
                  <CardDescription>
                    Manage your subscription and view billing history
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
                    <div>
                      <p className="font-medium">Trial Period</p>
                      <p className="text-sm text-muted-foreground">
                        {trialDaysLeft} days remaining
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-warning" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Current Plan: Free Trial</p>
                    <p className="text-sm text-muted-foreground">
                      Upgrade to continue using HaulCentral after your trial ends
                    </p>
                  </div>
                  
                  <Link to="/pricing">
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      Upgrade Now
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}