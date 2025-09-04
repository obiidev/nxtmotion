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
  // Use the URLs directly
  const images = [car.cover_image, ...(car.additional_images || [])];

  const [mainImage, setMainImage] = useState(images[0]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const currentIndex = images.indexOf(mainImage);

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "left") {
      setMainImage(currentIndex === images.length - 1 ? images[0] : images[currentIndex + 1]);
    } else {
      setMainImage(currentIndex === 0 ? images[images.length - 1] : images[currentIndex - 1]);
    }
  };

  const handlers = useSwipeable({
    onSwipedLeft: () => handleSwipe("left"),
    onSwipedRight: () => handleSwipe("right"),
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  const openImageFullscreen = (imgSrc: string) => {
    const imgElement = document.createElement("img");
    imgElement.src = imgSrc;
    imgElement.style.width = "100%";
    imgElement.style.height = "100%";
    imgElement.style.objectFit = "contain";
    imgElement.style.background = "black";

    const wrapper = document.createElement("div");
    wrapper.style.width = "100%";
    wrapper.style.height = "100%";
    wrapper.style.display = "flex";
    wrapper.style.alignItems = "center";
    wrapper.style.justifyContent = "center";
    wrapper.style.background = "black";
    wrapper.style.position = "relative";
    wrapper.appendChild(imgElement);

    const closeButton = document.createElement("button");
    closeButton.innerHTML = "&times;";
    closeButton.style.position = "absolute";
    closeButton.style.top = "20px";
    closeButton.style.right = "20px";
    closeButton.style.fontSize = "40px";
    closeButton.style.color = "white";
    closeButton.style.background = "transparent";
    closeButton.style.border = "none";
    closeButton.style.cursor = "pointer";
    closeButton.style.zIndex = "9999";

    closeButton.onclick = () => {
      if (document.fullscreenElement) document.exitFullscreen();
      wrapper.remove();
    };

    wrapper.appendChild(closeButton);
    document.body.appendChild(wrapper);

    if (wrapper.requestFullscreen) wrapper.requestFullscreen();
    else if ((wrapper as any).webkitRequestFullscreen) (wrapper as any).webkitRequestFullscreen();
    else if ((wrapper as any).msRequestFullscreen) (wrapper as any).msRequestFullscreen();

    const exitHandler = () => {
      if (!document.fullscreenElement) {
        wrapper.remove();
        document.removeEventListener("fullscreenchange", exitHandler);
      }
    };
    document.addEventListener("fullscreenchange", exitHandler);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 overflow-auto
        ${isMobile ? "bg-black" : "bg-black bg-opacity-70"}`}
      onClick={onClose}
    >
      <div
        className={`bg-[#111] relative shadow-2xl
          ${
            isMobile
              ? "w-full h-full m-0 rounded-none overflow-y-auto"
              : "max-w-5xl w-full max-h-[90vh] rounded-lg p-6 pt-10 pr-10 flex flex-row gap-6"
          }`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className={`text-white text-3xl font-bold leading-none
            ${isMobile ? "fixed top-4 right-4 z-50" : "absolute top-4 right-4"}`}
          aria-label="Close modal"
        >
          &times;
        </button>

        {isMobile ? (
          <div className="w-full relative">
            <div {...handlers} className="w-full select-none relative">
              <img
                src={mainImage}
                alt={`${car.title} image ${currentIndex + 1}`}
                className="w-full h-[300px] object-cover cursor-pointer"
              />

              {/* Swipe buttons and dots remain unchanged */}
              {/* ... */}
            </div>

            {/* Info section */}
            <div className="p-4 text-white">
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
                <li className="font-semibold text-lg mt-2">Prijs: €{car.price.toLocaleString()}</li>
              </ul>
            </div>
          </div>
        ) : (
          <>
            {/* Desktop layout */}
            <div className="flex-1 flex flex-col items-center">
              <img
                src={mainImage}
                alt={car.title}
                className="w-full h-[400px] object-cover rounded cursor-pointer"
                onClick={() => openImageFullscreen(mainImage)}
              />
            </div>

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

            <div className="mt-0 md:ml-6 flex-1 text-white overflow-auto">
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
                <li className="font-semibold text-lg mt-2">Prijs: €{car.price.toLocaleString()}</li>
              </ul>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
