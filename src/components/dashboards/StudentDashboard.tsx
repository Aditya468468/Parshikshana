import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  MapPin, 
  Clock, 
  DollarSign,
  Building2,
  FileText,
  Award,
  TrendingUp,
  Calendar,
  Bell,
  MessageSquare,
  Search,
  User,
  GraduationCap,
  Sparkles,
  Shield,
  CheckCircle,
  Brain
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

interface Internship {
  id: string;
  title: string;
  description: string;
  location: string;
  duration_months: number;
  stipend: number;
  is_remote: boolean;
  application_deadline: string;
  company_profiles: {
    company_name: string;
    verified: boolean;
  };
}

interface StudentProfile {
  semester: number;
  course: string;
  college_name: string;
  skills: string[];
}

export default function StudentDashboard() {
  const { profile } = useAuth();
  const [internships, setInternships] = useState<Internship[]>([]);
  const [studentProfile, setStudentProfile] = useState<StudentProfile | null>(null);
  const [applications, setApplications] = useState<any[]>([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!profile) return;

    try {
      // Fetch internship opportunities
      const { data: internshipsData } = await supabase
        .from('internships')
        .select(`
          *,
          company_profiles (
            company_name,
            verified
          )
        `)
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(4);

      // Fetch student profile
      const { data: studentData } = await supabase
        .from('student_profiles')
        .select('*')
        .eq('user_id', profile.user_id)
        .single();

      // Fetch applications
      const { data: applicationsData } = await supabase
        .from('applications')
        .select(`
          *,
          internships (
            title,
            company_profiles (
              company_name
            )
          )
        `)
        .eq('student_id', studentData?.id)
        .order('applied_at', { ascending: false });

      setInternships(internshipsData || []);
      setStudentProfile(studentData);
      setApplications(applicationsData || []);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background">
        <Sidebar />
        <div className="flex-1 p-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="p-6">
                  <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <div className="flex-1">
        {/* Header */}
        <header className="bg-card border-b border-border px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium">{profile?.full_name || 'Rajesh Kumar'}</span>
              <span className="text-xs text-muted-foreground">Semester {studentProfile?.semester || 5}</span>
              <Bell className="w-5 h-5 text-muted-foreground" />
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">3</p>
                    <p className="text-sm text-muted-foreground">Active Applications</p>
                  </div>
                  <FileText className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">1</p>
                    <p className="text-sm text-muted-foreground">Internship Ongoing</p>
                  </div>
                  <Building2 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-3xl font-bold">85%</p>
                    <p className="text-sm text-muted-foreground">Profile Complete</p>
                  </div>
                  <User className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Progress & Insights Section */}
          <Card className="border-l-4 border-l-accent">
            <CardHeader>
              <div className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                <CardTitle>AI-Powered Insights</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Skill Gap Analysis */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold">Skill Gap Analysis</h4>
                    <Badge variant="outline" className="border-accent text-accent">
                      <Sparkles className="w-3 h-3 mr-1" />
                      AI Generated
                    </Badge>
                  </div>
                  <div className="relative pt-1">
                    <div className="flex mb-2 items-center justify-between">
                      <div>
                        <span className="text-xs font-semibold inline-block text-accent">
                          70% Ready
                        </span>
                      </div>
                    </div>
                    <div className="relative h-3 mb-4 overflow-hidden rounded-full bg-secondary">
                      <div 
                        className="h-full rounded-full bg-gradient-primary" 
                        style={{ width: '70%' }}
                      ></div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Recommended: Learn React, Node.js, and Docker to reach 100% readiness
                  </p>
                </div>

                {/* AI Badges */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">AI Verifications</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 p-2 bg-success/10 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-xs font-medium">Verified by AI</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-success/10 rounded-lg">
                      <Shield className="w-4 h-4 text-success" />
                      <span className="text-xs font-medium">Plagiarism Checked</span>
                    </div>
                    <div className="flex items-center gap-2 p-2 bg-success/10 rounded-lg">
                      <CheckCircle className="w-4 h-4 text-success" />
                      <span className="text-xs font-medium">NEP Compliant</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* AI Recommended Internships */}
            <div className="lg:col-span-2">
              <Card className="border-t-4 border-t-accent">
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-accent" />
                    <CardTitle>Recommended Internships by AI</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    {
                      title: "Web Development Intern",
                      location: "Bengaluru",
                      year: "2nd Year",
                      company: "TCS Digital Solutions",
                      match: 95
                    },
                    {
                      title: "Software Engineering Intern", 
                      location: "Mumbai",
                      year: "3rd Year",
                      company: "Infosys Technologies",
                      match: 88
                    },
                    {
                      title: "Data Science Intern",
                      location: "Pune",
                      year: "Final Year", 
                      company: "Wipro Analytics",
                      match: 82
                    }
                  ].map((internship, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover-lift">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{internship.title}</h4>
                          <Badge className="bg-accent text-accent-foreground text-xs">
                            {internship.match}% Match
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                          <span>{internship.location}</span>
                          <span>{internship.year}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{internship.company}</p>
                      </div>
                      <Button size="sm" className="bg-primary hover:bg-primary/90">Apply</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* My Logbook with AI Badge */}
              <Card className="mt-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>My Logbook</CardTitle>
                    <Badge variant="outline" className="border-success text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      NEP Compliant
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Generated by AI</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">April 20</p>
                        <p className="text-sm text-muted-foreground">Worked on the company website redesign project using React and Tailwind CSS</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">April 18</p>
                        <p className="text-sm text-muted-foreground">Attended team meeting and learned about microservices architecture</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">April 15</p>
                        <p className="text-sm text-muted-foreground">Completed initial training module on Node.js backend development</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar Content */}
            <div className="space-y-6">
              {/* Upcoming Deadlines */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Report Submission</p>
                        <span className="text-lg font-bold">April 25</span>
                      </div>
                      <Progress value={75} className="h-3" />
                    </div>
                    
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-sm font-medium">Mid-term Evaluation</p>
                        <span className="text-sm text-muted-foreground">May 5</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* My Logbook Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>My Logbook</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-right">
                      <p className="text-sm">April 20</p>
                      <p className="text-xs text-muted-foreground">Worked on the company website</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <FileText className="w-4 h-4" />
                    Update Resume
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <Award className="w-4 h-4" />
                    View Certificates
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <MessageSquare className="w-4 h-4" />
                    Give Feedback
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-2" size="sm">
                    <GraduationCap className="w-4 h-4" />
                    Skill Courses
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}