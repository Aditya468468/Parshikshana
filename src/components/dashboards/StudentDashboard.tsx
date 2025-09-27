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
  Bell
} from 'lucide-react';

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
        .limit(6);

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

      // Fetch notifications
      const { data: notificationsData } = await supabase
        .from('notifications')
        .select('*')
        .eq('user_id', profile.user_id)
        .eq('read', false)
        .order('created_at', { ascending: false })
        .limit(3);

      setInternships(internshipsData || []);
      setStudentProfile(studentData);
      setApplications(applicationsData || []);
      setNotifications(notificationsData || []);
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-success';
      case 'rejected':
        return 'bg-destructive';
      case 'pending':
        return 'bg-warning';
      default:
        return 'bg-muted';
    }
  };

  const profileProgress = studentProfile ? 
    ((studentProfile.course ? 25 : 0) + 
     (studentProfile.college_name ? 25 : 0) + 
     (studentProfile.skills?.length > 0 ? 25 : 0) + 
     (studentProfile.semester ? 25 : 0)) : 0;

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
      {/* Welcome Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="md:col-span-2 bg-gradient-primary text-primary-foreground">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2">Welcome back, {profile?.full_name}!</h2>
                <p className="opacity-90">Ready to find your next opportunity?</p>
              </div>
              <BookOpen className="w-12 h-12 opacity-80" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{profileProgress}%</p>
                <p className="text-sm text-muted-foreground">Profile Complete</p>
              </div>
            </div>
            <Progress value={profileProgress} className="mt-3" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-warning/10 rounded-lg">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{applications.length}</p>
                <p className="text-sm text-muted-foreground">Applications</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Internship Opportunities */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5 text-primary" />
                Latest Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {internships.map((internship) => (
                <div key={internship.id} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{internship.title}</h3>
                      <p className="text-muted-foreground flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {internship.company_profiles.company_name}
                        {internship.company_profiles.verified && (
                          <Badge variant="secondary" className="ml-2">Verified</Badge>
                        )}
                      </p>
                    </div>
                    <Button size="sm" className="bg-gradient-primary">
                      Apply
                    </Button>
                  </div>

                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                    {internship.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {internship.is_remote ? 'Remote' : internship.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {internship.duration_months} months
                    </span>
                    {internship.stipend > 0 && (
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        ₹{internship.stipend.toLocaleString()}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Due {new Date(internship.application_deadline).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <div key={notification.id} className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-medium text-sm">{notification.title}</p>
                    <p className="text-xs text-muted-foreground">{notification.message}</p>
                  </div>
                ))
              ) : (
                <p className="text-muted-foreground text-sm">No new notifications</p>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Update Resume
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <BookOpen className="w-4 h-4 mr-2" />
                Browse Courses
              </Button>
              <Button variant="outline" className="w-full justify-start" size="sm">
                <Award className="w-4 h-4 mr-2" />
                View Certificates
              </Button>
            </CardContent>
          </Card>

          {/* Application Status */}
          {applications.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Recent Applications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {applications.slice(0, 3).map((application) => (
                  <div key={application.id} className="flex items-center justify-between">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {application.internships?.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {application.internships?.company_profiles?.company_name}
                      </p>
                    </div>
                    <Badge 
                      variant="secondary" 
                      className={`${getStatusColor(application.status)} text-white ml-2`}
                    >
                      {application.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}