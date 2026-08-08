import React, { useState, useEffect, useRef } from "react";
import Navbar from "../../components/Navbar";
import { Link,useNavigate, useLocation } from "react-router-dom";

const CulturalTours = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("overview");
  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [currentActivityIndex, setCurrentActivityIndex] = useState(0);
  const [currentGalleryIndex, setCurrentGalleryIndex] = useState(0);
  
  // Service details
  const service = {
    id: 4,
    name: "Cultural Tours",
    description: "Discover ancient temples, historical sites, and experience the rich culture of Sri Lanka.",
    longDescription: "Immerse yourself in the rich tapestry of Sri Lankan culture and history with our expertly guided cultural tours. From ancient Buddhist temples and UNESCO World Heritage sites to vibrant local markets and traditional craft workshops, our tours offer an authentic glimpse into the island's fascinating heritage. Led by knowledgeable local guides, each cultural experience is designed to provide deep insights into Sri Lanka's diverse traditions, religious practices, and time-honored customs. Whether you're exploring the sacred city of Kandy, wandering through the ancient ruins of Polonnaruwa, or participating in a traditional cooking class, our cultural tours create meaningful connections between travelers and the local way of life.",
    detailedInfo: [
      {
        id: "temples",
        title: "Temple Visits",
        content: "Explore ancient Buddhist temples and Hindu shrines with expert guides who explain the religious significance and architectural features.",
        image: "https://i.pinimg.com/1200x/d0/4e/03/d04e03e02e64b5f0297ed0c3e476e892.jpg"
      },
      {
        id: "heritage",
        title: "Heritage Sites",
        content: "Visit UNESCO World Heritage sites including ancient cities, royal palaces, and historical monuments with detailed historical context.",
        image: "https://i.pinimg.com/736x/d8/2c/a4/d82ca4a76a9775793c4d1fd4d24ff6e4.jpg"
      },
      {
        id: "workshops",
        title: "Cultural Workshops",
        content: "Participate in hands-on workshops to learn traditional crafts, cooking techniques, and cultural practices from local artisans.",
        image: "https://i.pinimg.com/736x/74/e4/04/74e404d3f568f4a9faebe77e9d7c748c.jpg"
      }
    ],
    image: "https://i.pinimg.com/736x/d4/0e/1d/d40e1dab9afb67a25e9aa552f7fa2820.jpg",
    gallery: [
      "https://i.pinimg.com/1200x/bd/72/e1/bd72e14fd0681365c2a18c22832ce138.jpg",
      "https://i.pinimg.com/736x/7a/e7/f8/7ae7f835ac1ddf2ef81b012b84431ce8.jpg",
      "https://i.pinimg.com/1200x/89/6f/1e/896f1e0efc012434fc78234bc91a1bac.jpg",
      "https://i.pinimg.com/1200x/8d/8c/b9/8d8cb91ef96444394cf2366850469d4b.jpg"
    ],
    rating: 4.8,
    bestTime: "December to April",
    duration: "2-7 days",
    difficulty: "Beginner Friendly",
    price: "Starting from $140 per person",
    activities: [
  
      "Cultural Workshops",
      "Traditional Cooking",
      "Local Market Tours"
    ],
    itinerary: [
      {
        day: "Day 1",
        title: "Arrival & Cultural Orientation",
        description: "Check-in at your accommodation and receive an orientation to Sri Lankan culture, customs, and etiquette."
      },
      {
        day: "Day 2-3",
        title: "Ancient Cities Exploration",
        description: "Visit UNESCO World Heritage sites and ancient cities with expert guides to understand Sri Lanka's rich history."
      },
      {
        day: "Day 4",
        title: "Religious Heritage",
        description: "Explore sacred Buddhist temples and Hindu shrines to understand the spiritual traditions of Sri Lanka."
      },
      {
        day: "Day 5",
        title: "Living Culture",
        description: "Participate in cultural workshops, traditional cooking classes, and local market visits to experience daily life."
      },
      {
        day: "Day 6-7",
        title: "Artistic Traditions",
        description: "Visit local craft centers, art galleries, and cultural performances to appreciate Sri Lanka's artistic heritage."
      }
    ],
    facts: [
      "Sri Lanka has 8 UNESCO World Heritage Sites",
      "Over 2,500 years of recorded history",
      "Rich tradition of Buddhism, Hinduism, Islam, and Christianity",
      "Expert local guides with deep cultural knowledge",
      "Authentic experiences that support local communities"
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
            <span className="text-yellow-400 font-medium">Cultural Experience</span>
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
            <h3 className="text-2xl font-bold text-center mb-8 text-yellow-400">Why Choose Our Cultural Tours?</h3>
            
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
              Cultural Activities
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Experience the richness of Sri Lankan culture with our carefully curated activities
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold mb-4 text-white">{activity}</h3>
                    <p className="text-slate-400 mb-6">
                      Experience the beauty and richness of {activity.toLowerCase()} in Sri Lanka's most spectacular cultural environments.
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">{activity}</h3>
                <p className="text-slate-400 mb-6">
                  Experience the beauty and richness of {activity.toLowerCase()} in Sri Lanka's most spectacular cultural environments.
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
              Cultural Itinerary
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              A detailed day-by-day plan for your cultural tour experience
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
              Cultural Gallery
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Glimpses from our cultural tours
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
              Ready for Your Cultural Journey?
            </h2>
            <p className="text-xl mb-8 text-yellow-100 max-w-2xl mx-auto">
              Book your {service.name} experience with Smile Sri Lanka and explore the rich cultural heritage of our beautiful island.
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

export default CulturalTours;