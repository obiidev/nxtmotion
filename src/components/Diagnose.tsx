'use client';

import { useState } from 'react';

export default function Diagnose() {
  return (
    <div id="Diagnose" className="min-h-screen relative">
      {/* Title section */}
      <div className="relative py-24 pt-28 text-white">
        <div className="relative max-w-screen-xl mx-auto px-4">
          <div className="flex flex-col items-center mb-12">
            <span className="text-sm text-[#e76e7b] uppercase tracking-wider font-medium mb-3">Professionele service</span>
            <h1 className="mb-4 text-3xl md:text-5xl font-bold text-center leading-tight">
              <span className="bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">Diagnose & Foutcodes</span>
              <span className="block text-white text-2xl md:text-3xl mt-2 font-light">Oplossen</span>
            </h1>
            <div className="w-20 h-1 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] mx-auto mb-8"></div>
            <p className="mb-5 text-lg text-center max-w-2xl mx-auto leading-relaxed text-gray-300">
              Heb je last van een storingslampje op je dashboard of een foutmelding in je auto?
              Bij NXT Motion kun je terecht voor uitlezen en oplossen van foutcodes – snel, transparant en zonder dure garagekosten.
            </p>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="relative py-8 px-4 mx-auto max-w-screen-xl lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 xl:gap-8">
          {/* Left column (5/12 width) */}
          <div className="lg:col-span-5 h-full">
            {/* What we do section */}
            <div className="bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 backdrop-blur-sm p-0.5 rounded-xl h-full mb-6">
              <div className="flex items-center justify-between bg-black/70 p-4 rounded-t-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e76e7b] to-[#eec0a8] rounded-lg mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-white">Wat we voor je doen</h3>
                </div>
              </div>
              <div className="bg-black/70 backdrop-blur-md rounded-b-lg overflow-hidden h-full">
                <div className="p-6 text-gray-100">
                  <ul className="space-y-4 flex-grow mx-auto w-full max-w-lg">
                    {[
                      { text: 'Foutcodes uitlezen (alle merken)', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                      { text: 'Storingen analyseren en resetten (indien mogelijk)', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                      { text: 'Uitleg over wat er aan de hand is', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                      { text: 'Oplossing of advies op maat', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
                      { text: 'Elektronica controleren en kleine reparaties uitvoeren', icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' }
                    ].map((item, index) => (
                      <li key={index} className="p-3 rounded-lg transition-all hover:bg-white/5">
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 mr-2 mt-0.5 text-[#e76e7b] flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={item.icon}
                            ></path>
                          </svg>
                          <span className="font-medium text-white">{item.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right column (7/12 width) */}
          <div className="lg:col-span-7 flex flex-col gap-6 xl:gap-8">
            {/* Common issues section */}
            <div className="bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 backdrop-blur-sm p-0.5 rounded-xl">
              <div className="flex items-center justify-between bg-black/70 p-4 rounded-t-lg">
                <div className="flex items-center">
                  <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e76e7b] to-[#eec0a8] rounded-lg mr-3">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
                    </svg>
                  </div>
                  <h3 className="font-semibold text-lg text-white">Veelvoorkomende meldingen</h3>
                </div>
              </div>
              <div className="bg-black/70 backdrop-blur-md rounded-b-lg overflow-hidden">
                <div className="p-6 text-gray-100">
                  <ul className="flex-grow mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
                    {[
                      { text: 'Check engine lampje', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                      { text: 'ABS/ESP storingen', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                      { text: 'Airbag lampje', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                      { text: 'Sensor- of beladingsproblemen', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                      { text: 'EGR/DPF foutmeldingen (diesel)', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
                      { text: 'Elektronische storingen', icon: 'M13 10V3L4 14h7v7l9-11h-7z' }
                    ].map((item, index) => (
                      <li key={index} className="p-3 rounded-lg transition-all hover:bg-white/5">
                        <div className="flex items-start">
                          <svg
                            className="w-5 h-5 mr-2 mt-0.5 text-[#e76e7b] flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d={item.icon}
                            ></path>
                          </svg>
                          <span className="font-medium text-white">{item.text}</span>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Bottom sections container */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:gap-8 h-full">
              {/* Pricing section */}
              <div className="bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 backdrop-blur-sm p-0.5 rounded-xl h-full">
                <div className="flex items-center justify-between bg-black/70 p-4 rounded-t-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e76e7b] to-[#eec0a8] rounded-lg mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-white">Prijzen</h3>
                  </div>

                </div>
                <div className="bg-black/70 backdrop-blur-md rounded-b-lg overflow-hidden h-80%">
                  <div className="p-6 text-gray-100 w-full">
                    <ul className="space-y-3 flex-grow mx-auto w-full max-w-sm">
                      {[
                        { service: 'Foutcode uitlezen + uitleg', price: '€25' },
                        { service: 'Foutcode resetten (indien mogelijk)', price: '€30' },
                        { service: 'Kleine reparatie of reset op locatie', price: 'vanaf €50' }
                      ].map((item, index) => (
                        <li key={index} className="p-2 rounded-lg transition-all hover:bg-white/5">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-sm text-white">{item.service}</span>
                            <span className="text-sm font-medium bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text min-w-[75px] text-right">
                              {item.price}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              
              {/* Timing section */}
              <div className="bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 backdrop-blur-sm p-0.5 rounded-xl h-[160px]">
                <div className="flex items-center justify-between bg-black/70 p-4 rounded-t-lg">
                  <div className="flex items-center">
                    <div className="w-8 h-8 flex items-center justify-center bg-gradient-to-br from-[#e76e7b] to-[#eec0a8] rounded-lg mr-3">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="font-semibold text-lg text-white">Klaar terwijl je wacht</h3>
                  </div>
                </div>
                <div className="bg-black/70 backdrop-blur-md rounded-b-lg overflow-hidden h-[92px]">
                  <div className="p-6 text-gray-100 flex flex-col h-full w-full">
                    <p className="text-center text-sm text-gray-300 flex-grow mx-auto max-w-sm">
                      In de meeste gevallen is je auto binnen 10-15 minuten weer klaar.
                      Je weet direct waar je aan toe bent.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to action button */}
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
                <span className="mr-2">Laat je storing nu checken</span>
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

