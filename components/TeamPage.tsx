import React, { useState, useMemo } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { KpyccTeamMember } from '../types';
import { MapPin, ChevronRight, Hash } from 'lucide-react';

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
    ); // Assuming block might have different names

    return {
      president,
      counts: {
        district: president ? 1 : 0,
        assembly: assemblyCoordinators.length,
        block: blockCoordinators.length,
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
                      District Coordinators:{' '}
                      {selectedDistrictData.counts.district}
                    </li>
                    <li>
                      Assembly Coordinators:{' '}
                      {selectedDistrictData.counts.assembly}
                    </li>
                    <li>
                      Block Coordinators: {selectedDistrictData.counts.block}
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
              </div>
            ) : (
              <div className="text-center text-gray-500">
                <p>Select a district from the map to view details.</p>
              </div>
            )}
          </div>

          {/* Right Column: Map Placeholder and District List */}
          <div className="md:col-span-2 bg-white p-6 rounded-lg shadow-sm">
            <div className="w-full h-96 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
              <p className="text-gray-500">Interactive Map Placeholder</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-2">Districts</h3>
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
