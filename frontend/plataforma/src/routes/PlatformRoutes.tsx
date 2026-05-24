import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Routes, Navigate, Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/feedback/Toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/platform/ThemeContext";
import { TicketsProvider } from "@/contexts/TicketsContext";
import { AuthProvider, useAuth, type Role } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Dashboard from "@/pages/platform/Dashboard";
import Tickets from "@/pages/platform/Tickets";
import TicketDetail from "@/pages/platform/TicketDetail";
import CreateTicket from "@/pages/platform/CreateTicket";
import Contacts from "@/pages/platform/Contacts";
import Reports from "@/pages/platform/Reports";
import Settings from "@/pages/platform/Settings";
import Financial from "@/pages/platform/Financial";
import History from "@/pages/platform/History";
import DentistComms from "@/pages/platform/DentistComms";
import NewDentist from "@/pages/platform/NewDentist";
import Login from "@/pages/platform/Login";
import NotFound from "@/pages/platform/NotFound";
import { platformPath, stripPlatformBase } from "@/routes/platform";

const queryClient = new QueryClient();

const COLAB_ALLOWED = [
  "/tickets",
  "/history",
  "/contacts",
  "/dentists",
  "/dentist-comms",
];

function isColabAllowed(pathname: string) {
  const platformPathname = stripPlatformBase(pathname);
  if (platformPathname === "/tickets/new") return true;
  if (platformPathname.startsWith("/tickets/")) return true;
  return COLAB_ALLOWED.some((p) => platformPathname === p || platformPathname.startsWith(p + "/"));
}

function ProtectedRoute({ children, roles }: { children: React.ReactNode; roles?: Role[] }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to={platformPath("/login")} replace state={{ from: location }} />;
  if (roles && !roles.includes(user.role)) return <Navigate to={platformPath("/tickets")} replace />;
  if (user.role === "colaborador" && !isColabAllowed(location.pathname))
    return <Navigate to={platformPath("/tickets")} replace />;
  return <>{children}</>;
}

function RedirectDentistComms() {
  const location = useLocation();
  return <Navigate to={{ pathname: platformPath("/dentists"), search: location.search }} replace />;
}

function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <AppLayout>
        <Outlet />
      </AppLayout>
    </ProtectedRoute>
  );
}

const AppRoutes = () => (
  <Routes>
    <Route path="login" element={<Login />} />
    <Route element={<ProtectedLayout />}>
      <Route index element={<ProtectedRoute roles={["admin"]}><Dashboard /></ProtectedRoute>} />
      <Route path="tickets" element={<Tickets />} />
      <Route path="tickets/new" element={<CreateTicket />} />
      <Route path="tickets/:id" element={<TicketDetail />} />
      <Route path="contacts" element={<Contacts />} />
      <Route path="reports" element={<ProtectedRoute roles={["admin"]}><Reports /></ProtectedRoute>} />
      <Route path="history" element={<History />} />
      <Route path="settings" element={<ProtectedRoute roles={["admin"]}><Settings /></ProtectedRoute>} />
      <Route path="dentists" element={<DentistComms />} />
      <Route path="dentists/new" element={<NewDentist />} />
      <Route path="financial" element={<ProtectedRoute roles={["admin"]}><Financial /></ProtectedRoute>} />
      <Route path="dentist-comms" element={<RedirectDentistComms />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  </Routes>
);

const App = () => (
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <TicketsProvider>
            <Toaster />
            <AppRoutes />
          </TicketsProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
