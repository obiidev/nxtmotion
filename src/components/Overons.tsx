'use client';

import React, { useEffect, useState } from 'react';

export default function Overons() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div id="Overons" className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-64 -left-64 w-[30rem] h-[30rem] bg-gradient-to-r from-[#e76e7b]/5 to-[#eec0a8]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-[30rem] h-[30rem] bg-gradient-to-r from-[#eec0a8]/5 to-[#e76e7b]/5 rounded-full blur-3xl animate-pulse"></div>

      {/* Title section */}
      <div className="relative py-24 pt-28 text-white">
        <div className="relative max-w-screen-xl mx-auto px-4">
          <div
            className={`flex flex-col items-center mb-20 transition-all duration-1000 transform ${
              animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}
          >
            <div className="relative">
              <h1 className="text-5xl md:text-7xl font-bold text-center">
                <span className="bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">
                  WIE ZIJN WIJ?
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      {/* Content sections */}
      <div className="relative py-4 px-4 mx-auto max-w-screen-xl lg:pb-24">
        {/* Team profiles with animated reveal */}
        <div
          className={`transition-all duration-1000 delay-300 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e76e7b]/40 to-[#eec0a8]/40 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative overflow-hidden rounded-xl">
                <div className="bg-black/60 backdrop-blur-md p-8 h-full border border-white/5 group-hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] p-0.5 mr-4">
                      <div className="w-full h-full bg-black/80 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">I</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white group-hover:text-[#e76e7b] transition-colors duration-300">
                      Imran
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      "Ik geloof dat elke auto een verhaal vertelt. Bij NXT
                      Motion helpen wij jou het beste uit je auto te halen,
                      zodat jij de weg op kunt met een voertuig dat echt bij je
                      past."
                    </p>
                    <div className="pt-4">
                      <span className="inline-block text-[#e76e7b] font-semibold">
                        Mede-oprichter
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eec0a8]/40 to-[#e76e7b]/40 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative overflow-hidden rounded-xl">
                <div className="bg-black/60 backdrop-blur-md p-8 h-full border border-white/5 group-hover:border-white/20 transition-all duration-300">
                  <div className="flex items-center mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#eec0a8] to-[#e76e7b] p-0.5 mr-4">
                      <div className="w-full h-full bg-black/80 rounded-full flex items-center justify-center">
                        <span className="text-white text-2xl font-bold">B</span>
                      </div>
                    </div>
                    <h3 className="text-3xl font-bold text-white group-hover:text-[#eec0a8] transition-colors duration-300">
                      Bilal
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <p className="text-gray-300 leading-relaxed">
                      "De techniek achter elke auto is een wereld op zich. Mijn
                      passie ligt bij het ontdekken van verborgen opties en het
                      maximaliseren van wat jouw auto kan bieden."
                    </p>
                    <div className="pt-4">
                      <span className="inline-block text-[#eec0a8] font-semibold">
                        Mede-oprichter
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Our story section with parallax effect */}
        <div
          className={`transition-all duration-1000 delay-500 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="mb-20 relative">
            <div className="absolute inset-0 bg-gradient-to-br from-[#e76e7b]/10 to-[#eec0a8]/10 rounded-xl blur-lg"></div>
            <div className="relative bg-black/70 backdrop-blur-md rounded-xl overflow-hidden border border-white/5">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 rounded-full blur-3xl -mr-32 -mt-32"></div>

              <div className="p-10 md:p-12 relative">
                <h2 className="text-3xl md:text-4xl font-bold mb-8 inline-block">
                  <span className="bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">
                    Ons verhaal
                  </span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <p className="text-xl text-white leading-relaxed">
                      Bij{' '}
                      <span className="font-bold text-[#e76e7b]">
                        NXT Motion
                      </span>{' '}
                      draait alles om transparantie, kwaliteit en passie. Wat
                      begon als een gedeelde hobby, is uitgegroeid tot een
                      serieuze onderneming.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      Wij geloven dat een auto meer is dan alleen een
                      vervoermiddel – het is een beleving. Daarom doen we er
                      alles aan om onze klanten niet alleen een mooie auto te
                      bieden, maar ook een uitstekende service en eerlijk
                      advies.
                    </p>
                    <p className="text-lg text-gray-300 leading-relaxed">
                      We begrijpen dat de autowereld soms overweldigend kan
                      zijn, en daarom staan wij altijd klaar om te helpen en te
                      adviseren. Of je nu op zoek bent naar je volgende auto of
                      meer uit je huidige auto wilt halen, bij NXT Motion ben je
                      aan het juiste adres.
                    </p>
                  </div>

                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 rounded-lg blur"></div>
                    <div className="relative">
                      <div className="bg-black/50 p-8 rounded-lg space-y-6 backdrop-blur-md border border-white/10">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-white min-w-[1.25rem] min-h-[1.25rem] max-h-[1.25rem]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-white font-medium">
                            Kwalitatieve en betrouwbare auto's
                          </span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-white min-w-[1.25rem] min-h-[1.25rem] max-h-[1.25rem]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-white font-medium">
                            Eerlijke prijzen, geen verrassingen
                          </span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-white min-w-[1.25rem] min-h-[1.25rem] max-h-[1.25rem]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-white font-medium">
                            Ontgrendelen van verborgen opties
                          </span>
                        </div>

                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] flex items-center justify-center flex-shrink-0">
                            <svg
                              className="w-5 h-5 text-white min-w-[1.25rem] min-h-[1.25rem] max-h-[1.25rem]"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              ></path>
                            </svg>
                          </div>
                          <span className="text-white font-medium">
                            Personaliseren van voertuigen
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action section with hover effects */}
        <div
          className={`transition-all duration-1000 delay-700 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="relative group cursor-pointer">
            <div className="absolute inset-0 bg-gradient-to-r from-[#e76e7b]/30 to-[#eec0a8]/30 rounded-xl blur-md group-hover:blur-lg transition-all duration-300"></div>
            <div className="relative rounded-xl overflow-hidden border border-white/10 group-hover:border-white/20 transition-all duration-300">
              <div className="bg-black/70 backdrop-blur-md p-10 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">
                      <span className="bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">
                        Volg onze reis
                      </span>
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed mb-8">
                      Blijf op de hoogte van onze nieuwste aankopen,
                      verbeterprojecten en updates. Heb je vragen of wil je meer
                      weten? Neem gerust contact met ons op – we helpen je graag
                      verder!
                    </p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:flex md:flex-wrap gap-3">
                      {/* Phone Button */}
                      <a
                        href="tel:+31612345678"
                        className="px-4 py-3 text-white font-medium rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] hover:shadow-lg hover:shadow-[#e76e7b]/20 transition-all duration-300 flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                          ></path>
                        </svg>
                        <span>Bellen</span>
                      </a>

                      {/* WhatsApp Button */}
                      <a
                        href="https://wa.me/31612345678"
                        className="px-4 py-3 text-white font-medium rounded-full bg-[#25D366]/80 hover:bg-[#25D366] border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          viewBox="0 0 32 32"
                          fill="currentColor"
                        >
                          <path d="M16 2C8.28 2 2 8.28 2 16C2 19.01 2.875 21.82 4.5 24.12L2.56 29.9L8.53 28C10.72 29.33 13.26 30 16 30C23.72 30 30 23.72 30 16C30 8.28 23.72 2 16 2ZM23.07 21.45C22.78 22.29 21.55 22.97 20.63 23.18C20 23.33 19.17 23.44 15.69 21.94C11.27 20.06 8.42 15.56 8.21 15.28C8.01 15 6.5 12.94 6.5 10.79C6.5 8.64 7.56 7.64 7.93 7.24C8.25 6.9 8.72 6.75 9.17 6.75C9.32 6.75 9.45 6.76 9.57 6.77C9.94 6.78 10.12 6.81 10.36 7.36C10.65 8.06 11.36 10.21 11.46 10.44C11.56 10.67 11.66 10.97 11.51 11.26C11.37 11.56 11.24 11.69 11.01 11.96C10.78 12.23 10.56 12.44 10.33 12.73C10.12 12.97 9.88 13.23 10.14 13.68C10.4 14.12 11.11 15.24 12.11 16.12C13.42 17.27 14.53 17.68 15.05 17.92C15.42 18.1 15.86 18.07 16.13 17.79C16.46 17.43 16.87 16.8 17.29 16.17C17.59 15.73 17.97 15.67 18.37 15.83C18.78 15.97 20.92 17.02 21.37 17.24C21.82 17.46 22.12 17.57 22.22 17.75C22.32 17.94 22.32 18.78 22.02 19.81L23.07 21.45Z" />
                        </svg>
                        <span>WhatsApp</span>
                      </a>

                      {/* Instagram Button */}
                      <a
                        href="https://instagram.com/nxtmotion"
                        className="px-4 py-3 text-white font-medium rounded-full bg-gradient-to-tr from-[#405DE6] via-[#C13584] to-[#F77737] hover:shadow-lg hover:shadow-[#C13584]/20 transition-all duration-300 flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                        </svg>
                        <span>Instagram</span>
                      </a>

                      {/* TikTok Button */}
                      <a
                        href="https://tiktok.com/@nxtmotion"
                        className="px-4 py-3 text-white font-medium rounded-full bg-black hover:bg-black/90 border border-[#FF0050]/50 hover:border-[#FF0050] transition-all duration-300 flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                        </svg>
                        <span>TikTok</span>
                      </a>

                      {/* Snapchat Button */}
                      <a
                        href="https://snapchat.com/add/nxtmotion"
                        className="px-4 py-3 text-black font-medium rounded-full bg-[#FFFC00] hover:bg-[#FFFC00]/90 transition-all duration-300 flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M5.829 4.533c-.6 1.344-.363 3.752-.267 5.436-.648.359-1.48-.271-1.951-.271-.49 0-1.075.322-1.167.802-.066.346.089.85 1.201 1.289.43.17 1.453.37 1.69.928.333.784-1.71 4.403-4.918 4.931-.251.041-.43.265-.416.519.056.975 2.242 1.357 3.211 1.507.099.134.179.7.306 1.131.057.193.204.424.582.424.493 0 1.312-.38 2.738-.144 1.398.233 2.712 2.215 5.235 2.215 2.345 0 3.744-1.991 5.09-2.215.779-.129 1.448-.088 2.196.058.515.101.977.157 1.124-.349.129-.437.208-.992.305-1.123.96-.149 3.156-.53 3.211-1.505.014-.254-.165-.477-.416-.519-3.154-.52-5.259-4.128-4.918-4.931.236-.557 1.252-.755 1.69-.928.814-.321 1.222-.716 1.213-1.173-.011-.585-.715-.934-1.233-.934-.527 0-1.284.624-1.897.286.096-1.698.332-4.095-.267-5.438-1.135-2.543-3.66-3.829-6.184-3.829-2.508 0-5.014 1.268-6.158 3.833z"
                            fill="#020202"
                          />
                        </svg>
                        <span>Snapchat</span>
                      </a>

                      {/* Email Button */}
                      <a
                        href="mailto:info@nxtmotion.nl"
                        className="px-4 py-3 text-white font-medium rounded-full bg-black/60 border border-white/10 hover:border-white/30 transition-all duration-300 flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg
                          className="w-5 h-5 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          />
                        </svg>
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                  <div className="flex justify-center md:justify-end">
                    <div className="relative group">
                      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] rounded-2xl blur opacity-60 group-hover:opacity-100 transition duration-300 group-hover:duration-200 animate-pulse"></div>
                      <div className="relative w-60 h-60 rounded-2xl overflow-hidden group-hover:scale-105 transition-all duration-300">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70 z-10"></div>
                        <img
                          src="/images/car-image.jpg"
                          alt="Luxury car"
                          className="w-full h-full object-cover object-center"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src =
                              'https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80';
                          }}
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                          <p className="text-center text-sm font-medium bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] bg-clip-text text-transparent uppercase tracking-wider">
                            NXT MOTION
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
