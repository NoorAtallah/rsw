import RSWHeroSection from "./components/hero";
import LuxuryServicesSection from "./components/services";
import RSWAboutSection from "./components/about";
import RSWEcosystemSection from "./components/ecoSystem";
import RSWStatsSection from "./components/stats";
import RSWCTASection from "./components/CTA";
import RSWFooter from "./components/footer";
import RSWNewsSection from "./components/newsSection";
import RSWInvestorRelationsSection from "./components/inestorSection";
export default function Home() {
  return (
    <main >
      <RSWHeroSection />
      <RSWNewsSection />
      <LuxuryServicesSection />
      <RSWAboutSection />
      <RSWInvestorRelationsSection />
      {/* <RSWEcosystemSection /> */}
      <RSWStatsSection />
      <RSWCTASection />
      <RSWFooter />
    </main>
  );
}