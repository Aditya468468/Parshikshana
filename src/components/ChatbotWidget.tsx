import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi, I'm your AI Assistant! 🌟\n\nI can help you with:\n• Finding best internships for you\n• Resume & portfolio building\n• Compliance checks (NEP/AICTE)\n• Interview preparation\n• Company recommendations\n\nWhat would you like to know?"
    }
  ]);

  const quickActions = [
    "Which internship is best for me?",
    "Show top 5 ML students",
    "Generate AICTE report",
    "Help with resume"
  ];

  const handleSend = (text?: string) => {
    const messageText = text || message;
    if (!messageText.trim()) return;
    
    setMessages([...messages, { role: 'user', content: messageText }]);
    setMessage('');
    
    // Simulate AI response based on message
    setTimeout(() => {
      let response = 'This is a demo response. In production, this would connect to an AI service.';
      
      if (messageText.toLowerCase().includes('internship') || messageText.toLowerCase().includes('best for me')) {
        response = "Based on your profile (B.Tech CSE, 3rd year), here are top matches:\n\n1. **Machine Learning Intern** at Tech Corp (94% match)\n   Skills: Python, TensorFlow\n\n2. **Full Stack Developer** at StartupX (89% match)\n   Skills: React, Node.js\n\n3. **Cloud Engineer** at CloudTech (87% match)\n   Skills: AWS, Docker\n\nWould you like details on any of these?";
      } else if (messageText.toLowerCase().includes('student') || messageText.toLowerCase().includes('ml')) {
        response = "Top 5 students for ML internship:\n\n1. Priya Sharma - 94% match\n   B.Tech AI/ML | Python, TensorFlow, Scikit-learn\n\n2. Arjun Patel - 91% match\n   B.Tech CSE | Python, PyTorch, Data Science\n\n3. Sneha Gupta - 89% match\n   B.Tech IT | Python, ML, Deep Learning\n\nWould you like to schedule interviews?";
      } else if (messageText.toLowerCase().includes('report') || messageText.toLowerCase().includes('aicte')) {
        response = "I can generate the following AICTE-compliant reports:\n\n✓ Student Placement Report (2024-25)\n✓ Internship Compliance Document\n✓ NEP Learning Outcomes\n✓ Diversity & Inclusion Report\n\nAll reports include attendance, stipend details, and learning outcomes. Which one would you like?";
      } else if (messageText.toLowerCase().includes('resume')) {
        response = "I can help you build an ATS-optimized resume!\n\n✨ **Features:**\n• Auto-fill from your profile\n• Skill-based formatting\n• NEP-compliant sections\n• Industry-standard templates\n\nShall I start building your resume now?";
      }
      
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response
      }]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 w-16 h-16 rounded-full shadow-lg bg-gradient-to-r from-accent to-primary hover:shadow-xl transition-all z-50 group"
        >
          <MessageCircle className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-success rounded-full animate-pulse"></span>
        </Button>
      )}

      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-8 right-8 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          <CardHeader className="bg-gradient-to-r from-accent to-primary text-white p-4 rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                AI Assistant
                <Badge className="bg-white/20 text-white border-0 text-xs">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Agentic AI
                </Badge>
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] p-3 rounded-lg ${
                    msg.role === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-foreground'
                  }`}
                >
                  <p className="text-sm whitespace-pre-line">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground text-center">Quick actions:</p>
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      onClick={() => handleSend(action)}
                      className="text-xs"
                    >
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>

          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                placeholder="Ask me anything..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1"
              />
              <Button onClick={() => handleSend()} size="icon" className="bg-accent hover:bg-accent/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Powered by Agentic AI
            </p>
          </div>
        </Card>
      )}
    </>
  );
}
