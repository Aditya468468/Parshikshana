import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Users, 
  Building2, 
  Award,
  TrendingUp,
  GraduationCap,
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';

export default function CollegeDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeInternships: 0,
    verifiedCompanies: 0,
    certificatesIssued: 0,
    pendingApprovals: 0,
    fraudAlerts: 0,
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [topCompanies, setTopCompanies] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Get all students (simplified - in real app would filter by college)
      const { data: studentsData } = await supabase
        .from('student_profiles')
        .select('id');

      // Get active internships
      const { data: internshipsData } = await supabase
        .from('internships')
        .select('id')
        .eq('status', 'active');

      // Get verified companies
      const { data: companiesData } = await supabase
        .from('company_profiles')
        .select('id, company_name, verified')
        .eq('verified', true);

      // Get pending company verifications (simplified)
      const { data: pendingCompaniesData } = await supabase
        .from('company_profiles')
        .select('id')
        .eq('verification_status', 'pending');

      // Get recent applications for activity feed
      const { data: applicationsData } = await supabase
        .from('applications')
        .select(`
          *,
          internships (
            title,
            company_profiles (
              company_name
            )
          ),
          student_profiles (
            user_id,
            college_name
          )
        `)
        .order('applied_at', { ascending: false })
        .limit(10);

      setStats({
        totalStudents: studentsData?.length || 0,
        activeInternships: internshipsData?.length || 0,
        verifiedCompanies: companiesData?.length || 0,
        certificatesIssued: Math.floor(Math.random() * 50) + 20, // Simulated
        pendingApprovals: pendingCompaniesData?.length || 0,
        fraudAlerts: Math.floor(Math.random() * 3), // Simulated
      });

      setRecentActivity(applicationsData || []);
      setTopCompanies(companiesData || []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'text-success';
      case 'rejected':
        return 'text-destructive';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  if (loading) {
    return (
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
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <GraduationCap className="w-8 h-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold">College Admin Dashboard</h1>
          <p className="text-muted-foreground">Manage students, companies, and internships</p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Students Registered</p>
                <p className="text-3xl font-bold">{stats.totalStudents}</p>
              </div>
              <Users className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Building2 className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeInternships}</p>
                <p className="text-sm text-muted-foreground">Active Internships</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <Shield className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.verifiedCompanies}</p>
                <p className="text-sm text-muted-foreground">Verified Companies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Award className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.certificatesIssued}</p>
                <p className="text-sm text-muted-foreground">Certificates Issued</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alerts Section */}
      {(stats.pendingApprovals > 0 || stats.fraudAlerts > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {stats.pendingApprovals > 0 && (
            <Card className="border-warning bg-warning/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-warning" />
                  <div>
                    <p className="font-medium text-warning">Pending Approvals</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.pendingApprovals} companies awaiting verification
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {stats.fraudAlerts > 0 && (
            <Card className="border-destructive bg-destructive/5">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-destructive" />
                  <div>
                    <p className="font-medium text-destructive">Fraud Alerts</p>
                    <p className="text-sm text-muted-foreground">
                      {stats.fraudAlerts} potential fraud cases detected
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.slice(0, 8).map((activity, index) => (
              <div key={activity.id || index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div>
                    <p className="text-sm font-medium">
                      New application for {activity.internships?.title}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.internships?.company_profiles?.company_name}
                    </p>
                  </div>
                </div>
                <Badge 
                  variant="secondary" 
                  className={`text-xs ${getStatusColor(activity.status)}`}
                >
                  {activity.status}
                </Badge>
              </div>
            ))}

            {recentActivity.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No recent activity</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Top Companies */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary" />
              Verified Companies
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {topCompanies.slice(0, 8).map((company, index) => (
              <div key={company.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">{company.company_name}</p>
                    <p className="text-xs text-muted-foreground">Verified Partner</p>
                  </div>
                </div>
                <Badge variant="secondary" className="bg-success/10 text-success">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            ))}

            {topCompanies.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Building2 className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No verified companies yet</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section Placeholder */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Analytics Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="text-center p-6 bg-gradient-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">85%</div>
              <div className="text-sm text-muted-foreground">Placement Rate</div>
            </div>
            <div className="text-center p-6 bg-gradient-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">4.2</div>
              <div className="text-sm text-muted-foreground">Avg Company Rating</div>
            </div>
            <div className="text-center p-6 bg-gradient-secondary rounded-lg">
              <div className="text-2xl font-bold text-primary mb-2">12</div>
              <div className="text-sm text-muted-foreground">Avg Application Time (days)</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}