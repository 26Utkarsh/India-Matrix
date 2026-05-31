import { useState, useMemo, useEffect } from 'react';
import { MapContainer, TileLayer, CircleMarker, Tooltip, Polyline } from 'react-leaflet';
import { motion, AnimatePresence } from 'framer-motion';
import { Map as MapIcon, Info, Layers, Table, ArrowLeft, Building2, Milestone } from 'lucide-react';
import { useTimelineStore, useUIStore } from '../store';
import { NATIONAL_METRICS } from '../data/nationalMetrics';
import 'leaflet/dist/leaflet.css';

// Coordinates for major Indian cities (population hubs)
const CITIES = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090, pop: 32 },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, pop: 21 },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946, pop: 13 },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, pop: 11 },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, pop: 15 },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, pop: 10 },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, pop: 8 },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, pop: 7 },
];

// Rough Golden Quadrilateral coordinates
const GOLDEN_QUADRILATERAL = [
  [28.6139, 77.2090], // Delhi
  [23.0225, 72.5714], // Ahmedabad
  [19.0760, 72.8777], // Mumbai
  [18.5204, 73.8567], // Pune
  [12.9716, 77.5946], // Bangalore
  [13.0827, 80.2707], // Chennai
  [17.3850, 78.4867], // Hyderabad
  [22.5726, 88.3639], // Kolkata
  [28.6139, 77.2090], // Delhi (close loop)
] as [number, number][];

// Bullet Train (Mumbai-Ahmedabad High-Speed Rail Corridor) coordinates
const BULLET_TRAIN_ROUTE = [
  [19.0760, 72.8777], // Mumbai
  [20.2520, 73.0110], // Vapi
  [21.1702, 72.8311], // Surat
  [22.3072, 73.1812], // Vadodara
  [23.0225, 72.5714], // Ahmedabad
] as [number, number][];

// Geospatial hubs (Space, Heavy Industry, IT/Tech)
interface GeospatialHub {
  id: string;
  name: string;
  type: 'space' | 'industry' | 'tech';
  lat: number;
  lng: number;
  activeYear: number;
  description: string;
  imageUrl: string;
}

const GEOSPATIAL_HUBS: GeospatialHub[] = [
  // Space Hubs
  {
    id: 'sp-1',
    name: 'Satish Dhawan Space Centre',
    type: 'space',
    lat: 13.72,
    lng: 80.23,
    activeYear: 1971,
    description: 'India\'s primary orbital launch site in Sriharikota, Andhra Pradesh. Launched Vikram lander (Chandrayaan-3), Mangalyaan, and heavy communication satellites.',
    imageUrl: 'https://images.unsplash.com/photo-1517976487492-5750f3195933?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'sp-2',
    name: 'Vikram Sarabhai Space Centre',
    type: 'space',
    lat: 8.53,
    lng: 76.87,
    activeYear: 1963,
    description: 'VSSC in Thiruvananthapuram, Kerala, is the lead center for rocket launcher development, producing the PSLV, GSLV, and GSLV Mk III launch vehicles.',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'sp-3',
    name: 'UR Rao Satellite Centre (URSC)',
    type: 'space',
    lat: 12.97,
    lng: 77.59,
    activeYear: 1972,
    description: 'The premier satellite construction and design facility in Bengaluru, Karnataka, responsible for assembly of all remote-sensing and communication space probes.',
    imageUrl: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?w=500&auto=format&fit=crop&q=80'
  },
  // Industry Hubs
  {
    id: 'ind-1',
    name: 'Bhilai Steel Plant',
    type: 'industry',
    lat: 21.19,
    lng: 81.38,
    activeYear: 1959,
    description: 'India\'s first and largest producer of steel rails, set up in Chhattisgarh with Soviet collaboration. An industrial pillar of early public sector expansion.',
    imageUrl: 'https://images.unsplash.com/photo-1513828760920-ecdd99263238?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ind-2',
    name: 'Bokaro Steel Plant',
    type: 'industry',
    lat: 23.67,
    lng: 86.15,
    activeYear: 1964,
    description: 'Fourth public sector steel plant in Jharkhand, engineered with domestic designs and Soviet cooperation. Key supplier of flat steel sheets.',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ind-3',
    name: 'Rourkela Steel Plant',
    type: 'industry',
    lat: 22.27,
    lng: 84.86,
    activeYear: 1959,
    description: 'First public sector steel plant in Odisha, built in collaboration with West German firms. The first steel plant in Asia to use the LD oxygen steelmaking process.',
    imageUrl: 'https://images.unsplash.com/photo-1513828760920-ecdd99263238?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'ind-4',
    name: 'Tata Steel Jamshedpur',
    type: 'industry',
    lat: 22.80,
    lng: 86.20,
    activeYear: 1907,
    description: 'First private steel plant established by Jamsetji Tata, serving as the industrial backbone of Jharkhand and India\'s manufacturing sector for over a century.',
    imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=500&auto=format&fit=crop&q=80'
  },
  // IT / Digital Hubs
  {
    id: 'tech-1',
    name: 'Silicon Valley of India (Electronic City)',
    type: 'tech',
    lat: 12.91,
    lng: 77.68,
    activeYear: 1984,
    description: 'Electronic City and outer ring road tech corridors in Bengaluru, Karnataka. Initiated India\'s global software boom, outsourcing, and startup culture.',
    imageUrl: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'tech-2',
    name: 'HITEC City (Cyberabad)',
    type: 'tech',
    lat: 17.44,
    lng: 78.38,
    activeYear: 1998,
    description: 'Hyderabad Information Technology and Engineering Consultancy City, Telangana. Rapidly established Hyderabad as a primary hub for global tech giants.',
    imageUrl: 'https://images.unsplash.com/photo-1595658658481-d53d3f999875?w=500&auto=format&fit=crop&q=80'
  },
  {
    id: 'tech-3',
    name: 'Hinjawadi Infotech Park',
    type: 'tech',
    lat: 18.59,
    lng: 73.74,
    activeYear: 1998,
    description: 'Rajiv Gandhi Infotech Park in Pune, Maharashtra. Spanned massive growth in IT services, auto-tech engineering, and software consultancy.',
    imageUrl: 'https://images.unsplash.com/photo-1606857521015-7f9fcf423740?w=500&auto=format&fit=crop&q=80'
  }
];

const STATE_BASE_DATA = [
  { 
    name: 'Maharashtra', gdpSharePct: 14.5, literacy1951: 27.9, literacy2011: 82.3, elecFactor: 1.02, internetFactor: 1.15, color: 'text-saffron', 
    desc: 'Financial capital, largest industrial output, home to Mumbai Port and Western DFC.',
    perCapitaIncome: '₹2,52,000', hdi: 0.70, 
    industries: ['Banking & Finance', 'Automobiles', 'Textiles', 'Chemicals', 'Entertainment'],
    projects: ['Mumbai Coastal Road', 'Samruddhi Expressway', 'Navi Mumbai International Airport', 'Pune Metro Phase 1']
  },
  { 
    name: 'Tamil Nadu', gdpSharePct: 9.1, literacy1951: 20.9, literacy2011: 80.1, elecFactor: 1.04, internetFactor: 1.08, color: 'text-emerald-500', 
    desc: 'Manufacturing powerhouse, leading automobile hub, high solar power capacity.',
    perCapitaIncome: '₹2,75,000', hdi: 0.71,
    industries: ['Automotive & Parts', 'Electronics Manufacturing', 'Textiles & Leather', 'Wind & Solar Power', 'IT & Software'],
    projects: ['Chennai Metro Phase 2', 'Sriperumbudur Industrial Cluster', 'Ennore Solar Park', 'Tuticorin Port expansion']
  },
  { 
    name: 'Karnataka', gdpSharePct: 8.7, literacy1951: 19.3, literacy2011: 75.4, elecFactor: 1.01, internetFactor: 1.25, color: 'text-blue-500', 
    desc: 'IT export capital, major scientific research base, center of aerospace industry.',
    perCapitaIncome: '₹3,02,000', hdi: 0.70,
    industries: ['IT & Software Services', 'Aerospace & Aviation', 'Biotech', 'Coffee & Tea Exports', 'Machine Tools'],
    projects: ['Electronic City IT Corridor', 'Bengaluru Metro Phase 2B (Airport)', 'ISRO URSC Satellite Assembly Hub', 'Mysuru Highway Corridor']
  },
  { 
    name: 'Gujarat', gdpSharePct: 9.2, literacy1951: 21.8, literacy2011: 78.0, elecFactor: 1.05, internetFactor: 1.05, color: 'text-purple-500', 
    desc: 'Chemical, textile and petrochemical capital, leading state in renewable energy projects.',
    perCapitaIncome: '₹2,82,000', hdi: 0.67,
    industries: ['Petrochemicals & Refining', 'Diamond Polishing', 'Textiles & Garments', 'Ports & Logistics', 'Chemicals'],
    projects: ['GIFT City (Financial Hub)', 'Dholera Smart City (SIR)', 'Mundra Port Complex', 'Mumbai-Ahmedabad Bullet Train Corridor']
  },
  { 
    name: 'Uttar Pradesh', gdpSharePct: 8.4, literacy1951: 12.0, literacy2011: 67.7, elecFactor: 0.90, internetFactor: 0.85, color: 'text-rose-500', 
    desc: 'Largest agrarian economy, expanding expressways and Noida/Greater Noida IT cluster.',
    perCapitaIncome: '₹83,000', hdi: 0.59,
    industries: ['Agriculture & Sugar refining', 'Handloom & Leather crafts', 'IT & Software (Noida Cluster)', 'Dairy farming', 'Heavy Machinery'],
    projects: ['Jewar Noida International Airport', 'Purvanchal Expressway', 'UP Defence Corridor (Bundelkhand)', 'Ganga Expressway']
  },
  { 
    name: 'West Bengal', gdpSharePct: 6.2, literacy1951: 24.0, literacy2011: 76.3, elecFactor: 0.98, internetFactor: 0.92, color: 'text-pink-500', 
    desc: 'Major tea, steel and jute production hub, pioneer of early industrial ventures.',
    perCapitaIncome: '₹1,41,000', hdi: 0.64,
    industries: ['Steel & Metal Processing', 'Jute & Textile Millings', 'Tea plantations', 'Agriculture & Rice milling', 'Petroleum products'],
    projects: ['Kolkata Underwater Metro Link', 'Haldia Port & Petrochemical zone', 'Durgapur Industrial Complex', 'Kalyani IT Expressway']
  },
  { 
    name: 'Kerala', gdpSharePct: 4.1, literacy1951: 40.7, literacy2011: 94.0, elecFactor: 1.06, internetFactor: 1.10, color: 'text-lime-600', 
    desc: 'Highest human development index, 100% early literacy, leading tourism and spice exports.',
    perCapitaIncome: '₹2,33,000', hdi: 0.78,
    industries: ['Tourism & Hospitality', 'Spices & Coconut Processing', 'Rubber production', 'Technopark IT Hubs', 'Coir Manufacturing'],
    projects: ['Kerala Fiber Optic Network (KFON)', 'Cochin Shipyard Dry Dock', 'Technopark Phase 4 (Trivandrum)', 'Kochi Water Metro']
  }
];

export default function StatesPage() {
  const { currentYear } = useTimelineStore();
  const { theme } = useUIStore();

  const [layers, setLayers] = useState({
    urban: true,
    space: true,
    industry: true,
    tech: true,
    highways: true,
    bulletTrain: true,
  });

  const [selectedHub, setSelectedHub] = useState<GeospatialHub | null>(GEOSPATIAL_HUBS[0]);
  const [selectedStateName, setSelectedStateName] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'inspector' | 'states'>('states');

  // Load state profile from query parameter
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const stateParam = params.get('state');
    if (stateParam) {
      const match = STATE_BASE_DATA.find(
        s => s.name.toLowerCase() === stateParam.toLowerCase()
      );
      if (match) {
        setSelectedStateName(match.name);
        setActiveTab('states');
      }
    }
  }, []);

  const isMobile = useMemo(() => typeof window !== 'undefined' ? window.innerWidth < 640 : false, []);
  const initialZoom = isMobile ? 4 : 5;
  const initialCenter: [number, number] = isMobile ? [22.0, 78.5] : [21.5, 78.5];

  const mapStyle = {
    height: '100%',
    width: '100%',
    background: theme === 'dark' ? '#050810' : '#f8fafc',
  };

  // State metrics calculation dynamically linked to timeline year
  const stateData = useMemo(() => {
    const natMetric = NATIONAL_METRICS.find(m => m.year === currentYear) || NATIONAL_METRICS[NATIONAL_METRICS.length - 1];
    const natGdpUsd = natMetric.gdp_usd_billion;

    return STATE_BASE_DATA.map(state => {
      const gsdpUsdB = (natGdpUsd * state.gdpSharePct) / 100;
      
      let literacy = state.literacy1951;
      if (currentYear <= 1951) {
        literacy = state.literacy1951;
      } else if (currentYear <= 2011) {
        const t = (currentYear - 1951) / (2011 - 1951);
        literacy = state.literacy1951 + t * (state.literacy2011 - state.literacy1951);
      } else {
        const t = (currentYear - 2011) / (2026 - 2011);
        const cap = Math.min(99.5, state.literacy2011 + 5);
        literacy = state.literacy2011 + t * (cap - state.literacy2011);
      }

      const stateElec = Math.min(100, Math.max(0, natMetric.electricity_access_pct * state.elecFactor));
      const stateInternet = Math.min(100, Math.max(0, natMetric.internet_penetration_pct * state.internetFactor));

      return {
        ...state,
        gsdpUsdB,
        literacy: parseFloat(literacy.toFixed(1)),
        electricity: parseFloat(stateElec.toFixed(1)),
        internet: parseFloat(stateInternet.toFixed(1))
      };
    });
  }, [currentYear]);

  const selectedState = useMemo(() => {
    return stateData.find(s => s.name === selectedStateName) || null;
  }, [stateData, selectedStateName]);

  const showHighways = layers.highways && currentYear >= 2001;
  const showBulletTrain = layers.bulletTrain && currentYear >= 2017;
  const highwayOpacity = currentYear >= 2014 ? 1 : 0.45;
  const cityMultiplier = Math.max(0.2, (currentYear - 1947) / (2026 - 1947));

  // Determine geospatial hubs state (Proposed, Active) based on current timeline year
  const processedHubs = useMemo(() => {
    return GEOSPATIAL_HUBS.map(hub => {
      const isActive = currentYear >= hub.activeYear;
      return {
        ...hub,
        isActive,
        statusLabel: isActive ? 'Active / Operational' : 'Proposed / Construction'
      };
    });
  }, [currentYear]);

  // Filter visible hubs on Leaflet map
  const visibleHubs = useMemo(() => {
    return processedHubs.filter(hub => {
      if (hub.type === 'space' && !layers.space) return false;
      if (hub.type === 'industry' && !layers.industry) return false;
      if (hub.type === 'tech' && !layers.tech) return false;
      return true;
    });
  }, [processedHubs, layers]);

  return (
    <div className="space-y-4 min-h-[calc(100vh-140px)] flex flex-col">
      {/* Title Header Banner */}
      <div className="glass rounded-2xl p-4 shrink-0 flex flex-col md:flex-row md:items-center justify-between border-l-4 border-l-lime-500 gap-4">
        <div className="flex items-center gap-3">
          <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha Logo" className="h-10 w-auto object-contain flex-shrink-0 dark:invert hidden xs:block" />
          <div>
            <h1 className="font-display text-sm sm:text-base md:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <MapIcon size={16} className="text-lime-600 dark:text-lime-400 shrink-0" /> State-Level Analytics & Geospatial Engine
            </h1>
            <p className="text-slate-500 dark:text-white/50 text-xs mt-0.5">
              Visualize heavy industry networks, spaceports, high-tech clusters, and state metrics linked to year {currentYear}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded text-slate-700 dark:text-white/70">
            <span className="w-2.5 h-2.5 rounded-full bg-saffron" /> Urban Nodes
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded text-slate-700 dark:text-white/70">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" /> ISRO Spaceports
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded text-slate-700 dark:text-white/70">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Heavy Industry
          </span>
          <span className="flex items-center gap-1 bg-slate-100 dark:bg-white/5 px-2.5 py-1 rounded text-slate-700 dark:text-white/70">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" /> Tech Hubs
          </span>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 items-stretch min-h-0">
        
        {/* Left Interactive Map Block */}
        <div className="lg:col-span-2 flex flex-col gap-4 relative">
          <div className="flex flex-col glass rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden h-[340px] sm:h-[450px] lg:h-[550px] relative z-0">
            <MapContainer
            center={initialCenter}
            zoom={initialZoom}
            style={mapStyle}
            zoomControl={false}
            attributionControl={false}
            scrollWheelZoom={false}
            dragging={window.innerWidth >= 768}
            touchZoom={window.innerWidth >= 768}
            doubleClickZoom={window.innerWidth >= 768}
          >
            {/* Base tile maps */}
            <TileLayer
              url={theme === 'dark' 
                ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                : "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
              }
            />

            {/* Infrastructure Routes: Golden Quadrilateral */}
            {showHighways && (
              <Polyline
                positions={GOLDEN_QUADRILATERAL}
                color="#3B82F6"
                weight={3}
                opacity={highwayOpacity}
                dashArray="4, 8"
              >
                <Tooltip sticky className="custom-leaflet-tooltip">
                  <div className="font-mono text-xs font-bold text-blue-500">Golden Quadrilateral (National Highways)</div>
                </Tooltip>
              </Polyline>
            )}

            {/* Infrastructure Routes: Bullet Train */}
            {showBulletTrain && (
              <Polyline
                positions={BULLET_TRAIN_ROUTE}
                color="#FF9933"
                weight={4}
                opacity={currentYear >= 2024 ? 1 : 0.5}
                dashArray={currentYear >= 2024 ? undefined : "3, 6"}
              >
                <Tooltip sticky className="custom-leaflet-tooltip">
                  <div className="font-mono text-xs font-bold text-saffron">
                    Mumbai-Ahmedabad High-Speed Rail Corridor {currentYear >= 2024 ? '(Operational)' : '(Under Construction)'}
                  </div>
                </Tooltip>
              </Polyline>
            )}

            {/* Urban Center Nodes */}
            {layers.urban && CITIES.map(city => (
              <CircleMarker
                key={city.name}
                center={[city.lat, city.lng]}
                radius={(city.pop * cityMultiplier) + 3}
                pathOptions={{
                  fillColor: '#FF9933',
                  fillOpacity: 0.4,
                  color: '#ea580c',
                  weight: 1.5,
                }}
              >
                <Tooltip direction="top" offset={[0, -5]} className="custom-leaflet-tooltip">
                  <div className="font-mono text-xs">
                    <div className="font-bold text-saffron">{city.name} Megacity</div>
                    <div className="text-slate-500 dark:text-white/70">Population: {(city.pop * cityMultiplier).toFixed(1)}M</div>
                  </div>
                </Tooltip>
              </CircleMarker>
            ))}

            {/* Geospatial Hub Nodes (Space, Industry, IT) */}
            {visibleHubs.map(hub => {
              const markerColor = hub.type === 'space' ? '#A855F7' : hub.type === 'industry' ? '#E11D48' : '#06B6D4';
              const radius = hub.isActive ? 9 : 6;
              const opacity = hub.isActive ? 0.8 : 0.35;

              return (
                <CircleMarker
                  key={hub.id}
                  center={[hub.lat, hub.lng]}
                  radius={radius}
                  pathOptions={{
                    fillColor: markerColor,
                    fillOpacity: opacity,
                    color: '#ffffff',
                    weight: hub.isActive ? 2 : 1,
                    dashArray: hub.isActive ? undefined : "3, 3"
                  }}
                  eventHandlers={{
                    click: () => {
                      setSelectedHub(hub);
                      setActiveTab('inspector');
                      setSelectedStateName(null); // Clear state selection to view inspector
                    }
                  }}
                >
                  <Tooltip direction="top" offset={[0, -5]} className="custom-leaflet-tooltip">
                    <div className="font-mono text-xs">
                      <div className="font-bold" style={{ color: markerColor }}>{hub.name}</div>
                      <div className="text-slate-500 dark:text-white/60 capitalize">Sector: {hub.type} · Est. {hub.activeYear}</div>
                      <div className="text-xs font-semibold text-slate-400 mt-0.5">
                        Status: {hub.isActive ? 'Active' : 'Future Planning'}
                      </div>
                    </div>
                  </Tooltip>
                </CircleMarker>
              );
            })}
          </MapContainer>
          </div>

          {/* Map Layers Toggles - Floating Control Card on desktop, static below map on mobile */}
          <div className="lg:absolute lg:bottom-4 lg:left-4 lg:z-[400] lg:max-w-[220px] relative z-10 glass p-2.5 sm:p-3 rounded-xl border border-slate-200 dark:border-white/10 w-full text-[11px] sm:text-xs space-y-2 pointer-events-auto shadow-md lg:shadow-xl bg-white/95 dark:bg-[#050810]/95 lg:bg-white/85 lg:dark:bg-black/60">
            <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5 border-b border-slate-100 dark:border-white/10 pb-1 sm:pb-1.5">
              <Layers size={11} className="text-lime-500" />
              <span>Map Overlay Layers</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-x-3 gap-y-1 sm:gap-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white font-medium p-1 rounded transition-colors active:bg-slate-100 dark:active:bg-white/5 select-none">
                <input 
                  type="checkbox" 
                  checked={layers.urban} 
                  onChange={() => setLayers(prev => ({ ...prev, urban: !prev.urban }))} 
                  className="rounded border-slate-300 dark:border-white/10 text-lime-600 focus:ring-0 w-3.5 h-3.5" 
                />
                <span>Urban Centres</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white font-medium p-1 rounded transition-colors active:bg-slate-100 dark:active:bg-white/5 select-none">
                <input 
                  type="checkbox" 
                  checked={layers.space} 
                  onChange={() => setLayers(prev => ({ ...prev, space: !prev.space }))} 
                  className="rounded border-slate-300 dark:border-white/10 text-lime-600 focus:ring-0 w-3.5 h-3.5" 
                />
                <span>Spaceports (ISRO)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white font-medium p-1 rounded transition-colors active:bg-slate-100 dark:active:bg-white/5 select-none">
                <input 
                  type="checkbox" 
                  checked={layers.industry} 
                  onChange={() => setLayers(prev => ({ ...prev, industry: !prev.industry }))} 
                  className="rounded border-slate-300 dark:border-white/10 text-lime-600 focus:ring-0 w-3.5 h-3.5" 
                />
                <span>Heavy Metal & Steel</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white font-medium p-1 rounded transition-colors active:bg-slate-100 dark:active:bg-white/5 select-none">
                <input 
                  type="checkbox" 
                  checked={layers.tech} 
                  onChange={() => setLayers(prev => ({ ...prev, tech: !prev.tech }))} 
                  className="rounded border-slate-300 dark:border-white/10 text-lime-600 focus:ring-0 w-3.5 h-3.5" 
                />
                <span>Tech Parks / IT Corridor</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white font-medium p-1 rounded transition-colors active:bg-slate-100 dark:active:bg-white/5 select-none">
                <input 
                  type="checkbox" 
                  checked={layers.highways} 
                  onChange={() => setLayers(prev => ({ ...prev, highways: !prev.highways }))} 
                  className="rounded border-slate-300 dark:border-white/10 text-lime-600 focus:ring-0 w-3.5 h-3.5" 
                />
                <span>Golden Quadrilateral</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer text-slate-700 dark:text-white/70 hover:text-slate-900 dark:hover:text-white font-medium p-1 rounded transition-colors active:bg-slate-100 dark:active:bg-white/5 select-none">
                <input 
                  type="checkbox" 
                  checked={layers.bulletTrain} 
                  onChange={() => setLayers(prev => ({ ...prev, bulletTrain: !prev.bulletTrain }))} 
                  className="rounded border-slate-300 dark:border-white/10 text-lime-600 focus:ring-0 w-3.5 h-3.5" 
                />
                <span>Bullet Train Route</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Info & Comparison Panel */}
        <div className="flex flex-col glass rounded-2xl border border-slate-200 dark:border-white/5 overflow-hidden h-[540px] lg:h-auto shadow-sm">
          {/* Navigation Tabs */}
          <div className="flex border-b border-slate-200 dark:border-white/5 shrink-0 bg-slate-50 dark:bg-white/5">
            <button
              onClick={() => { setActiveTab('states'); setSelectedStateName(null); }}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all
                ${activeTab === 'states' && !selectedStateName
                  ? 'border-lime-500 text-slate-900 dark:text-white bg-white dark:bg-[#070c1a]/45 font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
            >
              <Table size={12} />
              State Comparison Table
            </button>
            <button
              onClick={() => { setActiveTab('inspector'); setSelectedStateName(null); }}
              className={`flex-1 py-3 text-xs font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all
                ${activeTab === 'inspector' 
                  ? 'border-lime-500 text-slate-900 dark:text-white bg-white dark:bg-[#070c1a]/45 font-bold' 
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-white'}`}
            >
              <Info size={12} />
              Geospatial Inspector
            </button>
          </div>

          {/* Panel Contents */}
          <div className="flex-1 overflow-y-auto p-4 min-h-0 custom-scrollbar">
            <AnimatePresence mode="wait">
              {selectedState ? (
                /* State Profile Deep-Dive view */
                <motion.div
                  key="state-profile"
                  initial={{ opacity: 0, x: 15 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -15 }}
                  className="space-y-4"
                >
                  <button 
                    onClick={() => setSelectedStateName(null)}
                    className="flex items-center gap-1.5 text-xs text-lime-600 dark:text-lime-400 font-bold hover:underline mb-3"
                  >
                    <ArrowLeft size={13} /> Back to State List
                  </button>

                  <div className="border-b border-slate-200 dark:border-white/10 pb-3">
                    <h2 className="font-display font-extrabold text-lg text-slate-900 dark:text-white">{selectedState.name}</h2>
                    <p className="text-xs text-slate-500 dark:text-white/40 mt-1 leading-relaxed">{selectedState.desc}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 font-mono">
                    <div className="glass p-3 rounded-xl border border-slate-100 dark:border-white/5">
                      <div className="text-[10px] text-slate-400 dark:text-white/20 uppercase font-bold">GSDP Share ({currentYear})</div>
                      <div className="text-sm font-bold text-lime-600 dark:text-lime-400 mt-1">${selectedState.gsdpUsdB.toFixed(1)}B</div>
                      <div className="text-[9px] text-slate-500 dark:text-white/30 font-sans mt-0.5">({selectedState.gdpSharePct}% of GDP) <span className="font-mono text-[8px] opacity-75">(MoSPI)</span></div>
                    </div>
                    <div className="glass p-3 rounded-xl border border-slate-100 dark:border-white/5">
                      <div className="text-[10px] text-slate-400 dark:text-white/20 uppercase font-bold">Per Capita Income</div>
                      <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">{selectedState.perCapitaIncome}</div>
                      <div className="text-[9px] text-slate-500 dark:text-white/30 font-sans mt-0.5">Avg Annual Income <span className="font-mono text-[8px] opacity-75">(MoSPI)</span></div>
                    </div>
                    <div className="glass p-3 rounded-xl border border-slate-100 dark:border-white/5 col-span-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-slate-400 dark:text-white/20 uppercase font-bold">Human Development Index (HDI)</span>
                        <span className="text-xs font-bold text-emerald-500">{selectedState.hdi.toFixed(2)}</span>
                      </div>
                      <div className="h-1.5 bg-slate-200 dark:bg-white/10 rounded-full overflow-hidden mt-1.5">
                        <div className="h-full bg-emerald-500" style={{ width: `${selectedState.hdi * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Core indicators progress */}
                  <div className="space-y-3 pt-1">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/30 font-mono">Progress Indicators</h3>
                    
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Literacy Level</span>
                        <span className="font-bold text-purple-400">{selectedState.literacy}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-purple-500 rounded-full" style={{ width: `${selectedState.literacy}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Power Grid Coverage</span>
                        <span className="font-bold text-amber-500">{selectedState.electricity}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-amber-400 rounded-full" style={{ width: `${selectedState.electricity}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between text-xs font-medium">
                        <span>Internet Penetration</span>
                        <span className="font-bold text-cyan-400">{selectedState.internet}%</span>
                      </div>
                      <div className="h-2 bg-slate-100 dark:bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-400 rounded-full" style={{ width: `${selectedState.internet}%` }} />
                      </div>
                    </div>
                  </div>

                  {/* Major Industries */}
                  <div className="space-y-2 pt-1">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/30 font-mono flex items-center gap-1">
                      <Building2 size={12} className="text-lime-500" /> Major Economic Sectors
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {selectedState.industries.map(ind => (
                        <span key={ind} className="text-[10px] px-2.5 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-700 dark:bg-white/5 dark:text-white/60 border border-slate-200 dark:border-white/10">
                          {ind}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Notable Projects */}
                  <div className="space-y-2 pt-1">
                    <h3 className="text-xs uppercase tracking-wider font-extrabold text-slate-400 dark:text-white/30 font-mono flex items-center gap-1">
                      <Milestone size={12} className="text-lime-500" /> Notable Projects & Infrastructure
                    </h3>
                    <ul className="space-y-1.5">
                      {selectedState.projects.map(proj => (
                        <li key={proj} className="flex items-start gap-2 text-xs text-slate-600 dark:text-white/60 font-medium">
                          <span className="text-lime-500 mt-0.5">✦</span>
                          <span>{proj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </motion.div>
              ) : activeTab === 'states' ? (
                /* State list table */
                <motion.div
                  key="states-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
                    <h2 className="text-xs uppercase font-bold text-lime-600 dark:text-lime-400">Regional Indicators ({currentYear})</h2>
                    <span className="text-[9px] text-slate-400 dark:text-white/20 font-mono">Click state to explore</span>
                  </div>

                  <div className="space-y-3">
                    {stateData.map(state => (
                      <div 
                        key={state.name} 
                        onClick={() => setSelectedStateName(state.name)}
                        className="p-3 rounded-xl border border-slate-100 dark:border-white/5 bg-slate-50/50 dark:bg-white/5 hover:bg-slate-100/50 dark:hover:bg-white/10 hover:border-lime-500/30 transition-all duration-200 cursor-pointer shadow-sm relative group"
                      >
                        <div className="flex justify-between items-start mb-1.5">
                          <div>
                            <span className="text-xs font-extrabold text-slate-900 dark:text-white group-hover:text-lime-500 transition-colors">{state.name}</span>
                            <p className="text-[10px] text-slate-400 dark:text-white/30 line-clamp-1 mt-0.5 leading-snug">{state.desc}</p>
                          </div>
                          <span className="text-[11px] font-mono font-bold text-lime-600 dark:text-lime-400 bg-lime-50 dark:bg-lime-900/10 px-2 py-0.5 rounded border border-lime-500/10">
                            ${state.gsdpUsdB.toFixed(1)}B GSDP
                          </span>
                        </div>

                        <div className="grid grid-cols-3 gap-2 mt-2 pt-2 border-t border-slate-100 dark:border-white/5 font-mono text-[9px] text-slate-400 dark:text-white/30 leading-snug">
                          <div>
                            <div>Literacy</div>
                            <div className="font-bold text-slate-800 dark:text-white text-xs mt-0.5">{state.literacy}%</div>
                          </div>
                          <div>
                            <div>Grid Access</div>
                            <div className="font-bold text-slate-800 dark:text-white text-xs mt-0.5">{state.electricity}%</div>
                          </div>
                          <div>
                            <div>Internet</div>
                            <div className="font-bold text-slate-800 dark:text-white text-xs mt-0.5">{state.internet}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ) : (
                /* Geospatial inspector */
                <motion.div
                  key="inspector-tab"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-4"
                >
                  {selectedHub ? (
                    <div className="space-y-4">
                      {/* Hub Cover photo */}
                      <div className="relative h-32 rounded-xl overflow-hidden border border-slate-200 dark:border-white/5 bg-slate-950">
                        <img 
                          src={selectedHub.imageUrl} 
                          alt={selectedHub.name}
                          className="w-full h-full object-cover object-center opacity-85"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                        
                        <div className="absolute bottom-2 left-2 right-2">
                          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-slate-900/80 text-white border border-white/10">
                            {selectedHub.type} Hub
                          </span>
                          <h3 className="text-xs font-bold text-white mt-1.5">{selectedHub.name}</h3>
                        </div>
                      </div>

                      {/* Details block */}
                      <div className="space-y-3 text-xs font-medium">
                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 dark:text-white/40 font-mono">Activation Year:</span>
                          <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedHub.activeYear}</span>
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-400 dark:text-white/40 font-mono">Status in {currentYear}:</span>
                          <span className={`font-mono font-bold px-2 py-0.5 rounded
                            ${currentYear >= selectedHub.activeYear 
                              ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-500/20 dark:text-emerald-300' 
                              : 'bg-amber-100 text-amber-800 dark:bg-amber-500/20 dark:text-amber-300'}`}>
                            {currentYear >= selectedHub.activeYear ? 'Active' : 'Proposed / Future'}
                          </span>
                        </div>

                        <div className="p-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/5 text-slate-600 dark:text-white/60 leading-relaxed font-sans">
                          {selectedHub.description}
                        </div>

                        {/* Interactive Timeline check */}
                        {currentYear < selectedHub.activeYear && (
                          <div className="p-3 bg-amber-50/50 dark:bg-amber-500/5 rounded-xl border border-amber-200/20 text-[11px] text-amber-800 dark:text-amber-300 leading-snug font-sans">
                            💡 Drag the timeline slider to or past year <strong>{selectedHub.activeYear}</strong> to see this facility become active on the map layer.
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 text-slate-400 dark:text-white/20 space-y-2">
                      <MapIcon size={32} />
                      <span className="text-xs font-mono">Select any hub marker on the map to inspect historical details</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
}
