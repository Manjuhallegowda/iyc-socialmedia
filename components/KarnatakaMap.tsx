import React, { useState } from 'react';

interface KarnatakaMapProps {
  selectedDistrict: string | null;
  onDistrictClick: (district: string) => void;
  districtsWithData: string[];
}

const KarnatakaMap: React.FC<KarnatakaMapProps> = ({
  selectedDistrict,
  onDistrictClick,
  districtsWithData,
}) => {
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  // Accurate Karnataka districts with proper geographical positioning
  const districts = [
    // Northern Karnataka
    {
      name: 'Bagalkot',
      x: 220,
      y: 280,
      width: 50,
      height: 35,
      region: 'north',
    },
    { name: 'Belgaum', x: 180, y: 290, width: 60, height: 45, region: 'north' },
    {
      name: 'Vijayapura',
      x: 240,
      y: 310,
      width: 55,
      height: 40,
      region: 'north',
    },
    {
      name: 'Kalaburagi',
      x: 320,
      y: 300,
      width: 65,
      height: 45,
      region: 'north',
    },
    { name: 'Yadgir', x: 360, y: 320, width: 45, height: 35, region: 'north' },
    { name: 'Raichur', x: 340, y: 340, width: 55, height: 40, region: 'north' },
    { name: 'Koppal', x: 280, y: 330, width: 45, height: 35, region: 'north' },
    { name: 'Bellary', x: 300, y: 360, width: 55, height: 40, region: 'north' },
    { name: 'Bidar', x: 420, y: 280, width: 50, height: 40, region: 'north' },

    // Central Karnataka
    { name: 'Gadag', x: 240, y: 340, width: 45, height: 35, region: 'central' },
    {
      name: 'Davanagere',
      x: 260,
      y: 360,
      width: 55,
      height: 40,
      region: 'central',
    },
    {
      name: 'Haveri',
      x: 220,
      y: 350,
      width: 50,
      height: 35,
      region: 'central',
    },
    {
      name: 'Shimoga',
      x: 260,
      y: 390,
      width: 50,
      height: 40,
      region: 'central',
    },
    {
      name: 'Uttara Kannada',
      x: 180,
      y: 380,
      width: 60,
      height: 45,
      region: 'central',
    },
    {
      name: 'Hubli-Dharwad',
      x: 200,
      y: 340,
      width: 60,
      height: 35,
      region: 'central',
    },
    {
      name: 'Chitradurga',
      x: 280,
      y: 370,
      width: 65,
      height: 45,
      region: 'central',
    },
    {
      name: 'Tumkur',
      x: 320,
      y: 300,
      width: 60,
      height: 45,
      region: 'central',
    },

    // Southern Karnataka
    { name: 'Hassan', x: 280, y: 390, width: 55, height: 40, region: 'south' },
    {
      name: 'Chikkamagaluru',
      x: 260,
      y: 410,
      width: 60,
      height: 45,
      region: 'south',
    },
    { name: 'Mysore', x: 300, y: 420, width: 65, height: 45, region: 'south' },
    { name: 'Mandya', x: 320, y: 380, width: 50, height: 35, region: 'south' },

    // Eastern Karnataka
    {
      name: 'Chikkaballapur',
      x: 360,
      y: 280,
      width: 55,
      height: 40,
      region: 'east',
    },
    { name: 'Kolar', x: 380, y: 290, width: 50, height: 35, region: 'east' },
    {
      name: 'Ramanagara',
      x: 340,
      y: 310,
      width: 55,
      height: 40,
      region: 'east',
    },
    {
      name: 'Bangalore Urban',
      x: 360,
      y: 320,
      width: 45,
      height: 35,
      region: 'east',
    },
    {
      name: 'Bangalore Rural',
      x: 340,
      y: 340,
      width: 50,
      height: 35,
      region: 'east',
    },

    // Western Karnataka (Coastal)
    {
      name: 'Dakshina Kannada',
      x: 200,
      y: 440,
      width: 55,
      height: 35,
      region: 'west',
    },
    { name: 'Udupi', x: 180, y: 430, width: 45, height: 30, region: 'west' },
    { name: 'Karwar', x: 160, y: 420, width: 40, height: 30, region: 'west' },
  ];

  const getDistrictColor = (district: any) => {
    if (selectedDistrict === district.name) return '#ff9933'; // Saffron - selected
    if (hoveredDistrict === district.name) return '#f97316'; // Orange - hovered
    if (districtsWithData.includes(district.name)) return '#10b981'; // Green - has data
    return '#e5e7eb'; // Gray - no data
  };

  const getDistrictStroke = (district: any) => {
    if (selectedDistrict === district.name) return '#ea580c';
    if (hoveredDistrict === district.name) return '#ea580c';
    return '#9ca3af';
  };

  const getRegionColor = (region: string) => {
    switch (region) {
      case 'north':
        return '#fef3c7'; // Light yellow
      case 'central':
        return '#dbeafe'; // Light blue
      case 'south':
        return '#fce7f3'; // Light pink
      case 'east':
        return '#dcfce7'; // Light green
      case 'west':
        return '#e0e7ff'; // Light indigo
      default:
        return '#f3f4f6';
    }
  };

  return (
    <div className="w-full bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-gray-800">Karnataka State</h3>
        <p className="text-sm text-gray-600">Interactive District Map</p>
      </div>

      <div className="flex justify-center">
        <svg
          width="500"
          height="450"
          viewBox="0 0 500 450"
          className="w-full max-w-lg h-auto"
        >
          {/* Karnataka State Outline - More accurate shape */}
          <defs>
            <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* State background */}
          <path
            d="M150 120 L200 100 L250 110 L300 100 L350 110 L400 100 L450 120 L480 140 L480 200 L460 220 L420 240 L400 260 L380 280 L360 300 L340 320 L320 340 L300 360 L280 380 L260 400 L240 410 L220 420 L200 430 L180 440 L160 430 L140 420 L120 400 L100 380 L80 360 L60 340 L50 300 L60 260 L80 220 L100 180 L120 140 Z"
            fill="url(#stateGradient)"
            stroke="#374151"
            strokeWidth="2"
            filter="url(#shadow)"
          />

          {/* Gradient definition */}
          <defs>
            <linearGradient
              id="stateGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor="#f0f9ff" />
              <stop offset="50%" stopColor="#f0fdf4" />
              <stop offset="100%" stopColor="#fefce8" />
            </linearGradient>
          </defs>

          {/* Regional backgrounds */}
          {districts.map((district) => (
            <g key={`region-${district.name}`}>
              <rect
                x={district.x - 5}
                y={district.y - 5}
                width={district.width + 10}
                height={district.height + 10}
                fill={getRegionColor(district.region)}
                opacity="0.3"
                rx="8"
                ry="8"
              />
            </g>
          ))}

          {/* Districts */}
          {districts.map((district) => (
            <g key={district.name}>
              <rect
                x={district.x}
                y={district.y}
                width={district.width}
                height={district.height}
                fill={getDistrictColor(district)}
                stroke={getDistrictStroke(district)}
                strokeWidth={selectedDistrict === district.name ? 2 : 1}
                className="cursor-pointer transition-all duration-200 hover:opacity-80"
                onClick={() => onDistrictClick(district.name)}
                onMouseEnter={() => setHoveredDistrict(district.name)}
                onMouseLeave={() => setHoveredDistrict(null)}
                rx="4"
                ry="4"
              />

              {/* District labels */}
              {district.width > 50 ? (
                <text
                  x={district.x + district.width / 2}
                  y={district.y + district.height / 2 + 2}
                  textAnchor="middle"
                  className="text-xs font-semibold fill-gray-700 pointer-events-none select-none"
                >
                  {district.name.split(' ')[0]}
                </text>
              ) : (
                <text
                  x={district.x + district.width / 2}
                  y={district.y + district.height / 2 + 1}
                  textAnchor="middle"
                  className="text-xs font-medium fill-gray-600 pointer-events-none select-none"
                >
                  {district.name.split(' ')[0]}
                </text>
              )}
            </g>
          ))}

          {/* Border highlights */}
          <path
            d="M150 120 L200 100 L250 110 L300 100 L350 110 L400 100 L450 120 L480 140 L480 200 L460 220 L420 240 L400 260 L380 280 L360 300 L340 320 L320 340 L300 360 L280 380 L260 400 L240 410 L220 420 L200 430 L180 440 L160 430 L140 420 L120 400 L100 380 L80 360 L60 340 L50 300 L60 260 L80 220 L100 180 L120 140 Z"
            fill="none"
            stroke="#6b7280"
            strokeWidth="1"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Interactive Tooltip */}
      {hoveredDistrict && (
        <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow-lg border">
          <div className="text-sm font-semibold text-gray-800">
            {hoveredDistrict}
          </div>
          <div className="text-xs text-gray-600">
            {districtsWithData.includes(hoveredDistrict)
              ? 'Active District'
              : 'No Data Available'}
          </div>
        </div>
      )}
    </div>
  );
};

export default KarnatakaMap;
