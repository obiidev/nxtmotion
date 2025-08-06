"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Car {
  id: number;
  title: string;
  catch: string; // <-- new field
  description: string;
  image: string;
  make: string;
  year: number;
  fuel: string;
  mileage: number;
  transmission: string;
  price: number;
}


export default function CatalogueManager() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showForm, setShowForm] = useState(false);
  const [editingCarId, setEditingCarId] = useState<number | null>(null);
  const [formState, setFormState] = useState({
    title: "",
    catch: "",
    description: "",
    image: null as File | null,
    make: "",
    year: "",
    fuel: "",
    mileage: "",
    transmission: "",
    price: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY || "";

  async function fetchCars() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/cars", {
        headers: {
          "x-api-key": API_KEY,
        },
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      setCars(data);
    } catch (err: any) {
      setError(err.message || "Failed to fetch cars");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCars();
  }, []);

  function handleInputChange(
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files ? e.target.files[0] : null;
    setFormState((prev) => ({ ...prev, image: file }));
  }

function handleEditClick(car: Car) {
  setEditingCarId(car.id);
  setFormState({
    title: car.title,
    catch: car.catch, // <-- added
    description: car.description, // description is now always empty
    image: null,
    make: car.make,
    year: car.year.toString(),
    fuel: car.fuel,
    mileage: car.mileage.toString(),
    transmission: car.transmission,
    price: car.price.toString(),
  });
  setShowForm(true);
}


  // Delete car by id
  async function handleDeleteClick(id: number) {
    if (!confirm("Are you sure you want to delete this car?")) return;

    try {
      const res = await fetch(`/api/cars?id=${id}`, {  // <-- changed here
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || `Delete failed with status ${res.status}`);
      }
      // Refresh list after deletion
      fetchCars();
    } catch (err: any) {
      alert(`Failed to delete car: ${err.message}`);
    }
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setSubmitError(null);

    try {
      const formData = new FormData();
      formData.append("title", formState.title);
      formData.append("catch", formState.catch);
      formData.append("description", formState.description); // intentionally empty
      if (formState.image) formData.append("image", formState.image);
      formData.append("make", formState.make);
      formData.append("year", formState.year);
      formData.append("fuel", formState.fuel);
      formData.append("mileage", formState.mileage);
      formData.append("transmission", formState.transmission);
      formData.append("price", formState.price);

      let res;
      if (editingCarId) {
        // Include id in formData for PUT (your API expects id inside body)
        formData.append("id", editingCarId.toString());

        // Update existing car (PUT)
        res = await fetch(`/api/cars`, {   // <-- changed here (no id in URL)
          method: "PUT",
          headers: {
            "x-api-key": API_KEY,
            // DO NOT set Content-Type manually when sending FormData
          },
          body: formData,
        });
      } else {
        // Add new car (POST)
        res = await fetch("/api/cars", {
          method: "POST",
          headers: {
            "x-api-key": API_KEY,
            // DO NOT set Content-Type manually when sending FormData
          },
          body: formData,
        });
      }

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.message || `Error: ${res.status}`);
      }

      setFormState({
        title: "",
        catch: "",
        description: "",
        image: null,
        make: "",
        year: "",
        fuel: "",
        mileage: "",
        transmission: "",
        price: "",
      });
      setEditingCarId(null);
      setShowForm(false);
      fetchCars();
    } catch (err: any) {
      setSubmitError(err.message || "Failed to submit car");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="text-white">Loading cars...</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="overflow-x-auto bg-[#111] rounded-lg p-6 shadow relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold text-white">Auto-overzicht</h2>
        <button
          className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
          onClick={() => {
            setShowForm(true);
            setEditingCarId(null);
            setFormState({
              title: "",
              catch: "",
              description: "",
              image: null,
              make: "",
              year: "",
              fuel: "",
              mileage: "",
              transmission: "",
              price: "",
            });
          }}
          aria-label="Add new car"
        >
          + Add Car
        </button>
      </div>

      {/* Modal for Add/Edit Car */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-20 z-50">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded shadow max-w-lg w-full text-white space-y-4"
          >
            <h3 className="text-xl font-semibold mb-2">
              {editingCarId ? "Edit Car" : "Add New Car"}
            </h3>

            <input
              required
              name="title"
              value={formState.title}
              onChange={handleInputChange}
              placeholder="Title"
              className="w-full p-2 rounded bg-gray-800"
            />
            <textarea
              name="catch"
              value={(formState as any).catch || ""}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, catch: e.target.value }))
              }
              placeholder="Short catch / summary"
              rows={3}
              className="w-full p-2 rounded bg-gray-800"
            />
            <textarea
              name="description"
              value={(formState as any).description || ""}
              onChange={(e) =>
                setFormState((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="car origin / additional information"
              rows={3}
              className="w-full p-2 rounded bg-gray-800"
            />
            <select
              required
              name="make"
              value={formState.make}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-800"
            >
              <option value="">Select Make</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
              <option value="BMW">BMW</option>
            </select>
            <input
              required
              type="number"
              name="year"
              value={formState.year}
              onChange={handleInputChange}
              placeholder="Year"
              className="w-full p-2 rounded bg-gray-800"
            />
            <select
              required
              name="fuel"
              value={formState.fuel}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-800 capitalize"
            >
              <option value="">Select Fuel</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <input
              required
              type="number"
              name="mileage"
              value={formState.mileage}
              onChange={handleInputChange}
              placeholder="Mileage (km)"
              className="w-full p-2 rounded bg-gray-800"
            />
            <select
              required
              name="transmission"
              value={formState.transmission}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-gray-800"
            >
              <option value="">Select Transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>
            <input
              // image is required only if adding new car, optional if editing
              required={!editingCarId}
              type="file"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full text-white"
            />

            {submitError && <p className="text-red-500">{submitError}</p>}

            <div className="flex justify-end space-x-3 mt-4">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCarId(null);
                  setSubmitError(null);
                }}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md"
                disabled={submitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-rose-500 text-white rounded hover:bg-rose-600"
                disabled={submitting}
              >
                {submitting
                  ? editingCarId
                    ? "Updating..."
                    : "Adding..."
                  : editingCarId
                  ? "Update Car"
                  : "Add Car"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Cars Table */}
      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase text-gray-400 border-b border-gray-600">
          <tr>
            <th scope="col" className="px-4 py-3">
              Afbeelding
            </th>
            <th scope="col" className="px-4 py-3">
              Titel
            </th>
            <th scope="col" className="px-4 py-3">
              Catch
            </th>
            <th scope="col" className="px-4 py-3">
              Description
            </th>
            <th scope="col" className="px-4 py-3">
              Merk
            </th>
            <th scope="col" className="px-4 py-3">
              Bouwjaar
            </th>
            <th scope="col" className="px-4 py-3">
              Brandstof
            </th>
            <th scope="col" className="px-4 py-3">
              KM
            </th>
            <th scope="col" className="px-4 py-3">
              Transmissie
            </th>
            <th scope="col" className="px-4 py-3">
              Prijs
            </th>
            <th scope="col" className="px-4 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr
              key={car.id}
              className="border-b border-gray-800 hover:bg-[#222]"
            >
              <td className="px-4 py-2">
                <img
                  src={car.image}
                  alt={car.title}
                  className="w-20 h-auto rounded"
                />
              </td>
              <td className="px-4 py-2">{car.title}</td>
              <td className="px-4 py-2">{car.catch}</td>
              <td className="px-4 py-2">{car.description}</td>
              <td className="px-4 py-2">{car.make}</td>
              <td className="px-4 py-2">{car.year}</td>
              <td className="px-4 py-2 capitalize">{car.fuel}</td>
              <td className="px-4 py-2">{car.mileage.toLocaleString()} km</td>
              <td className="px-4 py-2">{car.transmission}</td>
              <td className="px-4 py-2">€{car.price.toLocaleString()}</td>
              <td className="px-4 py-2 space-x-2">
                {/* Edit (pencil) button */}
                <button
                  onClick={() => handleEditClick(car)}
                  aria-label={`Edit ${car.title}`}
                  className="text-blue-400 hover:text-blue-600"
                  title="Edit"
                >
                  ✏️
                </button>
                {/* Delete (trash bin) button */}
                <button
                  onClick={() => handleDeleteClick(car.id)}
                  aria-label={`Delete ${car.title}`}
                  className="text-red-500 hover:text-red-700"
                  title="Delete"
                >
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
