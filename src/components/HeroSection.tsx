'use client';

import { useState, useEffect } from 'react';

export default function HeroSectionAlt() {
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
            Bekijk ons aanbod
          </h1>
          <p className="text-white text-base sm:text-lg mb-6 opacity-90">
            Verken alle opties en upgrades voor jouw voertuig en haal het maximale eruit!
          </p>
            <button 
              onClick={() => handleScrollTo('Ontdek-Ons-Aanbod')}
              className="flex items-center justify-center p-[2px] rounded-md bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] shadow-md shadow-rose-300/10 cursor-pointer text-white font-semibold hover:opacity-95 transition-all"
            >
              <span className="group bg-black/80 w-full h-full px-5 py-2.5 rounded-[4px] text-sm transition-colors duration-300 hover:bg-transparent flex items-center">
                Bekijk ons aanbod
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24" 
                  height="24" 
                  viewBox="-1 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 ml-3"
                >
                  <path d="M3 8L5.72187 10.2682C5.90158 10.418 6.12811 10.5 6.36205 10.5H17.6379C17.8719 10.5 18.0984 10.418 18.2781 10.2682L21 8M6.5 14H6.51M17.5 14H17.51M8.16065 4.5H15.8394C16.5571 4.5 17.2198 4.88457 17.5758 5.50772L20.473 10.5777C20.8183 11.1821 21 11.8661 21 12.5623V18.5C21 19.0523 20.5523 19.5 20 19.5H19C18.4477 19.5 18 19.0523 18 18.5V17.5H6V18.5C6 19.0523 5.55228 19.5 5 19.5H4C3.44772 19.5 3 19.0523 3 18.5V12.5623C3 11.8661 3.18166 11.1821 3.52703 10.5777L6.42416 5.50772C6.78024 4.88457 7.44293 4.5 8.16065 4.5ZM7 14C7 14.2761 6.77614 14.5 6.5 14.5C6.22386 14.5 6 14.2761 6 14C6 13.7239 6.22386 13.5 6.5 13.5C6.77614 13.5 7 13.7239 7 14ZM18 14C18 14.2761 17.7761 14.5 17.5 14.5C17.2239 14.5 17 14.2761 17 14C17 13.7239 17.2239 13.5 17.5 13.5C17.7761 13.5 18 13.7239 18 14Z" />
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
            Ontdek wat er écht mogelijk is!
          </h1>
          <p className="text-white text-base sm:text-lg mb-6 opacity-90 text-right">
            Ontdek en activeer verborgen functies in je voertuig om de volledige potentie te benutten!
          </p>
          <div className="flex justify-end">
            <button 
              onClick={() => handleScrollTo('Opties')}
              className="group flex items-center justify-center p-[2px] rounded-md bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] shadow-md shadow-rose-300/10 cursor-pointer text-white font-semibold hover:opacity-95 transition-all"
            >
              <span className="bg-black/80 w-full h-full px-3 py-2.5 rounded-[4px] text-sm transition-colors duration-300 hover:bg-transparent flex items-center">
                <svg
                  className="w-6 h-6 text-white ml-1 mr-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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

                Ontgrendel verborgen opties
              </span>
            </button>


          </div>
        </div>
      </div>

      {/* <div className="absolute inset-0 flex items-end justify-center pb-8 sm:pb-16">
        <div className="z-50 text-center motion-opacity-in-0 motion-translate-y-in-100 motion-blur-in-md px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-wider mb-2 sm:mb-4 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">
            NXT MOTION
          </h1>
          <p className="text-xl sm:text-2xl md:text-3xl font-light tracking-wide text-white">
            Your Vehicle, Our Passion
          </p>
        </div>
      </div> */}
    </div>
  );
}
