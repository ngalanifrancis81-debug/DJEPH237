import React, { useEffect } from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import SmoothScroll from "@/components/SmoothScroll";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import CountryProjects from "@/pages/CountryProjects";
import ProjectDetail from "@/pages/ProjectDetail";
import CoursesHome from "@/pages/CoursesHome";
import CountryCourses from "@/pages/CountryCourses";
import CourseDetail from "@/pages/CourseDetail";
import Register from "@/pages/Register";
import PaymentSuccess from "@/pages/PaymentSuccess";
import PaymentCancel from "@/pages/PaymentCancel";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function App() {
  return (
    <div className="App min-h-screen bg-background">
      <BrowserRouter>
        <SmoothScroll />
        <ScrollToTop />
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pays/:countrySlug" element={<CountryProjects />} />
          <Route path="/projet/:slug" element={<ProjectDetail />} />
          <Route path="/cours" element={<CoursesHome />} />
          <Route path="/cours/pays/:countrySlug" element={<CountryCourses />} />
          <Route path="/cours/detail/:slug" element={<CourseDetail />} />
          <Route path="/inscription/:kind/:slug" element={<Register />} />
          <Route path="/payment/success" element={<PaymentSuccess />} />
          <Route path="/payment/cancel" element={<PaymentCancel />} />
        </Routes>
        <Footer />
        <Toaster position="top-center" richColors />
      </BrowserRouter>
    </div>
  );
}

export default App;
