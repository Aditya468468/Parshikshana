import { useState } from "react";
import { courses } from "@/data/mockData";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Sparkles, Clock, ExternalLink } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/AnimatedCard";
import { AIBadge } from "@/components/AIBadge";

export default function SkillCourses() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCourses = courses.filter((course) =>
    course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    course.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleEnroll = (courseTitle: string) => {
    toast.success(`Enrolled in ${courseTitle}!`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Skill Courses</h1>
        <p className="text-muted-foreground font-body">Enhance your skills with recommended courses</p>
      </motion.div>

      {/* Search */}
      <AnimatedCard delay={0.1}>
        <CardContent className="pt-6">
          <Input
            placeholder="Search courses by name or tag..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="rounded-xl"
          />
        </CardContent>
      </AnimatedCard>

      {/* AI Recommendations */}
      <AnimatedCard delay={0.2} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary/10" />
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="w-5 h-5 text-primary" />
              </motion.div>
              <CardTitle className="font-heading">AI Recommended for You</CardTitle>
            </div>
            <AIBadge />
          </div>
          <CardDescription className="font-body">Based on your internship and career goals</CardDescription>
        </CardHeader>
      </AnimatedCard>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredCourses.map((course, index) => (
          <AnimatedCard key={course.id} delay={0.1 * (index + 3)} className="relative">
            {course.recommended && (
              <motion.div 
                className="absolute top-4 right-4 z-10"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <Badge className="gradient-primary text-white border-0 shadow-md">
                  <Sparkles className="w-3 h-3 mr-1" />
                  AI Recommended
                </Badge>
              </motion.div>
            )}
            <CardHeader>
              <CardTitle className="text-lg font-heading pr-24">{course.title}</CardTitle>
              <CardDescription className="font-body">{course.provider}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <motion.div
                    key={tag}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Badge variant="secondary" className="rounded-lg">{tag}</Badge>
                  </motion.div>
                ))}
              </div>

              <motion.div 
                className="flex items-center gap-2 text-sm text-muted-foreground font-body"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <Clock className="w-4 h-4 text-primary" />
                <span>{course.duration}</span>
              </motion.div>

              {course.progress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-body">Progress</span>
                    <motion.span 
                      className="font-medium"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {course.progress}%
                    </motion.span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              )}

              <div className="flex gap-2 pt-2">
                {course.progress === 0 ? (
                  <Button 
                    className="flex-1"
                    onClick={() => handleEnroll(course.title)}
                  >
                    Enroll Now
                  </Button>
                ) : course.progress === 100 ? (
                  <Button variant="outline" className="flex-1" disabled>
                    Completed
                  </Button>
                ) : (
                  <Button className="flex-1">
                    Continue Learning
                  </Button>
                )}
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                  <Button variant="outline" size="icon">
                    <ExternalLink className="w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <AnimatedCard delay={0.2}>
          <div className="p-12 text-center text-muted-foreground font-body">
            <p>No courses found matching your search</p>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}
