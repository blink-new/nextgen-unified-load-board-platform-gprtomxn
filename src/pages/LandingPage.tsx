import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Badge } from '../components/ui/badge'
import { 
  Truck, 
  Building2, 
  Users, 
  MapPin, 
  Clock, 
  Shield, 
  Zap,
  CheckCircle,
  ArrowRight,
  Star
} from 'lucide-react'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">HaulCentral</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="#features" className="text-white hover:text-accent transition-colors">
              Features
            </Link>
            <Link to="#pricing" className="text-white hover:text-accent transition-colors">
              Pricing
            </Link>
            <Link to="#about" className="text-white hover:text-accent transition-colors">
              About
            </Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <Link to="/login">
              <Button variant="ghost">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-accent hover:bg-accent/90">
                Start Free Trial
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <Badge className="mb-6 bg-accent/10 text-accent border-accent/20">
            Industry-Leading Load Board Platform
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            The Future of
            <span className="text-accent block">Freight Matching</span>
          </h1>
          
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Every Load. Every Mile. Every Time.
          </p>
          
          <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto">
            Advanced matching, backhaul alerts, and enterprise-grade tools for logistics professionals. 
            The most comprehensive load board platform built for the modern freight industry.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link to="/login">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8">
                Start 14-Day Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="#features">
              <Button size="lg" variant="outline" className="px-8">
                See Features
              </Button>
            </Link>
          </div>
          
          <div className="flex items-center justify-center space-x-8 text-sm text-white">
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-accent mr-2" />
              14-Day Free Trial
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-accent mr-2" />
              No Setup Fees
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-4 h-4 text-accent mr-2" />
              Cancel Anytime
            </div>
          </div>
        </div>
      </section>

      {/* User Categories */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Built for Every Role in Logistics
            </h2>
            <p className="text-white max-w-2xl mx-auto">
              Tailored dashboards and features for each category of logistics professional
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Truck className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Owner-Operators</CardTitle>
                <CardDescription>
                  Independent drivers looking for profitable loads
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Smart load matching
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Backhaul alerts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Rate confirmations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Truck stop finder
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Building2 className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Carriers</CardTitle>
                <CardDescription>
                  Fleet managers optimizing operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Fleet management
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Multi-truck posting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Driver assignments
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Analytics dashboard
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="border-2 hover:border-accent/50 transition-colors">
              <CardHeader className="text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-accent" />
                </div>
                <CardTitle>Brokers & Shippers</CardTitle>
                <CardDescription>
                  Freight brokers and shipping companies
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Load posting tools
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Carrier vetting
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Automated matching
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="w-4 h-4 text-accent mr-2" />
                    Load tracking
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section id="features" className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-white max-w-2xl mx-auto">
              Advanced tools that set HaulCentral apart from traditional load boards
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Smart Backhaul Matching</h3>
              <p className="text-white">
                AI-powered system automatically matches loads to trucks heading in the right direction
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Geolocation Intelligence</h3>
              <p className="text-white">
                Advanced proximity matching with customizable radius settings for optimal load discovery
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Real-Time Alerts</h3>
              <p className="text-white">
                Instant notifications for new loads, backhaul opportunities, and rate changes
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Enterprise Security</h3>
              <p className="text-white">
                4-digit keycode access, admin controls, and secure company data management
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">RestEasy Integration</h3>
              <p className="text-white">
                Built-in truck stop finder with fuel prices and overnight parking information
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">Rate Confirmations</h3>
              <p className="text-white">
                Automated rate confirmation generator with PDF export and digital signatures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your Freight Operations?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of logistics professionals who trust HaulCentral for their freight matching needs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white px-8">
                Start Your Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary px-8">
                View Pricing
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t bg-muted/30">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Truck className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">HaulCentral</span>
              </div>
              <p className="text-white text-sm">
                The industry-leading load board platform for modern logistics professionals.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Platform</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><Link to="#" className="hover:text-primary">Load Board</Link></li>
                <li><Link to="#" className="hover:text-primary">Truck Posting</Link></li>
                <li><Link to="#" className="hover:text-primary">Backhaul Alerts</Link></li>
                <li><Link to="#" className="hover:text-primary">RestEasy</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Company</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><Link to="#" className="hover:text-primary">About Us</Link></li>
                <li><Link to="#" className="hover:text-primary">Contact</Link></li>
                <li><Link to="#" className="hover:text-primary">Support</Link></li>
                <li><Link to="#" className="hover:text-primary">Blog</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2 text-sm text-white">
                <li><Link to="#" className="hover:text-primary">Privacy Policy</Link></li>
                <li><Link to="#" className="hover:text-primary">Terms of Service</Link></li>
                <li><Link to="#" className="hover:text-primary">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t mt-8 pt-8 text-center text-sm text-white">
            <p>&copy; 2024 HaulCentral. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}