import axios from "axios";
import React, { useEffect, useState } from "react";

const GalleryUpload = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPhone, setUserPhone] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [error, setError] = useState("");

  // Fetch gallery images
  useEffect(() => {
    axios.get("http://localhost:5000/gallery").then((res) => setImages(res.data));
  }, []);

  // Check if user is already logged in
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    
    if (storedUserId && storedUserName) {
      setUserId(storedUserId);
      setUserName(storedUserName);
      setIsLoggedIn(true);
      setShowLoginForm(false);
      fetchUserBookings(storedUserId);
    }
  }, []);

  // Fetch user bookings
  const fetchUserBookings = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${id}/bookings`);
      setBookings(response.data);
    } catch (err) {
      console.error("Failed to fetch bookings:", err);
    }
  };

  // Register user
  const handleRegister = async (e) => {
    e.preventDefault();
    setUploading(true);
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/register", {
        name: userName,
        email: userEmail,
        phone: userPhone
      });

      setUserId(response.data.userId);
      setIsLoggedIn(true);
      setShowLoginForm(false);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("userName", userName);
      
      // Fetch bookings for the new user
      fetchUserBookings(response.data.userId);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed");
    } finally {
      setUploading(false);
    }
  };

  // Login user
  const handleLogin = async (e) => {
    e.preventDefault();
    const loginUserId = userId;
    if (!loginUserId || loginUserId.trim() === "") {
      setError("Please enter your User ID");
      return;
    }
    
    setUploading(true);
    setError("");

    try {
      // Verify user exists by fetching their bookings
      const response = await axios.get(`http://localhost:5000/user/${loginUserId}/bookings`);
      
      // If we get here, user exists
      setIsLoggedIn(true);
      setShowLoginForm(false);
      localStorage.setItem("userId", loginUserId);
      
      // Set user name from localStorage or default
      const storedUserName = localStorage.getItem("userName") || "User";
      setUserName(storedUserName);
      
      // Fetch bookings
      fetchUserBookings(loginUserId);
    } catch (err) {
      setError("Invalid user ID or user not found");
    } finally {
      setUploading(false);
    }
  };

  // Upload handler
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if user has bookings
    if (bookings.length === 0) {
      setError("You must have booked a package to upload photos. Please book a tour first.");
      return;
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, JPG, PNG, or GIF)");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size too large. Please upload an image smaller than 5MB");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    setError("");
    try {
      // Check if userId is available
      const currentUserId = localStorage.getItem("userId");
      if (!currentUserId) {
        setError("User ID is missing. Please log out and log back in.");
        setUploading(false);
        return;
      }
      
      // Debug log to see what userId is being used
      console.log("Uploading with userId:", currentUserId);
      
      const res = await axios.post("http://localhost:5000/upload-secure", formData, {
        headers: { 
          "Content-Type": "multipart/form-data",
          "userId": currentUserId
        },
      });
      setImages((prev) => [res.data.imageUrl, ...prev]);
      
      // Show success message
      setError("Image uploaded successfully!");
      setTimeout(() => setError(""), 3000);
    } catch (err) {
      console.error("Upload failed:", err);
      if (err.response?.status === 401) {
        setError("Authentication failed. Please log out and log back in with your User ID.");
      } else if (err.response?.status === 403) {
        setError("Access denied. Only users who have booked tours can upload photos.");
      } else {
        setError(err.response?.data?.error || "Upload failed. Please make sure you have booked a package.");
      }
    } finally {
      setUploading(false);
    }
  };

  // Logout
  const handleLogout = () => {
    setUserId(null);
    setUserName("");
    setUserEmail("");
    setUserPhone("");
    setIsLoggedIn(false);
    setShowLoginForm(true);
    setBookings([]);
    setError("");
    localStorage.removeItem("userId");
    localStorage.removeItem("userName");
  };

  return (
    <section 
    id="memo"
    className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex flex-col items-center py-12 px-6 overflow-hidden">
      {/* Title */}
       
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-yellow-400">Travel Gallery</h1>
          {isLoggedIn && (
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {userName}</span>
              <button 
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {!isLoggedIn && (
          <div className="bg-gray-800/50 backdrop-blur-md rounded-2xl p-8 mb-10 max-w-2xl mx-auto">
            <div className="flex border-b border-gray-700 mb-6">
              <button
                className={`py-2 px-4 font-semibold ${showLoginForm ? 'border-b-2 border-yellow-500 text-yellow-500' : 'text-gray-400'}`}
                onClick={() => { setShowLoginForm(true); setShowRegisterForm(false); setError(""); }}
              >
                Login
              </button>
              <button
                className={`py-2 px-4 font-semibold ${showRegisterForm ? 'border-b-2 border-yellow-500 text-yellow-500' : 'text-gray-400'}`}
                onClick={() => { setShowRegisterForm(true); setShowLoginForm(false); setError(""); }}
              >
                Register
              </button>
            </div>

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            {showLoginForm && (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={userId || ""}
                    onChange={(e) => setUserId(e.target.value)}
                    placeholder="User ID"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                  <p className="text-gray-400 text-xs mt-1">Your User ID was provided when you booked a tour</p>
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {uploading ? "Logging in..." : "Login"}
                </button>
              </form>
            )}

            {showRegisterForm && (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    placeholder="Email Address"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    value={userPhone}
                    onChange={(e) => setUserPhone(e.target.value)}
                    placeholder="Phone Number"
                    className="w-full px-4 py-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    required
                  />
                </div>
                <div className="text-gray-400 text-xs">
                  <p>Note: You'll need to book a tour package after registration to upload photos to the gallery.</p>
                  <p className="mt-2">After booking, you'll receive your User ID via email which you can use to log in.</p>
                </div>
                <button
                  type="submit"
                  disabled={uploading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 rounded-lg transition disabled:opacity-50"
                >
                  {uploading ? "Registering..." : "Register"}
                </button>
              </form>
            )}

            <div className="mt-6 text-gray-400 text-sm">
              <p>Only users who have booked our tour packages can upload photos to the gallery.</p>
              <p className="mt-2">
                <a href="/packages" className="text-yellow-500 hover:underline">
                  Book a tour package
                </a>{" "}
                to get started!
              </p>
              <p className="mt-2">After booking, check your email for your User ID to access the gallery upload feature.</p>
            </div>
          </div>
        )}

        {isLoggedIn && (
          <>
            {bookings.length === 0 ? (
              <div className="bg-yellow-900/30 border border-yellow-700 text-yellow-300 px-4 py-6 rounded-lg mb-10 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-2">No Bookings Found</h3>
                <p className="mb-4">
                  You need to book a tour package before you can upload photos to our gallery.
                </p>
                <a 
                  href="/packages" 
                  className="inline-block bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-6 rounded-lg transition"
                >
                  Book a Tour Package
                </a>
              </div>
            ) : (
              <div className="bg-green-900/30 border border-green-700 text-green-300 px-4 py-6 rounded-lg mb-10 max-w-2xl mx-auto">
                <h3 className="text-xl font-bold mb-2">Welcome Back, {userName}!</h3>
                <p>You have {bookings.length} booking(s) with us. Thank you for choosing Smile Sri Lanka!</p>
                <p className="mt-2">Feel free to share your travel memories by uploading your photos below.</p>
                
                {/* Display user's bookings */}
                <div className="mt-4">
                  <h4 className="font-bold mb-2">Your Bookings:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {bookings.map((booking, index) => (
                      <li key={booking.id}>
                        <span className="font-medium">{booking.service}</span> - 
                        <span>{new Date(booking.date).toLocaleDateString()}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded mb-6">
                {error}
              </div>
            )}

            <label className={`bg-yellow-500 text-gray-900 px-6 py-3 rounded-full font-semibold cursor-pointer hover:bg-yellow-600 transition mb-10 inline-block ${bookings.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {uploading ? "Uploading..." : "Upload Your Image"}
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleUpload}
                disabled={bookings.length === 0 || uploading}
              />
            </label>
          </>
        )}

        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
            {images.map((url, index) => (
              <div
                key={index}
                className="relative group overflow-hidden rounded-xl border border-gray-700"
              >
                <img
                  src={url}
                  alt="Uploaded"
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 mt-6">No images uploaded yet.</p>
        )}
      </div>
    </section>
  );
};

export default GalleryUpload;