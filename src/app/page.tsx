import OptionsTable1 from '@/components/table/OptionsTable1';
import OptionsTable2 from '@/components/table/OptionsTable2';
import Button from '@/components/ui/Button';
import Image from 'next/image';

export default function Home() {
  return (
    <main className="h-screen">
      <div className="relative w-full h-full">
        <video
          src="/nxtvid.mp4"
          poster="/poster.jpg"
          className="lg:hidden md:hidden w-full h-full object-cover opacity-20"
          autoPlay
          muted
          loop
        />

        <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center space-y-1">
          <Image
            src="/nxtlogowit.png"
            alt="Logo"
            width={100}
            height={100}
            className="w-52 h-52"
          />
          <div className="flex flex-col items-center space-y-4">
            {/* <Button>Verborgen opties ontgrendelen</Button>
            <Button>Diagnose & foutcodes wissen</Button> */}
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-rose-300 rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                <span>verborgen opties ontgrendelen</span>
              </div>
            </button>
            <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] rounded-lg" />
              <div className="px-8 py-2  bg-black rounded-[6px]  relative group transition duration-200 text-white hover:bg-transparent">
                Diagnose stellen & foutcodes oplossen
              </div>
            </button>
          </div>
        </div>
      </div>
      <section>
        <div className="">
          <h1 className='"mb-4 text-2xl font-semibold text-center py-4 px-6'>
            Veborgen opties
          </h1>
          <p className="mb-5 font-light sm:text-xl text-center py-4 px-6">
            Ontdek en activeer verborgen functies in je voertuig om de volledige
            potentie te benutten!
          </p>
        </div>

        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
          <div className="space-y-8 lg:grid lg:grid-cols-2 sm:gap-6 xl:gap-10 lg:space-y-0">
            <OptionsTable1 />
            <OptionsTable2 />
          </div>
        </div>
        <div className="">
          <h1 className='"mb-4 text-2xl font-semibold text-center py-4 px-6'>
            Diagnose & foutcodes oplossen
          </h1>
          <p className="mb-5 font-light sm:text-xl text-center py-4 px-6">
            NxtMotion biedt professionele diagnoseoplossingen voor voertuigen.
            Hiermee lossen we foutcodes op en zorfen we voor optimale
            prestaties. Je kunt rkeken op deskundige ondersteuning en
            hoogwaardige services.
          </p>
        </div>
      </section>
    </main>
  );
}
