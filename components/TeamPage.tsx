import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { KpyccTeamMember } from '../types';
import { ChevronRight } from 'lucide-react';
import {
  ComposableMap,
  Geographies,
  Geography,
} from '@vnedyalk0v/react19-simple-maps';

const KARNATAKA_TOPOJSON_URL = 'http://localhost:8787/map-data/karnataka-districts.json';

const TeamPage: React.FC = () => {
  const { kpyccTeam } = useData();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const districts = useMemo(() => {
    const districtSet = new Set<string>();
    kpyccTeam.forEach((member) => {
      if (member.district) {
        districtSet.add(member.district);
      }
    });
    return Array.from(districtSet);
  }, [kpyccTeam]);

  const selectedDistrictData = useMemo(() => {
    if (!selectedDistrict) return null;

    const districtMembers = kpyccTeam.filter(
      (member) => member.district === selectedDistrict
    );
    const president = districtMembers.find(
      (member) => member.designation === 'District SM Coordinator'
    );
    const assemblyCoordinators = districtMembers.filter(
      (member) => member.designation === 'Assembly SM Coordinator'
    );
    const blockCoordinators = districtMembers.filter((member) =>
      member.designation.includes('Block')
    );

    return {
      president,
      counts: {
        district: president ? 1 : 0,
        assembly: assemblyCoordinators.length,
        block: blockCoordinators.length,
        active: districtMembers.length,
      },
      milestones: president ? JSON.parse(president.mailstone || '[]') : [],
      activities: president ? JSON.parse(president.activity || '[]') : [],
    };
  }, [selectedDistrict, kpyccTeam]);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <Navbar />
      <main className="pt-40 pb-20 container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-indiaGreen mb-4">
          KPYCC Team
        </h1>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Explore our team across the districts of Karnataka.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column: Profile and Counts */}
          <div className="md:col-span-1 bg-white p-6 rounded-lg shadow-sm">
            {selectedDistrictData && selectedDistrictData.president ? (
              <div>
                <h2 className="text-2xl font-bold text-indiaGreen mb-4">
                  {selectedDistrict}
                </h2>
                <div className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden group border border-gray-100">
                  <div className="h-48 overflow-hidden relative">
                    <img
                      src={selectedDistrictData.president.imageUrl}
                      alt={selectedDistrictData.president.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="text-xl font-bold text-gray-800 mb-1">
                      {selectedDistrictData.president.name}
                    </h3>
                    <p className="text-sm font-semibold text-indiaGreen uppercase tracking-wider text-xs mb-3">
                      {selectedDistrictData.president.designation}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {selectedDistrictData.president.bio}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-bold">Member Counts</h3>
                  <ul className="mt-2 space-y-1">
                    <li>
                      Assembly Leaders: {selectedDistrictData.counts.assembly}
                    </li>
                    <li>
                      Block Leaders/Members: {selectedDistrictData.counts.block}
                    </li>
                    <li>
                      Active Members: {selectedDistrictData.counts.active}
                    </li>
                  </ul>
                </div>
                {selectedDistrictData.milestones.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Milestones</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {selectedDistrictData.milestones.map((milestone, index) => (
                        <li key={index}>{milestone}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {selectedDistrictData.activities.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-lg font-bold">Activities</h3>
                    <ul className="list-disc list-inside mt-2 text-gray-700">
                      {selectedDistrictData.activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div className="mt-6 text-center">
                  <Link
                    to={`/kpycc-team/${selectedDistrict}`}
                    className="inline-flex items-center px-6 py-2 bg-saffron text-white rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Know More <ChevronRight className="ml-2 w-5 h-5" />
                  </Link>
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>Select a district from the map to view details.</p>
              </div>
            )}
          </div>
          {/* Right Column: Map Placeholder and District List */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 2800,
                center: [76.5, 14.5],
              }}
              style={{ width: '100%', height: '400px' }}
            >
                <Geographies geography="https://localhost:8787/map-data/karnataka-districts.json">
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const isSelected =
                      selectedDistrict === geo.properties.district;
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        onClick={() =>
                          setSelectedDistrict(geo.properties.district)
                        }
                        style={{
                          default: {
                            fill: isSelected ? '#ff9933' : '#e0e0e0',
                            stroke: '#666',
                            strokeWidth: 0.5,
                            outline: 'none',
                          },
                          hover: {
                            fill: '#ff9933',
                            outline: 'none',
                          },
                          pressed: {
                            fill: '#ff9933',
                            outline: 'none',
                          },
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
            <div>
              <h3 className="text-lg font-bold mb-2 mt-4">Districts</h3>
              <div className="flex flex-wrap gap-2">
                {districts.map((district) => (
                  <button
                    key={district}
                    onClick={() => setSelectedDistrict(district)}
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      selectedDistrict === district
                        ? 'bg-saffron text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {district}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;

