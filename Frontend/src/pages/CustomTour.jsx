import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const CustomTour = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    travelDates: "",
    duration: "",
    interests: "",
    budget: "",
    groupSize: "",
    specialRequests: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\+?[0-9\s\-\(\)]{10,20}$/.test(formData.phone)) {
      newErrors.phone = "Please enter a valid phone number";
    }

    // Travel dates validation
    if (!formData.travelDates.trim()) {
      newErrors.travelDates = "Travel dates are required";
    }

    // Duration validation
    if (!formData.duration) {
      newErrors.duration = "Please select a trip duration";
    }

    // Budget validation
    if (!formData.budget) {
      newErrors.budget = "Please select a budget range";
    }

    // Group size validation
    if (!formData.groupSize) {
      newErrors.groupSize = "Please select group size";
    }

    // Interests validation
    if (!formData.interests.trim()) {
      newErrors.interests = "Please tell us about your interests";
    } else if (formData.interests.trim().length < 10) {
      newErrors.interests =
        "Please provide more details about your interests (at least 10 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        // 1. Send to backend
        const response = await fetch("http://localhost:5000/custom-tour", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to submit request");
        }

        // 2. EMAILJS SEND (ADMIN NOTIFICATION)
        const emailParams = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          travelDates: formData.travelDates,
          duration: formData.duration,
          interests: formData.interests,
          budget: formData.budget,
          groupSize: formData.groupSize,
          specialRequests: formData.specialRequests,
        };
        // 2. EMAILJS SEND (ADMIN NOTIFICATION)
        const emailTemplateParams = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,

          travel_dates: formData.travelDates,
          trip_duration: formData.duration,
          budget: formData.budget,
          group_size: formData.groupSize,

          interests: formData.interests,
          special_requests: formData.specialRequests,

          submitted_at: new Date().toLocaleString(),
        };

        await emailjs.send(
          "service_ixwmqt5",
          "template_rwyii24",
          emailTemplateParams,
          "-MTJEE6Jjw5sZMNmw",
        );

        // toast.success("Thank you! Our team will contact you soon.")
        toast.success("Thank you! Our team will contact you soon!", {
          position: "top-center",
          autoClose: 5000,
          style: {
            background: "#facc15",
            color: "#000000",
            fontWeight: "bold",
            fontSize: "16px",
          },
          icon: "✅",
        });
        setTimeout(() => {
          navigate("/packages");
        }, 2000);
      } catch (error) {
        alert("Error: " + error.message);
      }
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-fixed py-20 px-6 relative"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/b8/84/77/b88477506f62b11719eee4f66a23087c.jpg')",
      }}
    >
      <ToastContainer />
      <div className="absolute inset-0 bg-black/80"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Create Your <span className="text-yellow-500">Custom</span> Sri
            Lankan Adventure
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Don't see exactly what you're looking for? Let us create a
            personalized Sri Lankan adventure tailored to your specific
            interests, budget, and schedule.
          </p>
        </div>

        <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-8 shadow-xl border border-gray-700/50">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full bg-gray-700/50 border ${errors.name ? "border-red-500" : "border-gray-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm`}
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full bg-gray-700/50 border ${errors.email ? "border-red-500" : "border-gray-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm`}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label htmlFor="phone" className="block text-gray-300 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full bg-gray-700/50 border ${errors.phone ? "border-red-500" : "border-gray-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="travelDates"
                  className="block text-gray-300 mb-2"
                >
                  Preferred Travel Dates
                </label>
                <input
                  type="date"
                  id="travelDates"
                  name="travelDates"
                  value={formData.travelDates}
                  onChange={handleChange}
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full bg-gray-700/50 border ${errors.travelDates ? "border-red-500" : "border-gray-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm`}
                />
                {errors.travelDates && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.travelDates}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="duration" className="block text-gray-300 mb-2">
                  Trip Duration
                </label>
                <select
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className={`w-full bg-gray-700/50 border ${errors.duration ? "border-red-500" : "border-gray-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm`}
                >
                  <option value="">Select duration</option>
                  <option value="3-5 days">3-5 days</option>
                  <option value="6-10 days">6-10 days</option>
                  <option value="11-15 days">11-15 days</option>
                  <option value="16+ days">16+ days</option>
                </select>
                {errors.duration && (
                  <p className="text-red-500 text-sm mt-1">{errors.duration}</p>
                )}
              </div>
              <div>
                <label htmlFor="budget" className="block text-gray-300 mb-2">
                  Approximate Budget (USD)
                </label>
                <select
                  id="budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  className={`w-full bg-gray-700/50 border ${errors.budget ? "border-red-500" : "border-gray-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm`}
                >
                  <option value="">Select budget range</option>
                  <option value="Under $1000">Under $1000</option>
                  <option value="$1000-$2000">$1000-$2000</option>
                  <option value="$2000-$3000">$2000-$3000</option>
                  <option value="$3000-$5000">$3000-$5000</option>
                  <option value="Over $5000">Over $5000</option>
                </select>
                {errors.budget && (
                  <p className="text-red-500 text-sm mt-1">{errors.budget}</p>
                )}
              </div>
              <div>
                <label htmlFor="groupSize" className="block text-gray-300 mb-2">
                  Group Size
                </label>
                <select
                  id="groupSize"
                  name="groupSize"
                  value={formData.groupSize}
                  onChange={handleChange}
                  className={`w-full bg-gray-700/50 border ${errors.groupSize ? "border-red-500" : "border-gray-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm`}
                >
                  <option value="">Select group size</option>
                  <option value="1 person">1 person (Solo)</option>
                  <option value="2 people">2 people (Couple/Friends)</option>
                  <option value="3-5 people">3-5 people (Small group)</option>
                  <option value="6-10 people">6-10 people (Group)</option>
                  <option value="10+ people">10+ people (Large group)</option>
                </select>
                {errors.groupSize && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.groupSize}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="interests" className="block text-gray-300 mb-2">
                Primary Interests
              </label>
              <textarea
                id="interests"
                name="interests"
                value={formData.interests}
                onChange={handleChange}
                placeholder="e.g., Cultural sites, wildlife, beaches, hiking, food experiences..."
                rows="3"
                className={`w-full bg-gray-700/50 border ${errors.interests ? "border-red-500" : "border-gray-600"} rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm`}
              ></textarea>
              {errors.interests && (
                <p className="text-red-500 text-sm mt-1">{errors.interests}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="specialRequests"
                className="block text-gray-300 mb-2"
              >
                Special Requests or Requirements
              </label>
              <textarea
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                placeholder="e.g., Dietary restrictions, accessibility needs, special occasions..."
                rows="3"
                className="w-full bg-gray-700/50 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-yellow-500 backdrop-blur-sm"
              ></textarea>
            </div>

            <div className="pt-6">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-amber-600 text-gray-900 font-bold py-4 px-6 rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
              >
                Submit Custom Tour Request
              </button>
            </div>
          </form>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-400">
            Our travel experts will review your request and contact you within
            24 hours to discuss your custom Sri Lankan adventure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomTour;
