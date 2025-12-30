import React, { useMemo, useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import {
  ArrowLeft,
  Users,
  MessageSquare,
  Scale,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  ChevronRight,
  ExternalLink,
  X,
  Share2,
  Award,
  Landmark,
  Target,
} from 'lucide-react';

const KpyccTeamPage: React.FC = () => {
  const { district } = useParams<{ district: string }>();

  // --- DATA LOGIC ---
  const { getDistrictHierarchyData, kpyccTeam, socialMediaTeam } = useData();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'kpycc' | 'social' | 'legal'
  >('overview');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedProfile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProfile]);

  const districtData = useMemo(
    () => (district ? getDistrictHierarchyData(district) : undefined),
    [district, getDistrictHierarchyData]
  );

  const districtSmTeam = useMemo(() => {
    if (!socialMediaTeam || !district) return [];
    return socialMediaTeam
      .filter(
        (member) => member.placeName?.toLowerCase() === district.toLowerCase()
      )
      .map((member) => ({
        ...member,
        designation: member.position,
        social: member.socialMedia,
      }));
  }, [socialMediaTeam, district]);

  // --- RENDER HELPERS ---

  // 1. Improved Profile Modal (Mobile Friendly + Assembly Logic)
  const renderProfileModal = () => {
    if (!selectedProfile) return null;

    // Determine specific location context (Assembly vs Block vs District)
    const locationContext = selectedProfile.assembly
      ? {
          label: 'Assembly Constituency',
          value: selectedProfile.assembly,
          icon: Landmark,
          color: 'text-orange-600',
          bg: 'bg-orange-50',
        }
      : selectedProfile.block
      ? {
          label: 'Block Unit',
          value: selectedProfile.block,
          icon: Target,
          color: 'text-blue-600',
          bg: 'bg-blue-50',
        }
      : {
          label: 'District Level',
          value: district,
          icon: MapPin,
          color: 'text-green-600',
          bg: 'bg-green-50',
        };

    return (
      <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity duration-300"
          onClick={() => setSelectedProfile(null)}
        ></div>

        {/* Modal Card */}
        <div className="bg-white w-full md:max-w-md md:rounded-[2rem] rounded-t-[2rem] shadow-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in slide-in-from-bottom-10 duration-300">
          {/* Header Pattern */}
          <div className="h-28 bg-gradient-to-r from-orange-600 to-orange-500 relative shrink-0">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
            <button
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/30 text-white rounded-full p-2 transition-all backdrop-blur-md z-20"
              onClick={() => setSelectedProfile(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative z-10 px-6 pb-8 -mt-14 overflow-y-auto custom-scrollbar">
            {/* Profile Image */}
            <div className="flex justify-center mb-4">
              <div className="p-1.5 bg-white rounded-full shadow-lg">
                <img
                  src={selectedProfile.imageUrl}
                  alt={selectedProfile.name}
                  className="w-28 h-28 rounded-full object-cover border border-gray-100"
                />
              </div>
            </div>
            {/* Title Section */}
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                {selectedProfile.name}
              </h2>
              <span className="inline-block mt-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold text-gray-600 uppercase tracking-wide">
                {selectedProfile.designation ||
                  selectedProfile.position ||
                  'Leader'}
              </span>
            </div>
            {/* Jurisdiction Badge (Assembly/Block Logic) */}
            <div
              className={`flex items-center justify-center gap-2 p-3 rounded-xl mb-6 border ${locationContext.bg} ${locationContext.color} border-opacity-50`}
            >
              <locationContext.icon className="w-4 h-4" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] font-bold opacity-70 uppercase leading-none">
                  {locationContext.label}
                </span>
                <span className="text-sm font-bold leading-tight">
                  {locationContext.value}
                </span>
              </div>
            </div>
            {/* Info Stack */}
            <div className="space-y-4">
              {/* Contact Grid */}
              <div className="grid grid-cols-1 gap-3">
                {selectedProfile.phone && (
                  <a
                    href={`tel:${selectedProfile.phone}`}
                    className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-green-50 group transition-colors border border-gray-100"
                  >
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-green-600 mr-3 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        Call Now
                      </p>
                      <p className="text-sm font-semibold text-gray-900">
                        {selectedProfile.phone}
                      </p>
                    </div>
                  </a>
                )}

                {selectedProfile.email && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 mr-3">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-[10px] text-gray-400 font-bold uppercase">
                        Email
                      </p>
                      <p className="text-sm font-semibold text-gray-900 truncate">
                        {selectedProfile.email}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Bio */}
              {selectedProfile.bio && (
                <div className="bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                  <p className="text-sm text-gray-600 italic leading-relaxed text-center">
                    "{selectedProfile.bio}"
                  </p>
                </div>
              )}

              {/* Social Media */}
              {selectedProfile.social && (
                <div className="pt-4 mt-2 border-t border-gray-100">
                  <p className="text-center text-xs font-bold text-gray-400 uppercase mb-3">
                    Connect on Social Media
                  </p>
                  <div className="flex justify-center gap-4">
                    {selectedProfile.social.twitter && (
                      <a
                        href={selectedProfile.social.twitter}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-sky-50 text-sky-500 flex items-center justify-center hover:bg-sky-500 hover:text-white transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {selectedProfile.social.instagram && (
                      <a
                        href={selectedProfile.social.instagram}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-pink-50 text-pink-600 flex items-center justify-center hover:bg-pink-600 hover:text-white transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                    {selectedProfile.social.facebook && (
                      <a
                        href={selectedProfile.social.facebook}
                        target="_blank"
                        rel="noreferrer"
                        className="w-10 h-10 rounded-full bg-blue-50 text-blue-700 flex items-center justify-center hover:bg-blue-700 hover:text-white transition-all"
                      >
                        <ExternalLink className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="h-6 md:hidden"></div>{' '}
            {/* Mobile safe space bottom */}
          </div>
        </div>
      </div>
    );
  };

  // 2. Overview Tab
  const renderOverview = () => (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* President Card - Mobile Optimized */}
      {districtData?.president && (
        <section className="bg-white rounded-3xl shadow-lg border border-gray-100 overflow-hidden relative group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-50 rounded-full blur-3xl -mr-32 -mt-32 opacity-60"></div>

          <div className="relative p-6 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-6">
            <div className="relative shrink-0">
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full p-1 bg-gradient-to-b from-orange-400 to-white shadow-xl">
                <img
                  src={districtData.president.imageUrl}
                  alt={districtData.president.name}
                  className="w-full h-full rounded-full object-cover border-4 border-white"
                />
              </div>
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <span className="bg-gray-900 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-lg uppercase tracking-wider">
                  District President
                </span>
              </div>
            </div>

            <div className="flex-1 text-center md:text-left pt-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                {districtData.president.name}
              </h2>
              <p className="text-gray-500 text-sm md:text-base mb-6 leading-relaxed max-w-2xl">
                {districtData.president.bio ||
                  'Leading the youth of our district towards a brighter, inclusive future under the guidance of IYC.'}
              </p>

              <button
                onClick={() => setSelectedProfile(districtData.president)}
                className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-500 hover:to-orange-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 transition-all w-full md:w-auto"
              >
                View Full Profile <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Assembly Grid */}
      {districtData?.assemblyMembers &&
        districtData.assemblyMembers.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
                <Landmark className="w-5 h-5 text-orange-600" />
                Assembly Leaders
              </h3>
              <span className="bg-orange-50 text-orange-700 text-xs font-bold px-2.5 py-1 rounded-md">
                {districtData.assemblyMembers.length} Constituencies
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {districtData.assemblyMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedProfile(member)}
                  className="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-md transition-all cursor-pointer border border-transparent hover:border-gray-100 group"
                >
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-12 h-12 rounded-full object-cover shadow-sm"
                  />
                  <div className="overflow-hidden">
                    <h5 className="font-bold text-gray-900 truncate group-hover:text-orange-600 transition-colors">
                      {member.name}
                    </h5>
                    <p className="text-xs font-semibold text-gray-500 uppercase flex items-center gap-1">
                      <MapPin className="w-3 h-3" /> {member.assembly}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      {/* Block Presidents (Compact View) */}
      {districtData?.blockMembers && districtData.blockMembers.length > 0 && (
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-xl text-gray-800 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Block Presidents
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {districtData.blockMembers.map((member) => (
              <button
                key={member.id}
                onClick={() => setSelectedProfile(member)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-700 rounded-xl transition-colors border border-gray-100 text-sm font-medium"
              >
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                {member.block}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  // 3. Grid Renderer
  const renderTeamGrid = (
    members: any[],
    type: 'kpycc' | 'social' | 'legal'
  ) => {
    if (!members?.length) {
      return (
        <div className="flex flex-col items-center justify-center py-16 px-4 bg-white rounded-3xl border border-dashed border-gray-200">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Users className="w-8 h-8 text-gray-300" />
          </div>
          <p className="text-gray-500 font-medium text-center">
            No active members listed for this section yet.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
        {members.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedProfile(member)}
            className="group bg-white rounded-2xl p-4 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
          >
            {/* Decorative Top Bar */}
            <div
              className={`absolute top-0 inset-x-0 h-1 ${
                type === 'social'
                  ? 'bg-sky-500'
                  : type === 'legal'
                  ? 'bg-slate-600'
                  : 'bg-orange-500'
              }`}
            ></div>

            <div className="relative mt-2 mb-3">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover border-4 border-gray-50 shadow-inner group-hover:scale-105 transition-transform"
              />
              {/* Context Badge */}
              {(member.assembly || member.block) && (
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[9px] px-2 py-0.5 rounded-full whitespace-nowrap z-10">
                  {member.assembly || member.block}
                </div>
              )}
            </div>

            <h3 className="text-sm md:text-base font-bold text-gray-900 leading-tight mb-1 line-clamp-2 min-h-[2.5em] flex items-center justify-center">
              {member.name}
            </h3>
            <p className="text-[10px] md:text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
              {member.designation}
            </p>

            <button className="mt-auto text-xs font-semibold text-gray-500 group-hover:text-orange-600 flex items-center gap-1 transition-colors">
              View Profile <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-800">
      <Navbar />
      {renderProfileModal()}

      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-50/40 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-50/40 rounded-full blur-[100px] mix-blend-multiply opacity-70"></div>
      </div>

      <main className="relative z-10 pt-24 md:pt-32 pb-20 container mx-auto px-4 md:px-6 max-w-7xl">
        {/* 1. Page Header (Mobile Optimized) */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 md:mb-12">
          <div className="space-y-2 md:space-y-4">
            <Link
              to="/team"
              className="inline-flex items-center text-xs md:text-sm font-bold text-gray-400 hover:text-orange-600 transition-colors uppercase tracking-wider"
            >
              <ArrowLeft className="w-3 h-3 md:w-4 md:h-4 mr-2" />
              Return to Map
            </Link>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 tracking-tight uppercase">
              {district}
            </h1>
            <p className="text-sm md:text-lg text-gray-500 font-medium">
              Karnataka Pradesh Youth Congress Committee
            </p>
          </div>

          {/* Stats Cards - Grid on Mobile, Flex on Desktop */}
          <div className="grid grid-cols-2 md:flex md:gap-4 gap-3 w-full lg:w-auto">
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 md:min-w-[140px]">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center shrink-0">
                <Users className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 leading-none">
                  {districtData?.counts.totalActive || 0}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                  Total Active
                </div>
              </div>
            </div>

            <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-2 md:gap-4 md:min-w-[140px]">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 text-green-600 rounded-lg flex items-center justify-center shrink-0">
                <Landmark className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div>
                <div className="text-xl md:text-2xl font-bold text-gray-900 leading-none">
                  {districtData?.counts.assembly || 0}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase mt-1">
                  Assemblies
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Navigation Tabs (Scrollable Mobile) */}
        <div className="sticky top-20 z-40 mb-8 -mx-4 px-4 md:mx-0 md:px-0">
          <div className="flex overflow-x-auto no-scrollbar gap-2 pb-2 md:pb-0 md:bg-white/80 md:backdrop-blur-md md:border md:border-gray-200 md:p-1.5 md:rounded-2xl md:inline-flex shadow-sm md:shadow-none">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'kpycc', label: 'District Team', icon: Users },
              { id: 'social', label: 'Social Media', icon: MessageSquare },
              { id: 'legal', label: 'Legal Wing', icon: Scale },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                  flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap shrink-0 border md:border-transparent
                  ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 border-gray-900'
                      : 'bg-white md:bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900 border-gray-200'
                  }
                `}
              >
                <tab.icon
                  className={`w-4 h-4 ${
                    activeTab === tab.id ? 'text-orange-400' : 'text-gray-400'
                  }`}
                />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Content Area */}
        <div className="min-h-[500px]">
          {activeTab === 'overview' && renderOverview()}

          {activeTab === 'kpycc' &&
            renderTeamGrid(
              kpyccTeam.filter((m) => m.district === district),
              'kpycc'
            )}

          {activeTab === 'social' && renderTeamGrid(districtSmTeam, 'social')}

          {activeTab === 'legal' &&
            renderTeamGrid(districtData?.legalTeamMembers || [], 'legal')}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default KpyccTeamPage;
