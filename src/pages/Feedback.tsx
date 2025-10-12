import { useState } from "react";
import { feedbacks } from "@/data/mockData";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Sparkles, Plus } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/AnimatedCard";
import { AIBadge } from "@/components/AIBadge";

export default function Feedback() {
  const [allFeedbacks, setAllFeedbacks] = useState(feedbacks);
  const [newFeedback, setNewFeedback] = useState({
    rating: 0,
    feedback: "",
  });

  const handleSubmitFeedback = () => {
    if (newFeedback.rating === 0 || !newFeedback.feedback.trim()) {
      toast.error("Please provide rating and feedback");
      return;
    }

    const aiSummary = `Feedback rated ${newFeedback.rating} stars. ${
      newFeedback.rating >= 4 ? "Positive experience" : "Mixed experience"
    } with areas for improvement noted.`;

    const feedback = {
      id: allFeedbacks.length + 1,
      internshipTitle: "Current Internship",
      company: "Your Company",
      rating: newFeedback.rating,
      feedback: newFeedback.feedback,
      date: new Date().toISOString().split('T')[0],
      aiSummary,
    };

    setAllFeedbacks([feedback, ...allFeedbacks]);
    setNewFeedback({ rating: 0, feedback: "" });
    toast.success("Feedback submitted successfully!");
  };

  const StarRating = ({ 
    rating, 
    onRatingChange, 
    readonly = false 
  }: { 
    rating: number; 
    onRatingChange?: (rating: number) => void;
    readonly?: boolean;
  }) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <motion.button
            key={star}
            type="button"
            onClick={() => !readonly && onRatingChange?.(star)}
            disabled={readonly}
            whileHover={!readonly ? { scale: 1.2, rotate: 10 } : {}}
            whileTap={!readonly ? { scale: 0.9 } : {}}
            transition={{ duration: 0.2 }}
          >
            <Star
              className={`w-6 h-6 transition-all duration-300 ${
                star <= rating
                  ? "fill-warning text-warning drop-shadow-md"
                  : "text-muted-foreground"
              }`}
            />
          </motion.button>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Feedback</h1>
          <p className="text-muted-foreground font-body">Share your internship experience</p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Give Feedback
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card max-w-2xl">
              <DialogHeader>
                <DialogTitle className="font-heading">Submit Feedback</DialogTitle>
                <DialogDescription className="font-body">
                  Rate your internship experience and provide detailed feedback
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block font-body">Your Rating</label>
                  <StarRating 
                    rating={newFeedback.rating}
                    onRatingChange={(rating) => setNewFeedback({ ...newFeedback, rating })}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block font-body">Detailed Feedback</label>
                  <Textarea
                    placeholder="Share your experience, what you learned, and suggestions for improvement..."
                    value={newFeedback.feedback}
                    onChange={(e) => setNewFeedback({ ...newFeedback, feedback: e.target.value })}
                    rows={6}
                    className="rounded-xl font-body"
                  />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button onClick={handleSubmitFeedback}>Submit Feedback</Button>
                  </DialogTrigger>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {/* Previous Feedback */}
      <div className="space-y-4">
        {allFeedbacks.map((feedback, index) => (
          <AnimatedCard key={feedback.id} delay={0.1 * (index + 1)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <CardTitle className="text-lg font-heading">{feedback.internshipTitle}</CardTitle>
                  <CardDescription className="mt-1 font-body">{feedback.company}</CardDescription>
                </div>
                <div className="text-right">
                  <StarRating rating={feedback.rating} readonly />
                  <p className="text-xs text-muted-foreground mt-1 font-body">
                    {new Date(feedback.date).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm text-foreground font-body">{feedback.feedback}</p>
              </div>
              
              {/* AI Summary */}
              <AnimatedCard className="relative overflow-hidden border-primary/20">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
                <CardContent className="pt-4 relative">
                  <div className="flex items-start gap-2">
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <Sparkles className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    </motion.div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <p className="text-xs font-medium text-primary font-heading">AI Summary</p>
                        <AIBadge />
                      </div>
                      <p className="text-sm text-muted-foreground font-body">{feedback.aiSummary}</p>
                    </div>
                  </div>
                </CardContent>
              </AnimatedCard>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      {allFeedbacks.length === 0 && (
        <AnimatedCard delay={0.1}>
          <div className="p-12 text-center text-muted-foreground font-body">
            <p>No feedback submitted yet</p>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}
