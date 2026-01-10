import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { FilterProvider } from "@/contexts/FilterContext";
import { SearchProvider } from "@/contexts/SearchContext";
import Index from "./pages/Index";
import PackageDetail from "./pages/PackageDetail";
import ExperienceDetail from "./pages/ExperienceDetail";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Cancellation from "./pages/Cancellation";
import WildlifeCalendar from "./pages/WildlifeCalendar";
import SafariQuiz from "./pages/SafariQuiz";
import InstantQuote from "./pages/InstantQuote";
import Destinations from "./pages/Destinations";
import DestinationGuide from "./pages/DestinationGuide";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <FilterProvider>
        <SearchProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/package/:packageId" element={<PackageDetail />} />
              <Route path="/experience/:experienceType" element={<ExperienceDetail />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/cancellation" element={<Cancellation />} />
              <Route path="/calendar" element={<WildlifeCalendar />} />
              <Route path="/quiz" element={<SafariQuiz />} />
              <Route path="/quote" element={<InstantQuote />} />
              <Route path="/destinations" element={<Destinations />} />
              <Route path="/destination/:destinationSlug" element={<DestinationGuide />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </SearchProvider>
      </FilterProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
