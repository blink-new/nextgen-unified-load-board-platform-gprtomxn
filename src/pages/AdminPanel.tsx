import { useState, useEffect } from 'react'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { 
  Shield, 
  Users, 
  Settings, 
  Key, 
  UserPlus, 
  UserMinus,
  Crown,
  Clock,
  DollarSign,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  ArrowLeft
} from 'lucide-react'
import { User } from '../types/user'
import { blink } from '../blink/client'
import { Link } from 'react-router-dom'

interface Props {
  user: User
}

interface CompanyUser {
  id: string
  email: string
  displayName?: string
  isAdmin: boolean
  keycode?: string
  status: 'active' | 'inactive'
  lastLogin?: string
}

export default function AdminPanel({ user }: Props) {
  const [loading, setLoading] = useState(true)
  const [companyUsers, setCompanyUsers] = useState<CompanyUser[]>([])
  const [showAddUserForm, setShowAddUserForm] = useState(false)
  const [adminKeycode, setAdminKeycode] = useState('')
  const [keycodeVerified, setKeycodeVerified] = useState(false)

  const loadAdminData = async () => {
    try {
      // Load company users (mock data for now)
      const mockUsers: CompanyUser[] = [
        {
          id: '1',
          email: 'admin@company.com',
          displayName: 'Admin User',
          isAdmin: true,
          keycode: '1234',
          status: 'active',
          lastLogin: new Date().toISOString()
        },
        {
          id: '2',
          email: 'driver1@company.com',
          displayName: 'John Driver',
          isAdmin: false,
          keycode: '5678',
          status: 'active',
          lastLogin: new Date(Date.now() - 86400000).toISOString()
        }
      ]
      setCompanyUsers(mockUsers)
    } catch (error) {
      console.error('Error loading admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadAdminData()
  }, [])

  const handleKeycodeVerification = () => {
    // In a real app, this would verify against the database
    if (adminKeycode === '1234') {
      setKeycodeVerified(true)
    } else {
      alert('Invalid keycode. Please try again.')
    }
  }

  const handleAddUser = async (formData: FormData) => {
    try {
      const newUser: CompanyUser = {
        id: Date.now().toString(),
        email: formData.get('email') as string,
        displayName: formData.get('displayName') as string,
        isAdmin: formData.get('isAdmin') === 'true',
        keycode: formData.get('keycode') as string,
        status: 'active',
        lastLogin: undefined
      }

      setCompanyUsers(prev => [...prev, newUser])
      setShowAddUserForm(false)
    } catch (error) {
      console.error('Error adding user:', error)
    }
  }

  const getDashboardPath = () => {
    return `/dashboard/${user.category}`
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading admin panel...</p>
        </div>
      </div>
    )
  }

  // Keycode verification screen
  if (!keycodeVerified) {
    return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            <Link to={getDashboardPath()} className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">Admin Panel</span>
            </div>
          </div>
        </header>

        <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Key className="w-8 h-8 text-accent" />
              </div>
              <CardTitle>Admin Access Required</CardTitle>
              <CardDescription>
                Enter your 4-digit admin keycode to access the admin panel
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="keycode">Admin Keycode</Label>
                <Input
                  id="keycode"
                  type="password"
                  placeholder="Enter 4-digit code"
                  maxLength={4}
                  value={adminKeycode}
                  onChange={(e) => setAdminKeycode(e.target.value)}
                  className="text-center text-2xl tracking-widest"
                />
              </div>
              
              <Button 
                className="w-full bg-accent hover:bg-accent/90"
                onClick={handleKeycodeVerification}
                disabled={adminKeycode.length !== 4}
              >
                <Shield className="w-4 h-4 mr-2" />
                Verify Access
              </Button>
              
              <div className="text-center text-sm text-muted-foreground">
                <p>Don't have an admin keycode?</p>
                <p>Contact your company administrator for access.</p>
              </div>
            </CardContent>
          </Card>
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
            <Link to={getDashboardPath()} className="flex items-center space-x-2 text-muted-foreground hover:text-primary">
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Dashboard</span>
            </Link>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-primary">Admin Panel</span>
            </div>
            <Badge className="bg-accent/10 text-accent border-accent/20">
              <Crown className="w-3 h-3 mr-1" />
              Administrator
            </Badge>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge variant="outline">
              {user.companyName || 'Company Admin'}
            </Badge>
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
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{companyUsers.length}</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Active Users</p>
                  <p className="text-2xl font-bold text-success">
                    {companyUsers.filter(u => u.status === 'active').length}
                  </p>
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
                  <p className="text-sm font-medium text-muted-foreground">Admins</p>
                  <p className="text-2xl font-bold">
                    {companyUsers.filter(u => u.isAdmin).length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Crown className="w-6 h-6 text-accent" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Trial Days Left</p>
                  <p className="text-2xl font-bold text-warning">14</p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Clock className="w-6 h-6 text-warning" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="company">Company Settings</TabsTrigger>
            <TabsTrigger value="billing">Billing & Plans</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* User Management Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">User Management</h2>
              <Button 
                className="bg-accent hover:bg-accent/90"
                onClick={() => setShowAddUserForm(true)}
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Add User
              </Button>
            </div>

            {showAddUserForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Add New User</CardTitle>
                  <CardDescription>
                    Add a new user to your company account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault()
                      const formData = new FormData(e.currentTarget)
                      handleAddUser(formData)
                    }}
                    className="space-y-4"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input id="email" name="email" type="email" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="displayName">Display Name</Label>
                        <Input id="displayName" name="displayName" />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="keycode">4-Digit Keycode</Label>
                        <Input 
                          id="keycode" 
                          name="keycode" 
                          maxLength={4}
                          placeholder="1234"
                          required 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="isAdmin">User Role</Label>
                        <Select name="isAdmin" defaultValue="false">
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="false">Regular User</SelectItem>
                            <SelectItem value="true">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                      <Button type="submit" className="bg-accent hover:bg-accent/90">
                        Add User
                      </Button>
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setShowAddUserForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            <div className="grid gap-4">
              {companyUsers.map((companyUser) => (
                <Card key={companyUser.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4 mb-2">
                          <div>
                            <h3 className="font-semibold">
                              {companyUser.displayName || companyUser.email}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              {companyUser.email}
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            {companyUser.isAdmin && (
                              <Badge className="bg-accent/10 text-accent">
                                <Crown className="w-3 h-3 mr-1" />
                                Admin
                              </Badge>
                            )}
                            <Badge 
                              className={
                                companyUser.status === 'active'
                                  ? 'bg-success/10 text-success'
                                  : 'bg-muted/10 text-muted-foreground'
                              }
                            >
                              {companyUser.status}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                          <span>Keycode: {companyUser.keycode}</span>
                          {companyUser.lastLogin && (
                            <span>
                              Last login: {new Date(companyUser.lastLogin).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        {!companyUser.isAdmin && (
                          <Button variant="outline" size="sm">
                            <UserMinus className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Company Settings Tab */}
          <TabsContent value="company" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Company Settings</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Company Information</CardTitle>
                  <CardDescription>
                    Update your company details and contact information
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
                  <div className="space-y-2">
                    <Label htmlFor="address">Business Address</Label>
                    <Input id="address" placeholder="123 Main St, City, State 12345" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" placeholder="(555) 123-4567" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-email">Contact Email</Label>
                      <Input id="contact-email" type="email" defaultValue={user.email} />
                    </div>
                  </div>
                  <Button className="w-full">Update Company Information</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>
                    Manage admin access and security preferences
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="master-keycode">Master Admin Keycode</Label>
                    <Input 
                      id="master-keycode" 
                      type="password" 
                      placeholder="Current: ****"
                      maxLength={4}
                    />
                    <p className="text-xs text-muted-foreground">
                      Used for admin panel access and sensitive operations
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Two-Factor Authentication</Label>
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className="text-warning">
                        <AlertTriangle className="w-3 h-3 mr-1" />
                        Not Enabled
                      </Badge>
                      <Button variant="outline" size="sm">
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Session Timeout</Label>
                    <Select defaultValue="8">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1 hour</SelectItem>
                        <SelectItem value="4">4 hours</SelectItem>
                        <SelectItem value="8">8 hours</SelectItem>
                        <SelectItem value="24">24 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button className="w-full">Update Security Settings</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Billing & Subscription</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Plan</CardTitle>
                  <CardDescription>
                    Your current subscription and usage
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-warning/10 rounded-lg">
                    <div>
                      <p className="font-medium">Free Trial</p>
                      <p className="text-sm text-muted-foreground">
                        14 days remaining
                      </p>
                    </div>
                    <Clock className="w-8 h-8 text-warning" />
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm">Users</span>
                      <span className="text-sm">{companyUsers.length} / Unlimited</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Loads Posted</span>
                      <span className="text-sm">5 / Unlimited</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Backhaul Alerts</span>
                      <span className="text-sm">Enabled</span>
                    </div>
                  </div>
                  
                  <Link to="/pricing">
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      <DollarSign className="w-4 h-4 mr-2" />
                      Upgrade Plan
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>
                    Your payment history and invoices
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      No billing history yet
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Billing history will appear here after your first payment
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Company Analytics</h2>
              <Badge className="bg-accent/10 text-accent">
                Pro Feature
              </Badge>
            </div>

            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Analytics Dashboard</h3>
                <p className="text-muted-foreground mb-4">
                  Detailed analytics and reporting will be available in Pro and Premium plans
                </p>
                <Link to="/pricing">
                  <Button className="bg-accent hover:bg-accent/90">
                    Upgrade to Access Analytics
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}