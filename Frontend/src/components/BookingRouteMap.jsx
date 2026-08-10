import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/leaflet.css";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const routeAliases = {
  "Wildlife Safari Adventure": "Yala National Park",
  "Hill Country Retreat": "Kandy Temple",
  "Golden Experience": "Kandy Temple",
  "Beach Paradise Getaway": "Unawatuna Beach",
  "Southern Coast Explorer": "Galle Fort",
  "Ultimate Sri Lanka Experience": "Sigiriya Rock Fortress",
  "Cultural Triangle Explorer": "Dambulla Cave Temple",
};

const routeData = {
  "Sigiriya Rock Fortress": {
    title: "Colombo to Sigiriya",
    description: "Travel from Colombo to the historic Sigiriya Rock Fortress with stops at key cultural and natural sites.",
    path: [
      [6.9271, 79.8612],
      [7.4060, 80.3810],
      [7.8587, 80.6521],
      [7.9560, 80.7600],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Start your journey from Sri Lanka's capital." },
      { name: "Pinnawala Elephant Orphanage", position: [7.4060, 80.3810], note: "A great wildlife stop en route." },
      { name: "Dambulla Cave Temple", position: [7.8587, 80.6521], note: "Ancient cave temples before reaching Sigiriya." },
      { name: "Sigiriya Rock Fortress", position: [7.9560, 80.7600], note: "Your destination and UNESCO heritage site." },
    ],
    hotels: [
      { name: "Heritance Kandalama", position: [7.9609, 80.7724], rating: 4.7 },
      { name: "Hotel Sigiriya", position: [7.9561, 80.7695], rating: 4.4 },
    ],
  },
  "Kandy Temple": {
    title: "Colombo to Kandy",
    description: "Drive into Sri Lanka's cultural heart with a stop at the famous Pinnawala Elephant Orphanage.",
    path: [
      [6.9271, 79.8612],
      [7.4060, 80.3810],
      [7.2906, 80.6337],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Begin in Colombo." },
      { name: "Pinnawala Elephant Orphanage", position: [7.4060, 80.3810], note: "Wildlife experience stop." },
      { name: "Kandy Temple", position: [7.2906, 80.6337], note: "Sacred temple and cultural center." },
    ],
    hotels: [
      { name: "The Kandy House", position: [7.2674, 80.6060], rating: 4.6 },
      { name: "Earl's Regency", position: [7.2760, 80.6266], rating: 4.3 },
    ],
  },
  "Ella Rock": {
    title: "Colombo to Ella",
    description: "A scenic route through the hills with tea gardens and waterfalls before arriving at Ella.",
    path: [
      [6.9271, 79.8612],
      [6.7729, 80.0120],
      [6.9497, 80.7890],
      [6.8559, 81.0536],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Begin in Colombo." },
      { name: "Nuwara Eliya", position: [6.9497, 80.7890], note: "Hill station with tea estates." },
      { name: "Ella Rock", position: [6.8559, 81.0536], note: "Popular hiking destination." },
    ],
    hotels: [
      { name: "98 Acres Resort", position: [6.8809, 81.0435], rating: 4.8 },
      { name: "Ella Jungle Resort", position: [6.8595, 81.0535], rating: 4.5 },
    ],
  },
  "Yala National Park": {
    title: "Colombo to Yala",
    description: "Journey through southern Sri Lanka to the famous Yala National Park safari region.",
    path: [
      [6.9271, 79.8612],
      [6.3750, 80.3530],
      [6.3610, 81.4150],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Start from the capital." },
      { name: "Galle Fort", position: [6.0250, 80.2190], note: "Historic fort city by the coast." },
      { name: "Yala National Park", position: [6.3610, 81.4150], note: "End your safari experience here." },
    ],
    hotels: [
      { name: "Jetwing Yala", position: [6.3546, 81.4265], rating: 4.4 },
      { name: "Leopard Trails", position: [6.3475, 81.4108], rating: 4.7 },
    ],
  },
  "Galle Fort": {
    title: "Colombo to Galle",
    description: "Head south along the coast to Galle Fort and enjoy historic sites and seaside charm.",
    path: [
      [6.9271, 79.8612],
      [6.3510, 80.0020],
      [6.0250, 80.2190],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Start from Colombo." },
      { name: "Bentota", position: [6.4200, 79.9870], note: "Beach and river stop." },
      { name: "Galle Fort", position: [6.0250, 80.2190], note: "UNESCO heritage fort city." },
    ],
    hotels: [
      { name: "Jetwing Lighthouse", position: [6.0297, 80.2197], rating: 4.5 },
      { name: "Fort Bazaar", position: [6.0253, 80.2184], rating: 4.6 },
    ],
  },
  "Unawatuna Beach": {
    title: "Colombo to Unawatuna",
    description: "A coastal route to one of Sri Lanka’s most beautiful beach destinations.",
    path: [
      [6.9271, 79.8612],
      [6.0250, 80.2190],
      [5.9420, 80.2800],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Start in the city." },
      { name: "Galle", position: [6.0250, 80.2190], note: "Historic coastal stop." },
      { name: "Unawatuna Beach", position: [5.9420, 80.2800], note: "Final beach destination." },
    ],
    hotels: [
      { name: "Thaproban Pavilion Resort", position: [5.9403, 80.2805], rating: 4.4 },
      { name: "Calamander Unawatuna", position: [5.9451, 80.2762], rating: 4.5 },
    ],
  },
  "Nuwara Eliya": {
    title: "Colombo to Nuwara Eliya",
    description: "Drive into the tea country with winding mountain roads and emerald plantations.",
    path: [
      [6.9271, 79.8612],
      [6.7729, 80.0120],
      [6.9497, 80.7890],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Depart from the capital." },
      { name: "Ramboda Falls", position: [6.9311, 80.7359], note: "Spectacular waterfall stop." },
      { name: "Nuwara Eliya", position: [6.9497, 80.7890], note: "Hill town with tea estates." },
    ],
    hotels: [
      { name: "Heritance Tea Factory", position: [6.8975, 80.7555], rating: 4.4 },
      { name: "The Grand Hotel", position: [6.9582, 80.7718], rating: 4.3 },
    ],
  },
  "Dambulla Cave Temple": {
    title: "Colombo to Dambulla",
    description: "A cultural route that passes ancient sites before the famous Dambulla Cave Temple.",
    path: [
      [6.9271, 79.8612],
      [7.4060, 80.3810],
      [7.8587, 80.6521],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Start in Colombo." },
      { name: "Pinnawala", position: [7.4060, 80.3810], note: "Elephant orphanage stop." },
      { name: "Dambulla Cave Temple", position: [7.8587, 80.6521], note: "UNESCO temple caves." },
    ],
    hotels: [
      { name: "Cinnamon Lodge Dambulla", position: [7.8552, 80.6569], rating: 4.2 },
      { name: "Heritance Kandalama", position: [7.9609, 80.7724], rating: 4.7 },
    ],
  },
  "Horton Plains": {
    title: "Colombo to Horton Plains",
    description: "Head to the highest plateau in Sri Lanka with dramatic views and cool climate.",
    path: [
      [6.9271, 79.8612],
      [6.9497, 80.7890],
      [6.8027, 80.7668],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Begin in the capital." },
      { name: "Nuwara Eliya", position: [6.9497, 80.7890], note: "Tea country stop." },
      { name: "Horton Plains", position: [6.8027, 80.7668], note: "World's End plateau." },
    ],
    hotels: [
      { name: "Grand Hotel", position: [6.9582, 80.7718], rating: 4.3 },
      { name: "The Hill Club", position: [6.9701, 80.7826], rating: 4.4 },
    ],
  },
  "Anuradhapura": {
    title: "Colombo to Anuradhapura",
    description: "Travel north to the ancient city of Anuradhapura with pilgrimage and historic temples.",
    path: [
      [6.9271, 79.8612],
      [7.4060, 80.3810],
      [8.3114, 80.4037],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Start in Colombo." },
      { name: "Mihintale", position: [8.3410, 80.4027], note: "Spiritual pilgrimage stop." },
      { name: "Anuradhapura", position: [8.3114, 80.4037], note: "Ancient sacred city." },
    ],
    hotels: [
      { name: "Uga Ulagalla", position: [8.3800, 80.3512], rating: 4.8 },
      { name: "Palm Garden Village", position: [8.3349, 80.3893], rating: 4.1 },
    ],
  },
  "Mirissa Beach": {
    title: "Colombo to Mirissa",
    description: "A relaxed coastal drive to Mirissa with beach stops and ocean views.",
    path: [
      [6.9271, 79.8612],
      [6.0250, 80.2190],
      [5.9485, 80.4600],
    ],
    stops: [
      { name: "Colombo", position: [6.9271, 79.8612], note: "Start from Colombo." },
      { name: "Galle", position: [6.0250, 80.2190], note: "Coastal fort stop." },
      { name: "Mirissa Beach", position: [5.9485, 80.4600], note: "Relaxed beach destination." },
    ],
    hotels: [
      { name: "Sri Sharavi Beach Villas", position: [5.9473, 80.4552], rating: 4.7 },
      { name: "Casa Rosa", position: [5.9495, 80.4622], rating: 4.3 },
    ],
  },
};

const FitBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds.length) {
      map.fitBounds(bounds, { padding: [32, 32] });
    }
  }, [map, bounds]);

  return null;
};

const BookingRouteMap = ({ booking }) => {
  if (!booking) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">Select a booking to view the route map</h3>
        <p className="mt-2 text-slate-300">Choose one of your upcoming trips to see the Colombo route, attractions, and hotels.</p>
      </div>
    );
  }

  const normalizeService = (service) => service?.trim()?.toLowerCase();
  const normalizedRouteData = Object.keys(routeData).reduce((acc, key) => {
    acc[normalizeService(key)] = key;
    return acc;
  }, {});

  const effectiveRouteKey =
    normalizedRouteData[normalizeService(booking.service)] ||
    routeAliases[booking.service] ||
    routeAliases[Object.keys(routeAliases).find((alias) => normalizeService(alias) === normalizeService(booking.service))];

  const route = routeData[effectiveRouteKey] || routeData[routeAliases[booking.service]];

  if (!route) {
    return (
      <div className="rounded-3xl border border-white/10 bg-slate-950/70 p-8 text-center">
        <h3 className="text-xl font-semibold text-white">No route map available</h3>
        <p className="mt-2 text-slate-300">This booking does not match a destination route yet.</p>
      </div>
    );
  }

  const bounds = route.path;

  return (
    <section className="rounded-3xl border border-white/10 bg-slate-950/80 p-6">
      <div className="mb-6">
        <h3 className="text-2xl font-bold text-white">{route.title}</h3>
        <p className="mt-2 text-slate-300">{route.description}</p>
      </div>

      <div className="rounded-3xl overflow-hidden border border-white/10 shadow-xl">
        <MapContainer center={bounds[0]} zoom={7} scrollWheelZoom className="h-96 w-full bg-slate-900">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <FitBounds bounds={bounds} />
          <Polyline positions={route.path} pathOptions={{ color: "#FBBF24", weight: 4, opacity: 0.9, dashArray: "8 6" }} />
          {route.stops.map((stop) => (
            <Marker key={`stop-${stop.name}`} position={stop.position}>
              <Popup>
                <strong>{stop.name}</strong>
                <br />
                {stop.note}
              </Popup>
            </Marker>
          ))}
          {route.hotels.map((hotel) => (
            <Marker key={`hotel-${hotel.name}`} position={hotel.position}>
              <Popup>
                <strong>{hotel.name}</strong>
                <br />Rating: {hotel.rating} ★
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      <div className="grid gap-4 md:grid-cols-2 mt-6">
        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
          <h4 className="font-semibold text-white mb-3">Route Stops</h4>
          <ul className="space-y-3 text-slate-300">
            {route.stops.map((stop) => (
              <li key={stop.name} className="rounded-2xl bg-slate-950/70 p-3">
                <p className="font-semibold text-white">{stop.name}</p>
                <p className="text-sm">{stop.note}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-3xl border border-white/10 bg-slate-900/70 p-4">
          <h4 className="font-semibold text-white mb-3">Suggested Hotels</h4>
          <ul className="space-y-3 text-slate-300">
            {route.hotels.map((hotel) => (
              <li key={hotel.name} className="rounded-2xl bg-slate-950/70 p-3">
                <p className="font-semibold text-white">{hotel.name}</p>
                <p className="text-sm">Rating: {hotel.rating} ★</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BookingRouteMap;
