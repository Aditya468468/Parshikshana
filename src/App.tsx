import { Suspense, lazy } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ChatbotWidget from "@/components/ChatbotWidget";

// Lazy load route components for optimization
const Index = lazy(() => import("./pages/Index"));
const AuthPage = lazy(() => import("./components/auth/AuthPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Dashboards
const StudentDashboard = lazy(() => import("./dashboard/StudentDashboard"));
const CollegeDashboard = lazy(() => import("./dashboard/CollegeDashboard"));
const IndustryDashboard = lazy(() => import("./dashboard/IndustryDashboard"));

// Student Submodules
const FindInternships = lazy(() => import("./pages/FindInternships"));
const MyApplications = lazy(() => import("./pages/MyApplications"));
const MyLogbook = lazy(() => import("./pages/MyLogbook"));
const ReportsCertificates = lazy(() => import("./pages/ReportsCertificates"));
const SkillCourses = lazy(() => import("./pages/SkillCourses"));
const Feedback = lazy(() => import("./pages/Feedback"));

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="flex items-center justify-center min-h-screen text-lg font-medium text-gray-600">
                Loading...
              </div>
            }
          >
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<AuthPage />} />

              {/* Dashboards */}
              <Route path="/student-dashboard" element={<StudentDashboard />} />
              <Route path="/college-dashboard" element={<CollegeDashboard />} />
              <Route path="/industry-dashboard" element={<IndustryDashboard />} />

              {/* Student Submodules */}
              <Route path="/student/find-internships" element={<FindInternships />} />
              <Route path="/student/applications" element={<MyApplications />} />
              <Route path="/student/logbook" element={<MyLogbook />} />
              <Route path="/student/reports" element={<ReportsCertificates />} />
              <Route path="/student/skills" element={<SkillCourses />} />
              <Route path="/student/feedback" element={<Feedback />} />

              {/* Catch-all */}
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

