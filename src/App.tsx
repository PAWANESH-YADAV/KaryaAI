import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ToastProvider, useToast } from './context/ToastContext';
import { ToastContainer } from './components/common/ToastContainer';
import { Navbar } from './components/common/Navbar';
import { Footer } from './components/common/Footer';
import { WatchDemoModal } from './components/common/WatchDemoModal';
import { ContactModal } from './components/common/ContactModal';

// Landing Page Components
import { HeroSection } from './components/landing/HeroSection';
import { FeaturesGrid } from './components/landing/FeaturesGrid';
import { AboutSection } from './components/landing/AboutSection';
import { MarketOpportunity } from './components/landing/MarketOpportunity';
import { HowItWorks } from './components/landing/HowItWorks';
import { CallToAction } from './components/landing/CallToAction';

// Auth Pages
import { AuthPage } from './components/auth/AuthPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';

// General User Dashboard
import { DashboardLayout, DashboardTab } from './components/dashboard/DashboardLayout';
import { UserOverview } from './components/dashboard/UserOverview';
import { CareerProfileView } from './components/dashboard/CareerProfileView';
import { AiCareerAnalysisView } from './components/dashboard/AiCareerAnalysisView';
import { RecommendedCareersView } from './components/dashboard/RecommendedCareersView';
import { SkillsAndCoursesView } from './components/dashboard/SkillsAndCoursesView';
import { MockInterviewView } from './components/dashboard/MockInterviewView';
import { JobOpportunitiesView } from './components/dashboard/JobOpportunitiesView';
import { MyApplicationsView } from './components/dashboard/MyApplicationsView';
import { ProgressAchievementsView } from './components/dashboard/ProgressAchievementsView';
import { UserSettingsView } from './components/dashboard/UserSettingsView';

// Admin Dashboard
import { AdminLayout, AdminTab } from './components/admin/AdminLayout';
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminUsersView } from './components/admin/AdminUsersView';
import { AdminCareersView } from './components/admin/AdminCareersView';
import { AdminSkillsView } from './components/admin/AdminSkillsView';
import { AdminCoursesView } from './components/admin/AdminCoursesView';
import { AdminJobsView } from './components/admin/AdminJobsView';
import { AdminInterviewsView } from './components/admin/AdminInterviewsView';
import { AdminAnalyticsView } from './components/admin/AdminAnalyticsView';
import { AdminContentView } from './components/admin/AdminContentView';
import { AdminSettingsView } from './components/admin/AdminSettingsView';

const MainApp: React.FC = () => {
  const { isAuthenticated, isAdmin, quickLogin } = useAuth();
  const { showToast } = useToast();

  // Route State: parses window.location.pathname initially
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    const path = window.location.pathname;
    if (path.startsWith('/admin')) return '/admin';
    if (path.startsWith('/dashboard')) return '/dashboard';
    if (path === '/auth') return '/auth';
    if (path === '/forgot-password') return '/forgot-password';
    return '/';
  });

  // Tab states
  const [userTab, setUserTab] = useState<DashboardTab>('overview');
  const [adminTab, setAdminTab] = useState<AdminTab>('overview');

  // Modals
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  // Sync route with browser history
  const navigate = (newRoute: string) => {
    setCurrentRoute(newRoute);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    try {
      window.history.pushState({}, '', newRoute);
    } catch {
      // Fallback
    }
  };

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path.startsWith('/admin')) setCurrentRoute('/admin');
      else if (path.startsWith('/dashboard')) setCurrentRoute('/dashboard');
      else if (path === '/auth') setCurrentRoute('/auth');
      else if (path === '/forgot-password') setCurrentRoute('/forgot-password');
      else setCurrentRoute('/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Quick feature navigation from landing features grid
  const handleFeatureClick = (featureId: string) => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      if (featureId === 'guidance') setUserTab('career-analysis');
      else if (featureId === 'skills') setUserTab('courses');
      else if (featureId === 'interviews') setUserTab('interviews');
      else if (featureId === 'certifications') setUserTab('courses');
      else if (featureId === 'recruiters') setUserTab('jobs');
      else if (featureId === 'support') setUserTab('overview');
      navigate('/dashboard');
    }
  };

  // Render General User Dashboard Tab
  const renderUserTabContent = () => {
    switch (userTab) {
      case 'overview':
        return <UserOverview onSelectTab={setUserTab} />;
      case 'profile':
        return <CareerProfileView />;
      case 'career-analysis':
        return <AiCareerAnalysisView onSelectTab={setUserTab} />;
      case 'careers':
        return <RecommendedCareersView onSelectTab={setUserTab} />;
      case 'courses':
        return <SkillsAndCoursesView />;
      case 'interviews':
        return <MockInterviewView />;
      case 'jobs':
        return <JobOpportunitiesView onSelectTab={setUserTab} showOnlySaved={false} />;
      case 'saved-jobs':
        return <JobOpportunitiesView onSelectTab={setUserTab} showOnlySaved={true} />;
      case 'applications':
        return <MyApplicationsView onSelectTab={setUserTab} />;
      case 'progress':
        return <ProgressAchievementsView />;
      case 'settings':
        return <UserSettingsView />;
      default:
        return <UserOverview onSelectTab={setUserTab} />;
    }
  };

  // Render Admin Dashboard Tab
  const renderAdminTabContent = () => {
    switch (adminTab) {
      case 'overview':
        return <AdminOverview onSelectTab={setAdminTab} />;
      case 'users':
        return <AdminUsersView />;
      case 'careers':
        return <AdminCareersView />;
      case 'skills':
        return <AdminSkillsView />;
      case 'courses':
        return <AdminCoursesView />;
      case 'jobs':
        return <AdminJobsView />;
      case 'interviews':
        return <AdminInterviewsView />;
      case 'analytics':
        return <AdminAnalyticsView />;
      case 'content':
        return <AdminContentView />;
      case 'settings':
        return <AdminSettingsView />;
      default:
        return <AdminOverview onSelectTab={setAdminTab} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-slate-800">
      {/* Global Toast Alerts */}
      <ToastContainer />

      {/* Landing Page Route ('/') */}
      {currentRoute === '/' && (
        <div className="flex-1 flex flex-col">
          <Navbar
            currentRoute={currentRoute}
            onNavigate={navigate}
            onOpenContact={() => setIsContactModalOpen(true)}
          />

          <main className="flex-1">
            <HeroSection
              onStartJourney={() => navigate(isAuthenticated ? (isAdmin ? '/admin' : '/dashboard') : '/auth')}
              onWatchDemo={() => setIsDemoModalOpen(true)}
            />

            <FeaturesGrid onSelectFeature={handleFeatureClick} />

            <AboutSection />

            <MarketOpportunity
              onExplore={() => navigate(isAuthenticated ? '/dashboard' : '/auth')}
            />

            <HowItWorks
              onStartStep={() => navigate(isAuthenticated ? '/dashboard' : '/auth')}
            />

            <CallToAction
              onGetStarted={() => navigate(isAuthenticated ? (isAdmin ? '/admin' : '/dashboard') : '/auth')}
            />
          </main>

          <Footer
            onNavigate={navigate}
            onOpenContact={() => setIsContactModalOpen(true)}
          />

          {/* Interactive Walkthrough / Demo Modal */}
          <WatchDemoModal
            isOpen={isDemoModalOpen}
            onClose={() => setIsDemoModalOpen(false)}
            onGetStarted={() => {
              setIsDemoModalOpen(false);
              navigate('/auth');
            }}
          />

          {/* Contact Inquiry Modal */}
          <ContactModal
            isOpen={isContactModalOpen}
            onClose={() => setIsContactModalOpen(false)}
          />
        </div>
      )}

      {/* Auth Screen ('/auth') */}
      {currentRoute === '/auth' && (
        <AuthPage onNavigate={navigate} />
      )}

      {/* Forgot Password Screen ('/forgot-password') */}
      {currentRoute === '/forgot-password' && (
        <ForgotPasswordPage onNavigate={navigate} />
      )}

      {/* General User Dashboard ('/dashboard') */}
      {currentRoute === '/dashboard' && (
        <DashboardLayout
          currentTab={userTab}
          onSelectTab={setUserTab}
          onNavigate={navigate}
        >
          {renderUserTabContent()}
        </DashboardLayout>
      )}

      {/* Admin Dashboard ('/admin') */}
      {currentRoute === '/admin' && (
        <AdminLayout
          currentTab={adminTab}
          onSelectTab={setAdminTab}
          onNavigate={navigate}
        >
          {renderAdminTabContent()}
        </AdminLayout>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </ToastProvider>
  );
}
