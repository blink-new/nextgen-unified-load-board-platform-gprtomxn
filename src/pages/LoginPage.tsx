import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { Badge } from '../components/ui/badge'
import { blink } from '../blink/client'
import { Truck, Building2, Users, ArrowLeft, CheckCircle } from 'lucide-react'

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('signin')

  const handleSignIn = async () => {
    setIsLoading(true)
    try {
      await blink.auth.login(window.location.origin + '/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      setIsLoading(false)
    }
  }

  const handleSignUp = async () => {
    setIsLoading(true)
    try {
      await blink.auth.login(window.location.origin + '/dashboard')
    } catch (error) {
      console.error('Signup error:', error)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <ArrowLeft className="w-4 h-4 text-muted-foreground" />
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-primary">HaulCentral</span>
          </Link>
          
          <Badge className="bg-accent/10 text-accent border-accent/20">
            14-Day Free Trial
          </Badge>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-primary mb-2">
              Welcome to HaulCentral
            </h1>
            <p className="text-muted-foreground">
              Sign in to access your logistics dashboard
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>
            
            <TabsContent value="signin">
              <Card>
                <CardHeader>
                  <CardTitle>Sign In</CardTitle>
                  <CardDescription>
                    Access your existing HaulCentral account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your@email.com"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input 
                      id="password" 
                      type="password"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="keycode">4-Digit Keycode (Optional)</Label>
                    <Input 
                      id="keycode" 
                      type="text" 
                      placeholder="1234"
                      maxLength={4}
                      disabled={isLoading}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter your company keycode for admin access
                    </p>
                  </div>
                  
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90" 
                    onClick={handleSignIn}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                  
                  <div className="text-center">
                    <Link to="#" className="text-sm text-accent hover:underline">
                      Forgot your password?
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="signup">
              <Card>
                <CardHeader>
                  <CardTitle>Create Account</CardTitle>
                  <CardDescription>
                    Start your 14-day free trial today
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input 
                      id="signup-email" 
                      type="email" 
                      placeholder="your@email.com"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="company-name">Company Name</Label>
                    <Input 
                      id="company-name" 
                      type="text" 
                      placeholder="Your Company LLC"
                      disabled={isLoading}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="category">Account Type</Label>
                    <Select disabled={isLoading}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner-operator">
                          <div className="flex items-center">
                            <Truck className="w-4 h-4 mr-2" />
                            Owner-Operator
                          </div>
                        </SelectItem>
                        <SelectItem value="carrier">
                          <div className="flex items-center">
                            <Building2 className="w-4 h-4 mr-2" />
                            Carrier
                          </div>
                        </SelectItem>
                        <SelectItem value="broker-shipper">
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            Broker/Shipper
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="dot-number">DOT Number (Optional)</Label>
                      <Input 
                        id="dot-number" 
                        type="text" 
                        placeholder="123456"
                        disabled={isLoading}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mc-number">MC Number (Optional)</Label>
                      <Input 
                        id="mc-number" 
                        type="text" 
                        placeholder="MC-123456"
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                  
                  <Button 
                    className="w-full bg-accent hover:bg-accent/90" 
                    onClick={handleSignUp}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Start Free Trial'}
                  </Button>
                  
                  <div className="text-xs text-muted-foreground text-center space-y-2">
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-accent mr-1" />
                        14-Day Free Trial
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-accent mr-1" />
                        No Credit Card Required
                      </div>
                    </div>
                    <p>
                      By signing up, you agree to our{' '}
                      <Link to="#" className="text-accent hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link to="#" className="text-accent hover:underline">Privacy Policy</Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Trial Benefits */}
          <Card className="mt-6 bg-accent/5 border-accent/20">
            <CardContent className="pt-6">
              <h3 className="font-semibold text-center mb-4">Your Free Trial Includes:</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Full access to load board and truck posting
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Smart backhaul alerts and matching
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Rate confirmation generator
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  RestEasy truck stop finder
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-accent mr-2" />
                  Admin panel and user management
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}