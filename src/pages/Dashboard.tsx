import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import CompanyDashboard from '@/components/dashboards/CompanyDashboard';
import CollegeDashboard from '@/components/dashboards/CollegeDashboard';

export default function Dashboard() {
  const { user, profile, loading } = useAuth();

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-secondary">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Redirect to auth if not logged in
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Show loading if profile is still being fetched
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-secondary">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Loading your profile...</p>
        </div>
      </div>
    );
  }

  const renderDashboard = () => {
    switch (profile?.role) {
      case 'student':
        return <StudentDashboard />;
      case 'company':
        return <CompanyDashboard />;
      case 'college_admin':
        return <CollegeDashboard />;
      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold mb-2">Role Not Found</h2>
            <p className="text-muted-foreground">
              Please contact support to configure your account role.
            </p>
          </div>
        );
    }
  };

  return (
    <DashboardLayout>
      {renderDashboard()}
    </DashboardLayout>
  );
}