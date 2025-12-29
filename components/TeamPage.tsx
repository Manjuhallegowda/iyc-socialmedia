import React, { useState, useMemo, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { DistrictHierarchyData } from '../types';
import {
  ChevronRight,
  Users,
  Award,
  MapPin,
  Building,
  Target,
  BarChart3,
  CheckCircle2,
  Info,
} from 'lucide-react';

// All Karnataka districts (comprehensive list)
const KARNATAKA_DISTRICTS = [
  'Bagalkot',
  'Bangalore Central',
  'Bangalore East',
  'Bangalore North',
  'Bangalore Rural',
  'Bangalore South',
  'Bangalore West',
  'Belgaum City',
  'Belgaum Rural',
  'Bellary City',
  'Bellary Rural',
  'Bidar',
  'Bijapur',
  'Chamarajanagar',
  'Chikkaballapur',
  'Chikkamagalore',
  'Chikkodi',
  'Chitradurga',
  'Dakshina Kannada',
  'Davanagere',
  'Dharwad Rural',
  'Gadag',
  'Gulbarga',
  'Hassan',
  'Haveri',
  'Hubli-Dharwad City',
  'Kodagu',
  'Kolar',
  'Koppal',
  'Mandya',
  'Mysore City',
  'Mysore Rural',
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
  const location = useLocation();
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const { getDistrictHierarchyData } = useData();
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

  const totalMembers = activeDistricts.reduce((sum, district) => {
    const data = getDistrictHierarchyData(district);
    return sum + (data?.counts.totalActive || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans selection:bg-orange-100 selection:text-orange-900">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-white border-b border-gray-200 pt-32 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6">
            <div>
              <h5 className="text-orange-600 font-bold tracking-wider uppercase text-sm mb-2">
                Organization Structure
              </h5>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                KPYCC Leadership Network
              </h1>
              <p className="text-lg text-gray-500 max-w-2xl">
                A transparent hierarchical view of our leadership across all 40
                districts of Karnataka.
              </p>
            </div>

            {/* Top Level Stats Summary */}
            <div className="flex gap-6 text-right">
              <div className="hidden md:block">
                <div className="text-3xl font-bold text-gray-900">
                  {KARNATAKA_DISTRICTS.length}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Districts
                </div>
              </div>
              <div className="hidden md:block pl-6 border-l border-gray-200">
                <div className="text-3xl font-bold text-green-600">
                  {activeDistricts.length}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Active Units
                </div>
              </div>
              <div className="hidden md:block pl-6 border-l border-gray-200">
                <div className="text-3xl font-bold text-blue-600">
                  {totalMembers}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                  Total Leaders
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="py-12 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* LEFT PANEL: Interactive Map & Grid (Occupies 7 cols) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Map Container */}
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 relative overflow-hidden">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-orange-500" />
                  Karnataka Overview
                </h2>

                {/* Legend */}
                <div className="flex gap-4 text-xs font-medium">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span>{' '}
                    Selected
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>{' '}
                    Active
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-gray-300"></span>{' '}
                    Inactive
                  </div>
                </div>
              </div>

              {/* Static Karnataka Map SVG */}
              <div className="flex justify-center bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8">
                <img
                  src="/assets/Karnataka_districts_map.svg"
                  alt="Karnataka Districts Map"
                  className="w-full max-w-lg h-auto drop-shadow-md transition-opacity hover:opacity-95"
                />
              </div>

              {/* Quick Access Grid (Pills) */}
              <div>
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Select a District
                </h3>
                <div className="flex flex-wrap gap-2">
                  {KARNATAKA_DISTRICTS.map((district) => {
                    const isSelected = selectedDistrict === district;
                    const hasData = hasDataForDistrict(district);

                    return (
                      <button
                        key={district}
                        onClick={() => handleDistrictClick(district)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 border ${
                          isSelected
                            ? 'bg-orange-600 border-orange-600 text-white shadow-md shadow-orange-200 scale-105'
                            : hasData
                            ? 'bg-white border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300'
                            : 'bg-white border-gray-200 text-gray-400 hover:bg-gray-50'
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

          {/* RIGHT PANEL: Details Sidebar (Occupies 5 cols) */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 space-y-6">
              {selectedDistrictData ? (
                <>
                  {/* Active Selection Card */}
                  <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden relative">
                    {/* Header Decoration */}
                    <div className="h-2 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

                    <div className="p-8">
                      {/* District Title */}
                      <div className="flex justify-between items-start mb-8">
                        <div>
                          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            Selected District
                          </span>
                          <h2 className="text-3xl font-serif font-bold text-gray-900 mt-1">
                            {selectedDistrict}
                          </h2>
                        </div>
                        {hasDataForDistrict(selectedDistrict || '') && (
                          <span className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-xs font-bold border border-green-100">
                            <CheckCircle2 className="w-3 h-3" /> Active Unit
                          </span>
                        )}
                      </div>

                      {/* President Profile - Executive Style */}
                      {selectedDistrictData.president && (
                        <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 mb-8 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                          <div className="relative">
                            <div className="w-24 h-24 rounded-full p-1 bg-white border border-gray-200 shadow-sm">
                              <img
                                src={selectedDistrictData.president.imageUrl}
                                alt={selectedDistrictData.president.name}
                                className="w-full h-full object-cover rounded-full"
                              />
                            </div>
                            <div className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full border-2 border-white">
                              <Award className="w-3 h-3" />
                            </div>
                          </div>
                          <div className="text-center sm:text-left flex-1">
                            <h3 className="text-xl font-bold text-gray-900 leading-tight">
                              {selectedDistrictData.president.name}
                            </h3>
                            <p className="text-sm font-semibold text-blue-700 uppercase tracking-wide mt-1 mb-3">
                              {selectedDistrictData.president.designation}
                            </p>
                            <p className="text-sm text-gray-600 leading-relaxed italic border-l-2 border-orange-300 pl-3">
                              "
                              {selectedDistrictData.president.bio.length > 80
                                ? selectedDistrictData.president.bio.substring(
                                    0,
                                    80
                                  ) + '...'
                                : selectedDistrictData.president.bio}
                              "
                            </p>
                          </div>
                        </div>
                      )}

                      {/* KPI Stats Grid */}
                      <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center gap-2">
                        <BarChart3 className="w-4 h-4 text-gray-400" />
                        Structure & Strength
                      </h4>

                      <div className="grid grid-cols-2 gap-3 mb-8">
                        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
                              <Award className="w-4 h-4 text-blue-600" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              District
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            {selectedDistrictData.counts.district}
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-green-50 rounded-lg group-hover:bg-green-100 transition-colors">
                              <Building className="w-4 h-4 text-green-600" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              Assembly
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            {selectedDistrictData.counts.assembly}
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-purple-50 rounded-lg group-hover:bg-purple-100 transition-colors">
                              <Target className="w-4 h-4 text-purple-600" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              Block
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            {selectedDistrictData.counts.block}
                          </span>
                        </div>

                        <div className="p-4 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="p-1.5 bg-orange-50 rounded-lg group-hover:bg-orange-100 transition-colors">
                              <Users className="w-4 h-4 text-orange-600" />
                            </div>
                            <span className="text-xs font-semibold text-gray-500 uppercase">
                              SM Team
                            </span>
                          </div>
                          <span className="text-2xl font-bold text-gray-900">
                            {selectedDistrictData.counts.smTeam}
                          </span>
                        </div>
                      </div>

                      {/* CTA Button */}
                      <Link
                        to={`/kpycc-team/${selectedDistrict}`}
                        className="block w-full py-4 bg-gray-900 text-white text-center rounded-xl font-bold hover:bg-gray-800 transition-all flex items-center justify-center gap-2 group"
                      >
                        View Full Organization
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </>
              ) : (
                /* Empty State Placeholder */
                <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center h-full flex flex-col justify-center items-center">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                    <MapPin className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    No District Selected
                  </h3>
                  <p className="text-gray-500 mb-8 max-w-xs mx-auto">
                    Click on any district from the map or the list to view its
                    leadership hierarchy.
                  </p>
                  <div className="flex items-center gap-2 text-sm text-gray-400 bg-gray-50 px-4 py-2 rounded-full">
                    <Info className="w-4 h-4" />
                    <span>Select a location to begin</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TeamPage;
