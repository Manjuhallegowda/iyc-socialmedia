import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { DistrictHierarchyData } from '../types';
import KarnatakaMap from './KarnatakaMap';
import {
  ChevronRight,
  Users,
  Award,
  TrendingUp,
  MapPin,
  Building,
  Target,
  BarChart3,
} from 'lucide-react';

// All Karnataka districts (comprehensive list)
const KARNATAKA_DISTRICTS = [
  'Bagalkot',
  'Bangalore Rural',
  'Bangalore Urban',
  'Belgaum',
  'Bellary',
  'Bidar',
  'Chikkaballapur',
  'Chikkamagaluru',
  'Chitradurga',
  'Dakshina Kannada',
  'Davanagere',
  'Gadag',
  'Gulbarga',
  'Hassan',
  'Haveri',
  'Hubli-Dharwad',
  'Kalaburagi',
  'Karnataka',
  'Karwar',
  'Kolar',
  'Koppal',
  'Mandya',
  'Mysore',
  'Raichur',
  'Ramanagara',
  'Shimoga',
  'Tumkur',
  'Udupi',
  'Uttara Kannada',
  'Vijayapura',
  'Yadgir',
];

const TeamPage: React.FC = () => {
  const { getDistrictHierarchyData, loading } = useData();
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  const selectedDistrictData = useMemo((): DistrictHierarchyData | null => {
    if (!selectedDistrict) return null;
    return getDistrictHierarchyData(selectedDistrict);
  }, [selectedDistrict, getDistrictHierarchyData]);

  const handleDistrictClick = (district: string) => {
    setSelectedDistrict(district);
  };

  const hasDataForDistrict = (district: string): boolean => {
    const data = getDistrictHierarchyData(district);
    return data ? data.counts.totalActive > 0 : false;
  };

  const activeDistricts = KARNATAKA_DISTRICTS.filter((district) =>
    hasDataForDistrict(district)
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800 font-sans">
      <Navbar />
      <main className="pt-32 pb-20 container mx-auto px-4">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-indiaGreen mb-4">
            KPYCC Interactive Karnataka Map
          </h1>
          <p className="text-xl text-gray-600 mb-6 max-w-3xl mx-auto">
            Explore our comprehensive team structure across all districts of
            Karnataka. Click on any district in the map to view hierarchical
            leadership and member data.
          </p>
          <div className="flex justify-center space-x-8 text-sm text-gray-500">
            <div className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              <span>All 31 Districts</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2" />
              <span>Multi-level Hierarchy</span>
            </div>
            <div className="flex items-center">
              <Award className="w-4 h-4 mr-2" />
              <span>Real-time Data</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Panel: District Information */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
              {selectedDistrictData ? (
                <div>
                  {/* District Header */}
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-3xl font-bold text-indiaGreen">
                      {selectedDistrict}
                    </h2>
                    {hasDataForDistrict(selectedDistrict) && (
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                        Active
                      </span>
                    )}
                  </div>

                  {/* President Profile */}
                  {selectedDistrictData.president && (
                    <div className="mb-8">
                      <h3 className="text-xl font-bold mb-4 text-gray-800">
                        District President
                      </h3>
                      <div className="bg-gradient-to-r from-saffron to-orange-500 rounded-xl overflow-hidden shadow-lg">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={selectedDistrictData.president.imageUrl}
                            alt={selectedDistrictData.president.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="p-6 text-white">
                          <h4 className="text-2xl font-bold mb-2">
                            {selectedDistrictData.president.name}
                          </h4>
                          <p className="text-orange-100 text-sm font-semibold uppercase tracking-wider mb-3">
                            {selectedDistrictData.president.designation}
                          </p>
                          <p className="text-orange-50 text-sm">
                            {selectedDistrictData.president.bio}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Hierarchical Counts */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      Leadership Structure
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center mb-1">
                              <Award className="w-4 h-4 text-blue-600 mr-2" />
                              <span className="text-sm font-semibold text-blue-800">
                                District Level
                              </span>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-blue-600">
                            {selectedDistrictData.counts.district}
                          </span>
                        </div>
                      </div>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center mb-1">
                              <Building className="w-4 h-4 text-green-600 mr-2" />
                              <span className="text-sm font-semibold text-green-800">
                                Assembly Level
                              </span>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-green-600">
                            {selectedDistrictData.counts.assembly}
                          </span>
                        </div>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center mb-1">
                              <Target className="w-4 h-4 text-purple-600 mr-2" />
                              <span className="text-sm font-semibold text-purple-800">
                                Block Level
                              </span>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-purple-600">
                            {selectedDistrictData.counts.block}
                          </span>
                        </div>
                      </div>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center mb-1">
                              <Users className="w-4 h-4 text-orange-600 mr-2" />
                              <span className="text-sm font-semibold text-orange-800">
                                SM Team
                              </span>
                            </div>
                          </div>
                          <span className="text-2xl font-bold text-orange-600">
                            {selectedDistrictData.counts.smTeam}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Team Statistics */}
                  <div className="mb-8">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">
                      Team Statistics
                    </h3>
                    <div className="bg-gray-50 p-6 rounded-xl">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <BarChart3 className="w-5 h-5 text-indiaGreen mr-2" />
                          <span className="text-gray-600">
                            Total Active Members
                          </span>
                        </div>
                        <span className="text-2xl font-bold text-indiaGreen">
                          {selectedDistrictData.counts.totalActive}
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">
                            {selectedDistrictData.statistics.maleMembers}
                          </div>
                          <div className="text-xs text-gray-500">Male</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-pink-600">
                            {selectedDistrictData.statistics.femaleMembers}
                          </div>
                          <div className="text-xs text-gray-500">Female</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-green-600">
                            {selectedDistrictData.statistics.youngLeaders}
                          </div>
                          <div className="text-xs text-gray-500">
                            Young Leaders
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Know More Button */}
                  <div className="text-center">
                    <Link
                      to={`/kpycc-team/${selectedDistrict}`}
                      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-saffron to-orange-500 text-white rounded-full font-bold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-orange-300"
                    >
                      Explore District Profile
                      <ChevronRight className="ml-3 w-6 h-6" />
                    </Link>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12">
                  <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    Select a District
                  </h3>
                  <p className="text-gray-500">
                    Click on any district in the map to view detailed
                    information about the team structure and leadership.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Panel: Interactive Karnataka Map */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Karnataka Districts Map
                </h2>
                <div className="text-sm text-gray-500">
                  {activeDistricts.length} of {KARNATAKA_DISTRICTS.length}{' '}
                  active
                </div>
              </div>

              {/* Statistics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-4 rounded-lg">
                  <div className="text-2xl font-bold">
                    {KARNATAKA_DISTRICTS.length}
                  </div>
                  <div className="text-blue-100 text-sm">Total Districts</div>
                </div>
                <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-4 rounded-lg">
                  <div className="text-2xl font-bold">
                    {activeDistricts.length}
                  </div>
                  <div className="text-green-100 text-sm">Active Districts</div>
                </div>
                <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white p-4 rounded-lg">
                  <div className="text-2xl font-bold">
                    {activeDistricts.reduce((sum, district) => {
                      const data = getDistrictHierarchyData(district);
                      return sum + (data?.counts.totalActive || 0);
                    }, 0)}
                  </div>
                  <div className="text-purple-100 text-sm">Total Members</div>
                </div>
              </div>

              {/* Interactive Map */}
              <div className="mb-6">
                <KarnatakaMap
                  selectedDistrict={selectedDistrict}
                  onDistrictClick={handleDistrictClick}
                  districtsWithData={activeDistricts}
                />
              </div>

              {/* Legend */}
              <div className="pt-6 border-t border-gray-200">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Map Legend
                </h4>
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-saffron rounded mr-2"></div>
                    <span className="text-gray-600">Selected District</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-green-500 rounded mr-2"></div>
                    <span className="text-gray-600">Active District</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-gray-300 rounded mr-2"></div>
                    <span className="text-gray-600">No Data Available</span>
                  </div>
                </div>
              </div>

              {/* Quick Access Grid */}
              <div className="mt-8">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">
                  Quick District Access
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                  {KARNATAKA_DISTRICTS.map((district) => {
                    const isSelected = selectedDistrict === district;
                    const hasData = hasDataForDistrict(district);

                    return (
                      <button
                        key={district}
                        onClick={() => handleDistrictClick(district)}
                        className={`p-2 rounded text-xs font-semibold transition-all duration-200 ${
                          isSelected
                            ? 'bg-saffron text-white shadow-md'
                            : hasData
                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                        }`}
                      >
                        {district}
                      </button>
                    );
                  })}
                </div>
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
