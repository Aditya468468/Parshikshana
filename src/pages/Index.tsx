import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, Building2, Users, ArrowRight, CheckCircle, Star, Users2 } from 'lucide-react';
import { Loader2 } from 'lucide-react';
import heroImage from '@/assets/hero-internship.jpg';

const Index = () => {
  const { user, loading } = useAuth();

  // Redirect to dashboard if user is authenticated
  if (user) {
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
      title: "For Students",
      description: "Find and apply for internships that match your skills and career goals.",
      benefits: ["Browse opportunities", "Track applications", "Build your profile"]
    },
    {
      icon: Building2,
      title: "For Companies",
      description: "Post internships and find talented students for your organization.",
      benefits: ["Post opportunities", "Manage applications", "Verify credentials"]
    },
    {
      icon: GraduationCap,
      title: "For Colleges",
      description: "Manage student internships and partner with industry leaders.",
      benefits: ["Oversee programs", "Track placements", "Ensure quality"]
    }
  ];

  const stats = [
    { icon: Users2, label: "Active Students", value: "2,500+" },
    { icon: Building2, label: "Partner Companies", value: "150+" },
    { icon: CheckCircle, label: "Successful Placements", value: "1,800+" },
    { icon: Star, label: "Average Rating", value: "4.8/5" }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={heroImage} 
            alt="Students and professionals connecting through internships" 
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-primary opacity-10" />
        </div>
        
        <div className="relative container mx-auto px-4 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              InternLink
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Connecting Students, Colleges, and Industry
            </p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
              A comprehensive platform that bridges the gap between academic learning and industry experience. 
              Find your perfect internship opportunity or discover talented students for your organization.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-all duration-200 shadow-lg"
                onClick={() => window.location.href = '/auth'}
              >
                Get Started Today
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.href = '/auth'}
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-card/50 backdrop-blur">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Built for Everyone
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Whether you're a student seeking opportunities, a company looking for talent, 
              or a college managing programs, we have the right tools for you.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="hover:shadow-lg transition-all duration-200 border-0 bg-card/80 backdrop-blur">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-lg mb-6">
                      <Icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground mb-6">{feature.description}</p>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle className="w-4 h-4 text-success" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20 bg-gradient-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Join thousands of students, companies, and colleges already using InternLink 
            to build successful career connections.
          </p>
          <Button 
            size="lg" 
            variant="secondary"
            className="bg-white text-primary hover:bg-white/90 shadow-lg"
            onClick={() => window.location.href = '/auth'}
          >
            Start Your Journey
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <GraduationCap className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold text-foreground">InternLink</span>
          </div>
          <p className="text-muted-foreground">
            Connecting Students, Colleges, and Industry • Built with ❤️ for the future of education
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
