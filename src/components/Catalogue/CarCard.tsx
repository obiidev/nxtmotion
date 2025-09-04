import { useEffect, useState } from "react";
import { Car } from "@/types/car";

interface CarCardProps {
  car: Car;
  onClick: (car: Car) => void;
}

export default function CarCard({ car, onClick }: CarCardProps) {
  const [imageUrl, setImageUrl] = useState(car.cover_image);

  // Update imageUrl if car.cover_image changes (optional, for hot reloads)
  useEffect(() => {
    setImageUrl(car.cover_image);
  }, [car.cover_image]);

  return (
    <article
      onClick={() => onClick(car)}
      className="bg-[#111] rounded-lg shadow-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
    >
      <img
        key={imageUrl} // forces React to remount only when URL changes
        src={imageUrl} // <-- now uses /api/cars2
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
