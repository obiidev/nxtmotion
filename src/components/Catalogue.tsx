"use client";

import { useState } from "react";
import allCars from "@/data/cars.json";

export default function Catalogue() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCar, setSelectedCar] = useState<any>(null);
  const [filters, setFilters] = useState({
    make: "",
    year: "",
    fuel: "",
    mileage: "",
    transmission: "",
    priceRange: "",
  });

  const prices = allCars.map((car) => car.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  const roundToNearest = (num: number, nearest: number) =>
    Math.ceil(num / nearest) * nearest;

  const roundedMin = roundToNearest(minPrice, 1000);
  const roundedMax = roundToNearest(maxPrice, 1000);

  const increment = 5000;
  const priceOptions = [];

  for (let price = increment; price <= roundedMax + increment; price += increment) {
    if (price >= roundedMin) {
      priceOptions.push(price);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const filterCars = allCars.filter((car) => {
    const { make, year, fuel, mileage, transmission, priceRange } = filters;

    const matchesMake =
      !make || car.make.toLowerCase().includes(make.toLowerCase());
    const matchesYear = !year || car.year >= parseInt(year);
    const matchesFuel = !fuel || car.fuel === fuel;
    const matchesMileage = !mileage || car.mileage <= parseInt(mileage);
    const matchesTransmission =
      !transmission || car.transmission === transmission;

    let matchesPrice = true;
    if (priceRange) {
      const maxPrice = parseInt(priceRange);
      if (!isNaN(maxPrice)) {
        matchesPrice = car.price <= maxPrice;
      }
    }

    return (
      matchesMake &&
      matchesYear &&
      matchesFuel &&
      matchesMileage &&
      matchesTransmission &&
      matchesPrice
    );
  });

  const handleCardClick = (car: any) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  return (
    <div className="relative max-w-7xl mx-auto px-8 sm:px-16 py-12 pt-24">
      <h1 className="text-4xl font-bold mb-8 text-center">Catalogus</h1>

      <button
        onClick={() => setShowFilter(!showFilter)}
        className="flex items-center justify-center p-[2px] rounded-md bg-gradient-to-r from-[#e76e7b] to-[#eec0a8] shadow-md shadow-rose-300/10 cursor-pointer text-white font-semibold hover:opacity-95 transition-all mb-8"
      >
        <span className="bg-black/80 w-full h-full px-5 py-2.5 rounded-[4px] text-sm transition-colors duration-300 hover:bg-transparent flex items-center">
          Filters
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

        {/* Filters-paneel */}
        {showFilter && (
          <section className="mb-12 p-6 bg-[#111] rounded-lg shadow-lg">
            <h2 className="text-2xl mb-4 font-semibold">Filter auto's</h2>
            <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              
              {/*Dynamically fill from cars.ts*/}
              <select id="make" onChange={handleChange} className="rounded bg-[#222] p-2">
                <option value="">Merk</option>
                {[...new Set(allCars.map((car) => car.make))].map((brand) => (
                  <option key={brand} value={brand}>
                    {brand}
                  </option>
                ))}
              </select>
              
              {/*Dynamically fill from cars.ts*/}
              <select id="year" onChange={handleChange} className="rounded bg-[#222] p-2">
                <option value="">Bouwjaar</option>
                {Array.from(
                  { length: Math.max(...allCars.map(car => car.year)) - Math.min(...allCars.map(car => car.year)) + 1 },
                  (_, i) => {
                    const year = Math.min(...allCars.map(car => car.year)) + i;
                    return (
                      <option key={year} value={year}>
                        Vanaf {year}
                      </option>
                    );
                  }
                ).reverse()}
              </select>


              {/*Dynamically fill from cars.ts*/}
              <select
                id="priceRange"
                onChange={handleChange}
                className="rounded bg-[#222] p-2"
                defaultValue=""
              >
                <option value="">Prijs</option>
                {priceOptions.map((price) => (
                  <option key={price} value={price}>
                    {`tot €${(price / 1000).toFixed(0)}.000,-`}
                  </option>
                ))}
              </select>



              {/*Dynamically fill from cars.ts*/}
              <select id="fuel" onChange={handleChange} className="rounded bg-[#222] p-2">
                <option value="">Brandstof</option>
                {[...new Set(allCars.map(car => car.fuel))].map((fuel) => (
                  <option key={fuel} value={fuel}>
                    {fuel.charAt(0).toUpperCase() + fuel.slice(1)} {/* Capitalize */}
                  </option>
                ))}
              </select>

              <input id="mileage" type="number" placeholder="Max. kilometerstand" onChange={handleChange} className="rounded bg-[#222] p-2" />
              
              
              <select id="transmission" onChange={handleChange} className="rounded bg-[#222] p-2">
                <option value="">Transmissie</option>
                <option value="manual">Handgeschakeld</option>
                <option value="automatic">Automaat</option>
              </select>
            </form>
          </section>
        )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filterCars.length === 0 ? (
          <p className="text-center col-span-full text-lg text-gray-400">
            Geen auto's gevonden die aan je filters voldoen.
          </p>
        ) : (
          filterCars.map((car) => (
            <article
              key={car.id}
              onClick={() => handleCardClick(car)}
              className="bg-[#111] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
            >
              <img
                src={car.image}
                alt={car.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold">{car.title}</h3>
                <p className="text-sm text-gray-400">{car.catch}</p>
                <p className="mt-2 text-sm">
                  <span className="block">Bouwjaar: {car.year}</span>
                  <span className="block">Brandstof: {car.fuel}</span>
                  <span className="block">
                    Kilometerstand: {car.mileage} km
                  </span>
                  <span className="block">Transmissie: {car.transmission}</span>
                  <span className="block">
                    Prijs: €{car.price.toLocaleString()}
                  </span>
                </p>
              </div>
            </article>
          ))
        )}
      </section>

      {/* Modal for selected car */}
      {selectedCar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
          onClick={handleCloseModal}
        >
          <div
            className="bg-[#111] max-w-2xl w-full mx-4 rounded-lg shadow-2xl p-6 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              &times;
            </button>
            <img
              src={selectedCar.image}
              alt={selectedCar.title}
              className="w-full h-64 object-cover rounded mb-4"
            />
            <h2 className="text-3xl font-bold">{selectedCar.title}</h2>
            <p className="text-sm text-gray-400">{selectedCar.catch}</p>
            
            <h3 className="text-xl font-semibold mt-6 mb-2 text-white">Omschrijving</h3>
            <p className="text-gray-300 leading-relaxed">{selectedCar.description}</p>
            
            <ul className="mt-4 space-y-1 text-sm">
              <li>Bouwjaar: {selectedCar.year}</li>
              <li>Brandstof: {selectedCar.fuel}</li>
              <li>Kilometerstand: {selectedCar.mileage} km</li>
              <li>Transmissie: {selectedCar.transmission}</li>
              <li className="font-semibold text-lg mt-2">
                Prijs: €{selectedCar.price.toLocaleString()}
              </li>
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
