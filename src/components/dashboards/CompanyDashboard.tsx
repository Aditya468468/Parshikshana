import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Building2,
  Users,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  Plus,
  Bell,
  Brain,
  FileSignature,
  Calendar,
  BarChart3,
  Download,
  Sparkles,
  Shield,
  Target
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

interface Application {
  id: string;
  status: string;
  applied_at: string;
  student_profiles?: {
    user_id: string;
    course: string;
    semester: number;
    skills: string[];
  };
  internships?: {
    title: string;
  };
}

interface CompanyProfile {
  company_name: string;
  verified: boolean;
  industry: string;
}

export default function CompanyDashboard() {
  const { profile } = useAuth();
  const [applications, setApplications] = useState<Application[]>([]);
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [stats, setStats] = useState({
    totalApplications: 0,
    pendingApplications: 0,
    openPositions: 0,
    activeInterns: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!profile) return;

    try {
      // Fetch company profile
      const { data: companyData } = await supabase
        .from('company_profiles')
        .select('*')
        .eq('user_id', profile.user_id)
        .single();

      // Fetch applications to company internships
      const { data: applicationsData } = await supabase
        .from('applications')
        .select(`
          *,
          internships!inner (
            title,
            company_profiles!inner (
              user_id
            )
          )
        `)
        .eq('internships.company_profiles.user_id', profile.user_id)
        .order('applied_at', { ascending: false });

      // Calculate stats
      const totalApplications = applicationsData?.length || 25; // Mock data
      const pendingApplications = applicationsData?.filter(app => app.status === 'pending').length || 8;

      setCompanyProfile(companyData);
      setApplications(applicationsData || []);
      setStats({
        totalApplications,
        pendingApplications,
        openPositions: 5, // Mock data
        activeInterns: 3   // Mock data
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="secondary" className="bg-warning/10 text-warning border-warning/20">Pending</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-success/10 text-success border-success/20">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-destructive/10 text-destructive border-destructive/20">Rejected</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
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
              <h1 className="text-2xl font-bold">Industry Dashboard</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" />
                Post Internship
              </Button>
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm">Sign out</span>
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Summary Stats */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Summary</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">25</p>
                      <p className="text-sm text-muted-foreground">Total Applications</p>
                    </div>
                    <FileText className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">5</p>
                      <p className="text-sm text-muted-foreground">Open Positions</p>
                    </div>
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Interviews Scheduled</p>
                    </div>
                    <Calendar className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold">92%</p>
                      <p className="text-sm text-muted-foreground">Diversity Score</p>
                    </div>
                    <Shield className="w-8 h-8 text-success" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Smart Talent Matching */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                Smart Talent Matching
                <Badge className="bg-accent/20 text-accent border-accent ml-2">Powered by AI</Badge>
              </h2>
              <Button size="sm" variant="outline">View All</Button>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      title: "Machine Learning Intern",
                      applicant: "Priya Sharma",
                      course: "B.Tech CSE (AI/ML)",
                      skills: ["Python", "TensorFlow", "Data Science"],
                      match: 94
                    },
                    {
                      title: "Full Stack Developer Intern",
                      applicant: "Arjun Patel",
                      course: "B.Tech CSE",
                      skills: ["React", "Node.js", "MongoDB"],
                      match: 89
                    },
                    {
                      title: "Cloud Engineering Intern",
                      applicant: "Sneha Gupta",
                      course: "B.Tech IT",
                      skills: ["AWS", "Docker", "Kubernetes"],
                      match: 87
                    }
                  ].map((application, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{application.applicant}</h4>
                          <Badge className="bg-accent/20 text-accent border-0">
                            <Target className="w-3 h-3 mr-1" />
                            {application.match}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">{application.title}</p>
                        <p className="text-xs text-muted-foreground mb-2">{application.course}</p>
                        <div className="flex gap-2 flex-wrap">
                          {application.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <Button size="sm" variant="outline">
                          View Profile
                        </Button>
                        <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
                          Schedule Interview
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Internship Lifecycle Management */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileSignature className="w-5 h-5 text-primary" />
                  Internship Lifecycle Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start gap-3">
                  <Download className="w-4 h-4" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">Generate MoU & Agreements</p>
                    <p className="text-xs text-muted-foreground">Govt standard format (PDF)</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <FileText className="w-4 h-4" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">Compliance-Ready Offer Letters</p>
                    <p className="text-xs text-muted-foreground">Auto-generated templates</p>
                  </div>
                </Button>
                <Button variant="outline" className="w-full justify-start gap-3">
                  <CheckCircle className="w-4 h-4" />
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium">Completion Certificates</p>
                    <p className="text-xs text-muted-foreground">NEP compliant format</p>
                  </div>
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  AI-Powered Interview Scheduling
                  <Badge className="bg-accent/20 text-accent border-0 ml-2">AI</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Priya Sharma - ML Intern</p>
                    <Badge className="bg-success/10 text-success border-success/20">Confirmed</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM - 3:00 PM</p>
                  <p className="text-xs text-accent mt-1">✨ AI-suggested optimal time</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Arjun Patel - Full Stack</p>
                    <Badge className="bg-warning/10 text-warning border-warning/20">Pending</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">April 25, 11:00 AM - 12:00 PM</p>
                  <p className="text-xs text-accent mt-1">✨ Smart reminder sent</p>
                </div>
                <Button size="sm" variant="outline" className="w-full">
                  View All Schedules
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Diversity & Fairness Tracker */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-primary" />
                Diversity & Fairness Tracker
                <Badge className="bg-success/20 text-success border-0 ml-2">AICTE/UGC Compliant</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Gender Distribution</h4>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Male</span>
                        <span>45%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '45%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Female</span>
                        <span>50%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-accent" style={{ width: '50%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span>Other</span>
                        <span>5%</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: '5%' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Regional Diversity</h4>
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between">
                      <span>North India</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>South India</span>
                      <span className="font-medium">30%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>East India</span>
                      <span className="font-medium">20%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>West India</span>
                      <span className="font-medium">15%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-semibold">Export Reports</h4>
                  <Button size="sm" variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Download AICTE Format
                  </Button>
                  <Button size="sm" variant="outline" className="w-full gap-2">
                    <Download className="w-4 h-4" />
                    Download UGC Format
                  </Button>
                  <p className="text-xs text-muted-foreground">✓ AI ensures fair selection</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI-Suggested Colleges */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI-Suggested Colleges
                <Badge className="bg-accent/20 text-accent border-0 ml-2">Powered by Agentic AI</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <Brain className="w-4 h-4 inline mr-2 text-accent" />
                  AI recommends colleges with students matching your hiring needs (AI Engineers)
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Top Recommended Colleges</h4>
                  <div className="space-y-3">
                    {[
                      {
                        college: "IIT Delhi - Computer Science",
                        students: 300,
                        skills: ["AI/ML", "Deep Learning", "Python"],
                        match: 96,
                        avgGrade: "8.5 CGPA"
                      },
                      {
                        college: "BITS Pilani - Software Engineering",
                        students: 250,
                        skills: ["Machine Learning", "Data Science", "TensorFlow"],
                        match: 92,
                        avgGrade: "8.2 CGPA"
                      },
                      {
                        college: "VIT Vellore - AI & Data Science",
                        students: 200,
                        skills: ["AI", "Neural Networks", "Computer Vision"],
                        match: 88,
                        avgGrade: "8.0 CGPA"
                      },
                      {
                        college: "NIT Trichy - CSE",
                        students: 180,
                        skills: ["ML", "Python", "Data Analytics"],
                        match: 85,
                        avgGrade: "7.9 CGPA"
                      }
                    ].map((college, index) => (
                      <div key={index} className="p-3 border border-border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="text-sm font-semibold">{college.college}</h5>
                          <Badge className="bg-accent/20 text-accent border-0">
                            {college.match}% Match
                          </Badge>
                        </div>
                        <div className="flex gap-2 flex-wrap mb-2">
                          {college.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>
                            <Users className="w-3 h-3 inline mr-1" />
                            {college.students} AI/ML students
                          </span>
                          <span>Avg: {college.avgGrade}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-semibold mb-3">College Distribution by Match Score</h4>
                  <div className="space-y-3 mb-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>90-100% Match (Excellent)</span>
                        <span className="font-bold">12 colleges</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: '40%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>80-89% Match (Good)</span>
                        <span className="font-bold">18 colleges</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '60%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>70-79% Match (Moderate)</span>
                        <span className="font-bold">10 colleges</span>
                      </div>
                      <div className="h-3 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-warning" style={{ width: '33%' }}></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 p-3 bg-muted/50 rounded-lg">
                    <h5 className="text-sm font-semibold">Total Reach</h5>
                    <div className="text-2xl font-bold text-primary">1,240+</div>
                    <p className="text-xs text-muted-foreground">AI-trained students across recommended colleges</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <Button variant="outline" className="gap-2">
                  <Download className="w-4 h-4" />
                  Export College List (PDF)
                </Button>
                <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gap-2">
                  <Building2 className="w-4 h-4" />
                  Initiate Campus Drive
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Feedback Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5" />
                Company Feedback & Reviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Excellent mentorship program</p>
                      <p className="text-xs text-muted-foreground">- Rahul Kumar, Software Engineering Intern</p>
                      <p className="text-xs text-muted-foreground mt-2">★★★★★ 5.0</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="flex-1">
                      <p className="text-sm font-medium">Great learning opportunities and supportive team</p>
                      <p className="text-xs text-muted-foreground">- Priya Sharma, Web Development Intern</p>
                      <p className="text-xs text-muted-foreground mt-2">★★★★☆ 4.5</p>
                    </div>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  View All Feedback
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}