import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider, useIsFetching } from "@tanstack/react-query";
import LoadingOverlay from "@/components/LoadingOverlay";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContentProvider from "@/lib/content";
import Home from "./pages/Home";
import About from "./pages/About";
// import Courses from "./pages/Courses";
import Gallery from "./pages/Gallery";
import Reviews from "./pages/Reviews";
import Contact from "./pages/Contact";
import Faculty from "./pages/Faculty";
import FAQ from "./pages/FAQ";
import Admissions from "./pages/Admissions";
import SuccessStories from "./pages/SuccessStories";
import NotFound from "./pages/NotFound";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const GlobalLoader = () => {
  const isFetching = useIsFetching();
  return isFetching > 0 ? <LoadingOverlay label="Loading" /> : null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ContentProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {/* global loader will appear whenever any react-query fetch is in-flight */}
        <GlobalLoader />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            {/* <Route path="/courses" element={<Courses />} /> */}
            <Route path="/faculty" element={<Faculty />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/reviews" element={<Reviews />} />
            <Route path="/success-stories" element={<SuccessStories />} />
            <Route path="/admissions" element={<Admissions />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ContentProvider>
  </QueryClientProvider>
);

export default App;
