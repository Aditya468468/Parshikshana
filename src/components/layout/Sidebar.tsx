import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Users,
  Building2,
  FileText,
  Settings,
  BookOpen,
  Award,
  MessageSquare,
  User,
  BarChart3,
  GraduationCap,
  Search,
  Bell,
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

interface SidebarProps {
  className?: string;
}

export default function Sidebar({ className }: SidebarProps) {
  const { profile, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const getNavigationItems = () => {
    switch (profile?.role) {
      case 'student':
        return [
          { icon: BarChart3, label: 'Dashboard', path: '/dashboard', active: true },
          { icon: Search, label: 'Find Internships', path: '/internships' },
          { icon: FileText, label: 'My Applications', path: '/applications', badge: '3' },
          { icon: BookOpen, label: 'My Logbook', path: '/logbook' },
          { icon: Award, label: 'Reports & Certificates', path: '/certificates' },
          { icon: GraduationCap, label: 'Skill Courses', path: '/courses' },
          { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
        ];
      case 'company':
        return [
          { icon: BarChart3, label: 'Dashboard', path: '/dashboard', active: true },
          { icon: FileText, label: 'Manage Applications', path: '/manage-applications' },
          { icon: Users, label: 'Candidates', path: '/candidates' },
          { icon: User, label: 'My Interns', path: '/interns' },
          { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      case 'college_admin':
        return [
          { icon: BarChart3, label: 'Dashboard', path: '/dashboard', active: true },
          { icon: Users, label: 'Students', path: '/students' },
          { icon: Building2, label: 'Companies', path: '/companies' },
          { icon: FileText, label: 'Reports', path: '/reports' },
          { icon: Award, label: 'Certificates', path: '/certificates' },
          { icon: MessageSquare, label: 'Feedback', path: '/feedback' },
          { icon: Settings, label: 'Settings', path: '/settings' },
        ];
      default:
        return [];
    }
  };

  const navigationItems = getNavigationItems();

  return (
    <div className={cn(
      "bg-card border-r border-border transition-all duration-300",
      isCollapsed ? "w-16" : "w-64",
      className
    )}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-bold text-lg">Prashiskshan</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="h-8 w-8 p-0"
        >
          {isCollapsed ? <Menu className="w-4 h-4" /> : <X className="w-4 h-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => (
          <Button
            key={item.path}
            variant={item.active ? "default" : "ghost"}
            className={cn(
              "w-full justify-start gap-3 h-12",
              isCollapsed && "px-3 justify-center"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            {!isCollapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {item.badge}
                  </span>
                )}
              </>
            )}
          </Button>
        ))}
      </nav>

      {/* Profile & Sign Out */}
      <div className="p-4 border-t border-border">
        {!isCollapsed && (
          <div className="mb-3 p-3 bg-muted rounded-lg">
            <p className="font-medium text-sm">{profile?.full_name}</p>
            <p className="text-xs text-muted-foreground capitalize">{profile?.role?.replace('_', ' ')}</p>
          </div>
        )}
        <Button
          variant="outline"
          className={cn(
            "w-full gap-2",
            isCollapsed && "px-3 justify-center"
          )}
          onClick={async () => {
            setIsSigningOut(true);
            await signOut();
            navigate('/auth');
          }}
          disabled={isSigningOut}
        >
          <LogOut className="w-4 h-4" />
          {!isCollapsed && (isSigningOut ? "Signing Out..." : "Sign Out")}
        </Button>
      </div>
    </div>
  );
}