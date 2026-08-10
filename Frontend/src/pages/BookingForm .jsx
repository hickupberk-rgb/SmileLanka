import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import emailjs from "emailjs-com";
import { useLocation } from "react-router-dom";
import { getStoredUser } from "../utils/userAccountStorage";

const services = [
  { name: "Cultural Triangle Explorer", price: 999 },
  { name: "Hill Country Retreat", price: 899 },
  { name: "Beach Paradise Getaway", price: 1299 },
  { name: "Wildlife Safari Adventure", price: 1499 },
  { name: "Southern Coast Explorer", price: 1199 },
  { name: "Ultimate Sri Lanka Experience", price: 2499 },
];

const steps = ["Personal Info", "Booking Details", "Payment", "Review"];

const AdvancedBookingWizard = () => {
  const location = useLocation();
  const today = new Date().toISOString().split("T")[0];
  const [step, setStep] = useState(0);
  const storedUser = getStoredUser();
  const [data, setData] = useState({
    name: storedUser?.name || "",
    email: storedUser?.email || "",
    phone: storedUser?.phone || "",
    service: "",
    date: "",
    time: "",
    guests: 1,
    specialNotes: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    payLater: false,
  });
  const [errors, setErrors] = useState({});
  const [userId, setUserId] = useState(null);

  // Pre-select package service if coming from a package page
useEffect(() => {
  const params = new URLSearchParams(location.search);
  const packageId = params.get("package");

  if (packageId) {
    const packageServices = {
      "1": "Cultural Triangle Explorer",
      "2": "Hill Country Retreat",
      "3": "Beach Paradise Getaway",
      "4": "Wildlife Safari Adventure",
      "5": "Southern Coast Explorer",
      "6": "Ultimate Sri Lanka Experience",
    };

    const serviceName = packageServices[packageId];

    if (serviceName) {
      setData((prev) => ({
        ...prev,
        service: serviceName,
      }));
    }
  }

  // ✅ SAFE USER ID (ONLY MongoDB ObjectId allowed)
const storedUserId = localStorage.getItem("userId");

// validate + cleanup
if (storedUserId && !/^[0-9a-fA-F]{24}$/.test(storedUserId)) {
  localStorage.removeItem("userId");
}
}, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    let updatedValue = value;

    if (name === "name") {
      updatedValue = value.replace(/[^A-Za-z\s]/g, "");
    }

    if (name === "phone") {
      updatedValue = value.replace(/[^0-9]/g, "");
    }

    setData({ ...data, [name]: updatedValue });
    setErrors({ ...errors, [name]: "" });
  };

  const handleGuests = (val) => {
    setData((prev) => ({
      ...prev,
      guests: Math.max(1, prev.guests + val),
    }));
  };

  // -------------------------
  // VALIDATION
  // -------------------------
  const validateStep = () => {
    let stepErrors = {};

    if (step === 0) {
      if (!data.name.trim()) stepErrors.name = "Name is required";

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        stepErrors.email = "Invalid email address";
      }

      if (!/^[0-9]{10}$/.test(data.phone)) {
        stepErrors.phone = "Phone must be exactly 10 digits";
      }
    }

    if (step === 1 && !data.service) {
      stepErrors.service = "Select a service";
    }

    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => setStep((prev) => prev - 1);

  const getTotalPrice = () => {
    const serviceObj = services.find((s) => s.name === data.service);
    return serviceObj ? serviceObj.price * data.guests : 0;
  };

  // ✅ Move sendBookingEmail inside the component
  const sendBookingEmail = async () => {
    const templateParams = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      service: data.service,
      date: data.date,
      time: data.time,
      guests: data.guests,
      notes: data.specialNotes || "No notes added",
      payment: data.payLater ? "Pay Later / Cash on Arrival" : "Card Payment",
      total: getTotalPrice(),
    };

    try {
      // First, register or verify the user
     let currentUserId = userId;

// 🔥 STEP 1: CHECK IF USER EXISTS IN DB
const userCheck = await fetch(
  `http://localhost:5000/check-user?email=${data.email}`
);

const userCheckData = await userCheck.json();

if (userCheckData.exists) {
  // ✅ USER EXISTS → reuse same ID
  currentUserId = userCheckData.user._id;
  setUserId(currentUserId);
  localStorage.setItem("userId", currentUserId);
} else {
  // 🔥 NEW USER → register
  const registerResponse = await fetch("http://localhost:5000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: data.name,
      email: data.email,
      phone: data.phone,
    }),
  });

  const registerData = await registerResponse.json();

  if (!registerResponse.ok) {
    throw new Error(registerData.error || "Failed to register user");
  }

  currentUserId = registerData.userId;

  localStorage.setItem("userId", currentUserId);
  setUserId(currentUserId);
}
        // Register new user
        
//       const registerResponse = await fetch("http://localhost:5000/register", {
//   method: "POST",
//   headers: {
//     "Content-Type": "application/json",
//   },
//   body: JSON.stringify({
//     name: data.name,
//     email: data.email,
//     phone: data.phone,
//   }),
// });

// const registerData = await registerResponse.json();

// if (!registerResponse.ok) {
//   throw new Error(registerData.error || "Failed to register user");
// }

// // ✅ ALWAYS use MongoDB ID
// const newUserId = registerData.userId;

// if (!newUserId) {
//   throw new Error("User ID not returned from server");
// }

// currentUserId = newUserId;

// // save correct id only
// localStorage.setItem("userId", currentUserId);
// setUserId(currentUserId);
//       }
      
      // Record the booking
      const bookingResponse = await fetch("http://localhost:5000/book", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUserId,
          service: data.service,
          date: data.date,
          guests: data.guests
        }),
      });
      
      const bookingData = await bookingResponse.json();
      if (!bookingResponse.ok) {
        throw new Error(bookingData.error || "Failed to record booking");
      }
      
      // Add User ID to email template parameters
      const emailTemplateParams = {
        ...templateParams,
        userId: currentUserId
      };
      
      // Send email notification with User ID
      try {
        await emailjs.send(
          "service_ixwmqt5",
          "template_rwyii24",
          emailTemplateParams,
          "-MTJEE6Jjw5sZMNmw"
        );
        
        toast.success("Booking confirmed successfully!", {
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
      } catch (emailError) {
        console.error("Email sending failed:", emailError);
        // Fallback: Show User ID in toast if email fails
        toast.success(`Booking confirmed successfully! Your User ID is: ${currentUserId}. Please save this for accessing the gallery.`, {
          position: "top-center",
          autoClose: 7000,
          style: {
            background: "#facc15", 
            color: "#000000",
            fontWeight: "bold",
            fontSize: "16px",
          },
          icon: "✅",
        });
      }
    } catch (error) {
      console.error("Booking failed:", error);
      toast.error(`❌ Booking failed: ${error.message}. Please try again.`, {
        position: "bottom-center",
        autoClose: 4000,
        style: { background: "#FF4C4C", color: "#fff", fontWeight: "bold" },
        progressStyle: { background: "#facc15" },
        icon: "⚠️",
      });
    }
  };

  const animatedDiv = {
    initial: { opacity: 0, y: 50 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -50 },
    transition: { duration: 0.4 },
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center bg-cover bg-center p-5"
      style={{
        backgroundImage:
          "url('https://i.pinimg.com/1200x/0c/52/ae/0c52ae9947137589b5574a0a515bc451.jpg')",
      }}
    >
      <ToastContainer />
      <div className="g-white/10 backdrop-blur-md shadow-2xl rounded-3xl w-full max-w-3xl p-8 hover:bg-yellow-400/20 transition">
        {/* Progress bar */}
        <div className="flex items-center mb-8">
          {steps.map((label, i) => (
            <div key={i} className="flex-1 text-center">
              <div
                className={`w-8 h-8 mx-auto rounded-full ${
                  i <= step ? "bg-yellow-400 text-black" : "bg-gray-300 text-gray-500"
                } flex items-center justify-center font-bold`}
              >
                {i + 1}
              </div>
              <p className={`text-sm mt-1 ${i <= step ? "text-black" : "text-gray-400"}`}>{label}</p>
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <motion.div {...animatedDiv} key="step0">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Personal Info</h2>
              <div className="space-y-4 text-black">
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    // onKeyDown={blockInvalidKeys.name}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 border rounded-lg peer"
                  />
                  
                  {errors.name && <p className="text-red-700 text-sm">{errors.name}</p>}
                </div>
                <input
                  type="email"
                  name="email"
                  value={data.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full px-4 py-3 border rounded-lg"
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                <input
                  type="tel"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  // onKeyDown={blockInvalidKeys.numberOnly}
                  placeholder="Phone Number"
                  className="w-full px-4 py-3 border rounded-lg"
                />
                {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}
              </div>
              <button onClick={nextStep} className="mt-6 w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 rounded-xl shadow-lg transition-all">
                Next
              </button>
            </motion.div>
          )}

          {/* Step 1: Booking Details */}
          {step === 1 && (
            <motion.div {...animatedDiv} key="step1">
              <h2 className="text-2xl font-bold mb-4 text-gray-900">Booking Details</h2>
              <div className="space-y-4">
                <select name="service" value={data.service} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg text-black">
                  <option value="">Select Service</option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} (${s.price})
                    </option>
                  ))}
                </select>
                {errors.service && <p className="text-red-500 text-sm">{errors.service}</p>}
                <input type="date" name="date" value={data.date} onChange={handleChange} min={today} className="w-full px-4 py-3 border rounded-lg text-black" />
                <input type="time" name="time" value={data.time} onChange={handleChange} className="w-full px-4 py-3 border rounded-lg text-black" />
                <div className="flex items-center gap-3">
                  <button type="button" onClick={() => handleGuests(-1)} className="px-3 py-1 bg-gray-500 rounded">-</button>
                  <span>{data.guests} Guest(s)</span>
                  <button type="button" onClick={() => handleGuests(1)} className="px-3 py-1 bg-gray-500 rounded">+</button>
                </div>
                <textarea name="specialNotes" value={data.specialNotes} onChange={handleChange} placeholder="Special Notes" className="w-full px-4 py-3 border rounded-lg resize-none text-black" />
              </div>
              <div className="flex justify-between mt-6">
                <button onClick={prevStep} className="px-6 py-3 bg-gray-500 rounded-xl font-bold">Back</button>
                <button onClick={nextStep} className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-bold">Next</button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Payment */}
          {step === 2 && (
            <motion.div {...animatedDiv} key="step2">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Payment</h2>
              <div className="flex items-center mb-4">
                <input type="checkbox" name="payLater" 
                checked={data.payLater}
                 onChange={() => setData({ ...data, payLater: !data.payLater })} className="mr-2" />
                <span>Pay Later / Cash on Arrival</span>
              </div>
              {!data.payLater && (
                <div className="space-y-3 bg-gray-100 p-6 rounded-xl border">
                  <input type="text" name="cardNumber" value={data.cardNumber} onChange={handleChange} placeholder="Card Number" className="w-full px-4 py-3 border rounded-lg text-black" />
                  {/* {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>} */}
                  <div className="grid grid-cols-2 gap-3">
                    <input type="text" name="expiry" value={data.expiry} onChange={handleChange} placeholder="MM/YY" className="w-full px-4 py-3 border rounded-lg text-black" />
                    {/* {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>} */}
                    <input type="text" name="cvv" value={data.cvv} onChange={handleChange} placeholder="CVV" className="w-full px-4 py-3 border rounded-lg text-black" />
                    {/* {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>} */}
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-6">
                <button onClick={prevStep} className="px-6 py-3 bg-gray-500 rounded-xl font-bold">Back</button>
                <button onClick={nextStep} className="px-6 py-3 bg-yellow-400 hover:bg-yellow-500 text-black rounded-xl font-bold">Next</button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
     {step === 3 && (
  <motion.div {...animatedDiv} key="step3">
    <h2 className="text-3xl font-bold mb-6 text-gray-900 text-center">
      Review & Confirm Your Booking
    </h2>

    <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-xl space-y-6 border">

      {/* Personal Info */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Personal Information</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800">
          <p><strong>Name:</strong> {data.name}</p>
          <p><strong>Email:</strong> {data.email}</p>
          <p><strong>Phone:</strong> {data.phone}</p>
        </div>
      </div>

      {/* Booking Details */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Booking Details</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-gray-800">
          <p><strong>Service:</strong> {data.service}</p>
          <p><strong>Date:</strong> {data.date}</p>
          <p><strong>Time:</strong> {data.time}</p>
          <p><strong>Guests:</strong> {data.guests}</p>
        </div>

        {data.specialNotes && (
          <p className="mt-2 text-black">
            <strong>Notes:</strong> {data.specialNotes}
          </p>
        )}
      </div>

      {/* Payment */}
      <div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">Payment Details</h3>
        <p className="text-gray-800">
          <strong>Payment Method:</strong>{" "}
          {data.payLater ? "Pay Later / Cash on Arrival" : "Card Payment"}
        </p>
      </div>

      {/* Total Box */}
      <div className="bg-yellow-400 text-black p-5 rounded-xl shadow-lg text-center">
        <h3 className="text-xl font-bold">Total Amount</h3>
        <p className="text-3xl font-extrabold mt-1">${getTotalPrice()}</p>
      </div>
      
      {/* Gallery Access Info */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <h3 className="text-lg font-bold text-blue-800 mb-2">📸 Share Your Memories!</h3>
        <p className="text-blue-700">
          After your tour, you'll be able to upload your photos to our gallery and share your 
          amazing Sri Lankan adventure with other travelers!
        </p>
      </div>
      
    </div>

    <button
     onClick={sendBookingEmail}
      className="w-full mt-6 py-3 bg-green-600 text-white font-bold rounded-xl shadow-lg hover:bg-green-700 hover:shadow-xl transition-all"
    >
      Confirm Booking
    </button>
  </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AdvancedBookingWizard;
