import { applications } from "@/data/mockData";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Calendar, Building2 } from "lucide-react";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/AnimatedCard";

const getStatusColor = (status: string) => {
  switch (status) {
    case "Accepted":
      return "bg-success text-success-foreground";
    case "Pending":
      return "bg-warning text-warning-foreground";
    case "Rejected":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

export default function MyApplications() {
  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">My Applications</h1>
        <p className="text-muted-foreground font-body">Track the status of your internship applications</p>
      </motion.div>

      <div className="space-y-4">
        {applications.map((application, index) => (
          <AnimatedCard key={application.id} delay={0.1 * (index + 1)}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-heading">{application.internshipTitle}</CardTitle>
                  <CardDescription className="flex items-center gap-2 mt-2 font-body">
                    <Building2 className="w-4 h-4" />
                    {application.company}
                  </CardDescription>
                </div>
                <Badge className={`${getStatusColor(application.status)} rounded-lg`}>
                  {application.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                <Calendar className="w-4 h-4" />
                <span>Applied on {new Date(application.appliedDate).toLocaleDateString('en-IN', { 
                  day: 'numeric', 
                  month: 'long', 
                  year: 'numeric' 
                })}</span>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground font-body">Application Progress</span>
                  <motion.span 
                    className="font-medium"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    {application.progress}%
                  </motion.span>
                </div>
                <Progress value={application.progress} className="h-2" />
              </div>

              <div className="grid grid-cols-4 gap-2 pt-2">
                {["Applied", "Reviewed", "Interview", "Decision"].map((stage, idx) => (
                  <motion.div 
                    key={stage}
                    className="text-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * idx }}
                  >
                    <motion.div 
                      className={`w-8 h-8 rounded-full mx-auto mb-1 flex items-center justify-center transition-all duration-300 ${
                        application.progress >= 25 * (idx + 1) 
                          ? 'gradient-primary text-white shadow-md' 
                          : 'bg-muted text-muted-foreground'
                      }`}
                      whileHover={{ scale: 1.1 }}
                    >
                      {idx + 1}
                    </motion.div>
                    <p className="text-xs text-muted-foreground font-body">{stage}</p>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      {applications.length === 0 && (
        <AnimatedCard delay={0.1}>
          <div className="p-12 text-center text-muted-foreground font-body">
            <p>You haven't applied to any internships yet</p>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}
