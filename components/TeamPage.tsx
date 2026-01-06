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
  X,
  Search,
  ArrowUpRight,
} from 'lucide-react';

// All Karnataka districts
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
  'Gadag',
  'Gulbarga',
  'Hassan',
  'Haveri',
  'Hubli-Dharwad Rural',
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

  const handleCloseModal = () => {
    setSelectedDistrict(null);
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
    <div className="min-h-screen bg-[#FDFBF7] text-slate-800 font-sans selection:bg-orange-200 selection:text-orange-900 relative">
      <Navbar />

      {/* Hero Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden pt-28 pb-12 lg:pt-36 lg:pb-20">
        {/* Abstract Background Decoration */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 lg:w-96 lg:h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-60 h-60 lg:w-80 lg:h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8">
            <div className="max-w-2xl w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-400 text-[10px] lg:text-xs font-bold tracking-widest uppercase mb-4 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Official Hierarchy
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-6xl font-serif font-bold leading-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
                KPYCC Leadership
              </h1>
              <p className="text-sm lg:text-lg text-slate-300 leading-relaxed border-l-2 border-orange-500 pl-4 lg:pl-6 max-w-xl">
                A unified network of leadership across Karnataka's 40
                organizational districts, driving change from the grassroots.
              </p>
            </div>

            {/* Premium Stats Cards - Responsive Grid */}
            <div className="w-full lg:w-auto grid grid-cols-3 gap-2 sm:gap-4">
              <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-xl p-3 lg:p-4 text-center transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-xl lg:text-3xl font-bold text-white mb-1">
                  {KARNATAKA_DISTRICTS.length}
                </div>
                <div className="text-[8px] lg:text-[10px] text-slate-300 uppercase tracking-widest font-semibold">
                  Districts
                </div>
              </div>
              <div className="bg-gradient-to-br from-green-600/20 to-green-900/20 backdrop-blur-md border border-green-500/30 rounded-xl p-3 lg:p-4 text-center transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-xl lg:text-3xl font-bold text-green-400 mb-1">
                  {activeDistricts.length}
                </div>
                <div className="text-[8px] lg:text-[10px] text-green-200 uppercase tracking-widest font-semibold">
                  Active Units
                </div>
              </div>
              <div className="bg-gradient-to-br from-blue-600/20 to-blue-900/20 backdrop-blur-md border border-blue-500/30 rounded-xl p-3 lg:p-4 text-center transform hover:-translate-y-1 transition-transform duration-300">
                <div className="text-xl lg:text-3xl font-bold text-blue-400 mb-1">
                  {totalMembers}
                </div>
                <div className="text-[8px] lg:text-[10px] text-blue-200 uppercase tracking-widest font-semibold">
                  Leaders
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main className="py-8 lg:py-16 container mx-auto px-4 -mt-6 lg:-mt-8 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* LEFT PANEL: Map Card (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-1 order-2 lg:order-1">
            <div className="bg-slate-50/50 rounded-[1.4rem] p-4 lg:p-8 h-full border border-slate-100">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <h2 className="text-xl lg:text-2xl font-serif font-bold text-slate-800 flex items-center gap-3">
                  <span className="p-2 bg-white rounded-lg shadow-sm text-orange-600">
                    <MapPin className="w-5 h-5" />
                  </span>
                  Territorial Map
                </h2>
                {/* Legend */}
                <div className="flex flex-wrap gap-3 text-[10px] lg:text-xs font-semibold bg-white px-3 py-2 rounded-xl lg:rounded-full shadow-sm border border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)]"></span>
                    Selected
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-500"></span>
                    Active
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-slate-300"></span>
                    Inactive
                  </div>
                </div>
              </div>

              {/* Map Container */}
              <div className="relative group flex justify-center items-center min-h-[300px] lg:min-h-[500px] bg-white rounded-2xl border border-slate-100 shadow-inner overflow-hidden">
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage:
                      'radial-gradient(#444 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                ></div>

                <img
                  src="/assets/Karnataka_districts_map.svg"
                  alt="Karnataka Districts Map"
                  className="w-full max-w-[90%] lg:max-w-lg h-auto drop-shadow-2xl transition-all duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: District Selector (5 cols) */}
          <div className="lg:col-span-5 w-full order-1 lg:order-2">
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden flex flex-col h-[500px] lg:h-[700px] lg:sticky lg:top-24">
              {/* Header */}
              <div className="p-5 border-b border-slate-100 bg-slate-50/50">
                <h2 className="text-lg lg:text-xl font-serif font-bold text-slate-800 flex items-center gap-2 mb-1">
                  <Search className="w-5 h-5 text-slate-400" />
                  Find District Unit
                </h2>
                <p className="text-xs lg:text-sm text-slate-500">
                  Select a district to view organization details
                </p>
              </div>

              {/* Scrollable List */}
              <div className="p-4 lg:p-6 overflow-y-auto custom-scrollbar flex-1 bg-gradient-to-b from-white to-slate-50/30">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 lg:gap-3">
                  {KARNATAKA_DISTRICTS.map((district) => {
                    const isSelected = selectedDistrict === district;
                    const hasData = hasDataForDistrict(district);

                    return (
                      <button
                        key={district}
                        onClick={() => handleDistrictClick(district)}
                        className={`
                          relative overflow-hidden group p-3 rounded-xl text-xs font-bold text-left transition-all duration-300 border
                          ${
                            isSelected
                              ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/30 scale-[1.02]'
                              : hasData
                              ? 'bg-white border-green-200 text-slate-700 hover:border-green-400 hover:shadow-md hover:shadow-green-100'
                              : 'bg-slate-50 border-transparent text-slate-400 hover:bg-white hover:border-slate-200'
                          }
                        `}
                      >
                        <div className="flex justify-between items-center z-10 relative">
                          <span className="truncate pr-2">{district}</span>
                          {hasData && (
                            <div
                              className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                                isSelected
                                  ? 'bg-orange-500 animate-pulse'
                                  : 'bg-green-500'
                              }`}
                            ></div>
                          )}
                        </div>

                        {/* Hover decoration */}
                        {!isSelected && hasData && (
                          <div className="absolute inset-0 bg-gradient-to-r from-green-50/0 via-green-50/50 to-green-50/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer of card */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 text-center">
                <p className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                  KPYCC Database 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --------------------------------------------------
        PREMIUM MODAL OVERLAY
        --------------------------------------------------
      */}
      {selectedDistrict && selectedDistrictData && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
          <div
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={handleCloseModal}
          ></div>

          <div className="relative bg-white rounded-3xl shadow-2xl w-[95%] sm:w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 slide-in-from-bottom-4 duration-300 flex flex-col max-h-[85vh] sm:max-h-[90vh]">
            {/* Modal Decorative Header */}
            <div className="h-20 lg:h-24 bg-gradient-to-r from-slate-900 to-slate-800 relative overflow-hidden shrink-0">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-32"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -ml-10 -mb-10"></div>

              <button
                onClick={handleCloseModal}
                className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-5 pb-8 lg:px-8 lg:-mt-12 -mt-10 overflow-y-auto custom-scrollbar">
              {/* Profile Header Block */}
              <div className="flex flex-col items-center text-center mb-6 lg:mb-8 relative">
                {/* Profile Image */}
                <div className="relative mb-3 lg:mb-4 group">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-white p-1.5 shadow-xl rotate-3 group-hover:rotate-0 transition-transform duration-300">
                    <img
                      src={
                        selectedDistrictData.president?.imageUrl ||
                        'https://via.placeholder.com/150'
                      }
                      alt={selectedDistrictData.president?.name}
                      className="w-full h-full object-cover rounded-xl bg-slate-100"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-1.5 rounded-lg shadow-lg border-2 border-white rotate-3 group-hover:rotate-0 transition-transform duration-300 delay-75">
                    <Award className="w-3 h-3 lg:w-4 lg:h-4" />
                  </div>
                </div>

                {/* Names */}
                <h2 className="text-xl lg:text-2xl font-serif font-bold text-slate-900 mb-1">
                  {selectedDistrict} District
                </h2>
                {selectedDistrictData.president ? (
                  <>
                    <h3 className="text-base lg:text-lg font-bold text-slate-700">
                      {selectedDistrictData.president.name}
                    </h3>
                    <p className="text-[10px] lg:text-xs font-semibold text-orange-600 uppercase tracking-widest mb-3">
                      {selectedDistrictData.president.designation}
                    </p>
                    <div className="bg-slate-50 border border-slate-100 rounded-xl p-3 max-w-sm w-full mx-auto">
                      <p className="text-xs lg:text-sm text-slate-500 italic font-medium leading-relaxed line-clamp-3">
                        "{selectedDistrictData.president.bio}"
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="text-sm text-slate-400 italic">
                    District President data pending update.
                  </div>
                )}
              </div>

              {/* Stats Grid */}
              <div className="space-y-4">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px bg-slate-100 flex-1"></div>
                  <span className="text-[10px] lg:text-xs font-bold text-slate-400 uppercase tracking-widest">
                    Organization Strength
                  </span>
                  <div className="h-px bg-slate-100 flex-1"></div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  {/* Stat Card 1 */}
                  <div className="p-3 lg:p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-1.5 lg:p-2 bg-blue-50 rounded-xl group-hover:bg-blue-100 transition-colors">
                        <Award className="w-3 h-3 lg:w-4 lg:h-4 text-blue-600" />
                      </div>
                      <span className="text-xl lg:text-2xl font-bold text-slate-800">
                        {selectedDistrictData.counts.district}
                      </span>
                    </div>
                    <div className="text-[10px] lg:text-xs text-slate-500 font-medium">
                      District Leaders
                    </div>
                  </div>

                  {/* Stat Card 2 */}
                  <div className="p-3 lg:p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-1.5 lg:p-2 bg-green-50 rounded-xl group-hover:bg-green-100 transition-colors">
                        <Building className="w-3 h-3 lg:w-4 lg:h-4 text-green-600" />
                      </div>
                      <span className="text-xl lg:text-2xl font-bold text-slate-800">
                        {selectedDistrictData.counts.assembly}
                      </span>
                    </div>
                    <div className="text-[10px] lg:text-xs text-slate-500 font-medium">
                      Assembly Units
                    </div>
                  </div>

                  {/* Stat Card 3 */}
                  <div className="p-3 lg:p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-1.5 lg:p-2 bg-purple-50 rounded-xl group-hover:bg-purple-100 transition-colors">
                        <Target className="w-3 h-3 lg:w-4 lg:h-4 text-purple-600" />
                      </div>
                      <span className="text-xl lg:text-2xl font-bold text-slate-800">
                        {selectedDistrictData.counts.block}
                      </span>
                    </div>
                    <div className="text-[10px] lg:text-xs text-slate-500 font-medium">
                      Block Presidents
                    </div>
                  </div>

                  {/* Stat Card 4 */}
                  <div className="p-3 lg:p-4 rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group">
                    <div className="flex justify-between items-start mb-2">
                      <div className="p-1.5 lg:p-2 bg-orange-50 rounded-xl group-hover:bg-orange-100 transition-colors">
                        <Users className="w-3 h-3 lg:w-4 lg:h-4 text-orange-600" />
                      </div>
                      <span className="text-xl lg:text-2xl font-bold text-slate-800">
                        {selectedDistrictData.counts.smTeam}
                      </span>
                    </div>
                    <div className="text-[10px] lg:text-xs text-slate-500 font-medium">
                      Social Media Team
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 lg:mt-8">
                <Link
                  to={`/kpycc-team/${selectedDistrict}`}
                  className="w-full py-3 lg:py-4 bg-slate-900 text-white rounded-xl font-bold shadow-lg shadow-slate-900/20 hover:bg-slate-800 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-3 group text-sm lg:text-base"
                >
                  <span>Open Full District Dossier</span>
                  <div className="bg-white/20 p-1 rounded-full group-hover:bg-white/30 transition-colors">
                    <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4" />
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TeamPage;
