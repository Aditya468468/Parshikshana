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
  Bell
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </div>
          </div>

          {/* Internship Applications */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Internship Applications</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {[
                    {
                      title: "Web Development Intern",
                      applicant: "Priya Sharma",
                      date: "April 15",
                      status: "pending"
                    },
                    {
                      title: "Software Engineering Intern",
                      applicant: "Arjun Patel",
                      date: "April 18", 
                      status: "accepted"
                    },
                    {
                      title: "Data Science Intern",
                      applicant: "Sneha Gupta",
                      date: "April 18",
                      status: "pending"
                    }
                  ].map((application, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-semibold">{application.title}</h4>
                        <p className="text-sm text-muted-foreground">{application.applicant}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-sm text-muted-foreground">{application.date}</span>
                        <Button size="sm" variant="outline" className="bg-primary text-primary-foreground hover:bg-primary/90">
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">New application from Priya Sharma</span>
                    </div>
                    <span className="text-xs text-muted-foreground">April 15</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-sm">Interview scheduled with Arjun Patel</span>
                    </div>
                    <span className="text-xs text-muted-foreground">April 18</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

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