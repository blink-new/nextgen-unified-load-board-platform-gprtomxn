import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Building2, 
  Truck, 
  Users, 
  MapPin, 
  Clock, 
  DollarSign, 
  Bell, 
  Settings,
  Plus,
  BarChart3,
  TrendingUp
} from 'lucide-react'
import { User } from '../types/user'
import { blink } from '../blink/client'

interface Props {
  user: User
}

export default function CarrierDashboard({ user }: Props) {
  const [loading, setLoading] = useState(true)
  const [trialDaysLeft, setTrialDaysLeft] = useState(14)
  const [fleetStats, setFleetStats] = useState({
    totalTrucks: 0,
    activeTrucks: 0,
    totalDrivers: 0,
    activeLoads: 0,
    monthlyRevenue: 0,
    avgRatePerMile: 0
  })

  const loadDashboardData = async () => {
    try {
      // Load fleet data
      const trucksData = await blink.db.trucks.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      
      const activeTrucks = trucksData.filter(truck => truck.status === 'available').length
      
      setFleetStats({
        totalTrucks: trucksData.length,
        activeTrucks,
        totalDrivers: trucksData.length, // Assuming 1 driver per truck
        activeLoads: 0, // Will be calculated from loads
        monthlyRevenue: 125000, // Sample data
        avgRatePerMile: 2.65 // Sample data
      })

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
          <p className="text-muted-foreground">Loading carrier dashboard...</p>
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
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">HaulCentral</span>
            </div>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Carrier
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
        <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Fleet</p>
                  <p className="text-2xl font-bold">{fleetStats.totalTrucks}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Active Trucks</p>
                  <p className="text-2xl font-bold text-accent">{fleetStats.activeTrucks}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Drivers</p>
                  <p className="text-2xl font-bold">{fleetStats.totalDrivers}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Loads</p>
                  <p className="text-2xl font-bold">{fleetStats.activeLoads}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">${fleetStats.monthlyRevenue.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Avg Rate/Mile</p>
                  <p className="text-2xl font-bold">${fleetStats.avgRatePerMile}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="fleet-management" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="fleet-management">Fleet Management</TabsTrigger>
            <TabsTrigger value="load-board">Load Board</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="drivers">Drivers</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          {/* Fleet Management Tab */}
          <TabsContent value="fleet-management" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Fleet Management</h2>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                Add New Truck
              </Button>
            </div>

            {fleetStats.totalTrucks === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Truck className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No trucks in your fleet yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Add trucks to your fleet to start managing loads and drivers
                  </p>
                  <Button className="bg-accent hover:bg-accent/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Truck
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {/* Sample truck data */}
                {[
                  { id: '1', truckId: 'TRK-001', driver: 'John Smith', status: 'available', location: 'Dallas, TX' },
                  { id: '2', truckId: 'TRK-002', driver: 'Mike Johnson', status: 'in_transit', location: 'Houston, TX' },
                  { id: '3', truckId: 'TRK-003', driver: 'Sarah Wilson', status: 'available', location: 'Austin, TX' }
                ].map((truck) => (
                  <Card key={truck.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <Badge variant="outline">{truck.truckId}</Badge>
                            <Badge 
                              className={
                                truck.status === 'available' 
                                  ? 'bg-success/10 text-success' 
                                  : 'bg-warning/10 text-warning'
                              }
                            >
                              {truck.status.replace('_', ' ')}
                            </Badge>
                          </div>
                          
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-muted-foreground" />
                              <span>Driver: {truck.driver}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-muted-foreground" />
                              <span>{truck.location}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm">
                            Track
                          </Button>
                          <Button variant="outline" size="sm">
                            Assign Load
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Load Board Tab */}
          <TabsContent value="load-board" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Available Loads</h2>
              <Link to="/load-board">
                <Button className="bg-accent hover:bg-accent/90">
                  View Full Load Board
                </Button>
              </Link>
            </div>

            <Card>
              <CardContent className="p-12 text-center">
                <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Load board integration</h3>
                <p className="text-muted-foreground mb-4">
                  Access the full load board to find loads for your fleet
                </p>
                <Link to="/load-board">
                  <Button className="bg-accent hover:bg-accent/90">
                    Open Load Board
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Fleet Analytics</h2>
              <Badge className="bg-accent/10 text-accent">
                Pro Feature
              </Badge>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <BarChart3 className="w-12 h-12 mx-auto mb-2" />
                      <p>Revenue chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Fleet Utilization</CardTitle>
                  <CardDescription>Truck utilization rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    <div className="text-center">
                      <TrendingUp className="w-12 h-12 mx-auto mb-2" />
                      <p>Utilization chart will appear here</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Drivers Tab */}
          <TabsContent value="drivers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Driver Management</h2>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Driver
              </Button>
            </div>

            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Driver management coming soon</h3>
                <p className="text-muted-foreground mb-4">
                  Comprehensive driver management tools will be available in the next update
                </p>
              </CardContent>
            </Card>
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
                    Update your company details and fleet information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company Name</label>
                    <input 
                      className="w-full px-3 py-2 border rounded-md" 
                      defaultValue={user.companyName || ''} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">DOT Number</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-md" 
                        defaultValue={user.dotNumber || ''} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">MC Number</label>
                      <input 
                        className="w-full px-3 py-2 border rounded-md" 
                        defaultValue={user.mcNumber || ''} 
                      />
                    </div>
                  </div>
                  <Button className="w-full">Update Information</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription & Billing</CardTitle>
                  <CardDescription>
                    Manage your carrier subscription
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
                      Upgrade to Pro or Premium for advanced fleet management features
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