import { useState, useEffect } from "react";
import axios from "axios";

const api = axios.create({ baseURL: "http://127.0.0.1:8000/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("adminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = "application/json";
  return config;
});

const AddBarber = () => {
  const [form, setForm] = useState({
    name: "",
    bio: "",
    phone: "",
    image: null,
    image_url: "",
    services: [],
  });
  const [services, setServices] = useState([]);
  const [msg, setMsg] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await api.get("/services");
        setServices(response.data);
      } catch (err) {
        setMsg({ type: "error", text: "Error fetching services." });
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    if (name === "services") {
      if (checked) {
        setForm((prevForm) => ({
          ...prevForm,
          services: [...prevForm.services, value],
        }));
      } else {
        setForm((prevForm) => ({
          ...prevForm,
          services: prevForm.services.filter((service) => service !== value),
        }));
      }
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const resetForm = () => {
    setForm({
      name: "",
      bio: "",
      phone: "",
      image: null,
      image_url: "",
      services: [],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg({ type: "", text: "" });
    setLoading(true);

    if (!Array.isArray(form.services) || form.services.length === 0) {
      setMsg({ type: "error", text: "Please select at least one service." });
      setLoading(false);
      return;
    }

    if (form.image_url.trim() && form.image) {
      setMsg({ type: "error", text: "Please provide either an image URL or an image file, not both." });
      setLoading(false);
      return;
    }

    try {
      const postData = {
        name: form.name,
        bio: form.bio,
        phone: form.phone,
        image_url: form.image_url.trim() || null,
        services: form.services,
      };

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("bio", form.bio);
      formData.append("phone", form.phone);
      formData.append("services", JSON.stringify(form.services));

      if (form.image_url.trim()) {
        formData.append("image_url", form.image_url.trim());
      } else if (form.image) {
        formData.append("image", form.image);
      }

      await api.post("/barbers", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMsg({ type: "success", text: "Barber added successfully!" });
      resetForm();
    } catch (err) {
      setMsg({ type: "error", text: err.response?.data?.message || "Error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-lg mt-8">
      <h2 className="text-3xl font-semibold text-center text-yellow-500 mb-6">
        Add a New Barber
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
            Barber Name
          </label>
          <input
            name="name"
            placeholder="Enter barber's name"
            value={form.name}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="bio">
            Bio
          </label>
          <textarea
            name="bio"
            placeholder="Enter barber's bio"
            value={form.bio}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700" htmlFor="phone">
            Phone (optional)
          </label>
          <input
            name="phone"
            placeholder="Enter barber's phone number"
            value={form.phone}
            onChange={handleChange}
            className="w-full mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700" htmlFor="services">
              Select Services
            </label>
            {services.map((service) => (
              <div key={service.id} className="flex items-center">
                <input
                  type="checkbox"
                  name="services"
                  value={service.id}
                  checked={form.services.includes(service.id.toString())}
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-gray-700">{service.name}</label>
              </div>
            ))}
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
          {loading ? "Adding..." : "Add Barber"}
        </button>
      </form>
    </div>
  );
};

export default AddBarber;