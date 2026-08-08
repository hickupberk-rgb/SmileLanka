import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import {Link, useNavigate, useLocation } from "react-router-dom";

const WaterSports = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  
  // Service details
  const service = {
    id: 6,
    name: "Water Sports",
    description: "Dive into thrilling water activities including surfing, snorkeling, and boat trips in crystal clear waters.",
    longDescription: "Experience the ultimate aquatic adventure in Sri Lanka's pristine waters with our comprehensive water sports packages. From the legendary surf breaks of Arugam Bay to the calm lagoons of Bentota, our expert instructors and guides ensure safe and exhilarating experiences for all skill levels. Whether you're a beginner looking to try your first surf lesson or an experienced diver seeking to explore vibrant coral reefs, our water sports adventures offer something for everyone. Our packages include all necessary equipment, professional instruction, and safety measures, allowing you to focus entirely on the thrill of the water. With options ranging from snorkeling in shallow reefs to deep-sea fishing expeditions, each activity is designed to showcase the incredible marine biodiversity of Sri Lanka's coastal waters.",
    detailedInfo: [
      {
        id: "surfing",
        title: "Surfing Adventures",
        content: "Learn to surf or improve your skills with professional instructors at some of the best surf spots in the Indian Ocean.",
        image: "https://i.pinimg.com/736x/9d/32/99/9d3299e689752314a06612339e2b924e.jpg"
      },
      {
        id: "diving",
        title: "Diving & Snorkeling",
        content: "Explore vibrant coral reefs and encounter diverse marine life with certified diving instructors and guided snorkeling tours.",
        image: "https://i.pinimg.com/1200x/00/4e/66/004e6610b7b3a846da70292ce323d08e.jpg"
      },
      {
        id: "fishing",
        title: "Fishing Expeditions",
        content: "Join experienced local fishermen for traditional or deep-sea fishing adventures in productive coastal waters.",
        image: "https://i.pinimg.com/1200x/45/f7/62/45f762b9a8a612c9094b225e0ecb5037.jpg"
      }
    ],
    image: "https://i.pinimg.com/1200x/d0/a3/2a/d0a32a2c0e15c8b244576887172948a1.jpg",
    gallery: [
      "https://i.pinimg.com/736x/fc/2c/6f/fc2c6fe504033ff0dd3025cf18b94424.jpg",
      "https://i.pinimg.com/736x/07/14/17/0714178da1f93ddff9f0da639f159798.jpg",
      "https://i.pinimg.com/736x/3e/e5/40/3ee540cce75ef1c8a5ba45ab07006888.jpg",
      "https://i.pinimg.com/1200x/c8/fb/6c/c8fb6c2dc07ea4316830c84059727b6a.jpg"
    ],
    rating: 4.8,
    bestTime: "November to April",
    duration: "1-7 days",
    difficulty: "Beginner to Advanced",
    price: "Starting from $160 per person",
    activities: [
      "Surfing Adventures",
      "Diving & Snorkeling",
      "Fishing Expeditions",
      "Jet Skiing",
      "Kayaking"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Water Safety Briefing",
        description: "Check-in at your coastal accommodation and receive comprehensive water safety briefing and equipment orientation."
      },
      {
        day: "Day 2-3",
        title: "Surf & Adventure",
        description: "Beginner to advanced surf lessons at renowned breaks with professional instructors and guided water activities."
      },
      {
        day: "Day 4",
        title: "Marine Exploration",
        description: "Snorkeling and diving expeditions to explore coral reefs and encounter diverse marine life with certified guides."
      },
      {
        day: "Day 5",
        title: "Fishing Experience",
        description: "Traditional or deep-sea fishing expeditions with experienced local fishermen to experience authentic maritime culture."
      },
      {
        day: "Day 6-7",
        title: "Relaxation & Departure",
        description: "Relax on the beach, enjoy water-based leisure activities, and prepare for departure with unforgettable memories."
      }
    ],
    facts: [
      "Sri Lanka has over 1,340km of coastline with diverse surf breaks",
      "Clear waters with visibility up to 30 meters in some areas",
      "Home to 27 species of whales and dolphins",
      "Professional instructors certified by international standards",
      "All equipment regularly maintained and safety-checked"
    ]
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Auto-slide functionality for facts carousel
  const slideInterval = useRef(null);
  
  useEffect(() => {
    // Clear any existing interval
    if (slideInterval.current) {
      clearInterval(slideInterval.current);
    }
    
    // Set up new interval for auto-sliding
    slideInterval.current = setInterval(() => {
      setCurrentFactIndex(prevIndex => 
        prevIndex === service.facts.length - 1 ? 0 : prevIndex + 1
      );
      
      setCurrentActivityIndex(prevIndex => 
        prevIndex === service.activities.length - 1 ? 0 : prevIndex + 1
      );
      
      setCurrentGalleryIndex(prevIndex => 
        prevIndex === service.gallery.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds
    
    // Clean up interval on component unmount
    return () => {
      if (slideInterval.current) {
        clearInterval(slideInterval.current);
      }
    };
  }, [service.facts.length, service.activities.length, service.gallery.length]);

  // Scroll to main content if coming from "Read More" button
  useEffect(() => {
    if (location.state && location.state.fromReadMore) {
      // Scroll to the overview section after a short delay to ensure page is loaded
      setTimeout(() => {
        const overviewSection = document.getElementById('overview');
        if (overviewSection) {
          overviewSection.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, [location]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Hero Section */}
      <section id="hero" className="relative h-screen flex items-center justify-center pt-20 md:pt-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.9)), url('${service.image}')`
          }}
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/45-degree-fabric-light.png')] opacity-10"></div>
        <div className="relative z-10 text-center px-6 max-w-6xl mx-auto mt-8 md:mt-0">
          <div className="inline-block mb-6 px-4 py-2 bg-yellow-600/20 rounded-full backdrop-blur-sm border border-yellow-500/30">
            <span className="text-yellow-400 font-medium">Aquatic Experience</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
            {service.name}
          </h1>
          <p className="text-xl md:text-2xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            <div className="flex items-center bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700">
              <span className="text-yellow-400 mr-2 text-xl">★</span>
              <span className="font-bold text-lg">{service.rating}/5.0</span>
              <span className="text-slate-400 ml-2">Rating</span>
            </div>
            <div className="flex items-center bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700">
              <span className="text-yellow-400 mr-2">⏱️</span>
              <span className="font-bold text-lg">{service.duration}</span>
              <span className="text-slate-400 ml-2">Duration</span>
            </div>
            <div className="flex items-center bg-slate-800/50 backdrop-blur-sm px-6 py-3 rounded-full border border-slate-700">
              <span className="text-yellow-400 mr-2">💰</span>
              <span className="font-bold text-lg">{service.price}</span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <button 
              onClick={() => document.getElementById('booking').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full font-bold text-lg hover:from-yellow-600 hover:to-amber-700 transition-all transform hover:scale-105 shadow-lg shadow-yellow-500/20"
            >
              Book Now
            </button>
            <button 
              onClick={() => document.getElementById('overview').scrollIntoView({ behavior: 'smooth' })}
              className="px-8 py-4 bg-transparent border-2 border-yellow-500 text-yellow-400 rounded-full font-bold text-lg hover:bg-yellow-500/10 transition-all"
            >
              Explore Details
            </button>
          </div>
          
          {/* Removed the mobile arrow key that was displayed at the top */}
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Discover {service.name}
            </h2>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
            <div className="space-y-6">
              <p className="text-lg text-slate-300 leading-relaxed">
                {service.longDescription}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Best Time to Visit</h3>
                  <p className="text-slate-300">{service.bestTime}</p>
                </div>
                <div className="bg-slate-800/50 backdrop-blur-sm p-6 rounded-2xl border border-slate-700">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">Difficulty Level</h3>
                  <p className="text-slate-300">{service.difficulty}</p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-yellow-500/20">
                <img 
                  src={service.image} 
                  alt={service.name}
                  className="w-full h-auto object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-yellow-500 rounded-full opacity-20 blur-3xl"></div>
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-amber-500 rounded-full opacity-20 blur-3xl"></div>
            </div>
          </div>

          {/* Key Facts */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700">
            <h3 className="text-2xl font-bold text-center mb-8 text-yellow-400">Why Choose Our Water Sports?</h3>
            
            {/* Mobile view - Carousel with single card */}
            <div className="block md:hidden relative">
              <div className="overflow-hidden">
                <div 
                  className="flex transition-transform duration-500 ease-in-out"
                  style={{ transform: `translateX(-${currentFactIndex * 100}%)` }}
                >
                  {service.facts.map((fact, index) => (
                    <div 
                      key={index} 
                      className="flex-shrink-0 w-full bg-slate-800/50 backdrop-blur-sm p-5 rounded-2xl border border-slate-700 text-center hover:border-yellow-500/50 transition-all"
                    >
                      <div className="text-3xl mb-3 text-yellow-400">★</div>
                      <p className="text-slate-300">{fact}</p>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Dots indicator */}
              <div className="flex justify-center mt-6 space-x-2">
                {service.facts.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentFactIndex(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentFactIndex ? 'bg-yellow-500' : 'bg-slate-600'
                    }`}
                    aria-label={`Go to fact ${index + 1}`}
                  />
                ))}
              </div>
            </div>
            
            {/* Desktop view - Grid layout */}
            <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-5 gap-6">
              {service.facts.map((fact, index) => (
                <div 
                  key={index} 
                  className="bg-slate-800/50 backdrop-blur-sm p-5 rounded-2xl border border-slate-700 text-center hover:border-yellow-500/50 transition-all"
                >
                  <div className="text-3xl mb-3 text-yellow-400">★</div>
                  <p className="text-slate-300">{fact}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Activities Section */}
      <section id="activities" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Water Activities
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Experience the thrill of Sri Lanka's waters with our carefully curated activities
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-4"></div>
          </div>
          
          {/* Mobile view - Carousel with single card */}
          <div className="block md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentActivityIndex * 100}%)` }}
              >
                {service.activities.map((activity, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-full bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-yellow-500/50 transition-all group"
                  >
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-all">
                      <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{activity}</h3>
                    <p className="text-slate-400 mb-6">
                      Experience the excitement and adventure of {activity.toLowerCase()} in Sri Lanka's most spectacular aquatic environments.
                    </p>
                    <button className="text-yellow-400 font-medium flex items-center group-hover:text-yellow-300 transition-colors">
                      Learn more
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {service.activities.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentActivityIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentActivityIndex ? 'bg-yellow-500' : 'bg-slate-600'
                  }`}
                  aria-label={`Go to activity ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop view - Grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.activities.map((activity, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 hover:border-yellow-500/50 transition-all group"
              >
                <div className="w-16 h-16 bg-yellow-500/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-yellow-500/20 transition-all">
                  <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{activity}</h3>
                <p className="text-slate-400 mb-6">
                  Experience the excitement and adventure of {activity.toLowerCase()} in Sri Lanka's most spectacular aquatic environments.
                </p>
                <button className="text-yellow-400 font-medium flex items-center group-hover:text-yellow-300 transition-colors">
                  Learn more
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </div>
            ))}
          </div>

          {/* Detailed Activities */}
          <div className="mt-20 space-y-20">
            {service.detailedInfo.map((info, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <div className="inline-block mb-4 px-4 py-2 bg-yellow-600/20 rounded-full">
                    <span className="text-yellow-400 font-medium">Activity {index + 1}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-6 text-white">
                    {info.title}
                  </h3>
                  <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    {info.content}
                  </p>
                  <div className="flex space-x-4">
                       <Link to="/book">
                    <button className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full font-medium hover:from-yellow-600 hover:to-amber-700 transition-all">
                      Book This Activity
                    </button>
                    </Link>
                    <button className="px-6 py-3 bg-transparent border border-yellow-500 text-yellow-400 rounded-full font-medium hover:bg-yellow-500/10 transition-all">
                      View Gallery
                    </button>
                  </div>
                </div>
                <div className={`rounded-3xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <img 
                    src={info.image} 
                    alt={info.title}
                    className="w-full h-96 object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Itinerary Section */}
      <section id="itinerary" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Water Sports Itinerary
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A detailed day-by-day plan for your water sports experience
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-4"></div>
          </div>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-yellow-500 to-amber-600"></div>
            
            <div className="space-y-12">
              {service.itinerary.map((day, index) => (
                <div 
                  key={index} 
                  className={`relative grid grid-cols-1 lg:grid-cols-2 gap-8 ${index % 2 === 0 ? 'lg:grid-flow-col-dense' : ''}`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-yellow-500 rounded-full border-4 border-gray-900 z-10"></div>
                  
                  <div className={`bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-8 border border-slate-700 ${index % 2 === 0 ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mr-4">
                        <span className="font-bold text-slate-900">{day.day.replace('Day ', '')}</span>
                      </div>
                      <h3 className="text-2xl font-bold text-white">{day.title}</h3>
                    </div>
                    <p className="text-slate-300 text-lg">
                      {day.description}
                    </p>
                  </div>
                  
                  <div className={`lg:col-start-${index % 2 === 0 ? '1' : '2'}`}></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent">
              Water Sports Gallery
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Glimpses from our water sports adventures
            </p>
            <div className="w-24 h-1 bg-yellow-500 mx-auto rounded-full mt-4"></div>
          </div>
          
          {/* Mobile view - Carousel with single card */}
          <div className="block md:hidden relative">
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentGalleryIndex * 100}%)` }}
              >
                {service.gallery.map((img, index) => (
                  <div 
                    key={index} 
                    className="flex-shrink-0 w-full group rounded-3xl overflow-hidden shadow-lg border-4 border-transparent hover:border-yellow-500/50 transition-all cursor-pointer"
                  >
                    <div className="relative h-80">
                      <img 
                        src={img} 
                        alt={`${service.name} ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                        <span className="text-white font-medium"></span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Dots indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {service.gallery.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentGalleryIndex(index)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentGalleryIndex ? 'bg-yellow-500' : 'bg-slate-600'
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          </div>
          
          {/* Desktop view - Grid layout */}
          <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.gallery.map((img, index) => (
              <div 
                key={index} 
                className="group rounded-3xl overflow-hidden shadow-lg border-4 border-transparent hover:border-yellow-500/50 transition-all cursor-pointer"
              >
                <div className="relative h-80">
                  <img 
                    src={img} 
                    alt={`${service.name} ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                    <span className="text-white font-medium"></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking CTA */}
      <section id="booking" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-yellow-600 to-amber-700 rounded-3xl p-12 text-center relative overflow-hidden">
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-white rounded-full opacity-10"></div>
            <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white rounded-full opacity-10"></div>
            <h2 className="text-4xl font-bold mb-6 text-white">
              Ready for Water Adventures?
            </h2>
            <p className="text-xl mb-8 text-yellow-100 max-w-2xl mx-auto">
              Book your {service.name} experience with Smile Sri Lanka and dive into thrilling water activities in our beautiful island waters.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link to="/book">
              <button 
                className="px-8 py-4 bg-white text-yellow-700 font-bold rounded-full hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Book Now - {service.price}
              </button>
              </Link>
              <Link to="/contact">
              <button 
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-full hover:bg-white/10 transition-all"
              >
                Contact Us
              </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WaterSports;