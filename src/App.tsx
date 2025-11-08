
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import FAQ from "./pages/FAQ";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Uptime from "./pages/Uptime";
import Promo from "./pages/Promo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const VisitorTracker = () => {
  useEffect(() => {
    const trackVisitor = async () => {
      try {
        await fetch('https://functions.poehali.dev/94b30990-d971-403f-a237-849453d2ec73', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        console.error('Error tracking visitor:', error);
      }
    };
    
    trackVisitor();
  }, []);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <VisitorTracker />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/uptime" element={<Uptime />} />
            <Route path="/promo" element={<Promo />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;