export default function OnsAanbod() {
  return (
    <div id="Ontdek-Ons-Aanbod" className="relative max-w-5xl mx-auto px-6 py-16">
      <div className="absolute inset-0 bg-gradient-to-br from-[#e76e7b]/20 to-[#eec0a8]/20 rounded-xl blur"></div>

      <div className="relative bg-black/60 backdrop-blur-md border border-white/10 rounded-xl p-12 text-center space-y-8">
        <h2 className="text-4xl font-bold text-transparent bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] bg-clip-text">
          Ontdek Ons Aanbod
        </h2>

        <p className="text-gray-300 max-w-xl mx-auto text-lg leading-relaxed">
          Bekijk onze selectie van hoogwaardige en betrouwbare voertuigen. 
          We bieden eerlijke prijzen en transparantie zonder verrassingen. 
          Vind jouw perfecte auto en ervaar de kwaliteit en service die we bieden.
        </p>

        {/* Car images */}
        <div className="flex justify-center gap-6">
          <div className="w-48 h-36 overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/vw_front.png"
              alt="Volkswagen Polo"
              className="w-full h-auto object-cover translate-y-[-32%]"
            />
          </div>
                    <div className="w-48 h-36 overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/vw_back.png"
              alt="Volkswagen Polo"
              className="w-full h-auto object-cover translate-y-[-29%]"
            />
          </div>
          <div className="w-48 h-36 overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/vw2_front.png"
              alt="BMW"
              className="w-full h-auto object-cover translate-y-[-35%]"
            />
          </div>
                    <div className="w-48 h-36 overflow-hidden rounded-lg shadow-lg">
            <img
              src="/images/vw2_back.png"
              alt="Volkswagen Polo"
              className="w-full h-auto object-cover translate-y-[-33%]"
            />
          </div>
        </div>



        <a
          href="/catalogus"
          className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] rounded-full font-semibold text-white hover:shadow-lg hover:shadow-[#e76e7b]/30 transition duration-300"
        >
          Naar de Catalogus
          <svg
            className="w-5 h-5 ml-3"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </a>
      </div>
    </div>
  );
}
