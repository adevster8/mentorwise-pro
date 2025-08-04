import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NewsletterSection from "../components/NewsletterSection";
import BottomPanelArt from "../components/BottomPanelArt"; // or BodyPanelArt


export default function LayoutWithFooter() {
  
  return (
    <>
      <Outlet />               {/* Main page content goes here */}
     <NewsletterSection />    {/* Newsletter signup */}
     <BottomPanelArt />       {/* Art tile */}
     <Footer />               {/* Footer */}
    </>
  );
}