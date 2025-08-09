"use client";

import { useEffect, useState } from "react";
import { useSwipeable } from "react-swipeable";

type Car = {
  title: string;
  catch: string;
  description: string;
  cover_image: string;
  additional_images?: string[];
  year: number;
  fuel: string;
  mileage: number;
  transmission: string;
  price: number;
};

export default function CarModal({
  car,
  onClose,
}: {
  car: Car;
  onClose: () => void;
}) {
  const images = [car.cover_image, ...(car.additional_images || [])];
  const [mainImage, setMainImage] = useState(images[0]);
  const [isMobile, setIsMobile] = useState(false);

  // Detect if on mobile screen
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Tailwind md breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentIndex = images.indexOf(mainImage);

  // Swipe handlers for mobile
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
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto
        ${isMobile ? "bg-black" : "bg-black bg-opacity-70"}`}
      onClick={onClose}
    >
      <div
        className={`bg-[#111] relative flex flex-col md:flex-row gap-6 shadow-2xl
          ${
            isMobile
              ? "w-full h-full m-0 rounded-none p-4 pt-12"
              : "max-w-5xl w-full max-h-[90vh] rounded-lg p-6 pt-10 pr-10"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`text-white text-3xl font-bold leading-none
            ${
              isMobile ? "fixed top-4 right-4 z-50" : "absolute top-4 right-4"
            }`}
          aria-label="Close modal"
        >
          &times;
        </button>

        {/* Main Image + Swipe for mobile */}
        <div className="flex-1 flex flex-col items-center">
          {isMobile ? (
            <div {...handlers} className="w-full select-none">
              <img
                src={mainImage}
                alt={`${car.title} image ${currentIndex + 1}`}
                className="w-full h-[300px] object-cover rounded"
              />
              <div className="flex justify-center mt-3 gap-2">
                {images.map((_, i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i === currentIndex ? "bg-white" : "bg-gray-500"
                    }`}
                  />
                ))}
              </div>
              <p className="mt-2 text-white text-center text-sm">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          ) : (
            <img
              src={mainImage}
              alt={car.title}
              className="w-full h-[400px] object-cover rounded"
            />
          )}
        </div>

        {/* Thumbnails on desktop */}
        {!isMobile && (
          <div className="flex flex-col gap-4 overflow-y-auto max-h-[400px] w-24">
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`${car.title} thumbnail ${index + 1}`}
                className={`w-full h-20 object-cover rounded cursor-pointer border-2 ${
                  mainImage === img ? "border-[#e76e7b]" : "border-transparent"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        )}

        {/* Details */}
        <div
          className={`text-white overflow-auto
            ${isMobile ? "mt-6" : "mt-0 md:ml-6 flex-1"}`}
        >
          <h2 className="text-3xl font-bold">{car.title}</h2>
          <p className="text-sm text-gray-400">{car.catch}</p>

          {car.description && (
            <>
              <h3 className="text-xl font-semibold mt-6 mb-2">Omschrijving</h3>
              <p className="text-gray-300 leading-relaxed">{car.description}</p>
            </>
          )}

          <ul className="mt-4 space-y-1 text-sm">
            <li>Bouwjaar: {car.year}</li>
            <li>Brandstof: {car.fuel}</li>
            <li>Kilometerstand: {car.mileage.toLocaleString()} km</li>
            <li>Transmissie: {car.transmission}</li>
            <li className="font-semibold text-lg mt-2">
              Prijs: €{car.price.toLocaleString()}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
