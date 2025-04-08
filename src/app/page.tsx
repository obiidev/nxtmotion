import NavBar from '@/components/nav/NavBar';
import HeroSection from '@/components/HeroSection';
import Opties from '@/components/table/Opties';
import Diagnose from '@/components/Diagnose';
import Overons from '@/components/Overons';
import Contact from '@/components/Contact';
export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] relative">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-black to-[#0a0a0a] opacity-80"></div>
      <div className="absolute inset-0 opacity-5 bg-[url('/noise-pattern.png')] mix-blend-overlay pointer-events-none"></div>
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#333_0.5px,transparent_0.5px)] [background-size:20px_20px] pointer-events-none"></div>
      <div className="absolute inset-0 opacity-8 bg-[linear-gradient(45deg,#222_25%,transparent_25%,transparent_50%,#222_50%,#222_75%,transparent_75%,transparent)] bg-[length:10px_10px] mix-blend-overlay pointer-events-none"></div>
      
      {/* Floating gradient elements */}
      <div className="absolute top-1/4 left-1/6 w-64 h-64 bg-gradient-to-r from-[#e76e7b]/10 to-[#eec0a8]/10 opacity-30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 right-1/5 w-80 h-80 bg-gradient-to-r from-[#eec0a8]/10 to-[#e76e7b]/10 opacity-20 rounded-full blur-3xl pointer-events-none"></div>
      
      <header className="relative">
        <NavBar></NavBar>
      </header>
      <div className="relative">
        <HeroSection />
        <Opties />
        <Diagnose />
        <Overons />
        <Contact />
      </div>
    </main>
  );
}

