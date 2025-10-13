import { useState } from "react";
import { logbookEntries } from "@/data/mockData";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, Clock, CheckCircle2, AlertCircle, Plus, Upload } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/AnimatedCard";

const getStatusColor = (status: string) => {
  return status === "Completed" 
    ? "bg-success text-success-foreground" 
    : "bg-warning text-warning-foreground";
};

export default function MyLogbook() {
  const [entries, setEntries] = useState(logbookEntries);
  const [newEntry, setNewEntry] = useState({
    date: "",
    task: "",
    hours: 0,
    status: "In Progress",
  });

  const totalHours = entries.reduce((sum, entry) => sum + entry.hours, 0);

  const handleAddEntry = () => {
    if (!newEntry.date || !newEntry.task || newEntry.hours <= 0) {
      toast.error("Please fill all fields correctly");
      return;
    }

    const entry = {
      id: entries.length + 1,
      ...newEntry,
      proof: null,
    };

    setEntries([entry, ...entries]);
    setNewEntry({ date: "", task: "", hours: 0, status: "In Progress" });
    toast.success("Log entry added successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-heading font-bold text-foreground mb-2">My Logbook</h1>
          <p className="text-muted-foreground font-body">Track your daily internship activities</p>
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
                Add Entry
              </Button>
            </DialogTrigger>
            <DialogContent className="glass-card">
              <DialogHeader>
                <DialogTitle className="font-heading">Add Log Entry</DialogTitle>
                <DialogDescription className="font-body">Record your daily internship activities</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block font-body">Date</label>
                  <Input
                    type="date"
                    value={newEntry.date}
                    onChange={(e) => setNewEntry({ ...newEntry, date: e.target.value })}
                    className="rounded-xl"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block font-body">Task Description</label>
                  <Textarea
                    placeholder="Describe what you worked on..."
                    value={newEntry.task}
                    onChange={(e) => setNewEntry({ ...newEntry, task: e.target.value })}
                    rows={4}
                    className="rounded-xl font-body"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block font-body">Working Hours</label>
                  <Input
                    type="number"
                    min="0"
                    max="24"
                    value={newEntry.hours || ""}
                    onChange={(e) => setNewEntry({ ...newEntry, hours: parseInt(e.target.value) || 0 })}
                    className="rounded-xl"
                  />
                </div>
                <div className="flex gap-3 justify-end pt-4">
                  <DialogTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogTrigger>
                  <DialogTrigger asChild>
                    <Button onClick={handleAddEntry}>Add Entry</Button>
                  </DialogTrigger>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>

      {/* Summary Card */}
      <AnimatedCard delay={0.1} className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5" />
        <CardHeader className="relative">
          <CardTitle className="text-xl font-heading">Internship Summary</CardTitle>
        </CardHeader>
        <CardContent className="relative">
          <div className="grid grid-cols-3 gap-6">
            {[
              { value: totalHours, label: "Total Hours" },
              { value: entries.length, label: "Log Entries" },
              { value: entries.filter(e => e.status === "Completed").length, label: "Completed Tasks" }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * (index + 1) }}
                className="text-center"
              >
                <motion.p 
                  className="text-3xl font-bold gradient-primary bg-clip-text text-transparent"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                >
                  {stat.value}
                </motion.p>
                <p className="text-sm text-muted-foreground font-body">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Timeline */}
      <div className="space-y-4">
        {entries.map((entry, index) => (
          <AnimatedCard key={entry.id} delay={0.1 * (index + 2)} className="relative overflow-hidden">
            {index === 0 && (
              <motion.div 
                className="absolute top-0 left-0 w-1 h-full gradient-primary"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 0.5 }}
                style={{ transformOrigin: "top" }}
              />
            )}
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <motion.div 
                    className="flex items-center gap-2 mb-2"
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground font-body">
                      {new Date(entry.date).toLocaleDateString('en-IN', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </motion.div>
                  <CardTitle className="text-lg font-heading">{entry.task}</CardTitle>
                </div>
                <Badge className={`${getStatusColor(entry.status)} rounded-lg`}>
                  {entry.status === "Completed" ? (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  ) : (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {entry.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <motion.div 
                  className="flex items-center gap-2 text-sm text-muted-foreground font-body"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Clock className="w-4 h-4 text-primary" />
                  <span>{entry.hours} hours</span>
                </motion.div>
                {entry.proof && (
                  <motion.div 
                    className="flex items-center gap-2 text-sm text-success"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Upload className="w-4 h-4" />
                    <span className="font-body">Proof uploaded</span>
                  </motion.div>
                )}
              </div>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      {entries.length === 0 && (
        <AnimatedCard delay={0.1}>
          <div className="p-12 text-center text-muted-foreground font-body">
            <p>No log entries yet. Start adding your daily activities!</p>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}
