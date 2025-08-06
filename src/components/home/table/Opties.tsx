'use client';

import { useState } from 'react';
import OptionsTable1 from './OptionsTable1';
import OptionsTable2 from './OptionsTable2';
import OptionsTable3 from './OptionsTable3';
import OptionsTable4 from './OptionsTable4';

type TableId = 'table1' | 'table2' | 'table3' | 'table4';

export default function Opties() {
  const [openTables, setOpenTables] = useState({
    table1: true,
    table2: false,
    table3: false,
    table4: false
  });

  const toggleTable = (tableId: TableId) => {
    setOpenTables(prev => ({
      ...prev,
      [tableId]: !prev[tableId]
    }));
  };

  return (
    <div id="Opties" className="min-h-screen relative">
      {/* Title section */}
      <div className="relative py-24 pt-28 text-white">
        <div className="relative max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="text-sm text-[#e76e7b] uppercase tracking-wider font-medium mb-3">Exclusieve opties</span>
            <h1 className="mb-4 text-3xl md:text-5xl font-bold text-center leading-tight">
              <span className="bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">Verborgen Functies</span>
              <span className="block text-white text-2xl md:text-3xl mt-2 font-light">voor uw voertuig</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] mx-auto mb-8"></div>
            <p className="mb-5 text-lg text-center max-w-2xl mx-auto leading-relaxed text-gray-300">
              Ontdek en activeer verborgen functies in je voertuig om de volledige
              potentie te benutten en je rijervaring te verbeteren.
            </p>
          </div>
        </div>
      </div>

      {/* Tables section - improved layout */}
      <div className="relative py-8 px-4 mx-auto max-w-screen-xl lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
          {/* OptionsTable1 - Main large table (5/12 width) */}
          <div className="lg:col-span-5 h-full">
            <div className="bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 backdrop-blur-sm p-0.5 rounded-xl h-full">
              <div className="flex items-center justify-between bg-black/70 p-4 rounded-t-lg cursor-pointer lg:hidden"
                onClick={() => toggleTable('table1')}>
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e76e7b] to-[#eec0a8] rounded-lg mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-white">Comfort & Gebruiksgemak</h3>
                </div>
                <svg 
                  className={`w-5 h-5 text-white transition-transform duration-300 ${openTables.table1 ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className={`${openTables.table1 ? 'block' : 'hidden'} lg:block bg-black/70 backdrop-blur-md rounded-b-lg lg:rounded-lg overflow-hidden h-full`}>
                <OptionsTable1 />
              </div>
            </div>
          </div>
          
          {/* Main right column (7/12 width) */}
          <div className="lg:col-span-7 flex flex-col gap-6 xl:gap-8">
            {/* OptionsTable2 (full width of right column) */}
            <div className="bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 backdrop-blur-sm p-0.5 rounded-xl">
              <div className="flex items-center justify-between bg-black/70 p-4 rounded-t-lg cursor-pointer lg:hidden"
                onClick={() => toggleTable('table2')}>
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e76e7b] to-[#eec0a8] rounded-lg mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-white">Multimedia & Navigatie</h3>
                </div>
                <svg 
                  className={`w-5 h-5 text-white transition-transform duration-300 ${openTables.table2 ? 'rotate-180' : ''}`} 
                  fill="none" viewBox="0 0 24 24" stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              <div className={`${openTables.table2 ? 'block' : 'hidden'} lg:block bg-black/70 backdrop-blur-md rounded-b-lg lg:rounded-lg overflow-hidden`}>
                <OptionsTable2 />
              </div>
            </div>
            
            {/* Bottom tables container - improved */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8">
              {/* OptionsTable3 - Left bottom */}
              <div className="bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 backdrop-blur-sm p-0.5 rounded-xl h-full">
                <div className="flex items-center justify-between bg-black/70 p-4 rounded-t-lg cursor-pointer md:hidden"
                  onClick={() => toggleTable('table3')}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e76e7b] to-[#eec0a8] rounded-lg mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-white">Verlichting & Exterieur</h3>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-white transition-transform duration-300 ${openTables.table3 ? 'rotate-180' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`${openTables.table3 ? 'block' : 'hidden'} md:block bg-black/70 backdrop-blur-md rounded-b-lg md:rounded-lg overflow-hidden h-full`}>
                  <OptionsTable3 />
                </div>
              </div>
              
              {/* OptionsTable4 - Right bottom */}
              <div className="bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 backdrop-blur-sm p-0.5 rounded-xl h-full">
                <div className="flex items-center justify-between bg-black/70 p-4 rounded-t-lg cursor-pointer md:hidden"
                  onClick={() => toggleTable('table4')}>
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e76e7b] to-[#eec0a8] rounded-lg mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-white">Prestaties & Sportieve Functies</h3>
                  </div>
                  <svg 
                    className={`w-5 h-5 text-white transition-transform duration-300 ${openTables.table4 ? 'rotate-180' : ''}`} 
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
                <div className={`${openTables.table4 ? 'block' : 'hidden'} md:block bg-black/70 backdrop-blur-md rounded-b-lg md:rounded-lg overflow-hidden h-80%`}>
                  <OptionsTable4 />
                </div>
              </div>
            </div>
            
            {/* Single large button across the entire right column */}
            <div className="mt-4">
              <button 
                onClick={() => {
                  const contactSection = document.getElementById('Contact');
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
                className="w-full px-5 py-4 text-lg font-medium text-white bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] rounded-lg hover:opacity-90 transition-all flex items-center justify-center"
              >
                <span className="mr-2">Vraag verborgen opties aan</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
