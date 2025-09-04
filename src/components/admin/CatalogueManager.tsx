"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";

interface Car {
  _id: number;
  title: string;
  catch: string;
  description: string;
  cover_image: string;
  additional_images?: string[];
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
    cover_image: null as File | null,
    additional_images: [] as File[],
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
      if (!res.ok) throw new Error(`API error: ${res.status}`);
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
    setFormState((prev) => ({ ...prev, cover_image: file }));
  }

  function handleAdditionalImagesChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setFormState((prev) => ({ ...prev, additional_images: files }));
  }

  function handleEditClick(car: Car) {
    setEditingCarId(car._id);
    setFormState({
      title: car.title,
      catch: car.catch,
      description: car.description,
      cover_image: null,
      additional_images: [],
      make: car.make,
      year: car.year.toString(),
      fuel: car.fuel,
      mileage: car.mileage.toString(),
      transmission: car.transmission,
      price: car.price.toString(),
    });
    setShowForm(true);
  }

  async function handleDeleteClick(id: number) {
    if (!confirm("Are you sure you want to delete this car?")) return;
    try {
      const res = await fetch(`/api/cars?id=${id}`, {
        method: "DELETE",
        headers: {
          "x-api-key": API_KEY,
        },
      });
      if (!res.ok) throw new Error("Failed to delete");
      fetchCars();
    } catch (err: any) {
      alert(err.message);
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
      formData.append("description", formState.description);
      formData.append("make", formState.make);
      formData.append("year", formState.year);
      formData.append("fuel", formState.fuel);
      formData.append("mileage", formState.mileage);
      formData.append("transmission", formState.transmission);
      formData.append("price", formState.price);

      if (formState.cover_image) {
        formData.append("cover_image", formState.cover_image);
      }

      formState.additional_images.forEach((file, i) =>
        formData.append(`additional_images`, file)
      );

      if (editingCarId) {
        formData.append("id", editingCarId.toString());
        await fetch(`/api/cars`, {
          method: "PUT",
          headers: { "x-api-key": API_KEY },
          body: formData,
        });
      } else {
        await fetch(`/api/cars`, {
          method: "POST",
          headers: { "x-api-key": API_KEY },
          body: formData,
        });
      }

      setFormState({
        title: "",
        catch: "",
        description: "",
        cover_image: null,
        additional_images: [],
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
      setSubmitError(err.message);
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
              cover_image: null,
              additional_images: [],
              make: "",
              year: "",
              fuel: "",
              mileage: "",
              transmission: "",
              price: "",
            });
          }}
        >
          + Add Car
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-start pt-20 z-50 overflow-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-gray-900 p-6 rounded shadow max-w-lg w-full text-white space-y-4 mb-20"
          >
            <h3 className="text-xl font-semibold mb-2">
              {editingCarId ? "Edit Car" : "Add New Car"}
            </h3>
            <input
              name="title"
              value={formState.title}
              onChange={handleInputChange}
              required
              placeholder="Title"
              className="w-full p-2 rounded bg-gray-800"
            />
            <textarea
              name="catch"
              value={formState.catch}
              onChange={handleInputChange}
              placeholder="Catch"
              className="w-full p-2 rounded bg-gray-800"
            />
            <textarea
              name="description"
              value={formState.description}
              onChange={handleInputChange}
              placeholder="Description"
              className="w-full p-2 rounded bg-gray-800"
            />
            <select
              name="make"
              value={formState.make}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-800"
            >
              <option value="">Select Make</option>
              <option value="Volkswagen">Volkswagen</option>
              <option value="BMW">BMW</option>
              <option value="Mercedes-Benz">Mercedes-Benz</option>
            </select>
            <input
              type="number"
              name="year"
              value={formState.year}
              onChange={handleInputChange}
              placeholder="Year"
              required
              className="w-full p-2 rounded bg-gray-800"
            />
            <select
              name="fuel"
              value={formState.fuel}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-800 capitalize"
            >
              <option value="">Select Fuel</option>
              <option value="diesel">Diesel</option>
              <option value="petrol">Petrol</option>
              <option value="electric">Electric</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <input
              type="number"
              name="mileage"
              value={formState.mileage}
              onChange={handleInputChange}
              placeholder="Mileage"
              required
              className="w-full p-2 rounded bg-gray-800"
            />
            <select
              name="transmission"
              value={formState.transmission}
              onChange={handleInputChange}
              required
              className="w-full p-2 rounded bg-gray-800"
            >
              <option value="">Select Transmission</option>
              <option value="automatic">Automatic</option>
              <option value="manual">Manual</option>
            </select>

            <input
              type="number"
              name="price"
              value={formState.price}
              onChange={handleInputChange}
              placeholder="Price"
              required
              className="w-full p-2 rounded bg-gray-800"
            />

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!editingCarId}
              className="text-white"
            />

            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleAdditionalImagesChange}
              className="text-white"
            />

            {submitError && <p className="text-red-500">{submitError}</p>}

            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingCarId(null);
                }}
                className="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="bg-rose-500 hover:bg-rose-600 px-4 py-2 rounded"
              >
                {submitting
                  ? editingCarId
                    ? "Updating..."
                    : "Adding..."
                  : editingCarId
                  ? "Update"
                  : "Add"}
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="w-full text-sm text-left text-gray-300">
        <thead className="text-xs uppercase text-gray-400 border-b border-gray-600">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Title</th>
            <th className="px-4 py-3">Catch</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Make</th>
            <th className="px-4 py-3">Year</th>
            <th className="px-4 py-3">Fuel</th>
            <th className="px-4 py-3">Mileage</th>
            <th className="px-4 py-3">Transmission</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr
              key={car._id}
              className="border-b border-gray-800 hover:bg-[#222]"
            >
              <td className="px-4 py-2">
                <img
                  src={car.cover_image}
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
                <button
                  onClick={() => handleEditClick(car)}
                  className="text-blue-400 hover:text-blue-600"
                >
                  ✏️
                </button>
                <button
                  onClick={() => handleDeleteClick(car._id)} // If i change this to _id the code works, but i do get a red squiggly line and get an error because car doesnt have _id?
                  className="text-red-500 hover:text-red-700"
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
