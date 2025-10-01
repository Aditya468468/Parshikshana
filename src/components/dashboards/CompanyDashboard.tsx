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
        return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">Pending</Badge>;
      case 'accepted':
        return <Badge variant="secondary" className="bg-green-100 text-green-800">Accepted</Badge>;
      case 'rejected':
        return <Badge variant="secondary" className="bg-red-100 text-red-800">Rejected</Badge>;
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
              <h1 className="text-2xl font-bold">Company</h1>
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
                    <Badge className="bg-green-100 text-green-800">Confirmed</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">Tomorrow, 2:00 PM - 3:00 PM</p>
                  <p className="text-xs text-accent mt-1">✨ AI-suggested optimal time</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-medium">Arjun Patel - Full Stack</p>
                    <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
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