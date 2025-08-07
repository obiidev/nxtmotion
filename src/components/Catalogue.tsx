"use client";

import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";
import allCars from "@/data/cars.json";

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

// --- Components ---

function FilterPanel({
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

function CarCard({
  car,
  onClick,
}: {
  car: (typeof allCars)[0];
  onClick: (car: (typeof allCars)[0]) => void;
}) {
  return (
    <article
      onClick={() => onClick(car)}
      className="bg-[#111] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <img
        src={car.cover_image}
        alt={car.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold">{car.title}</h3>
        <p className="text-sm text-gray-400">{car.catch}</p>
        <p className="mt-2 text-sm">
          <span className="block">Bouwjaar: {car.year}</span>
          <span className="block">Brandstof: {car.fuel}</span>
          <span className="block">Kilometerstand: {car.mileage} km</span>
          <span className="block">Transmissie: {car.transmission}</span>
          <span className="block">Prijs: €{car.price.toLocaleString()}</span>
        </p>
      </div>
    </article>
  );
}

function CarModal({
  car,
  mainImage,
  setMainImage,
  onClose,
}: {
  car: (typeof allCars)[0];
  mainImage: string;
  setMainImage: (img: string) => void;
  onClose: () => void;
}) {
  const images = [car.cover_image, ...(car.additional_images || [])];
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Swipe logic
  const currentIndex = images.indexOf(mainImage);
  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left" && currentIndex < images.length - 1) {
      setMainImage(images[currentIndex + 1]);
    } else if (direction === "right" && currentIndex > 0) {
      setMainImage(images[currentIndex - 1]);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-[#111] max-w-5xl w-full max-h-[90vh] overflow-y-auto mx-4 rounded-lg shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white text-2xl"
        >
          &times;
        </button>

        {/* Images */}
        <div className="flex flex-col md:flex-row gap-6 mb-6 mt-8">
          <div className="flex-1">
            {isMobile ? (
              <div {...handlers}>
                <img
                  src={mainImage}
                  alt={car.title}
                  className="w-full h-[300px] object-cover rounded"
                />
                <div className="flex justify-between text-white mt-2 text-sm px-2">
                  <span>
                    {currentIndex + 1} / {images.length}
                  </span>
                  <span>{car.title}</span>
                </div>
              </div>
            ) : (
              <img
                src={mainImage}
                alt={car.title}
                className="w-full h-[400px] object-cover rounded"
              />
            )}
          </div>

          {/* Thumbnails (only desktop) */}
          {!isMobile && (
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px] w-24">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${car.title} thumbnail ${index + 1}`}
                  className={`w-full h-20 object-cover rounded cursor-pointer border-2 ${
                    mainImage === img
                      ? "border-[#e76e7b]"
                      : "border-transparent"
                  }`}
                  onClick={() => setMainImage(img)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <h2 className="text-3xl font-bold">{car.title}</h2>
        <p className="text-sm text-gray-400">{car.catch}</p>

        <h3 className="text-xl font-semibold mt-6 mb-2 text-white">
          Omschrijving
        </h3>
        <p className="text-gray-300 leading-relaxed">{car.description}</p>

        <ul className="mt-4 space-y-1 text-sm">
          <li>Bouwjaar: {car.year}</li>
          <li>Brandstof: {car.fuel}</li>
          <li>Kilometerstand: {car.mileage} km</li>
          <li>Transmissie: {car.transmission}</li>
          <li className="font-semibold text-lg mt-2">
            Prijs: €{car.price.toLocaleString()}
          </li>
        </ul>
      </div>
    </div>
  );
}

// --- Main Component ---

export default function Catalogue() {
  // State
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

  // Price options setup
  const prices = allCars.map((car) => car.price);
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const roundedMin = roundToNearest(minPrice, 1000);
  const roundedMax = roundToNearest(maxPrice, 1000);

  const increment = 5000;
  const priceOptions = [];
  for (
    let price = increment;
    price <= roundedMax + increment;
    price += increment
  ) {
    if (price >= roundedMin) priceOptions.push(price);
  }

  // Filtered cars
  const filteredCars = filterCars(allCars, filters);

  // Handlers
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
        <CarModal
          car={selectedCar}
          mainImage={mainImage}
          setMainImage={setMainImage}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
