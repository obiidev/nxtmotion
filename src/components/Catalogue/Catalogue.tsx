"use client";

import { useEffect, useState } from "react";
import FilterPanel from "@/components/Catalogue/FilterPanel";
import CarCard from "@/components/Catalogue/CarCard";
import CarModal from "@/components/Catalogue/CarModal";
import { Car } from "@/types/car";

const roundToNearest = (num: number, nearest: number) =>
  Math.ceil(num / nearest) * nearest;

export default function Catalogue() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [filters, setFilters] = useState({
    make: "",
    year: "",
    fuel: "",
    mileage: "",
    transmission: "",
    priceRange: "",
  });

  const [showFilter, setShowFilter] = useState(false);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

  // --- Fetch cars dynamically from API ---
  useEffect(() => {
    async function fetchCars() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/cars", {
          headers: { "x-api-key": API_KEY },
          cache: "no-store",
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data: Car[] = await res.json();
        setCars(data);
      } catch (err: any) {
        setError(err.message || "Failed to load cars");
      } finally {
        setLoading(false);
      }
    }
    fetchCars();
  }, []);

  // --- Filtering logic ---
  const filteredCars = cars.filter((car) => {
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
      if (!isNaN(maxPrice)) matchesPrice = car.price <= maxPrice;
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

  // --- Price options for filter ---
  const prices = cars.map((car) => car.price);
  const roundedMin = prices.length
    ? roundToNearest(Math.min(...prices), 1000)
    : 0;
  const roundedMax = prices.length
    ? roundToNearest(Math.max(...prices), 1000)
    : 0;

  const increment = 5000;
  const priceOptions: number[] = [];
  for (
    let price = increment;
    price <= roundedMax + increment;
    price += increment
  ) {
    if (price >= roundedMin) priceOptions.push(price);
  }

  // --- Handlers ---
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFilters({ ...filters, [e.target.id]: e.target.value });
  };

  const handleCardClick = (car: Car) => {
    setSelectedCar(car);
  };

  const handleCloseModal = () => {
    setSelectedCar(null);
  };

  // --- UI States ---
  if (loading)
    return <p className="text-center text-gray-300">Loading cars...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

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

      {selectedCar && <CarModal car={selectedCar} onClose={handleCloseModal} />}
    </div>
  );
}
