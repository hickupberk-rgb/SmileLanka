import React, { useEffect, useState } from "react";
import "./css/gallery.css";
import axios from "axios";
import { Link } from "react-router-dom";
import videos from "../assest/Video/video.js";

const places = [
  { name: "Kandy", video: videos.kandy },
  { name: "Sigiriya", video: videos.sigiriye },
  { name: "Ella", video: videos.ella },
  { name: "Galle", video: videos.galle },
  { name: "Nuwara Eliya", video: videos.nuEliya },
];

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");

  // Fetch gallery images from backend
  useEffect(() => {
    axios.get("http://localhost:5000/gallery")
      .then((res) => {
        setImages(res.data);
        setServerError(false);
      })
      .catch((err) => {
        console.error("Failed to fetch images:", err);
        setServerError(true);
        // Set some default images or empty array
        setImages([]);
      });
  }, []);

  // Check if user is logged in
  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("userName");
    
    if (storedUserId && storedUserName) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
    }
  }, []);

  // Upload handler
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setUploading(true);
    try {
      const res = await axios.post("http://localhost:5000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setImages((prev) => [res.data.imageUrl, ...prev]);
      setServerError(false);
    } catch (err) {
      console.error("Upload failed:", err);
      setServerError(true);
    } finally {
      setUploading(false);
    }
  };

  return (
    <section id="gallery" data-aos="fade-in" className="bg-black text-white min-h-screen overflow-hidden">
      {/* ===== VIDEOS SECTION ===== */}
      <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
        <h1
          className="text-5xl md:text-6xl font-bold text-yellow-400 mb-10 tracking-wider"
          data-aos="fade-down"
        >
          TRAVEL
        </h1>

        <div className="slider-container">
          <div className="slider">
            {places.concat(places).map((place, index) => (
              <div
                key={index}
                className="slide"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <video
                  className="rounded-xl w-full h-full object-cover"
                  src={place.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                ></video>
                <div className="caption">{place.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div
          className="absolute bottom-10 text-sm text-gray-300 animate-pulse font-handwriting"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          Pearl Of Indian Ocean
        </div>

        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

          .font-handwriting {
            font-family: 'Great Vibes', cursive;
            font-size: 1.8rem;
            letter-spacing: 1px;
            color: #f5e6ca;
            text-shadow: 0 0 10px rgba(255,255,255,0.3);
          }
        `}</style>
      </div>

    
     
    </section>
  );
};

export default Gallery;