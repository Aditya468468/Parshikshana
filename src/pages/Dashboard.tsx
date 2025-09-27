import { useAuth } from '@/contexts/AuthContext';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StudentDashboard from '@/components/dashboards/StudentDashboard';
import CompanyDashboard from '@/components/dashboards/CompanyDashboard';
import CollegeDashboard from '@/components/dashboards/CollegeDashboard';

export default function Dashboard() {
  const { profile } = useAuth();

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