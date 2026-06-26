import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const PackageTemplate = () => {
  // In a real app, this data would come from an API or context
  const { id } = useParams();
  
  // Sample package data
  const packages = {
    "cultural-triangle": {
      id: 1,
      name: "Cultural Triangle Explorer",
      description: "Discover Sri Lanka's ancient capitals and UNESCO World Heritage sites",
      longDescription: "Our Cultural Triangle Explorer package takes you on a journey through Sri Lanka's most significant historical sites. This carefully curated experience covers the ancient cities of Sigiriya, Dambulla, Polonnaruwa, and the sacred city of Kandy. With expert guides, comfortable accommodations, and seamless transportation, you'll gain deep insights into Sri Lanka's rich cultural heritage and architectural marvels.",
      detailedInfo: [
        {
          title: "Sigiriya & Dambulla",
          content: "Begin your journey at the iconic Sigiriya Rock Fortress, a UNESCO World Heritage site and one of the best-preserved examples of ancient urban planning. Explore the magnificent Dambulla Cave Temple, a complex of five caves with over 150 Buddha statues and intricate murals dating back to the 1st century BC.",
          image: "https://i.pinimg.com/1200x/30/46/e9/3046e9570249a5a9fd506ffc39931f6f.jpg"
        },
        {
          title: "Ancient Polonnaruwa",
          content: "Step back in time as you explore the well-preserved ruins of the ancient Kingdom of Polonnaruwa, Sri Lanka's second capital. Marvel at the impressive Gal Vihara Buddha statues, the Parakrama Samudra reservoir, and the intricately carved stone sculptures that showcase the island's medieval architectural brilliance.",
          image: "https://i.pinimg.com/1200x/d2/ac/e5/d2ace5a57350322e85b7e0adbb0f5cc3.jpg"
        },
        {
          title: "Sacred City of Kandy",
          content: "End your cultural journey in Kandy, Sri Lanka's hill country capital and home to the revered Temple of the Sacred Tooth Relic. Experience a traditional Kandyan cultural dance performance and explore the bustling markets of this vibrant city, surrounded by lush green hills.",
          image: "https://i.pinimg.com/1200x/4c/25/af/4c25aff3a4a7e367e9c9bb942ed22454.jpg"
        }
      ],
      image: "https://i.pinimg.com/1200x/86/ef/c4/86efc4c5e3fcd3844ca67c04932afd30.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/34/c2/b4/34c2b47a32c1cfaf1b74a5d17ae1d1d2.jpg",
        "https://i.pinimg.com/1200x/f1/d0/92/f1d092ebb5901147602281a6e5292456.jpg",
        "https://i.pinimg.com/1200x/17/ec/a8/17eca8517399bd3a00674435f185be13.jpg",
        "https://i.pinimg.com/1200x/61/bf/8e/61bf8e746fbd4f2a68b112841ebc236d.jpg"
      ],
      price: "$999",
      duration: "4 Night, 5 Day package",
      rating: 4.7,
      bestTime: "December to April",
      inclusions: [
        "4-star accommodation for 4 nights",
        "Daily breakfast & dinner",
        "All entrance fees",
        "Professional English-speaking guide",
        "Private air-conditioned transportation",
        "Airport transfers",
        "Cultural dance performance",
        "24/7 customer support"
      ],
      exclusions: [
        "International flights",
        "Lunch",
        "Personal expenses",
        "Travel insurance",
        "Tips and gratuities",
        "Optional activities"
      ],
      facts: [
        "UNESCO World Heritage sites included",
        "Expert local guides",
        "Comfortable 4-star hotels",
        "Seamless transportation",
        "Cultural performances included",
        "Historical insights provided"
      ],
      color: "yellow"
    },
    "hill-country": {
      id: 2,
      name: "Hill Country Retreat",
      description: "Experience the cool climate and scenic beauty of Sri Lanka's hill country",
      longDescription: "Our Hill Country Retreat package offers a refreshing escape to Sri Lanka's cooler highlands. Experience the charm of tea plantations, scenic train rides, and breathtaking mountain vistas. From the colonial-era town of Nuwara Eliya to the laid-back vibe of Ella, this package showcases the best of Sri Lanka's hill country with comfortable accommodations and expert guidance.",
      detailedInfo: [
        {
          title: "Tea Plantations & Nuwara Eliya",
          content: "Explore the lush tea estates of Nuwara Eliya, known as 'Little England' for its colonial architecture and cool climate. Visit working tea factories to learn about the tea-making process and enjoy panoramic views of endless green tea fields. Stroll through the beautiful Hakgala Botanical Gardens and Victoria Park.",
          image: "https://i.pinimg.com/1200x/82/1d/97/821d97af995e4c858e4d731e85f321d4.jpg"
        },
        {
          title: "Scenic Train Journey to Ella",
          content: "Experience one of the world's most scenic train rides from Kandy to Ella, passing through misty mountains, lush tea estates, and charming villages. The journey includes the famous 9 arches bridge and offers spectacular views of the hill country landscape. This is truly a highlight of any Sri Lanka trip.",
          image: "https://i.pinimg.com/1200x/bc/57/e4/bc57e45bcfc06b64c9400cfae6e26f1c.jpg"
        },
        {
          title: "Ella Adventures",
          content: "Discover the laid-back mountain town of Ella, perfect for hiking and relaxation. Visit Little Adam's Peak for sunrise views, explore Ella Rock for panoramic vistas, and walk through the beautiful Ravana Falls and Nine Arch Bridge. Enjoy the town's vibrant atmosphere and local cuisine.",
          image: "https://i.pinimg.com/1200x/d7/18/f7/d718f7ed1b6fd374affd12f6aae41434.jpg"
        }
      ],
      image: "https://i.pinimg.com/1200x/c0/6d/62/c06d62de135a1665983e6fd5cb7231f1.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/9d/fd/83/9dfd8303be2fbc944dd12d453dc1f1cd.jpg",
        "https://i.pinimg.com/1200x/c4/fe/02/c4fe0243d396ccfec04c459dde21bd35.jpg",
        "https://i.pinimg.com/1200x/e7/ce/bd/e7cebd77fc42a7900ae363fe3cfd11ec.jpg",
        "https://i.pinimg.com/1200x/2e/26/84/2e26848d189b1fcaf0d5e8e8b700a571.jpg"
      ],
      price: "$899",
      duration: "4 Night, 5 Day package",
      rating: 4.8,
      bestTime: "January to May & July to September",
      inclusions: [
        "3-star accommodation for 4 nights",
        "Daily breakfast & dinner",
        "Scenic train journey (2nd class)",
        "Hill country sightseeing",
        "Professional English-speaking guide",
        "Private transportation",
        "Airport transfers",
        "24/7 customer support"
      ],
      exclusions: [
        "International flights",
        "Lunch",
        "Personal expenses",
        "Travel insurance",
        "Tips and gratuities",
        "Optional hiking excursions"
      ],
      facts: [
        "Scenic train journey included",
        "Tea plantation visits",
        "Mountain hiking opportunities",
        "Cool climate escape",
        "Colonial-era architecture",
        "Local hill country cuisine"
      ],
      color: "green"
    },
    "beach-paradise": {
      id: 3,
      name: "Beach Paradise Getaway",
      description: "Relax on Sri Lanka's pristine beaches with water sports and coastal activities",
      longDescription: "Our Beach Paradise Getaway package is perfect for travelers seeking relaxation and adventure on Sri Lanka's stunning coastline. With luxurious beachfront accommodations, exciting water sports, and leisurely beach activities, this package offers the ultimate tropical getaway experience along the beautiful southern coast.",
      detailedInfo: [
        {
          title: "Luxurious Beach Accommodations",
          content: "Stay at premium beachfront resorts in Unawatuna or Mirissa with direct access to pristine sandy beaches. Enjoy spacious rooms with ocean views, private balconies, and all modern amenities. Most properties feature multiple swimming pools, beachside dining options, and luxurious spa facilities.",
          image: "https://i.pinimg.com/1200x/a5/c8/4b/a5c84b8d2aa6ab31948a618ff3d42574.jpg"
        },
        {
          title: "Exciting Water Sports",
          content: "Experience the thrill of various water sports including snorkeling, scuba diving, surfing, and whale watching. Our expert instructors ensure your safety while helping you make the most of these exciting activities. All equipment is included in the package, and sessions are suitable for beginners to advanced participants.",
          image: "https://i.pinimg.com/1200x/e1/e5/19/e1e51966ce9279a838ba016545a239bb.jpg"
        },
        {
          title: "Leisurely Beach Activities",
          content: "Unwind with relaxing beach activities such as yoga sessions, beach volleyball, sunset cruises, and fishing trips. Enjoy beachside dining experiences with fresh seafood and local cuisine while watching the sunset over the Indian Ocean. Optional Ayurvedic spa treatments are available for ultimate relaxation.",
          image: "https://i.pinimg.com/1200x/77/b5/e0/77b5e0e45540bc47fb285bec43689416.jpg"
        }
      ],
      image: "https://i.pinimg.com/1200x/4a/53/4c/4a534c0f260f33300d256e2509a30b6c.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/40/ac/ca/40acca7bd1c51b1d31fc93d4abd27aaf.jpg",
        "https://i.pinimg.com/1200x/d4/f7/ea/d4f7ea439a05bffad51a6a6e99337961.jpg",
        "https://i.pinimg.com/1200x/8f/3a/3d/8f3a3d8e1f1e1e1e1e1e1e1e1e1e1e1e.jpg",
        "https://i.pinimg.com/1200x/9f/4a/3d/9f4a3d9e1f1e1e1e1e1e1e1e1e1e1e1e.jpg"
      ],
      price: "$1,299",
      duration: "5 Night, 6 Day package",
      rating: 4.9,
      bestTime: "November to April",
      inclusions: [
        "Beachfront resort stay for 5 nights",
        "Daily breakfast & dinner",
        "Water sports activities",
        "Snorkeling & diving sessions",
        "Whale watching experience",
        "Sunset cruise",
        "Ayurvedic spa treatment",
        "24/7 beach service",
        "Airport transfers",
        "Professional English-speaking guide"
      ],
      exclusions: [
        "International flights",
        "Lunch",
        "Personal expenses",
        "Travel insurance",
        "Tips and gratuities",
        "Additional spa treatments"
      ],
      facts: [
        "Stunning beachfront locations",
        "Exciting water sports included",
        "Whale watching experience",
        "Ayurvedic spa treatment",
        "Sunset cruise included",
        "Luxury beach accommodations"
      ],
      color: "teal"
    },
    "wildlife-safari": {
      id: 4,
      name: "Wildlife Safari Adventure",
      description: "Spot leopards, elephants and diverse wildlife in Sri Lanka's national parks",
      longDescription: "Our Wildlife Safari Adventure package is designed for nature and adventure enthusiasts who wish to experience Sri Lanka's breathtaking biodiversity. From thrilling jeep safaris to guided birdwatching and luxury stays in eco-lodges, this package brings you closer to the wild heart of the island while ensuring comfort and sustainability throughout your journey.",
      detailedInfo: [
        {
          title: "Safari Adventures in Yala & Minneriya",
          content: "Embark on unforgettable safari experiences in Sri Lanka's most famous national parks - Yala and Minneriya. Witness majestic leopards, elephants, sloth bears, crocodiles, and diverse birdlife in their natural habitats with professional wildlife guides ensuring a safe and educational experience. Yala is famous for leopard sightings, while Minneriya is known for the spectacular elephant gathering.",
          image: "https://i.pinimg.com/1200x/a7/b1/84/a7b18422aa536f06787a56a3cad3eb65.jpg"
        },
        {
          title: "Stay at Eco-Lodges & Nature Resorts",
          content: "Enjoy comfort blended with nature at premium eco-lodges and jungle retreats located near national parks. These properties are designed for sustainability with natural materials, open-air dining, and stunning forest views. Relax by the campfire under starlit skies after a day of adventure, listening to the sounds of the jungle.",
          image: "https://i.pinimg.com/1200x/dc/a3/10/dca310fc68843d2b49bd8c19665cb80e.jpg"
        },
        {
          title: "Birdwatching & Nature Trails",
          content: "Sri Lanka is a paradise for birdwatchers, home to over 400 species including 33 endemics. Join our guided nature trails through wetlands, forests, and hill country sanctuaries to spot colorful species such as the Sri Lankan Blue Magpie, Junglefowl, and Crimson-backed Flameback. Learn about the island's diverse ecosystems and conservation efforts.",
          image: "https://i.pinimg.com/1200x/f8/c1/a6/f8c1a6354a93efb398d798cdd8b8820c.jpg"
        }
      ],
      image: "https://i.pinimg.com/1200x/66/38/22/6638227f653785e3bafc15ab7f74dd6c.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/02/64/d9/0264d9da41fc4f74f2c87017c484c650.jpg",
        "https://i.pinimg.com/1200x/db/80/dd/db80dd2eee98267bcc26a074bf56e705.jpg",
        "https://i.pinimg.com/1200x/7a/4b/a0/7a4ba05a3156765bb3553f3654f99da4.jpg",
        "https://i.pinimg.com/1200x/b8/ce/21/b8ce21a0ab8106131db7ff2d61002664.jpg"
      ],
      price: "$1,499",
      duration: "5 Night, 6 Day package",
      rating: 4.9,
      bestTime: "February to September",
      inclusions: [
        "Accommodation in 4-star eco-lodges and nature resorts",
        "All meals included",
        "Two guided safaris in Yala & Minneriya",
        "Birdwatching & nature walks",
        "Transportation with private chauffeur",
        "Entrance fees to all parks",
        "Professional wildlife guide",
        "Airport transfers",
        "24/7 assistance"
      ],
      exclusions: [
        "International flights",
        "Personal expenses",
        "Alcoholic beverages",
        "Travel insurance",
        "Tips and gratuities",
        "Optional night safaris or extra excursions"
      ],
      facts: [
        "Witness leopards and elephants in the wild",
        "Stay at sustainable eco-lodges",
        "Expert-guided safaris and birdwatching",
        "Covers both Yala and Minneriya parks",
        "Ideal for wildlife photographers",
        "Professional naturalist guides"
      ],
      color: "safari-brown"
    },
    "southern-coast": {
      id: 5,
      name: "Southern Coast Explorer",
      description: "Explore the historical and cultural sites of Sri Lanka's southern coast",
      longDescription: "Our Southern Coast Explorer package takes you on a captivating journey along Sri Lanka's beautiful southern coastline. From the historic Galle Fort to pristine beaches and sacred temples, this package combines cultural heritage with coastal beauty. Experience the unique blend of history, culture, and natural beauty that makes this region so special.",
      detailedInfo: [
        {
          title: "Historic Galle Fort",
          content: "Explore the UNESCO World Heritage Galle Fort, a perfectly preserved 17th-century fortress built by the Portuguese and later expanded by the Dutch. Wander through the cobblestone streets, admire the colonial architecture, visit the Maritime Museum, and enjoy panoramic views from the fort walls. The fort is a living testament to Sri Lanka's maritime history.",
          image: "https://i.pinimg.com/736x/23/7a/7b/237a7b52854312546872cf2306d50241.jpg"
        },
        {
          title: "Coastal Beaches & Villages",
          content: "Discover the pristine beaches of Tangalle and Hiriketiya, known for their golden sand and turquoise waters. Visit traditional fishing villages to see stilt fishermen and learn about local fishing techniques. Experience the laid-back coastal lifestyle and enjoy fresh seafood prepared with traditional Sri Lankan spices.",
          image: "https://i.pinimg.com/1200x/9b/9c/fb/9b9cfb4d0d07f0a82b8a52e20d1672be.jpg"
        },
        {
          title: "Sacred Sites & Cultural Experiences",
          content: "Visit the sacred Katharagama Temple, one of Sri Lanka's most important pilgrimage sites dedicated to Lord Skanda. Experience the vibrant atmosphere during festivals and learn about the unique blend of Buddhist, Hindu, and indigenous beliefs. Also visit the Martin Wickramasinghe Folk Museum to understand local traditions and way of life.",
          image: "https://i.pinimg.com/1200x/a0/2a/2e/a02a2e879a7d87fcdfed1d320adb21ce.jpg"
        }
      ],
      image: "https://i.pinimg.com/736x/e6/97/68/e69768e3843f57804d08603af25828d0.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/16/bf/a4/16bfa4aa448fc2da6e0c45e39348e00f.jpg",
        "https://i.pinimg.com/1200x/a2/b5/fe/a2b5fe5523438b97633e343d4c370fe2.jpg",
        "https://i.pinimg.com/1200x/af/a8/41/afa841010e8008279b2c224f6c9ae165.jpg",
        "https://i.pinimg.com/1200x/b7/2d/ad/b72dad18d27d89c103c62ede27e3b4c6.jpg"
      ],
      price: "$1,199",
      duration: "6 Night, 7 Day package",
      rating: 4.7,
      bestTime: "November to April",
      inclusions: [
        "4-star accommodation for 6 nights",
        "Daily breakfast & dinner",
        "Galle Fort guided tour",
        "Katharagama Temple visit",
        "Yala National Park safari",
        "Traditional fishing village visit",
        "Coastal sightseeing",
        "Professional English-speaking guide",
        "Private transportation",
        "Airport transfers",
        "24/7 customer support"
      ],
      exclusions: [
        "International flights",
        "Lunch",
        "Personal expenses",
        "Travel insurance",
        "Tips and gratuities",
        "Optional activities"
      ],
      facts: [
        "UNESCO World Heritage Galle Fort",
        "Sacred Katharagama Temple",
        "Yala National Park safari",
        "Traditional fishing villages",
        "Coastal beach experiences",
        "Local cultural interactions"
      ],
      color: "blue"
    },
    "ultimate-experience": {
      id: 6,
      name: "Ultimate Sri Lanka Experience",
      description: "Comprehensive tour covering Sri Lanka's top cultural, scenic and wildlife attractions",
      longDescription: "Our Ultimate Sri Lanka Experience package offers the most comprehensive journey through the island nation. This carefully crafted itinerary covers all major UNESCO World Heritage sites, scenic hill country train rides, thrilling wildlife safaris, beautiful beaches, and authentic cultural experiences. With luxury accommodations and personalized service, this package provides the ultimate Sri Lankan adventure.",
      detailedInfo: [
        {
          title: "Cultural Heritage & Ancient Cities",
          content: "Begin your journey through Sri Lanka's Cultural Triangle, exploring the ancient cities of Sigiriya, Dambulla, Polonnaruwa, and the sacred city of Kandy. Visit the iconic Sigiriya Rock Fortress, the magnificent Dambulla Cave Temple, and the Temple of the Sacred Tooth Relic in Kandy. Gain deep insights into Sri Lanka's rich history and architectural marvels.",
          image: "https://i.pinimg.com/1200x/61/bf/8e/61bf8e746fbd4f2a68b112841ebc236d.jpg"
        },
        {
          title: "Hill Country Scenic Journey",
          content: "Experience the breathtaking beauty of Sri Lanka's hill country with a scenic train ride from Kandy to Ella, passing through tea plantations and misty mountains. Explore Nuwara Eliya's colonial charm, visit working tea factories, and enjoy the laid-back atmosphere of Ella with hikes to Little Adam's Peak and Ella Rock.",
          image: "https://i.pinimg.com/1200x/82/1d/97/821d97af995e4c858e4d731e85f321d4.jpg"
        },
        {
          title: "Wildlife & Beach Paradise",
          content: "Embark on thrilling safaris in Yala and Minneriya National Parks to spot leopards, elephants, and diverse wildlife. Relax on the pristine beaches of Mirissa with whale watching experiences, water sports, and Ayurvedic spa treatments. This perfect combination of adventure and relaxation completes your ultimate Sri Lankan experience.",
          image: "https://i.pinimg.com/1200x/d4/f7/ea/d4f7ea439a05bffad51a6a6e99337961.jpg"
        }
      ],
      image: "https://i.pinimg.com/1200x/b8/84/77/b88477506f62b11719eee4f66a23087c.jpg",
      gallery: [
        "https://i.pinimg.com/1200x/a5/c8/4b/a5c84b8d2aa6ab31948a618ff3d42574.jpg",
        "https://i.pinimg.com/1200x/e1/e5/19/e1e51966ce9279a838ba016545a239bb.jpg",
        "https://i.pinimg.com/1200x/02/64/d9/0264d9da41fc4f74f2c87017c484c650.jpg",
        "https://i.pinimg.com/1200x/a7/b1/84/a7b18422aa536f06787a56a3cad3eb65.jpg"
      ],
      price: "$2,499",
      duration: "13 Night, 14 Day package",
      rating: 4.9,
      bestTime: "December to March",
      inclusions: [
        "5-star luxury hotels for 13 nights",
        "All meals included",
        "All major UNESCO World Heritage sites",
        "Scenic hill country train journey",
        "Yala and Minneriya safaris",
        "Whale watching experience",
        "Beach relaxation in Mirissa",
        "Ayurvedic spa treatments",
        "Cultural dance performances",
        "Private chauffeur service",
        "Professional multilingual guide",
        "Airport VIP transfers",
        "24/7 concierge service",
        "Welcome champagne"
      ],
      exclusions: [
        "International flights",
        "Personal expenses",
        "Travel insurance",
        "Tips and gratuities over 15%",
        "Optional premium activities"
      ],
      facts: [
        "All UNESCO World Heritage sites",
        "Scenic train journey included",
        "Multiple wildlife safaris",
        "Luxury 5-star accommodations",
        "VIP airport transfers",
        "Ayurvedic spa treatments",
        "Cultural performances included"
      ],
      color: "purple"
    }
  };

  const packageData = packages[id] || packages["cultural-triangle"];

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Determine color classes based on package
  const getColorClasses = (type) => {
    switch (packageData.color) {
      case 'safari-brown':
        return type === 'rating' ? 'bg-yellow-500/20 text-yellow-500' :
               type === 'price' ? 'bg-yellow-500/20 text-yellow-500' :
               type === 'heading' ? 'text-yellow-500' :
               type === 'fact' ? 'bg-yellow-500 rounded-full' :
               type === 'cta' ? 'from-yellow-600 to-yellow-800' :
               type === 'button' ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' :
               'bg-gray-800/50';
               case 'yellow':
        return type === 'rating' ? 'bg-yellow-500/20 text-yellow-500' :
               type === 'price' ? 'bg-yellow-500/20 text-yellow-500' :
               type === 'heading' ? 'text-yellow-500' :
               type === 'fact' ? 'bg-yellow-500 rounded-full' :
               type === 'cta' ? 'from-yellow-600 to-yellow-800' :
               type === 'button' ? 'bg-yellow-500 hover:bg-yellow-600 text-gray-900' :
               'bg-gray-800/50';
      case 'blue':
        return type === 'rating' ? 'bg-blue-500/20 text-blue-400' :
               type === 'price' ? 'bg-blue-500/20 text-blue-400' :
               type === 'heading' ? 'text-blue-400' :
               type === 'fact' ? 'bg-blue-400 rounded-full' :
               type === 'cta' ? 'from-blue-700 to-blue-900' :
               type === 'button' ? 'bg-blue-500 hover:bg-blue-600 text-white' :
               'bg-gray-800/50';
      case 'green':
        return type === 'rating' ? 'bg-green-500/20 text-green-400' :
               type === 'price' ? 'bg-green-500/20 text-green-400' :
               type === 'heading' ? 'text-green-400' :
               type === 'fact' ? 'bg-green-400 rounded-full' :
               type === 'cta' ? 'from-green-700 to-green-900' :
               type === 'button' ? 'bg-green-500 hover:bg-green-600 text-white' :
               'bg-gray-800/50';
      case 'teal':
        return type === 'rating' ? 'bg-teal-500/20 text-teal-400' :
               type === 'price' ? 'bg-teal-500/20 text-teal-400' :
               type === 'heading' ? 'text-teal-400' :
               type === 'fact' ? 'bg-teal-400 rounded-full' :
               type === 'cta' ? 'from-teal-700 to-teal-900' :
               type === 'button' ? 'bg-teal-500 hover:bg-teal-600 text-white' :
               'bg-gray-800/50';
      case 'purple':
        return type === 'rating' ? 'bg-purple-500/20 text-purple-400' :
               type === 'price' ? 'bg-purple-500/20 text-purple-400' :
               type === 'heading' ? 'text-purple-400' :
               type === 'fact' ? 'bg-purple-400 rounded-full' :
               type === 'cta' ? 'from-purple-700 to-purple-900' :
               type === 'button' ? 'bg-purple-500 hover:bg-purple-600 text-white' :
               'bg-gray-800/50';
      default: // gray
        return type === 'rating' ? 'bg-gray-500/20 text-gray-300' :
               type === 'price' ? 'bg-gray-500/20 text-gray-300' :
               type === 'heading' ? 'text-gray-300' :
               type === 'fact' ? 'bg-gray-400 rounded-full' :
               type === 'cta' ? 'from-gray-700 to-gray-900' :
               type === 'button' ? 'bg-gray-500 hover:bg-gray-600 text-white' :
               'bg-gray-800/50';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${packageData.image}')`
          }}
        />
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative z-10 text-center px-6 max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">{packageData.name}</h1>
          <p className="text-2xl text-gray-300 max-w-3xl mx-auto mb-8">{packageData.description}</p>
          <div className="flex flex-wrap justify-center items-center gap-4">
            <div className={`flex items-center px-4 py-2 rounded-full ${getColorClasses('rating')}`}>
              <span className="mr-2">★</span>
              <span className="font-bold">{packageData.rating}/5.0</span>
            </div>
            <div className="bg-gray-700/50 px-4 py-2 rounded-full">
              <span>{packageData.duration}</span>
            </div>
            <div className={`px-4 py-2 rounded-full ${getColorClasses('price')}`}>
              <span className="font-bold">{packageData.price}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className={`text-4xl font-bold mb-6 ${getColorClasses('heading')}`}>Discover {packageData.name}</h2>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              {packageData.longDescription}
            </p>
            <div className="grid grid-cols-2 gap-4">
              {packageData.facts.map((fact, index) => (
                <div key={index} className="flex items-center bg-gray-800/50 p-3 rounded-lg">
                  <div className={`w-2 h-2 mr-3 ${getColorClasses('fact')}`}></div>
                  <span className="text-gray-300">{fact}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src={packageData.image} 
              alt={packageData.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Detailed Sections */}
      <section className="py-16 px-6 bg-gray-900/50">
        <div className="max-w-6xl mx-auto">
          <h2 className={`text-4xl font-bold text-center mb-16 ${getColorClasses('heading')}`}>What's Included in {packageData.name}</h2>
          
          <div className="space-y-20">
            {packageData.detailedInfo.map((info, index) => (
              <div 
                key={index} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
              >
                <div className={`${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                  <h3 className="text-3xl font-bold mb-6 text-white">{info.title}</h3>
                  <p className="text-gray-300 text-lg mb-6 leading-relaxed">
                    {info.content}
                  </p>
                </div>
                <div className={`rounded-2xl overflow-hidden shadow-2xl ${index % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                  <img 
                    src={info.image} 
                    alt={info.title}
                    className="w-full h-96 object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Inclusions & Exclusions */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className={`text-4xl font-bold text-center mb-16 ${getColorClasses('heading')}`}>Package Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-800/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-green-400">What's Included</h3>
            <ul className="space-y-3">
              {packageData.inclusions.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-green-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-gray-800/50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-6 text-red-400">What's Not Included</h3>
            <ul className="space-y-3">
              {packageData.exclusions.map((item, index) => (
                <li key={index} className="flex items-start">
                  <svg className="w-5 h-5 text-red-400 mr-3 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                  <span className="text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-16 px-6 bg-gray-900/50">
        <h2 className={`text-4xl font-bold text-center mb-16 ${getColorClasses('heading')}`}>Photo Gallery</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packageData.gallery.map((img, index) => (
            <div key={index} className="rounded-xl overflow-hidden shadow-lg group">
              <div className="relative h-64">
                <img 
                  src={img} 
                  alt={`${packageData.name} ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <span className="text-white text-lg font-bold"></span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Booking CTA */}
      <section className="py-20 px-6">
        <div className={`max-w-4xl mx-auto text-center rounded-3xl p-12 bg-gradient-to-r ${getColorClasses('cta')}`}>
          <h2 className="text-4xl font-bold mb-6">Ready for Your Sri Lankan Adventure?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Book your {packageData.name} package with Smile Sri Lanka and experience the magic of Sri Lanka.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to={`/book?package=${packageData.id}`} 
              className={`font-bold py-4 px-8 rounded-full transition duration-300 transform hover:-translate-y-1 ${getColorClasses('button')}`}
            >
              Book Now - {packageData.price}
            </Link>
            <Link to="/contact">
            <button className="bg-white/20 hover:bg-white/30 text-white font-bold py-4 px-8 rounded-full transition duration-300 backdrop-blur-sm">
              Contact Us
            </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PackageTemplate;