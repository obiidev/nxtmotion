"use client";

// --- Imports ---
import { useEffect, useState, useRef } from "react";
import allCars from "@/data/cars.json";
import FilterPanel from "@/components/Catalogue/FilterPanel";
import CarCard from "@/components/Catalogue/CarCard";
import CarModalAlt from "@/components/Catalogue/CarModalAlt";

// --- Utility functions ---
const roundToNearest = (num: number, nearest: number) =>
  Math.ceil(num / nearest) * nearest;

// --- Filter function ---
function filterCars(
  cars: typeof allCars,
  filters: {
    make: string;
    year: string;
    fuel: string;
    mileage: string;
    transmission: string;
    priceRange: string;
  }
) {
  const { make, year, fuel, mileage, transmission, priceRange } = filters;

  return cars.filter((car) => {
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
}

// --- Main Catalogue Page ---
export default function Catalogue() {
  const [showFilter, setShowFilter] = useState(false);
  const [selectedCar, setSelectedCar] = useState<(typeof allCars)[0] | null>(
    null
  );
  const [filters, setFilters] = useState({
    make: "",
    year: "",
    fuel: "",
    mileage: "",
    transmission: "",
    priceRange: "",
  });

  const prices = allCars.map((car) => car.price);
  const roundedMin = roundToNearest(Math.min(...prices), 1000);
  const roundedMax = roundToNearest(Math.max(...prices), 1000);
  const increment = 5000;
  const priceOptions = [];
  for (
    let price = increment;
    price <= roundedMax + increment;
    price += increment
  ) {
    if (price >= roundedMin) priceOptions.push(price);
  }

  const filteredCars = filterCars(allCars, filters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const [mainImage, setMainImage] = useState<string>("");

  const handleCardClick = (car: (typeof allCars)[0]) => {
    setSelectedCar(car);
    setMainImage(car.cover_image);
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
      </button>

      {showFilter && (
        <FilterPanel
          filters={filters}
          onChange={handleChange}
          priceOptions={priceOptions}
        />
      )}

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCars.length === 0 ? (
          <p className="text-center col-span-full text-lg text-gray-400">
            Geen auto's gevonden die aan je filters voldoen.
          </p>
        ) : (
          filteredCars.map((car) => (
            <CarCard key={car.id} car={car} onClick={handleCardClick} />
          ))
        )}
      </section>

      {selectedCar && (
        <CarModalAlt car={selectedCar} onClose={handleCloseModal} />
      )}
    </div>
  );
}
