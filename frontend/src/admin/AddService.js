import { useState } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";
  return config;
});

const AddService = () => {
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    duration: "",
    image: null,
    image_url: "",
  });
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, image: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

   
    if (form.price <= 0 || form.duration <= 0) {
      setMsg({ type: "error", text: "Please provide valid price and duration." });
      setLoading(false);
      return;
    }

    if (form.image_url.trim() && form.image) {
      setMsg({ type: "error", text: "Please provide either an image URL or an image file, not both." });
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", parseFloat(form.price));
      formData.append("duration", parseInt(form.duration, 10));

      if (form.image_url.trim()) {
        formData.append("image_url", form.image_url.trim());
      } else if (form.image) {
        formData.append("image", form.image);
      }

      const response = await api.post("/services", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg({ type: "success", text: "Service added successfully!" });
      resetForm();
    } catch (err) {
      handleError(err);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      description: "",
      price: "",
      duration: "",
      image: null,
      image_url: "",
    });
  };

  const handleError = (err) => {
    const message =
      err.response?.data?.message || "Unauthenticated or network error";
    setMsg({ type: "error", text: message });
    console.error(err);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-center text-yellow-500 mb-6">
        Add a New Service
      </h2>

      {msg.text && (
        <div
          className={`text-center p-3 rounded-lg mb-4 ${msg.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
        >
          {msg.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="name">
            Service Name
          </label>
          <input
            name="name"
            placeholder="Enter service name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Enter service description"
            value={form.description}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="price">
              Price
            </label>
            <input
              type="number"
              step="0.01"
              name="price"
              placeholder="Enter price"
              value={form.price}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="duration">
              Duration (minutes)
            </label>
            <input
              type="number"
              name="duration"
              placeholder="Enter duration"
              value={form.duration}
              onChange={handleChange}
              className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="image_url">
            Image URL (optional)
          </label>
          <input
            type="url"
            name="image_url"
            placeholder="Or paste image URL here"
            value={form.image_url}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="image">
            Upload Image (optional)
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 mt-6 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
        >
          {loading ? "Adding..." : "Add Service"}
        </button>
      </form>
    </div>
  );
};

export default AddService;