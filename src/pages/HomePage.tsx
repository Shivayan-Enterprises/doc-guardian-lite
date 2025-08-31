import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Shield, 
  Zap, 
  Clock, 
  CheckCircle2, 
  Users,
  Star,
  FileCheck
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const HomePage = () => {
  const features = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Advanced Detection",
      description: "State-of-the-art algorithms to detect plagiarism across multiple sources"
    },
    {
      icon: <Zap className="h-8 w-8 text-accent" />,
      title: "AI-Powered Analysis",
      description: "Optional AI check for enhanced accuracy and detailed insights"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "Flexible Delivery",
      description: "Choose from immediate, 1-day, or flexible delivery options"
    },
    {
      icon: <FileCheck className="h-8 w-8 text-accent" />,
      title: "Multiple Formats",
      description: "Support for PDF and DOCX files up to 10,000 pages"
    }
  ];

  const stats = [
    { number: "50K+", label: "Documents Checked" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" },
    { number: "< 1min", label: "Average Processing" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-background via-primary/5 to-accent/5">
        <div className="container mx-auto px-4 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  <Star className="mr-1 h-3 w-3" />
                  Trusted by Students & Professionals
                </Badge>
                <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                  Professional 
                  <span className="bg-gradient-hero bg-clip-text text-transparent"> Plagiarism </span>
                  Detection
                </h1>
                <p className="text-xl text-muted-foreground max-w-lg">
                  Ensure your documents are original with our advanced plagiarism detection system. 
                  Fast, accurate, and reliable results every time.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="hero" size="lg">
                  <Link to="/check">
                    <FileText className="mr-2 h-5 w-5" />
                    Start Plagiarism Check
                  </Link>
                </Button>
                <Button variant="outline" size="lg">
                  <Users className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 pt-8">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Plagiarism Detection"
                className="rounded-2xl shadow-medium w-full"
              />
              <div className="absolute inset-0 bg-gradient-hero opacity-10 rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Why Choose DocGuardian?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive plagiarism detection service offers everything you need 
              to ensure document originality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center shadow-soft hover:shadow-medium transition-smooth">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-muted rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Overview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-4xl font-bold">Transparent Pricing</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Pay only for what you need with our flexible page-based pricing system.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="shadow-soft">
              <CardHeader className="text-center">
                <CardTitle>Basic Check</CardTitle>
                <div className="text-3xl font-bold text-primary">₹2<span className="text-base font-normal">/page</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    Up to 100 pages
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    Standard detection
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    Email delivery
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-medium border-primary">
              <CardHeader className="text-center">
                <Badge className="mb-2">Most Popular</Badge>
                <CardTitle>Pro Check</CardTitle>
                <div className="text-3xl font-bold text-primary">₹1.5<span className="text-base font-normal">/page</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    101-500 pages
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    Advanced detection
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    Priority processing
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader className="text-center">
                <CardTitle>Enterprise</CardTitle>
                <div className="text-3xl font-bold text-primary">₹1<span className="text-base font-normal">/page</span></div>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    1000+ pages
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    Premium features
                  </li>
                  <li className="flex items-center">
                    <CheckCircle2 className="h-4 w-4 text-accent mr-2" />
                    Bulk processing
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-12">
            <Button asChild variant="hero" size="lg">
              <Link to="/check">
                Get Started Now
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;