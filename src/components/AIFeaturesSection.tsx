import { Brain, FileText, Shield, CheckCircle, MessageSquare, Briefcase } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const aiFeatures = [
  {
    icon: FileText,
    title: "Auto Resume & Portfolio Builder",
    description: "AI-powered resume generation tailored to your skills",
  },
  {
    icon: MessageSquare,
    title: "AI Interview Buddy",
    description: "Practice interviews with intelligent feedback",
  },
  {
    icon: Shield,
    title: "Fraud Detection",
    description: "AI monitors for fake internships and scams",
  },
  {
    icon: Briefcase,
    title: "Auto-Enhanced Job Descriptions",
    description: "AI optimizes job postings for better matches",
  },
  {
    icon: CheckCircle,
    title: "Compliance Check Agent",
    description: "Ensures NEP 2020 and regulatory compliance",
  },
  {
    icon: Brain,
    title: "Conversational Agent",
    description: "24/7 AI chatbot for instant assistance",
  },
];

export default function AIFeaturesSection() {
  return (
    <section className="py-20 bg-gradient-secondary">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powered by Agentic AI
          </h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-4"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience next-generation intelligent features that streamline your internship journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {aiFeatures.map((feature, index) => (
            <Card 
              key={index} 
              className="hover-lift border-l-4 border-l-accent transition-all duration-300 hover:shadow-lg"
            >
              <CardContent className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {feature.description}
                  </p>
                  <span className="text-xs font-medium text-accent">
                    Powered by Agentic AI
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
