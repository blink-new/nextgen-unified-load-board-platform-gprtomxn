import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs'
import { 
  Truck, 
  Building2, 
  Users, 
  CheckCircle, 
  ArrowLeft,
  Star,
  Zap
} from 'lucide-react'

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-background">
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
          
          <Link to="/login">
            <Button className="bg-accent hover:bg-accent/90">
              Start Free Trial
            </Button>
          </Link>
        </div>
      </header>

      <div className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent border-accent/20">
              15% Off First 6 Months
            </Badge>
            <h1 className="text-4xl font-bold text-primary mb-4">
              Choose Your Plan
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Flexible pricing for every size operation. Start with a 14-day free trial, 
              then choose the plan that fits your needs.
            </p>
          </div>

          {/* Pricing Tabs */}
          <Tabs defaultValue="owner-operator" className="w-full">
            <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto mb-12">
              <TabsTrigger value="owner-operator" className="flex items-center">
                <Truck className="w-4 h-4 mr-2" />
                O/O
              </TabsTrigger>
              <TabsTrigger value="carrier" className="flex items-center">
                <Building2 className="w-4 h-4 mr-2" />
                Carrier
              </TabsTrigger>
              <TabsTrigger value="broker-shipper" className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                Broker
              </TabsTrigger>
            </TabsList>

            {/* Owner-Operator Pricing */}
            <TabsContent value="owner-operator">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Standard
                      <Badge variant="outline">Basic</Badge>
                    </CardTitle>
                    <CardDescription>Perfect for individual owner-operators</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$25</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$29.41</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        1 user account
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Basic load board access
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Truck posting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Rate confirmations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        RestEasy truck stops
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Pro
                      <Badge className="bg-accent/10 text-accent">Recommended</Badge>
                    </CardTitle>
                    <CardDescription>Advanced features for serious operators</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$75</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$88.24</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Up to 3 users
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Priority load matching
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Smart backhaul alerts
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Advanced filtering
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Analytics dashboard
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Email support
                      </li>
                    </ul>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      Premium
                      <Badge className="bg-gradient-to-r from-accent to-accent/80 text-white">
                        <Zap className="w-3 h-3 mr-1" />
                        Enterprise
                      </Badge>
                    </CardTitle>
                    <CardDescription>Full-featured solution for growing operations</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$125</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$147.06</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Unlimited users
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        AI-powered matching
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Real-time notifications
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Custom integrations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Priority support
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Dedicated account manager
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Carrier Pricing */}
            <TabsContent value="carrier">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Standard</CardTitle>
                    <CardDescription>Small fleet management</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$130</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$152.94</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Up to 3 users
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Fleet management tools
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Multi-truck posting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Driver assignments
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Basic analytics
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>Medium fleet operations</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$180</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$211.76</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Up to 6 users
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Advanced fleet tracking
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Automated dispatching
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Performance analytics
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Priority matching
                      </li>
                    </ul>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Premium</CardTitle>
                    <CardDescription>Large fleet enterprise</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$230</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$270.59</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Unlimited users
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Enterprise integrations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Custom reporting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        API access
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Dedicated support
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Broker/Shipper Pricing */}
            <TabsContent value="broker-shipper">
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Basic</CardTitle>
                    <CardDescription>Small brokerage operations</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$29.99</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$35.28</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        1 user account
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Up to 15 loads/month
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Basic load posting
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Carrier search
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Rate confirmations
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2 border-accent relative">
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-accent text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle>Pro</CardTitle>
                    <CardDescription>Growing brokerage business</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$79.99</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$94.11</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Up to 3 users
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Unlimited loads
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Advanced matching
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Carrier vetting tools
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Load tracking
                      </li>
                    </ul>
                    <Button className="w-full bg-accent hover:bg-accent/90">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Premium</CardTitle>
                    <CardDescription>Enterprise brokerage solution</CardDescription>
                    <div className="mt-4">
                      <div className="flex items-baseline">
                        <span className="text-3xl font-bold">$129.99</span>
                        <span className="text-muted-foreground ml-2">/month</span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="line-through">$152.93</span> - 15% off first 6 months
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 mb-6">
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Unlimited users
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Unlimited loads
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        AI-powered optimization
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        Custom integrations
                      </li>
                      <li className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-accent mr-3" />
                        White-label options
                      </li>
                    </ul>
                    <Button className="w-full" variant="outline">
                      Start Free Trial
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* FAQ Section */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-primary mb-8">
              Frequently Asked Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto">
              <div>
                <h3 className="font-semibold mb-2">What happens after my free trial?</h3>
                <p className="text-muted-foreground text-sm">
                  Your account will be locked after 14 days, but your data is retained for 30 days. 
                  You can reactivate anytime by choosing a paid plan.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Can I change plans anytime?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, you can upgrade or downgrade your plan at any time. 
                  Changes take effect immediately with prorated billing.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Do you offer annual discounts?</h3>
                <p className="text-muted-foreground text-sm">
                  Yes, annual plans receive an additional 10% discount on top of our current 15% promotion.
                </p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground text-sm">
                  We accept all major credit cards, ACH transfers, and wire transfers for enterprise accounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}