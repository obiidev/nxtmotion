import { opties } from '@/data/opties3';

export default function OptionsTable3() {
  return (
    <div className="flex flex-col p-6 mx-auto w-full text-center text-gray-100 bg-transparent h-full">
      <h3 className="mb-6 text-xl font-semibold sm:block hidden text-white">Verlichting & Exterieur</h3>
      {/* List */}
      <ul role="list" className="space-y-2 text-left flex-grow">
        {opties.map((optie) => (
          <li key={optie.functie} className="p-2 rounded-lg transition-all hover:bg-white/5">
            <div className="flex items-start">
              <svg className="w-5 h-5 mr-2 mt-0.5 text-[#e76e7b] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div>
                <span className="font-medium text-sm text-white">{optie.functie}</span>
                <p className="text-xs text-gray-400 mt-0.5">{optie.omschrijving}</p>
                <p className="text-xs font-medium mt-0.5 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] text-transparent bg-clip-text">
                  {optie.prijs}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
