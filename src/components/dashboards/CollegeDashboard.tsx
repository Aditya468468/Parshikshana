import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Users,
  Building2,
  FileText,
  Award,
  TrendingUp,
  BookOpen,
  Shield,
  AlertTriangle,
  Calendar,
  MessageSquare,
  CheckCircle,
  Bell,
  GraduationCap
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';

interface CollegeStats {
  totalStudents: number;
  activeInternships: number;
  verifiedCompanies: number;
  certificatesIssued: number;
}

export default function CollegeDashboard() {
  const { profile } = useAuth();
  const [stats, setStats] = useState<CollegeStats>({
    totalStudents: 0,
    activeInternships: 0,
    verifiedCompanies: 0,
    certificatesIssued: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, [profile]);

  const fetchDashboardData = async () => {
    if (!profile) return;

    try {
      // Fetch college statistics - using mock data for now
      setStats({
        totalStudents: 150,
        activeInternships: 40,
        verifiedCompanies: 25,
        certificatesIssued: 120
      });

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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">College Dashboard</h1>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>
          </div>
        </header>

        <main className="p-8 space-y-8">
          {/* Overview Section */}
          <div>
            <h2 className="text-xl font-semibold mb-6">Overview</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Total Students Registered</p>
                      <p className="text-3xl font-bold">{stats.totalStudents}</p>
                    </div>
                    <Users className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Active Internships</p>
                      <p className="text-3xl font-bold">{stats.activeInternships}</p>
                    </div>
                    <Building2 className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Verified Companies</p>
                      <p className="text-3xl font-bold">{stats.verifiedCompanies}</p>
                    </div>
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">Certificates Issued</p>
                      <p className="text-3xl font-bold">{stats.certificatesIssued}</p>
                      <CheckCircle className="w-4 h-4 text-green-500 inline ml-2" />
                    </div>
                    <Award className="w-8 h-8 text-primary" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Management */}
            <Card>
              <CardHeader>
                <CardTitle>Student Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm">View student profiles</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <FileText className="w-5 h-5 text-primary" />
                    <span className="text-sm">Internship applications tracking</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-sm">Performance reports (AI-generated)</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <BookOpen className="w-5 h-5 text-primary" />
                    <span className="text-sm">Auto-generated logbooks & certificates</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Company/Internship Management */}
            <Card>
              <CardHeader>
                <CardTitle>Company/Internship Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <Shield className="w-5 h-5 text-primary" />
                    <span className="text-sm">Verify companies via Blockchain</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <span className="text-sm">Approve/reject internship postings</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <AlertTriangle className="w-5 h-5 text-orange-500" />
                    <span className="text-sm">See fraud detection alerts</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg cursor-pointer">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="text-sm">Track which students joined which company</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Analytics & Reports */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Reports</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Internship Distribution */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Internship distribution</h4>
                      <div className="relative w-32 h-32 mx-auto mb-4">
                        <div className="w-32 h-32 rounded-full" style={{
                          background: 'conic-gradient(#3b82f6 0deg 162deg, #10b981 162deg 234deg, #ef4444 234deg 306deg, #f59e0b 306deg 360deg)'
                        }}></div>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-background rounded-full flex items-center justify-center">
                            <div className="text-center">
                              <div className="text-lg font-bold">40</div>
                              <div className="text-xs text-muted-foreground">Total</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <span>Software Development (15)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <span>Data Science (10)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-red-500"></div>
                          <span>Marketing (8)</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <span>Others (7)</span>
                        </div>
                      </div>
                    </div>

                    {/* Top Companies */}
                    <div>
                      <h4 className="text-sm font-semibold mb-3">Top companies offering internships</h4>
                      <div className="space-y-3">
                        <div className="flex items-end gap-3">
                          <div className="w-8 h-12 bg-primary rounded"></div>
                          <div className="w-8 h-10 bg-primary/80 rounded"></div>
                          <div className="w-8 h-8 bg-primary/60 rounded"></div>
                        </div>
                        <div className="text-xs text-center space-y-1">
                          <div>TCS</div>
                          <div>Infosys</div>
                          <div>Wipro</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-blue-50 border-l-4 border-primary rounded">
                    <Bell className="w-4 h-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Pending approvals</p>
                      <p className="text-xs text-muted-foreground">5 company verifications pending</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-orange-50 border-l-4 border-orange-500 rounded">
                    <AlertTriangle className="w-4 h-4 text-orange-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Fraud detection flags</p>
                      <p className="text-xs text-muted-foreground">Suspicious activity detected</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-green-50 border-l-4 border-green-500 rounded">
                    <Calendar className="w-4 h-4 text-green-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Internship deadlines</p>
                      <p className="text-xs text-muted-foreground">3 applications due this week</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-purple-50 border-l-4 border-purple-500 rounded">
                    <Award className="w-4 h-4 text-purple-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Certificate issuance reminders</p>
                      <p className="text-xs text-muted-foreground">12 certificates ready for approval</p>
                    </div>
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
                Student & Company Feedback
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold mb-3">Recent Student Feedback</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">"Great support from college placement cell"</p>
                      <p className="text-xs text-muted-foreground mt-1">- Kavya Reddy, Final Year CSE</p>
                      <div className="text-xs mt-1">★★★★★ 5.0</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">"Internship process was smooth and transparent"</p>
                      <p className="text-xs text-muted-foreground mt-1">- Vikash Singh, Third Year ECE</p>
                      <div className="text-xs mt-1">★★★★☆ 4.5</div>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-3">Company Feedback</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">"Students are well-prepared and skilled"</p>
                      <p className="text-xs text-muted-foreground mt-1">- TCS Recruitment Team</p>
                      <div className="text-xs mt-1">★★★★★ 5.0</div>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg">
                      <p className="text-sm">"Excellent coordination from college administration"</p>
                      <p className="text-xs text-muted-foreground mt-1">- Infosys HR Department</p>
                      <div className="text-xs mt-1">★★★★☆ 4.8</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline" size="sm" className="w-full">
                  View All Feedback & Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}