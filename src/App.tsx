import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Link, useNavigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider } from "@/contexts/AuthContext";
import ChatbotWidget from "@/components/ChatbotWidget";

// Lazy load all route pages
const Index = lazy(() => import("./pages/Index"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load dashboards
const StudentDashboard = lazy(() => import("./dashboards/StudentDashboard"));
const CollegeDashboard = lazy(() => import("./dashboards/CollegeDashboard"));
const IndustryDashboard = lazy(() => import("./dashboards/CompanyDashboard"));
const MentorManagement = lazy(() => import("./dashboards/MentorManagement"));

const queryClient = new QueryClient();

// 🧭 Sidebar Component
const Sidebar = () => {
  const navigate = useNavigate();
  const navItems = [
    { label: "Student Dashboard", path: "/dashboard/student", icon: "🎓" },
    { label: "College Dashboard", path: "/dashboard/college", icon: "🏫" },
    { label: "Industry Dashboard", path: "/dashboard/industry", icon: "🏢" },
    { label: "Mentor Management", path: "/dashboard/mentor", icon: "👨‍🏫" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-blue-900 text-white flex flex-col p-4 shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-center text-white">Prashikshan</h1>
      {navItems.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          className="flex items-center gap-3 text-left w-full px-4 py-2 mb-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
        >
          <span>{item.icon}</span> {item.label}
        </button>
      ))}
      <div className="mt-auto text-center text-sm text-blue-200 border-t border-blue-800 pt-3">
        © 2025 Prashikshan
      </div>
    </aside>
  );
};

// 🧩 Layout Wrapper
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 bg-gray-50 p-6 overflow-y-auto">{children}</main>
    </div>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen text-gray-600 text-lg font-semibold">
                Loading...
              </div>
            }
          >
            <Routes>
              {/* Default Routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Dashboards with Layout */}
              <Route
                path="/dashboard/student"
                element={
                  <Layout>
                    <StudentDashboard />
                  </Layout>
                }
              />
              <Route
                path="/dashboard/college"
                element={
                  <Layout>
                    <CollegeDashboard />
                  </Layout>
                }
              />
              <Route
                path="/dashboard/industry"
                element={
                  <Layout>
                    <IndustryDashboard />
                  </Layout>
                }
              />
              <Route
                path="/dashboard/mentor"
                element={
                  <Layout>
                    <MentorManagement />
                  </Layout>
                }
              />

              {/* 404 Page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
          <ChatbotWidget />
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
