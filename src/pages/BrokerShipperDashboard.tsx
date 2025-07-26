import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Textarea } from '../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Users, 
  Package, 
  MapPin, 
  Clock, 
  DollarSign, 
  Bell, 
  Settings,
  Plus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle,
  TrendingUp
} from 'lucide-react'
import { User } from '../types/user'
import { Load } from '../types/load'
import { blink } from '../blink/client'

interface Props {
  user: User
}

export default function BrokerShipperDashboard({ user }: Props) {
  const [loads, setLoads] = useState<Load[]>([])
  const [loading, setLoading] = useState(true)
  const [trialDaysLeft, setTrialDaysLeft] = useState(14)
  const [showPostLoadForm, setShowPostLoadForm] = useState(false)
  const [brokerStats, setBrokerStats] = useState({
    totalLoads: 0,
    activeLoads: 0,
    completedLoads: 0,
    monthlyRevenue: 0,
    avgMargin: 0,
    carrierNetwork: 0
  })

  const loadDashboardData = async () => {
    try {
      // Load user's posted loads
      const loadsData = await blink.db.loads.list({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' }
      })
      setLoads(loadsData)

      const activeLoads = loadsData.filter(load => load.status === 'available').length
      const completedLoads = loadsData.filter(load => load.status === 'delivered').length

      setBrokerStats({
        totalLoads: loadsData.length,
        activeLoads,
        completedLoads,
        monthlyRevenue: 85000, // Sample data
        avgMargin: 12.5, // Sample data
        carrierNetwork: 150 // Sample data
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

  const handlePostLoad = async (formData: FormData) => {
    try {
      const loadData = {
        id: `load_${Date.now()}`,
        loadId: `LD${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        pickupCity: formData.get('pickupCity') as string,
        pickupState: formData.get('pickupState') as string,
        dropoffCity: formData.get('dropoffCity') as string,
        dropoffState: formData.get('dropoffState') as string,
        pickupDate: formData.get('pickupDate') as string,
        deliveryDate: formData.get('deliveryDate') as string,
        equipmentType: formData.get('equipmentType') as string,
        weight: parseInt(formData.get('weight') as string) || 0,
        rate: parseFloat(formData.get('rate') as string),
        rateType: formData.get('rateType') as 'per_mile' | 'flat_rate',
        miles: parseInt(formData.get('miles') as string),
        description: formData.get('description') as string,
        postedBy: user.displayName || user.email,
        postedByCompany: user.companyName || 'Unknown Company',
        contactEmail: user.email,
        userId: user.id,
        status: 'available' as const
      }

      await blink.db.loads.create(loadData)
      setShowPostLoadForm(false)
      loadDashboardData() // Refresh data
    } catch (error) {
      console.error('Error posting load:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading broker dashboard...</p>
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
                <Users className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">HaulCentral</span>
            </div>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              Broker/Shipper
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
                  <p className="text-sm font-medium text-muted-foreground">Total Loads</p>
                  <p className="text-2xl font-bold">{brokerStats.totalLoads}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Package className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Loads</p>
                  <p className="text-2xl font-bold text-accent">{brokerStats.activeLoads}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold text-success">{brokerStats.completedLoads}</p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-success" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Revenue</p>
                  <p className="text-2xl font-bold">${brokerStats.monthlyRevenue.toLocaleString()}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Avg Margin</p>
                  <p className="text-2xl font-bold">{brokerStats.avgMargin}%</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Carrier Network</p>
                  <p className="text-2xl font-bold">{brokerStats.carrierNetwork}</p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Users className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="my-loads" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="my-loads">My Loads</TabsTrigger>
            <TabsTrigger value="post-load">Post Load</TabsTrigger>
            <TabsTrigger value="carriers">Carriers</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          {/* My Loads Tab */}
          <TabsContent value="my-loads" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">My Posted Loads</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search loads..." className="w-64" />
                </div>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            {loads.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No loads posted yet</h3>
                  <p className="text-muted-foreground mb-4">
                    Start posting loads to connect with carriers and grow your business
                  </p>
                  <Button 
                    className="bg-accent hover:bg-accent/90"
                    onClick={() => setShowPostLoadForm(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Post Your First Load
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {loads.map((load) => (
                  <Card key={load.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-2">
                            <Badge variant="outline">{load.loadId}</Badge>
                            <Badge className="bg-accent/10 text-accent">
                              {load.equipmentType}
                            </Badge>
                            <Badge 
                              className={
                                load.status === 'available' 
                                  ? 'bg-success/10 text-success'
                                  : load.status === 'booked'
                                  ? 'bg-warning/10 text-warning'
                                  : 'bg-muted/10 text-muted-foreground'
                              }
                            >
                              {load.status}
                            </Badge>
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
                              <span className="text-sm">{load.miles} miles</span>
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
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            View Bids
                          </Button>
                          <Button className="bg-accent hover:bg-accent/90" size="sm">
                            Track
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Post Load Tab */}
          <TabsContent value="post-load" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Post New Load</h2>
              <Badge className="bg-accent/10 text-accent">
                Quick Post
              </Badge>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Load Details</CardTitle>
                <CardDescription>
                  Fill in the load information to post to the load board
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.currentTarget)
                    handlePostLoad(formData)
                  }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Pickup Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="pickupCity">Pickup City</Label>
                          <Input id="pickupCity" name="pickupCity" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="pickupState">Pickup State</Label>
                          <Select name="pickupState" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              {/* Add more states */}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="pickupDate">Pickup Date</Label>
                        <Input id="pickupDate" name="pickupDate" type="date" required />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="font-semibold">Delivery Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="dropoffCity">Delivery City</Label>
                          <Input id="dropoffCity" name="dropoffCity" required />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="dropoffState">Delivery State</Label>
                          <Select name="dropoffState" required>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="TX">Texas</SelectItem>
                              <SelectItem value="CA">California</SelectItem>
                              <SelectItem value="FL">Florida</SelectItem>
                              <SelectItem value="NY">New York</SelectItem>
                              {/* Add more states */}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deliveryDate">Delivery Date</Label>
                        <Input id="deliveryDate" name="deliveryDate" type="date" />
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="equipmentType">Equipment Type</Label>
                      <Select name="equipmentType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select equipment" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Dry Van">Dry Van</SelectItem>
                          <SelectItem value="Reefer">Reefer</SelectItem>
                          <SelectItem value="Flatbed">Flatbed</SelectItem>
                          <SelectItem value="Step Deck">Step Deck</SelectItem>
                          <SelectItem value="Lowboy">Lowboy</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (lbs)</Label>
                      <Input id="weight" name="weight" type="number" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="miles">Miles</Label>
                      <Input id="miles" name="miles" type="number" required />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="rate">Rate ($)</Label>
                      <Input id="rate" name="rate" type="number" step="0.01" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="rateType">Rate Type</Label>
                      <Select name="rateType" defaultValue="flat_rate">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="flat_rate">Flat Rate</SelectItem>
                          <SelectItem value="per_mile">Per Mile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Load Description</Label>
                    <Textarea 
                      id="description" 
                      name="description" 
                      placeholder="Describe the load, special requirements, etc."
                      rows={3}
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <Button type="submit" className="bg-accent hover:bg-accent/90">
                      Post Load
                    </Button>
                    <Button type="button" variant="outline">
                      Save as Draft
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carriers Tab */}
          <TabsContent value="carriers" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Carrier Network</h2>
              <Button className="bg-accent hover:bg-accent/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Carrier
              </Button>
            </div>

            <Card>
              <CardContent className="p-12 text-center">
                <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Carrier management coming soon</h3>
                <p className="text-muted-foreground mb-4">
                  Build and manage your preferred carrier network
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Business Analytics</h2>
              <Badge className="bg-accent/10 text-accent">
                Pro Feature
              </Badge>
            </div>

            <Card>
              <CardContent className="p-12 text-center">
                <TrendingUp className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics dashboard coming soon</h3>
                <p className="text-muted-foreground mb-4">
                  Track your business performance with detailed analytics
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
                    Update your brokerage information
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
                    Manage your broker subscription
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
                      Upgrade to Pro or Premium for unlimited loads and advanced features
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