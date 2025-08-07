"use client";

import allCars from "@/data/cars.json";

const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

// --- Utility functions ---

const roundToNearest = (num: number, nearest: number) =>
  Math.ceil(num / nearest) * nearest;

// --- FilterCars function ---

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

export default function FilterPanel({
  filters,
  onChange,
  priceOptions,
}: {
  filters: any;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  priceOptions: number[];
}) {
  return (
    <section className="mb-12 p-6 bg-[#111] rounded-lg shadow-lg">
      <h2 className="text-2xl mb-4 font-semibold">Filter auto's</h2>
      <form className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {/* Make */}
        <select
          id="make"
          onChange={onChange}
          value={filters.make}
          className="rounded bg-[#222] p-2"
        >
          <option value="">Merk</option>
          {[...new Set(allCars.map((car) => car.make))].map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>

        {/* Year */}
        <select
          id="year"
          onChange={onChange}
          value={filters.year}
          className="rounded bg-[#222] p-2"
        >
          <option value="">Bouwjaar</option>
          {Array.from(
            {
              length:
                Math.max(...allCars.map((car) => car.year)) -
                Math.min(...allCars.map((car) => car.year)) +
                1,
            },
            (_, i) => {
              const year = Math.min(...allCars.map((car) => car.year)) + i;
              return (
                <option key={year} value={year}>
                  Vanaf {year}
                </option>
              );
            }
          )
            .reverse()
            .map((option) => option)}
        </select>

        {/* Price Range */}
        <select
          id="priceRange"
          onChange={onChange}
          value={filters.priceRange}
          className="rounded bg-[#222] p-2"
        >
          <option value="">Prijs</option>
          {priceOptions.map((price) => (
            <option key={price} value={price}>
              {`tot €${(price / 1000).toFixed(0)}.000,-`}
            </option>
          ))}
        </select>

        {/* Fuel */}
        <select
          id="fuel"
          onChange={onChange}
          value={filters.fuel}
          className="rounded bg-[#222] p-2"
        >
          <option value="">Brandstof</option>
          {[...new Set(allCars.map((car) => car.fuel))].map((fuel) => (
            <option key={fuel} value={fuel}>
              {fuel.charAt(0).toUpperCase() + fuel.slice(1)} {/* Capitalize */}
            </option>
          ))}
        </select>

        {/* Mileage */}
        <input
          id="mileage"
          type="number"
          placeholder="Max. kilometerstand"
          onChange={onChange}
          value={filters.mileage}
          className="rounded bg-[#222] p-2"
        />

        {/* Transmission */}
        <select
          id="transmission"
          onChange={onChange}
          value={filters.transmission}
          className="rounded bg-[#222] p-2"
        >
          <option value="">Transmissie</option>
          <option value="manual">Handgeschakeld</option>
          <option value="automatic">Automaat</option>
        </select>
      </form>
    </section>
  );
}
