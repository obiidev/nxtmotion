export default function OnsAanbodAlt() {
  const cars = [
    { src: "/images/ons_aanbod/vw_golf_front.png", alt: "Volkswagen Golf", translate: "-translate-y-[32%]" },
    { src: "/images/ons_aanbod/vw3_front.png", alt: "Volkswagen VW3", translate: "-translate-y-[34%]" },
    { src: "/images/ons_aanbod/vw_polo_front.png", alt: "Volkswagen Polo", translate: "-translate-y-[35%]" },
    { src: "/images/ons_aanbod/audi_front.png", alt: "Audi", translate: "-translate-y-[26%]" },
  ];

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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 justify-center">
          {cars.map(({ src, alt, translate }) => (
            <div key={src} className="relative w-full aspect-[4/3] overflow-hidden rounded-lg shadow-lg">
              <img
                src={src}
                alt={alt}
                className={`absolute top-0 left-0 w-full min-h-full object-cover ${translate}`}
              />
            </div>
          ))}
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
