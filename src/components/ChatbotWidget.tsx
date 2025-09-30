import { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Mock message handling - in production, this would call an AI backend
      setMessage('');
    }
  };

  return (
    <>
      {/* Chat Panel */}
      {isOpen && (
        <Card className="fixed bottom-24 right-6 w-96 shadow-2xl z-50 animate-scale-in">
          <CardHeader className="bg-gradient-primary text-white rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                AI Assistant
              </CardTitle>
              <Button 
                variant="ghost" 
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {/* Welcome Message */}
            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm">
                Hi, I'm your AI Assistant. Ask me about internships, resumes, or compliance checks!
              </p>
            </div>

            {/* Mock Chat History */}
            <div className="h-64 overflow-y-auto space-y-3">
              <div className="flex justify-start">
                <div className="bg-muted rounded-lg p-3 max-w-[80%]">
                  <p className="text-sm">How can I help you today?</p>
                </div>
              </div>
            </div>

            {/* Input Area */}
            <div className="flex gap-2">
              <Input 
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="flex-1"
              />
              <Button 
                size="icon"
                onClick={handleSendMessage}
                className="bg-accent hover:bg-accent/90"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>

            {/* Powered by Badge */}
            <div className="text-center">
              <span className="text-xs text-accent font-medium">
                Powered by Agentic AI
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Floating Button */}
      <Button
        size="icon"
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-2xl bg-gradient-primary hover:scale-110 transition-transform z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageSquare className="w-6 h-6 text-white" />
        )}
      </Button>
    </>
  );
}
