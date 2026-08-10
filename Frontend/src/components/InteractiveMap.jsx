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

const tourLocations = [
  {
    id: "sigiriya",
    name: "Sigiriya Rock Fortress",
    position: [7.956, 80.760],
    description: "Ancient rock fortress and world heritage site.",
  },
  {
    id: "kandy",
    name: "Kandy Temple",
    position: [7.2906, 80.6337],
    description: "Sacred Buddhist temple and cultural heart of Sri Lanka.",
  },
  {
    id: "ella",
    name: "Ella Rock",
    position: [6.8559, 81.0536],
    description: "Scenic hike with panoramic hill country views.",
  },
  {
    id: "yala",
    name: "Yala National Park",
    position: [6.3610, 81.4150],
    description: "Wildlife safari destination with elephants and leopards.",
  },
  {
    id: "galle",
    name: "Galle Fort",
    position: [6.025, 80.219],
    description: "UNESCO heritage fort and coastal attraction.",
  },
  {
    id: "unawatuna",
    name: "Unawatuna Beach",
    position: [5.9420, 80.2800],
    description: "Tropical beach with snorkeling and sunset views.",
  },
];

const routePath = [
  tourLocations[0].position,
  tourLocations[1].position,
  tourLocations[2].position,
  tourLocations[3].position,
  tourLocations[4].position,
  tourLocations[5].position,
];

const FitBounds = ({ bounds }) => {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length) {
      map.fitBounds(bounds, { padding: [32, 32] });
    }
  }, [map, bounds]);

  return null;
};

const InteractiveMap = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-black" id="tours-map">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-white mb-4" data-aos="fade-up">
            TOUR <span className="text-yellow-500">MAP</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            Discover our most popular Sri Lanka tour locations, attractions, and route connections in one interactive map.
          </p>
        </div>

        <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10" data-aos="fade-up" data-aos-delay="200">
          <MapContainer
            center={[7.8731, 80.7718]}
            zoom={7}
            scrollWheelZoom={true}
            className="h-[28rem] md:h-[36rem] w-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <FitBounds bounds={tourLocations.map((location) => location.position)} />
            <Polyline
              positions={routePath}
              pathOptions={{ color: "#FBBF24", weight: 4, opacity: 0.9, dashArray: "8 6" }}
            />
            {tourLocations.map((location) => (
              <Marker key={location.id} position={location.position}>
                <Popup>
                  <span className="font-semibold">{location.name}</span>
                  <br />
                  {location.description}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap;
