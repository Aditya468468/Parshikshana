import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Plus, 
  Users, 
  CheckCircle, 
  Clock,
  TrendingUp,
  Building2,
  FileText,
  BarChart3,
  Shield,
  X,
  Eye
} from 'lucide-react';

interface CompanyProfile {
  id: string;
  company_name: string;
  verified: boolean;
  verification_status: string;
}

interface Internship {
  id: string;
  title: string;
  description: string;
  status: string;
  created_at: string;
  applications: any[];
}

export default function CompanyDashboard() {
  const { profile } = useAuth();
  const [companyProfile, setCompanyProfile] = useState<CompanyProfile | null>(null);
  const [internships, setInternships] = useState<Internship[]>([]);
  const [applications, setApplications] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalInternships: 0,
    activeInternships: 0,
    totalApplications: 0,
    pendingApplications: 0,
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

      if (!companyData) {
        setLoading(false);
        return;
      }

      // Fetch company internships
      const { data: internshipsData } = await supabase
        .from('internships')
        .select(`
          *,
          applications (
            id,
            status,
            student_profiles (
              user_id,
              semester,
              course,
              skills
            )
          )
        `)
        .eq('company_id', companyData.id)
        .order('created_at', { ascending: false });

      // Fetch all applications for this company
      const { data: applicationsData } = await supabase
        .from('applications')
        .select(`
          *,
          internships!inner (
            title,
            company_id
          ),
          student_profiles (
            user_id,
            semester,
            course,
            college_name,
            skills
          )
        `)
        .eq('internships.company_id', companyData.id)
        .order('applied_at', { ascending: false });

      // Calculate stats
      const totalInternships = internshipsData?.length || 0;
      const activeInternships = internshipsData?.filter(i => i.status === 'active').length || 0;
      const totalApplications = applicationsData?.length || 0;
      const pendingApplications = applicationsData?.filter(a => a.status === 'pending').length || 0;

      setCompanyProfile(companyData);
      setInternships(internshipsData || []);
      setApplications(applicationsData || []);
      setStats({
        totalInternships,
        activeInternships,
        totalApplications,
        pendingApplications,
      });

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (!error) {
        // Refresh applications
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Error updating application status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-success text-success-foreground';
      case 'rejected':
        return 'bg-destructive text-destructive-foreground';
      case 'pending':
        return 'bg-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
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

  if (!companyProfile) {
    return (
      <div className="text-center py-12">
        <Building2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
        <h2 className="text-xl font-semibold mb-2">Complete Your Company Profile</h2>
        <p className="text-muted-foreground mb-4">
          Set up your company profile to start posting internships and managing applications.
        </p>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Setup Profile
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Building2 className="w-8 h-8 text-primary" />
            {companyProfile.company_name}
            {companyProfile.verified && (
              <Badge variant="secondary" className="bg-success text-success-foreground">
                <Shield className="w-3 h-3 mr-1" />
                Verified
              </Badge>
            )}
          </h1>
          <p className="text-muted-foreground">Company Dashboard</p>
        </div>
        <Button className="bg-gradient-primary">
          <Plus className="w-4 h-4 mr-2" />
          Post New Internship
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90">Total Internships</p>
                <p className="text-3xl font-bold">{stats.totalInternships}</p>
              </div>
              <FileText className="w-8 h-8 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-success/10 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.activeInternships}</p>
                <p className="text-sm text-muted-foreground">Active Postings</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.totalApplications}</p>
                <p className="text-sm text-muted-foreground">Total Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <Clock className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stats.pendingApplications}</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Applications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5 text-primary" />
              Recent Applications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {applications.slice(0, 5).map((application) => (
              <div key={application.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold">{application.internships.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {application.student_profiles.college_name} • {application.student_profiles.course}
                    </p>
                  </div>
                  <Badge className={getStatusColor(application.status)}>
                    {application.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    Skills: {application.student_profiles.skills?.join(', ') || 'None listed'}
                  </div>
                  {application.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateApplicationStatus(application.id, 'accepted')}
                        className="text-success hover:bg-success hover:text-success-foreground"
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Accept
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        className="text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      >
                        <X className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {applications.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No applications received yet</p>
                <p className="text-sm">Post your first internship to start receiving applications!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Internship Management */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Your Internships
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {internships.slice(0, 5).map((internship) => (
              <div key={internship.id} className="p-4 border border-border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-semibold">{internship.title}</h4>
                  <Badge variant={internship.status === 'active' ? 'default' : 'secondary'}>
                    {internship.status}
                  </Badge>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {internship.description}
                </p>

                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {internship.applications?.length || 0} applications
                  </span>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline">
                      <Eye className="w-3 h-3 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline">
                      Edit
                    </Button>
                  </div>
                </div>
              </div>
            ))}

            {internships.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <FileText className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No internships posted yet</p>
                <Button className="mt-3 bg-gradient-primary">
                  <Plus className="w-4 h-4 mr-2" />
                  Post Your First Internship
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}