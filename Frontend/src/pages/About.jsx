import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
 
  const allDestinations = [
    {
      id: 1,
      name: "Sigiriya Rock Fortress",
      description: "Ancient rock fortress and palace ruin situated in the central Matale District.",
      image: "https://i.pinimg.com/736x/20/15/e9/2015e974ef15ba77ca9206d4166f764b.jpg",
      rating: 4.8,
      link: "/destinations/sigiriya-rock-fortress",
      delay: 100
    },
    {
      id: 2,
      name: "Ella Rock",
      description: "Stunning hiking destination with panoramic views of the surrounding hills.",
      image: "https://i.pinimg.com/736x/21/5f/7a/215f7a6ca135ecafde0d31592a6c457d.jpg",
      rating: 4.9,
      link: "/destinations/ella-rock",
      delay: 200
    },
    {
      id: 3,
      name: "Yala National Park",
      description: "Famous wildlife reserve known for its leopard population and diverse fauna.",
      image: "https://i.pinimg.com/736x/29/a7/70/29a77078076cab3beb6bfccc073a0acc.jpg",
      rating: 4.7,
      link: "/destinations/yala-national-park",
      delay: 300
    },
    {
      id: 4,
      name: "Galle Fort",
      description: "UNESCO World Heritage site with well-preserved Dutch colonial architecture.",
      image: "https://i.pinimg.com/736x/42/6a/7c/426a7c600b8958994d16a273773a43b1.jpg",
      rating: 4.6,
      link: "/destinations/galle-fort", // Updated link to use direct route
      delay: 400
    },
    {
      id: 5,
      name: "Adam's Peak",
      description: "Sacred mountain with a pilgrimage site at its summit, offering stunning sunrise views.",
      image: "https://i.pinimg.com/736x/4f/ca/f7/4fcaf7f3fa7753f8d381557712fe023c.jpg",
      rating: 4.5,
      link: "/destinations/adams-peak",
      delay: 500
    },
    {
      id: 6,
      name: "Mirissa Beach",
      description: "Popular beach destination known for whale watching and golden sand shores.",
      image: "https://i.pinimg.com/736x/86/1d/95/861d9595e4ca7d5b4cdb6e823c016f95.jpg",
      rating: 4.7,
      link: "/destinations/mirissa-beach",
      delay: 600
    },
    {
      id: 7,
      name: "Kandy Temple",
      description: "Sacred Buddhist temple housing the Tooth Relic of the Buddha in the royal palace.",
      image: "https://i.pinimg.com/736x/dc/fc/9b/dcfc9bfc1fe8ad99432501bd20533bc7.jpg",
      rating: 4.8,
      link: "/destinations/kandy-temple",
      delay: 700
    },
    {
      id: 8,
      name: "Nuwara Eliya",
      description: "Picturesque hill country town known as 'Little England' for its colonial architecture.",
      image: "https://i.pinimg.com/1200x/71/2d/f7/712df76d0a1b7710ee416b9dcb00eaa1.jpg",
      rating: 4.4,
      link: "/destinations/nuwara-eliya",
      delay: 800
    },
    {
      id: 9,
      name: "Dambulla Cave Temple",
      description: "Ancient cave temple complex with over 150 Buddha statues and stunning murals.",
      image: "https://i.pinimg.com/736x/29/87/ab/2987ab4ecc6d6fcde9063d882b44ea1f.jpg",
      rating: 4.6,
      link: "/destinations/dambulla-cave-temple",
      delay: 900
    },
    {
      id: 10,
      name: "Unawatuna Beach",
      description: "Beautiful crescent-shaped beach with coral reefs, perfect for swimming and snorkeling.",
      image: "https://i.pinimg.com/1200x/69/9b/f7/699bf70d68f5a93524346bb382da73e9.jpg",
      rating: 4.5,
      link: "/destinations/unawatuna-beach",
      delay: 1000
    },
    {
      id: 11,
      name: "Horton Plains",
      description: "High-altitude plateau with diverse wildlife, endemic plants, and the famous World's End.",
      image: "https://i.pinimg.com/736x/28/de/9f/28de9f2b3257e65f9eaf62d42597606b.jpg",
      rating: 4.7,
      link: "/destinations/horton-plains",
      delay: 1100
    },
    {
      id: 12,
      name: "Anuradhapura",
      description: "Ancient city with well-preserved ruins of the first Sri Lankan capital and sacred Bodhi tree.",
      image: "https://i.pinimg.com/736x/bb/1c/d6/bb1cd672c9e59700a2ab78b6037bd0de.jpg",
      rating: 4.6,
      link: "/destinations/anuradhapura",
      delay: 1200
    }
  ];

  // Our Services data
  const services = [
    {
      id: 1,
      title: "Mountain Adventures",
      description: "Experience the breathtaking beauty of Sri Lanka's mountain ranges with our guided hiking tours.",
      image: "https://i.pinimg.com/1200x/1d/91/e9/1d91e9c02b5e42104b599b0792f4a3e2.jpg",
      link: "/services/mountain-adventures",
      delay: 100
    },
    {
      id: 2,
      title: "Beach Getaways",
      description: "Relax on pristine beaches and enjoy water sports in some of the most beautiful coastal areas.",
      image: "https://i.pinimg.com/736x/bd/11/a4/bd11a4f393343bcb5437c7d441794b50.jpg",
      link: "/services/beach-getaways",
      delay: 200
    },
    {
      id: 3,
      title: "Wildlife Safaris",
      description: "Embark on thrilling safaris to see elephants, leopards, and other wildlife in their natural habitats.",
      image: "https://i.pinimg.com/736x/d0/fa/41/d0fa4158120c4e14449df5fadb529e2e.jpg",
      link: "/services/wildlife-safaris",
      delay: 300
    },
    {
      id: 4,
      title: "Cultural Tours",
      description: "Discover ancient temples, historical sites, and experience the rich culture of Sri Lanka.",
      image: "https://i.pinimg.com/736x/7e/ab/41/7eab410bfce7c84db8dae4418a4806d7.jpg",
      link: "/services/cultural-tours",
      delay: 400
    },
    {
      id: 5,
      title: "City Exploration",
      description: "Discover the vibrant urban life, architecture, and nightlife of Sri Lanka's major cities.",
      image: "https://i.pinimg.com/736x/59/f7/ce/59f7ce96297ceb4903fbc6535557c6c4.jpg",
      link: "/services/city-exploration",
      delay: 500
    },
    {
      id: 6,
      title: "Water Sports",
      description: "Dive into thrilling water activities including surfing, snorkeling, and boat trips in crystal clear waters.",
      image: "https://i.pinimg.com/736x/38/15/76/38157665dafc06ff8b479c6214645063.jpg",
      link: "/services/water-sports",
      delay: 600
    }
  ];

  // Google Reviews data
  const reviews = [
    {
      id: 1,
      name: "Alex Johnson",
      rating: 5,
      review: "The mountain adventure tour was absolutely incredible! Our guide was knowledgeable and made the experience both safe and exciting. Highly recommend Smile Sri Lanka!",
      avatar: "A",
      delay: 100
    },
    {
      id: 2,
      name: "Maria Garcia",
      rating: 5,
      review: "The wildlife safari exceeded all expectations. We saw elephants, leopards, and so many birds! The team at Smile Sri Lanka truly knows how to create unforgettable experiences.",
      avatar: "M",
      delay: 200
    },
    {
      id: 3,
      name: "Thomas Wilson",
      rating: 5,
      review: "The cultural tour gave us deep insights into Sri Lankan traditions. The local guides were passionate and made every moment meaningful. A truly enriching experience!",
      avatar: "T",
      delay: 300
    },
    {
      id: 4,
      name: "Sarah Chen",
      rating: 4,
      review: "Beautiful beaches and excellent service. The team went above and beyond to make our vacation special. Will definitely be booking another trip soon!",
      avatar: "S",
      delay: 400
    },
    {
      id: 5,
      name: "James Peterson",
      rating: 5,
      review: "Outstanding experience from start to finish. The attention to detail and personalized service made all the difference. Sri Lanka has never looked more beautiful!",
      avatar: "J",
      delay: 500
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [servicesIndex, setServicesIndex] = useState(0);
  const [reviewsIndex, setReviewsIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();

  // Check if it's mobile view
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  const nextDestinations = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % allDestinations.length);
  };

  const prevDestinations = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + allDestinations.length) % allDestinations.length);
  };

  // Services carousel navigation
  const nextServices = () => {
    setServicesIndex((prevIndex) => (prevIndex + 1) % services.length);
  };

  const prevServices = () => {
    setServicesIndex((prevIndex) => (prevIndex - 1 + services.length) % services.length);
  };

  // Reviews carousel navigation
  const nextReviews = () => {
    setReviewsIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReviews = () => {
    setReviewsIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  // Auto-move functionality
  useEffect(() => {
    let interval;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextDestinations();
      }, 3000); // Change slide every 3 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying]);

  // Handle keyboard navigation for destinations
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextDestinations();
        setIsAutoPlaying(false);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevDestinations();
        setIsAutoPlaying(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle keyboard navigation for services
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextServices();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevServices();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle keyboard navigation for reviews
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextReviews();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevReviews();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Reset autoplay after a period of inactivity
  useEffect(() => {
    if (!isAutoPlaying) {
      const timer = setTimeout(() => {
        setIsAutoPlaying(true);
      }, 10000); // Resume autoplay after 10 seconds of inactivity
      return () => clearTimeout(timer);
    }
  }, [currentIndex, isAutoPlaying]);

 return (
    <div>
      {/* ABOUT SECTION */}
      <section
        id="about"
        className="relative w-full min-h-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/12832815/pexels-photo-12832815.jpeg')",
        }}
        data-aos="fade-in"
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
          <h1 
            className="text-5xl font-bold mb-6"
            data-aos="fade-down"
          >
            ABOUT <span className="text-yellow-400">US</span>
          </h1>
          <p 
            className="text-lg text-gray-200 leading-relaxed max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Welcome to <span className="text-yellow-400 font-semibold">Smile Sri Lanka</span> — your
            ultimate adventure travel partner! We’re a passionate team of explorers and travel
            enthusiasts who believe that the best way to experience life is through adventure.
          </p>

          <p 
            className="text-gray-300 mt-6 leading-relaxed max-w-3xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            Our mission is to help travelers discover the untamed beauty of Sri Lanka — from misty
            mountain hikes and breathtaking waterfalls to thrilling safaris and coastal escapes.
          </p>

          <div 
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-300"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:bg-yellow-400/20 transition">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">🌄 Our Vision</h3>
              <p>To inspire people to explore the world responsibly while protecting nature and culture.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:bg-yellow-400/20 transition">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">🧭 Our Mission</h3>
              <p>To offer sustainable travel experiences that connect travelers with Sri Lanka’s soul.</p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-lg hover:bg-yellow-400/20 transition">
              <h3 className="text-xl font-semibold text-yellow-400 mb-2">🤝 Our Promise</h3>
              <p>We promise unforgettable adventures, eco-friendly practices, and meaningful connections.</p>
            </div>
          </div>

          <Link to="/about-more">
            <button 
              className="mt-10 bg-yellow-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-yellow-500 transition"
              data-aos="zoom-in"
              data-aos-delay="500"
            >
              Read More
            </button>
          </Link>
          
         
        </div>
      </section>

      {/* DESTINATIONS SECTION - Updated to fix mobile card sizing */}
      <section
      id="destination"
        className="py-20 bg-gradient-to-br from-gray-900 to-black"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 
            className="text-4xl font-bold text-center mb-4 text-white"
            data-aos="fade-up"
          >
            POPULAR <span className="text-yellow-500">DESTINATIONS</span>
          </h2>
          <p 
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Explore the most breathtaking destinations Sri Lanka has to offer.
          </p>

          <div className="relative">
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'} gap-8`}>
              {isMobile ? (
                // Mobile view - show only the current card with proper sizing
                <div
                  key={allDestinations[currentIndex].id}
                  className="rounded-xl overflow-hidden shadow-xl bg-gray-800 hover:bg-gray-700 transition-all group"
                  data-aos="fade-up"
                  data-aos-delay={allDestinations[currentIndex].delay}
                >
                  <div className="relative">
                    <img
                      src={allDestinations[currentIndex].image}
                      alt={allDestinations[currentIndex].name}
                      className="w-full h-48 object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                      ★ {allDestinations[currentIndex].rating}
                    </div>
                  </div>
                  <div className="flex flex-col p-4 bg-gray-800">
                    <h3 className="text-white font-bold text-lg mb-2">{allDestinations[currentIndex].name}</h3>
                    <p className="text-gray-300 text-sm mb-4 flex-grow">{allDestinations[currentIndex].description}</p>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(allDestinations[currentIndex].link);
                      }}
                      className="py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition w-full"
                    >
                      Explore
                    </button>
                  </div>
                </div>
              ) : (
                // Desktop view - show all cards
                allDestinations.slice(currentIndex, currentIndex + 4).map((destination) => (
                  <div
                    key={destination.id}
                    className="flex flex-col h-80 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                    onClick={() => navigate(destination.link)}
                    data-aos="fade-up"
                    data-aos-delay={destination.delay}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="w-full h-32 object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute top-2 right-2 bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold">
                        ★ {destination.rating}
                      </div>
                    </div>
                    <div className="flex flex-col flex-grow p-4 bg-gray-800">
                      <h3 className="text-white font-bold text-lg mb-2">{destination.name}</h3>
                      <p className="text-gray-300 text-sm mb-4 flex-grow">{destination.description}</p>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(destination.link);
                        }}
                        className="py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition w-full"
                      >
                        Explore
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Card indicators for mobile */}
            {isMobile && (
              <div className="flex justify-center mt-4 space-x-2">
                {allDestinations.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === currentIndex ? 'bg-yellow-500' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to destination ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Navigation Arrows - Show below cards on mobile */}
          <div className={`${isMobile ? 'flex justify-center mt-6 space-x-4' : 'absolute left-0 right-0 top-1/2 transform -translate-y-1/2 px-4'}`}>
            <button
              onClick={() => {
                prevDestinations();
                setIsAutoPlaying(false);
              }}
              className={`${isMobile ? 'bg-black/50 hover:bg-black/70' : 'absolute left-0 bg-black/50 hover:bg-black/70'} text-white p-3 rounded-full shadow-lg transition-all duration-300`}
              aria-label="Previous destination"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => {
                nextDestinations();
                setIsAutoPlaying(false);
              }}
              className={`${isMobile ? 'bg-black/50 hover:bg-black/70' : 'absolute right-0 bg-black/50 hover:bg-black/70'} text-white p-3 rounded-full shadow-lg transition-all duration-300`}
              aria-label="Next destination"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION - Updated to match CardsSection design */}
      <section 
        className="py-20 bg-gradient-to-br from-gray-900 to-black"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 
            className="text-4xl font-bold text-center mb-4 text-white"
            data-aos="fade-up"
          >
            OUR <span className="text-yellow-500">SERVICES</span>
          </h2>
          <p 
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            We offer unforgettable experiences with our expertly crafted adventure packages.
          </p>
          
          <div className="relative">
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'} gap-8`}>
              {isMobile ? (
                // Mobile view - show only the current card
                <div
                  key={services[servicesIndex].id}
                  className="rounded-xl overflow-hidden shadow-xl bg-gray-800 hover:bg-gray-700 transition-all group relative h-64"
                  data-aos="fade-up"
                  data-aos-delay={services[servicesIndex].delay}
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${services[servicesIndex].image})` }}
                  ></div>
                  <div className="absolute inset-0 bg-black/50"></div>
                  <div className="relative z-10 h-full flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold text-white mb-1">{services[servicesIndex].title}</h3>
                    <p className="text-gray-200 text-xs mb-4">{services[servicesIndex].description}</p>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(services[servicesIndex].link, { state: { fromReadMore: true } });
                      }}
                      className="py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition text-sm"
                    >
                      Read More
                    </button>
                  </div>
                </div>
              ) : (
                // Desktop view - show all cards
                services.slice(servicesIndex, servicesIndex + 3).map((service, i) => (
                  <div
                    key={service.id}
                    className="rounded-xl overflow-hidden shadow-xl bg-gray-800 hover:bg-gray-700 transition-all group relative h-64"
                    data-aos="fade-up"
                    data-aos-delay={service.delay}
                  >
                    <div 
                      className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                      style={{ backgroundImage: `url(${service.image})` }}
                    ></div>
                    <div className="absolute inset-0 bg-black/50"></div>
                    <div className="relative z-10 h-full flex flex-col justify-end p-4">
                      <h3 className="text-lg font-bold text-white mb-1">{service.title}</h3>
                      <p className="text-gray-200 text-xs mb-4">{service.description}</p>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(service.link, { state: { fromReadMore: true } });
                        }}
                        className="py-2 border-2 border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500 hover:text-black transition text-sm"
                      >
                        Read More
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            
            {/* Card indicators for mobile */}
            {isMobile && (
              <div className="flex justify-center mt-4 space-x-2">
                {services.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setServicesIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === servicesIndex ? 'bg-yellow-500' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to service ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Navigation Arrows - Show below cards on mobile */}
          <div className={`${isMobile ? 'flex justify-center mt-6 space-x-4' : 'absolute left-0 right-0 top-1/2 transform -translate-y-1/2 px-4'}`}>
            <button
              onClick={() => {
                prevServices();
              }}
              className={`${isMobile ? 'bg-black/50 hover:bg-black/70' : 'absolute left-0 bg-black/50 hover:bg-black/70'} text-white p-3 rounded-full shadow-lg transition-all duration-300`}
              aria-label="Previous service"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => {
                nextServices();
              }}
              className={`${isMobile ? 'bg-black/50 hover:bg-black/70' : 'absolute right-0 bg-black/50 hover:bg-black/70'} text-white p-3 rounded-full shadow-lg transition-all duration-300`}
              aria-label="Next service"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>
      </section>

      {/* GOOGLE REVIEWS SECTION - Updated to work like other sections in mobile view */}
      <section 
        className="py-20 bg-gradient-to-br from-gray-900 to-black"
        data-aos="fade-up"
      >
        <div className="max-w-6xl mx-auto px-6">
          <h2 
            className="text-4xl font-bold text-center mb-4 text-white"
            data-aos="fade-up"
          >
            GOOGLE <span className="text-yellow-500">REVIEWS</span>
          </h2>
          <p 
            className="text-gray-400 text-center mb-16 max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            Don't just take our word for it. Here's what our travelers have to say about their experiences with Smile Sri Lanka.
          </p>

          <div className="relative">
            <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'} gap-8`}>
              {isMobile ? (
                // Mobile view - show only the current review card
                <div
                  key={reviews[reviewsIndex].id}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all"
                  data-aos="fade-up"
                  data-aos-delay={reviews[reviewsIndex].delay}
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl mr-4">
                      {reviews[reviewsIndex].avatar}
                    </div>
                    <div>
                      <h3 className="text-white font-bold">{reviews[reviewsIndex].name}</h3>
                      <div className="flex text-yellow-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <span key={i}>{i < reviews[reviewsIndex].rating ? '★' : '☆'}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-300">
                    {reviews[reviewsIndex].review}
                  </p>
                </div>
              ) : (
                // Desktop view - show all reviews
                reviews.slice(reviewsIndex, reviewsIndex + 3).map((review, i) => (
                  <div 
                    key={review.id} 
                    className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 hover:border-yellow-500/50 transition-all"
                    data-aos="fade-up"
                    data-aos-delay={review.delay}
                  >
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-black font-bold text-xl mr-4">
                        {review.avatar}
                      </div>
                      <div>
                        <h3 className="text-white font-bold">{review.name}</h3>
                        <div className="flex text-yellow-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300">
                      {review.review}
                    </p>
                  </div>
                ))
              )}
            </div>
            
            {/* Card indicators for mobile */}
            {isMobile && (
              <div className="flex justify-center mt-4 space-x-2">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setReviewsIndex(index)}
                    className={`w-3 h-3 rounded-full ${
                      index === reviewsIndex ? 'bg-yellow-500' : 'bg-gray-600'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
          
          {/* Navigation Arrows - Show below cards on mobile */}
          <div className={`${isMobile ? 'flex justify-center mt-6 space-x-4' : 'absolute left-0 right-0 top-1/2 transform -translate-y-1/2 px-4'}`}>
            <button
              onClick={() => {
                prevReviews();
              }}
              className={`${isMobile ? 'bg-black/50 hover:bg-black/70' : 'absolute left-0 bg-black/50 hover:bg-black/70'} text-white p-3 rounded-full shadow-lg transition-all duration-300`}
              aria-label="Previous review"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => {
                nextReviews();
              }}
              className={`${isMobile ? 'bg-black/50 hover:bg-black/70' : 'absolute right-0 bg-black/50 hover:bg-black/70'} text-white p-3 rounded-full shadow-lg transition-all duration-300`}
              aria-label="Next review"
            >
              <ChevronRight size={24} />
            </button>
          </div>
          
          <div className="text-center mt-12">
            <button 
              onClick={() => window.open('https://www.google.com/search?q=smile+sri+lanka+reviews', '_blank')}
              className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-full font-bold text-white hover:from-yellow-600 hover:to-amber-700 transition-all transform hover:scale-105"
            >
              Read More Reviews
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;