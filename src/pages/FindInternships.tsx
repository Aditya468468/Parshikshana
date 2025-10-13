import { useState } from "react";
import { internships } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, Calendar, Briefcase } from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { AnimatedCard } from "@/components/AnimatedCard";

export default function FindInternships() {
  const [searchTerm, setSearchTerm] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");
  const [modeFilter, setModeFilter] = useState("all");

  const filteredInternships = internships.filter((internship) => {
    const matchesSearch = internship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain = domainFilter === "all" || internship.domain === domainFilter;
    const matchesMode = modeFilter === "all" || internship.mode === modeFilter;
    return matchesSearch && matchesDomain && matchesMode;
  });

  const handleApply = (internshipTitle: string) => {
    toast.success(`Successfully applied for ${internshipTitle}!`);
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-heading font-bold text-foreground mb-2">Find Internships</h1>
        <p className="text-muted-foreground font-body">Explore internship opportunities that match your skills</p>
      </motion.div>

      {/* Filters */}
      <AnimatedCard delay={0.1}>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search internships..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="rounded-xl"
            />
            <Select value={domainFilter} onValueChange={setDomainFilter}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Domain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Domains</SelectItem>
                <SelectItem value="Web Development">Web Development</SelectItem>
                <SelectItem value="Data Science">Data Science</SelectItem>
                <SelectItem value="Design">Design</SelectItem>
                <SelectItem value="Backend Development">Backend Development</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
              </SelectContent>
            </Select>
            <Select value={modeFilter} onValueChange={setModeFilter}>
              <SelectTrigger className="rounded-xl">
                <SelectValue placeholder="Mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Modes</SelectItem>
                <SelectItem value="Remote">Remote</SelectItem>
                <SelectItem value="On-site">On-site</SelectItem>
                <SelectItem value="Hybrid">Hybrid</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </AnimatedCard>

      {/* Internship Listings */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredInternships.map((internship, index) => (
          <AnimatedCard key={internship.id} delay={0.1 * (index + 2)}>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg font-heading">{internship.title}</CardTitle>
                <Badge variant="secondary" className="rounded-lg">{internship.domain}</Badge>
              </div>
              <CardDescription className="font-medium font-body">{internship.company}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground font-body">{internship.description}</p>
              <div className="space-y-2 text-sm">
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Calendar className="w-4 h-4 text-primary" />
                  <span>{internship.duration}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{internship.mode}</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-muted-foreground"
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Briefcase className="w-4 h-4 text-primary" />
                  <span>{internship.stipend}</span>
                </motion.div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full">Apply Now</Button>
                </DialogTrigger>
                <DialogContent className="glass-card">
                  <DialogHeader>
                    <DialogTitle className="font-heading">Confirm Application</DialogTitle>
                    <DialogDescription className="font-body">
                      Are you sure you want to apply for {internship.title} at {internship.company}?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 justify-end">
                    <DialogTrigger asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogTrigger>
                    <DialogTrigger asChild>
                      <Button onClick={() => handleApply(internship.title)}>Confirm</Button>
                    </DialogTrigger>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </AnimatedCard>
        ))}
      </div>

      {filteredInternships.length === 0 && (
        <AnimatedCard delay={0.2}>
          <div className="p-12 text-center text-muted-foreground font-body">
            <p>No internships found matching your criteria</p>
          </div>
        </AnimatedCard>
      )}
    </div>
  );
}
