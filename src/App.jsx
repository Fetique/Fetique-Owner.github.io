import { useCallback, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Preloader from "./components/Preloader";
import LandingPage from "./pages/LandingPage";
import ServiceArticlePage from "./pages/ServiceArticlePage";
import FaqPage from "./pages/FaqPage";
import PortfolioPage from "./pages/PortfolioPage";
import PortfolioDetailPage from "./pages/PortfolioDetailPage";
import { useSiteReady } from "./hooks/useSiteReady.js";
import { CONTACT } from "./data/company.js";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function AppRoutes({ onOpenChannel }) {
  return (
    <Routes>
      <Route path="/" element={<LandingPage onOpenChannel={onOpenChannel} />} />
      <Route path="/razrabotka-sajta-i-lendinga" element={<ServiceArticlePage />} />
      <Route path="/dorabotka-i-podderzhka-sajta" element={<ServiceArticlePage />} />
      <Route path="/digital-oformlenie" element={<ServiceArticlePage />} />
      <Route path="/it-soprovozhdenie-dlya-biznesa" element={<ServiceArticlePage />} />
      <Route path="/faq" element={<FaqPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
      <Route path="/portfolio/:slug" element={<PortfolioDetailPage />} />
    </Routes>
  );
}

export default function App() {
  const [overlay, setOverlay] = useState("boot");
  const siteReady = overlay == null;
  useSiteReady(siteReady);

  useEffect(() => {
    document.documentElement.style.overflow = overlay ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [overlay]);

  const onBootFadeComplete = useCallback(() => {
    setOverlay(null);
    document.body.classList.add("app-ready");
  }, []);

  const onOpenChannel = useCallback(() => {
    setOverlay("social");
    window.setTimeout(() => {
      window.location.href = CONTACT.channelUrl;
    }, 900);
  }, []);

  return (
    <>
      <Preloader mode={overlay} onBootFadeComplete={onBootFadeComplete} />
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <AppRoutes onOpenChannel={onOpenChannel} />
        </Layout>
      </BrowserRouter>
    </>
  );
}
