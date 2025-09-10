import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { ThemeToggle } from "@/components/theme-toggle";
import AdminDashboard from "@/pages/admin-dashboard";
import VolunteerDashboard from "@/pages/volunteer-dashboard";
import MemberManagement from "@/pages/member-management";
import EventManagement from "@/pages/event-management";
import AttendanceTracking from "@/pages/attendance-tracking";
import ReportsAnalytics from "@/pages/reports-analytics";
import GoalTracking from "@/pages/goal-tracking";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={AdminDashboard} />
      <Route path="/volunteer" component={VolunteerDashboard} />
      <Route path="/members" component={MemberManagement} />
      <Route path="/events" component={EventManagement} />
      <Route path="/attendance" component={AttendanceTracking} />
      <Route path="/reports" component={ReportsAnalytics} />
      <Route path="/goals" component={GoalTracking} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  // Custom sidebar width for youth ministry application
  const style = {
    "--sidebar-width": "20rem",       // 320px for better content
    "--sidebar-width-icon": "4rem",   // default icon width
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="youthconnect-theme">
        <TooltipProvider>
          <SidebarProvider style={style as React.CSSProperties}>
            <div className="flex h-screen w-full">
              <AppSidebar />
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between p-4 border-b bg-background">
                  <SidebarTrigger data-testid="button-sidebar-toggle" />
                  <ThemeToggle />
                </header>
                <main className="flex-1 overflow-auto bg-background">
                  <Router />
                </main>
              </div>
            </div>
          </SidebarProvider>
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
