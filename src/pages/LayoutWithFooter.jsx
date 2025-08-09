import { Outlet } from "react-router-dom";
import NewsletterSection from "../components/NewsletterSection";
import Footer from "../components/Footer";
import BottomPanelArt from "../components/BottomPanelArt";

export default function LayoutWithFooter() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Page content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Keep your sitewide newsletter above the footer (unchanged) */}
      <NewsletterSection />

      {/* Decorative Bottom Panel - top-cropped art shown on ALL pages */}
      <BottomPanelArt />

      {/* Footer (unchanged) */}
      <Footer />
    </div>
  );
}
