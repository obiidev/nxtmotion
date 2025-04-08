'use client';

import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [showFirstSection, setShowFirstSection] = useState(true);

  // Function to handle smooth scrolling to a section
  const handleScrollTo = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    // Only set up the interval for mobile view
    const mediaQuery = window.matchMedia('(max-width: 767px)');

    if (mediaQuery.matches) {
      const interval = setInterval(() => {
        setShowFirstSection((prev) => !prev);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden pt-16 lg:pt-20">
      {/* Full-width video container with mobile video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden">
        <video
          src="/nxtstockvid.mp4"
          className="absolute w-full h-full object-cover opacity-50"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
        />
      </div>

      {/* Gradient overlay for bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-black via-black/50 to-transparent backdrop-blur-sm"></div>

      {/* Left side promotional text - toggle on mobile, always visible on desktop */}
      <div
        className={`absolute inset-y-0 left-0 flex flex-col justify-center px-6 md:px-12 lg:px-16 w-full md:w-2/3 lg:w-1/2 z-40 motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md transition-opacity duration-500 
        ${
          !showFirstSection
            ? 'md:flex md:opacity-100 hidden opacity-0'
            : 'flex opacity-100'
        }`}
      >
        <div className="max-w-md">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-white leading-tight">
            Ontdek wat er écht mogelijk is!
          </h1>
          <p className="text-white text-base sm:text-lg mb-6 opacity-90">
            Ontdek en activeer verborgen functies in je voertuig om de volledige
            potentie te benutten!
          </p>
          <button 
            onClick={() => handleScrollTo('Opties')}
            className="flex items-center justify-center p-[2px] rounded-md bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] shadow-md shadow-rose-300/10 cursor-pointer text-white font-semibold hover:opacity-95 transition-all"
          >
            <span className="bg-black/80 w-full h-full px-5 py-2.5 rounded-[4px] text-sm transition-colors duration-300 hover:bg-transparent flex items-center">
              Ontgrendel verborgen opties
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white ml-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 14v3m4-6V7a3 3 0 1 1 6 0v4M5 11h10a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1Z"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>

      {/* Right side promotional text - toggle on mobile, always visible on desktop */}
      <div
        className={`absolute inset-y-0 right-0 flex flex-col justify-center px-6 md:px-12 lg:px-16 w-full md:w-2/3 lg:w-1/2 z-40 motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md transition-opacity duration-500 
        ${
          showFirstSection
            ? 'md:flex md:opacity-100 hidden opacity-0'
            : 'flex opacity-100'
        }`}
      >
        <div className="max-w-md ml-auto">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 sm:mb-6 text-white leading-tight text-right">
            Foutmeldingen & Storingslampjes?
          </h1>
          <p className="text-white text-base sm:text-lg mb-6 opacity-90 text-right">
            Bij NXT Motion kun je terecht voor het uitlezen en oplossen van
            foutcodes – snel, transparant en zonder dure garagekosten.{' '}
          </p>
          <div className="flex justify-end">
            <button 
              onClick={() => handleScrollTo('Diagnose')}
              className="flex items-center justify-center p-[2px] rounded-md bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] shadow-md shadow-rose-300/10 cursor-pointer text-white font-semibold hover:opacity-95 transition-all"
            >
              <span className="bg-black/80 w-full h-full px-5 py-2.5 rounded-[4px] text-sm transition-colors duration-300 hover:bg-transparent flex items-center">
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white mr-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7.58209 8.96025 9.8136 11.1917l-1.61782 1.6178c-1.08305-.1811-2.23623.1454-3.07364.9828-1.1208 1.1208-1.32697 2.8069-.62368 4.1363.14842.2806.42122.474.73509.5213.06726.0101.1347.0133.20136.0098-.00351.0666-.00036.1341.00977.2013.04724.3139.24069.5867.52125.7351 1.32944.7033 3.01552.4971 4.13627-.6237.8375-.8374 1.1639-1.9906.9829-3.0736l4.8107-4.8108c1.0831.1811 2.2363-.1454 3.0737-.9828 1.1208-1.1208 1.3269-2.80688.6237-4.13632-.1485-.28056-.4213-.474-.7351-.52125-.0673-.01012-.1347-.01327-.2014-.00977.0035-.06666.0004-.13409-.0098-.20136-.0472-.31386-.2406-.58666-.5212-.73508-1.3294-.70329-3.0155-.49713-4.1363.62367-.8374.83741-1.1639 1.9906-.9828 3.07365l-1.7788 1.77875-2.23152-2.23148-1.41419 1.41424Zm1.31056-3.1394c-.04235-.32684-.24303-.61183-.53647-.76186l-1.98183-1.0133c-.38619-.19746-.85564-.12345-1.16234.18326l-.86321.8632c-.3067.3067-.38072.77616-.18326 1.16235l1.0133 1.98182c.15004.29345.43503.49412.76187.53647l1.1127.14418c.3076.03985.61628-.06528.8356-.28461l.86321-.8632c.21932-.21932.32446-.52801.2846-.83561l-.14417-1.1127ZM19.4448 16.4052l-3.1186-3.1187c-.7811-.781-2.0474-.781-2.8285 0l-.1719.172c-.7811.781-.7811 2.0474 0 2.8284l3.1186 3.1187c.7811.781 2.0474.781 2.8285 0l.1719-.172c.7811-.781.7811-2.0474 0-2.8284Z"
                  />
                </svg>
                Diagnose & foutcodes oplossen
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-16">
        <div className="z-50 text-center motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider mb-2 sm:mb-4 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">
            NXT MOTION
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-white">
            Your Vehicle, Our Passion
          </p>
        </div>
      </div>
    </div>
  );
}
