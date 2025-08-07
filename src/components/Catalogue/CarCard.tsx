import allCars from "@/data/cars.json";

export default function CarCard({
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
