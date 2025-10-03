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
  GraduationCap,
  Brain,
  Download,
  Clock,
  XCircle,
  Sparkles,
  BarChart3,
  Mail
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import MentorManagement from '@/components/dashboards/MentorManagement';

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

          {/* Internship Placement Tracking */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                Internship Placement Tracking
                <Badge className="bg-accent/20 text-accent border-0 ml-2">AI-Powered</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-primary">87%</p>
                    <p className="text-sm text-muted-foreground">Internship Rate</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-accent">₹15,000</p>
                    <p className="text-sm text-muted-foreground">Avg Stipend</p>
                  </div>
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-2xl font-bold text-success">12</p>
                    <p className="text-sm text-muted-foreground">Sectors Covered</p>
                  </div>
                </div>
                
                <div className="flex gap-3">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    NAAC Report (PDF)
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    AICTE Report (Excel)
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    UGC Compliance
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">✨ AI auto-generates govt-approved reports from student logs</p>
              </div>
            </CardContent>
          </Card>

          {/* Internship Approval Workflow */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-primary" />
                Internship Approval Workflow
                <Badge className="bg-warning/10 text-warning border-warning/20 ml-2">3 Pending</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    student: "Rahul Kumar",
                    company: "Tech Solutions Pvt Ltd",
                    position: "Software Development Intern",
                    match: 92,
                    status: "pending"
                  },
                  {
                    student: "Anjali Singh",
                    company: "DataTech Analytics",
                    position: "Data Science Intern",
                    match: 88,
                    status: "pending"
                  },
                  {
                    student: "Vikram Patel",
                    company: "Cloud Innovations",
                    position: "Cloud Engineering Intern",
                    match: 85,
                    status: "pending"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-semibold text-sm">{item.student}</h4>
                        <Badge className="bg-accent/20 text-accent border-0 text-xs">
                          <Sparkles className="w-3 h-3 mr-1" />
                          AI: {item.match}% curriculum match
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">{item.position} at {item.company}</p>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="gap-1">
                        <XCircle className="w-3 h-3" />
                        Reject
                      </Button>
                      <Button size="sm" className="bg-success text-white hover:bg-success/90 gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Performance Analytics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-primary" />
                  Performance Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Students with Active Internships</span>
                        <span className="font-bold">40/150</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-primary" style={{ width: '26.6%' }}></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Completed Internships (This Semester)</span>
                        <span className="font-bold">120/150</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className="h-full bg-success" style={{ width: '80%' }}></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <h4 className="text-sm font-semibold mb-3">Top Performing Departments</h4>
                    <div className="space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span>Computer Science</span>
                        <span className="font-medium">95% placement</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Electronics & Comm</span>
                        <span className="font-medium">88% placement</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Mechanical</span>
                        <span className="font-medium">82% placement</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Smart Alerts & Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  Smart Alerts & Notifications
                  <Badge className="bg-accent/20 text-accent border-0 ml-2">AI</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 bg-primary/10 border-l-4 border-primary rounded">
                  <div className="flex items-start gap-2">
                    <Clock className="w-4 h-4 text-primary mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Pending Approvals</p>
                      <p className="text-xs text-muted-foreground">3 internship applications need review</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-warning/10 border-l-4 border-warning rounded">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-warning mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Expiring Soon</p>
                      <p className="text-xs text-muted-foreground">5 internships ending this week</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-3 bg-accent/10 border-l-4 border-accent rounded">
                  <div className="flex items-start gap-2">
                    <Award className="w-4 h-4 text-accent mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs font-medium">Compliance Reminder</p>
                      <p className="text-xs text-muted-foreground">AICTE report due in 7 days</p>
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Mail className="w-3 h-3" />
                    <span>Weekly summary auto-mailed to placement head</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI-Driven Industry Tie-ups */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                AI-Driven Industry Tie-ups
                <Badge className="bg-accent/20 text-accent border-0 ml-2">Powered by Agentic AI</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-6 p-4 bg-primary/10 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <Brain className="w-4 h-4 inline mr-2 text-accent" />
                  AI analyzes your 300+ AI/ML students' skills, projects, and coursework to recommend ideal industry partnerships
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    company: "Infosys AI Labs",
                    industry: "AI & Machine Learning",
                    students: 320,
                    skills: ["AI/ML", "Python", "Deep Learning"],
                    match: 94,
                    positions: 25
                  },
                  {
                    company: "TCS Research & Innovation",
                    industry: "Software & Cloud",
                    students: 280,
                    skills: ["Cloud Computing", "DevOps", "Full Stack"],
                    match: 89,
                    positions: 20
                  },
                  {
                    company: "Tech Startup Innovators",
                    industry: "Product Development",
                    students: 150,
                    skills: ["React", "Node.js", "Mobile Dev"],
                    match: 85,
                    positions: 15
                  }
                ].map((tie, index) => (
                  <div key={index} className="p-4 border border-border rounded-lg hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{tie.company}</h4>
                          <Badge className="bg-accent/20 text-accent border-0">
                            {tie.match}% Match
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{tie.industry}</p>
                        <div className="flex gap-2 flex-wrap mb-2">
                          {tie.skills.map((skill, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">{skill}</Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex gap-4 text-xs text-muted-foreground">
                        <span>
                          <Users className="w-3 h-3 inline mr-1" />
                          {tie.students} matching students
                        </span>
                        <span>
                          <Building2 className="w-3 h-3 inline mr-1" />
                          {tie.positions} positions available
                        </span>
                      </div>
                      <Button size="sm" variant="outline">
                        Request MoU
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Mentor Management Section */}
          <MentorManagement />

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