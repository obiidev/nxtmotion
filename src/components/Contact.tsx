'use client';

import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [animate, setAnimate] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form after showing success message
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };

  return (
    <div id="Contact" className="min-h-screen relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute -top-64 -left-64 w-[40rem] h-[40rem] bg-gradient-to-r from-[#e76e7b]/5 to-[#eec0a8]/5 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-32 -right-32 w-[40rem] h-[40rem] bg-gradient-to-r from-[#eec0a8]/5 to-[#e76e7b]/5 rounded-full blur-3xl animate-pulse"></div>

      {/* Main content */}
      <div className="relative max-w-screen-xl mx-auto px-4 py-24 pt-28">
        {/* Title section */}
        <div
          className={`flex flex-col items-center mb-16 transition-all duration-1000 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-center">
            <span className="bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">
              CONTACT
            </span>
          </h1>
        </div>

        {/* Form section */}
        <div
          className={`transition-all duration-1000 delay-300 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            {/* Info section */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e76e7b]/40 to-[#eec0a8]/40 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-black/70 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-300 h-full">
                <div className="p-8 md:p-10">
                  <h2 className="text-3xl font-bold mb-8">
                    <span className="bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">
                      Laat hier je bericht achter
                    </span>
                  </h2>

                  <p className="text-gray-300 mb-8">
                    Heb je vragen, suggesties of wil je direct geholpen worden?
                    Vul onderstaand formulier in en wij nemen zo snel mogelijk
                    contact met je op!
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-5 h-5 text-white"
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
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          Telefonisch bereikbaar
                        </h3>
                        <p className="text-gray-300">+31 6 12 34 56 78</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Ma-Vr: 09:00 - 18:00
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          Email
                        </h3>
                        <p className="text-gray-300">info@nxtmotion.nl</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Wij reageren binnen 24 uur
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] flex items-center justify-center flex-shrink-0 mt-1">
                        <svg
                          className="w-5 h-5 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          ></path>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          ></path>
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-white font-semibold text-lg">
                          Locatie
                        </h3>
                        <p className="text-gray-300">Eindhoven</p>
                        <p className="text-gray-400 text-sm mt-1">
                          Op afspraak geopend
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact form */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-[#eec0a8]/40 to-[#e76e7b]/40 rounded-xl blur-md opacity-75 group-hover:opacity-100 transition-all duration-300"></div>
              <div className="relative bg-black/70 backdrop-blur-md rounded-xl overflow-hidden border border-white/5 group-hover:border-white/20 transition-all duration-300">
                <div className="p-8 md:p-10">
                  {!submitted ? (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Jouw naam
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-[#e76e7b]/70 rounded-lg text-white placeholder-gray-500 focus:ring-[#e76e7b]/50 focus:outline-none transition-colors duration-300"
                          placeholder="Voer je naam in"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          E-mailadres
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-[#e76e7b]/70 rounded-lg text-white placeholder-gray-500 focus:ring-[#e76e7b]/50 focus:outline-none transition-colors duration-300"
                          placeholder="Voer je e-mailadres in"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Telefoonnummer
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-[#e76e7b]/70 rounded-lg text-white placeholder-gray-500 focus:ring-[#e76e7b]/50 focus:outline-none transition-colors duration-300"
                          placeholder="Voer je telefoonnummer in"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="message"
                          className="block text-sm font-medium text-gray-300 mb-1"
                        >
                          Je bericht
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-black/50 border border-white/10 focus:border-[#e76e7b]/70 rounded-lg text-white placeholder-gray-500 focus:ring-[#e76e7b]/50 focus:outline-none transition-colors duration-300 resize-none"
                          placeholder="Waar kunnen we je mee helpen?"
                        ></textarea>
                      </div>

                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full px-6 py-4 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-white font-medium rounded-lg hover:shadow-lg hover:shadow-[#e76e7b]/20 focus:outline-none focus:ring-2 focus:ring-[#e76e7b]/50 transition-all duration-300 relative overflow-hidden group"
                        >
                          <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-[#eec0a8] to-[#e76e7b] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                          <span className="relative flex items-center justify-center">
                            {isSubmitting ? (
                              <>
                                <svg
                                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                Versturen...
                              </>
                            ) : (
                              <>
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
                                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                                  ></path>
                                </svg>
                                Verstuur bericht
                              </>
                            )}
                          </span>
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] flex items-center justify-center mb-6 animate-bounce">
                        <svg
                          className="w-8 h-8 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        Bericht verzonden!
                      </h3>
                      <p className="text-gray-300 text-center">
                        Bedankt voor je bericht. We nemen zo snel mogelijk
                        contact met je op.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Map or additional info section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-500 transform ${
            animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        ></div>
      </div>
    </div>
  );
}
