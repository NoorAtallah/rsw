import RSWHeroSection from "./components/hero";
import LuxuryServicesSection from "./components/services";
import RSWAboutSection from "./components/about";
import RSWEcosystemSection from "./components/ecoSystem";
import RSWStatsSection from "./components/stats";
import RSWCTASection from "./components/CTA";
import RSWFooter from "./components/footer";
import RSWNewsSection from "./components/newsSection";
import RSWInvestorRelationsSection from "./components/inestorSection";
import InvestmentMap from "./components/Investmentmap";
export default function Home() {
  return (
    <main >
      <RSWHeroSection />
       <RSWAboutSection />
      <RSWNewsSection />
      <LuxuryServicesSection />
        <InvestmentMap />
     
      <RSWInvestorRelationsSection />
      {/* <RSWEcosystemSection /> */}
      {/* <RSWStatsSection /> */}
      <RSWCTASection />
    
    </main>
  );
}