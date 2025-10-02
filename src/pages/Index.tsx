import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Building2, Users, ArrowRight, CheckCircle, Star, Users2, Cpu, Shield, Cloud, Blocks, BookOpen, Wifi, WifiOff } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import { LanguageToggle } from '@/components/LanguageToggle';
import { AccessibilityToggle } from '@/components/AccessibilityToggle';
import AIFeaturesSection from '@/components/AIFeaturesSection';
import heroImage from '@/assets/hero-internship.jpg';

const Index = () => {
  const { user, loading } = useAuth();

  // Redirect to dashboard if user is authenticated
  if (user && !loading) {
    return <Navigate to="/dashboard" replace />;
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-secondary">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const features = [
    {
      icon: Users,
      title: "Student Dashboard",
      description: "Discover internship opportunities aligned with your skills and career aspirations.",
      benefits: ["Browse Verified Opportunities", "Track Application Status", "Build Professional Profile"],
      color: "sky"
    },
    {
      icon: Building2,
      title: "Industry Connect",
      description: "Connect with talented students and post verified internship opportunities.",
      benefits: ["Post Opportunities", "Manage Applications", "Blockchain Verification"],
      color: "success"
    },
    {
      icon: GraduationCap,
      title: "Faculty Mentorship",
      description: "Oversee student internships and collaborate with industry partners.",
      benefits: ["Monitor Progress", "Track Placements", "Quality Assurance"],
      color: "warning"
    }
  ];

  const techFeatures = [
    {
      icon: Cpu,
      title: "Agentic AI",
      description: "Smart internship matching and career guidance"
    },
    {
      icon: Blocks,
      title: "Blockchain Verified",
      description: "Secure credential verification system"
    },
    {
      icon: Cloud,
      title: "Cloud Native",
      description: "Scalable and reliable infrastructure"
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Enterprise-grade data protection"
    },
    {
      icon: BookOpen,
      title: "NEP Aligned",
      description: "Following National Education Policy standards"
    }
  ];

  const stats = [
    { icon: Users2, label: "Active Students", value: "6" },
    { icon: Building2, label: "Partner Companies", value: "0" },
    { icon: CheckCircle, label: "Successful Placements", value: "0" },
    { icon: Star, label: "Average Rating", value: "4.8/5" }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Accessibility & Language Bar */}
      <div className="bg-secondary border-b border-border">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="gap-1 border-success text-success">
              <WifiOff className="w-3 h-3" />
              <span className="text-xs">Offline Mode Available</span>
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <AccessibilityToggle />
            <LanguageToggle />
          </div>
        </div>
      </div>

      {/* Hero Section - Kashmir Sky Gradient with Patterns */}
      <div className="relative overflow-hidden bg-gradient-hero jali-pattern">
        <div className="absolute inset-0 ashoka-pattern opacity-50"></div>
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Students and professionals connecting through internships in India" 
            className="w-full h-full object-cover opacity-10"
          />
        </div>
        
        <div className="relative container mx-auto px-4 py-24">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-primary mb-4">
              Prashiskshan
            </h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-2xl md:text-3xl text-primary font-bold mb-4">
              One Nation, One Internship Platform
            </p>
            <div className="w-16 h-1 bg-warning mx-auto mb-8"></div>
            <p className="text-lg md:text-xl text-foreground font-semibold mb-6">
              Empowering India's Future Through Industry Integration
            </p>
            <p className="text-base md:text-lg text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              A comprehensive platform bridging academic excellence and industry opportunities. 
              Leveraging AI, Blockchain, and Cloud technologies to connect students, educational institutions, and industries across India.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-accent hover:text-accent-foreground transition-all duration-300 shadow-lg font-semibold hover-lift"
                onClick={() => window.location.href = '/auth'}
              >
                Experience Internship Innovation
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold transition-all duration-300"
                onClick={() => window.location.href = '/auth'}
              >
                Explore Platform
              </Button>
            </div>
          </div>
        </div>
        
        {/* Mountain Ridge Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-xl mb-4 border-2 border-accent/20">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
              Comprehensive Solution for All Stakeholders
            </h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Designed to serve students, educational institutions, and industry partners 
              with equal focus on accessibility and innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              const colorClass = feature.color === 'sky' ? 'text-sky border-sky/30 bg-sky/10' : 
                                feature.color === 'success' ? 'text-success border-success/30 bg-success/10' : 
                                'text-warning border-warning/30 bg-warning/10';
              return (
                <Card key={index} className="hover-lift transition-all duration-300 border-2 border-border hover:border-accent rounded-xl bg-card">
                  <CardContent className="p-8 text-center">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-xl mb-8 border-2 ${colorClass}`}>
                      <Icon className="w-10 h-10" />
                    </div>
                    <h3 className="text-xl font-bold text-primary mb-4 saffron-underline inline-block">{feature.title}</h3>
                    <p className="text-muted-foreground mb-8 leading-relaxed">{feature.description}</p>
                    <ul className="space-y-4">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center justify-center gap-3 text-sm text-foreground">
                          <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                          <span className="font-medium">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Technology Features */}
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4">
              Powered by Cutting-Edge Technology
            </h3>
            <div className="w-20 h-1 bg-accent mx-auto mb-6"></div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {techFeatures.map((tech, index) => {
              const Icon = tech.icon;
              return (
                <Card key={index} className="hover-lift transition-all duration-300 border border-border bg-card/50">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-lg mb-3 border border-accent/20">
                      <Icon className="w-7 h-7 text-accent" />
                    </div>
                    <h4 className="text-sm font-bold text-primary mb-2">{tech.title}</h4>
                    <p className="text-xs text-muted-foreground">{tech.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Features Section */}
      <AIFeaturesSection />

      {/* Mountain Ridge Divider */}
      <div className="mountain-divider"></div>

      {/* CTA Section */}
      <div className="relative py-20 bg-gradient-primary overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 border-4 border-primary-foreground rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-primary-foreground rounded-full"></div>
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-primary-foreground/95 mb-8 max-w-2xl mx-auto">
            Join us today to build successful career connections and shape your future.
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg font-semibold"
            onClick={() => window.location.href = '/auth'}
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-primary border-t border-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-7 h-7 text-accent" />
            <span className="text-2xl font-bold text-primary-foreground">Prashiskshan</span>
          </div>
          <div className="w-16 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-primary-foreground/90 text-base">
            Connecting Students, Colleges, and Industry
          </p>
          <p className="text-primary-foreground/70 text-sm mt-2">
            Built with dedication for the future of education
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
