import RSWHeroSection from "./components/hero";
import LuxuryServicesSection from "./components/services";
import RSWAboutSection from "./components/about";
export default function Home() {
  return (
    <main >
      <RSWHeroSection />
      <LuxuryServicesSection />
      <RSWAboutSection />
    </main>
  );
}