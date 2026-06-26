import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import {Link, useNavigate, useLocation } from "react-router-dom";

const BeachGetaways = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  
  // Service details
  const service = {
    id: 2,
    name: "Beach Getaways",
    description: "Relax on pristine beaches and enjoy water sports in some of the most beautiful coastal areas.",
    longDescription: "Experience the ultimate relaxation on Sri Lanka's stunning coastline with our exclusive beach getaway packages. From the golden sands of the south coast to the pristine beaches of the east, our expertly curated tours offer the perfect blend of relaxation and adventure. Whether you're looking to unwind with a tropical cocktail in hand, dive into thrilling water sports, or explore vibrant coral reefs, our beach experiences cater to all preferences. Enjoy luxury beachfront accommodations, delicious seafood, and unforgettable sunset views.",
    detailedInfo: [
      {
        id: "surfing",
        title: "Surfing Lessons",
        content: "Learn to surf with our professional instructors on some of the best waves in the Indian Ocean. Suitable for beginners to advanced surfers.",
        image: "https://i.pinimg.com/1200x/ff/4c/5d/ff4c5d6a6abc42367d5bf97b133241bf.jpg"
      },
      {
        id: "snorkeling",
        title: "Snorkeling Adventures",
        content: "Discover vibrant coral reefs and colorful marine life in crystal clear waters with our guided snorkeling tours.",
        image: "https://i.pinimg.com/1200x/86/0c/cf/860ccf18032410ce75cd07f730d67a21.jpg"
      },
      {
        id: "whale",
        title: "Whale Watching",
        content: "Embark on thrilling whale watching expeditions to witness majestic blue whales and dolphins in their natural habitat.",
        image: "https://i.pinimg.com/736x/bd/76/7f/bd767fb6fe4f2e61254d62d010aca56b.jpg"
      }
    ],
    image: "https://i.pinimg.com/1200x/c3/75/6e/c3756e64caf1da3fc80f6f8e0367d492.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/26/85/c8/2685c8a47926e31d22e671f370265411.jpg",
      "https://i.pinimg.com/1200x/2a/9b/09/2a9b09ea6d91f4529e0de880272c5aa7.jpg",
      "https://i.pinimg.com/1200x/f9/75/c9/f975c9a6382dd1bb84054de6e296a2db.jpg",
      "https://i.pinimg.com/736x/68/f5/7a/68f57ae4158f5cdffc5da62701b2a403.jpg"
    ],
    rating: 4.8,
    bestTime: "November to April",
    duration: "3-10 days",
    difficulty: "Beginner Friendly",
    // price: "Starting from $150 per person",
    activities: [
      "Surfing Lessons",
      "Whale Watching",
      "Beach Volleyball",
   
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Beach Orientation",
        description: "Check-in at your beachfront accommodation and orientation to the coastal area and activities."
      },
      {
        day: "Day 2-3",
        title: "Water Sports",
        description: "Enjoy surfing lessons, snorkeling, and other water activities in pristine coastal waters."
      },
      {
        day: "Day 4-5",
        title: "Marine Exploration",
        description: "Whale watching expeditions and visits to marine conservation centers to learn about local ecosystems."
      },
      {
        day: "Day 6",
        title: "Cultural Beach Experience",
        description: "Visit local fishing villages and experience traditional coastal lifestyles and cuisine."
      },
      {
        day: "Day 7-10",
        title: "Relaxation & Departure",
        description: "Unwind on the beach, enjoy spa treatments, and prepare for departure with unforgettable memories."
      }
    ],
    facts: [
      "Sri Lanka has over 1,340km of coastline",
      "Best beaches are on the south and west coasts",
      "Peak season for beaches is November to April",
      "Professional instructors for all water sports",
      "Luxury beachfront accommodations available"
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
            <span className="text-yellow-400 font-medium">Coastal Experience</span>
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
            <h3 className="text-2xl font-bold text-center mb-8 text-yellow-400">Why Choose Our Beach Getaways?</h3>
            
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
              Beach Activities
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Experience the thrill of Sri Lanka's coastal waters with our carefully curated activities
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{activity}</h3>
                    <p className="text-slate-400 mb-6">
                      Experience the beauty and excitement of {activity.toLowerCase()} in Sri Lanka's most spectacular coastal environments.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4 4 0 003 15z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{activity}</h3>
                <p className="text-slate-400 mb-6">
                  Experience the beauty and excitement of {activity.toLowerCase()} in Sri Lanka's most spectacular coastal environments.
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
              Beach Itinerary
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A detailed day-by-day plan for your beach getaway experience
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
              Beach Gallery
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Glimpses from our beach getaways
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
              Ready for Your Beach Getaway?
            </h2>
            <p className="text-xl mb-8 text-yellow-100 max-w-2xl mx-auto">
              Book your {service.name} experience with Smile Sri Lanka and enjoy the pristine beaches of our beautiful island.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/book">
              <button 
                className="px-8 py-4 bg-white text-yellow-700 font-bold rounded-full hover:bg-yellow-50 transition-all transform hover:scale-105 shadow-lg"
              >
                Book Now {service.price}
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

export default BeachGetaways;