import { useCallback, useEffect, useState } from "react";
import Layout from "./components/Layout";
import Preloader from "./components/Preloader";
import LandingPage from "./pages/LandingPage";
import { useSiteReady } from "./hooks/useSiteReady.js";
import { CONTACT } from "./data/company.js";

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
      <Layout>
        <LandingPage onOpenChannel={onOpenChannel} />
      </Layout>
    </>
  );
}
