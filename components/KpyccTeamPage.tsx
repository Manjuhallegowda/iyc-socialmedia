import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { KpyccTeamMember } from '../types';
import {
  ArrowLeft,
  Users,
  Award,
  MessageSquare,
  Scale,
  TrendingUp,
  MapPin,
  Mail,
  Phone,
  Calendar,
  Target,
  ChevronRight,
  ExternalLink,
  X,
} from 'lucide-react';

const KpyccTeamPage: React.FC = () => {
  const { district } = useParams<{ district: string }>();
  // Update 1: Destructure socialMediaTeam from useData
  const { getDistrictHierarchyData, kpyccTeam, socialMediaTeam } = useData();
  const [activeTab, setActiveTab] = useState<
    'overview' | 'kpycc' | 'social' | 'legal'
  >('overview');
  const [selectedProfile, setSelectedProfile] = useState<any>(null);

  // Get districtData for the current district
  const districtData = useMemo(
    () => (district ? getDistrictHierarchyData(district) : undefined),
    [district, getDistrictHierarchyData]
  );

  // Update 2: Filter and map Social Media Team data for the current district
  const districtSmTeam = useMemo(() => {
    if (!socialMediaTeam || !district) return [];

    // Filter by placeName matching the district (case-insensitive for safety)
    return socialMediaTeam
      .filter(
        (member) => member.placeName?.toLowerCase() === district.toLowerCase()
      )
      .map((member) => ({
        ...member,
        // Map Admin 'position' to 'designation' for the UI component
        designation: member.position,
        // Map Admin 'socialMedia' object to 'social' for the UI component
        social: member.socialMedia,
      }));
  }, [socialMediaTeam, district]);

  // --- Render Helpers ---

  // 1. Profile Modal (Modernized)
  const renderProfileModal = () => {
    if (!selectedProfile) return null;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedProfile(null)}
        ></div>

        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative z-10 overflow-hidden animate-fadeIn flex flex-col max-h-[90vh]">
          {/* Header Background */}
          <div className="h-24 bg-gradient-to-r from-orange-400 to-orange-600 relative">
            <button
              className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 text-white rounded-full p-2 transition-colors"
              onClick={() => setSelectedProfile(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-8 pb-8 -mt-12 overflow-y-auto custom-scrollbar">
            <div className="flex flex-col items-center mb-6">
              <div className="p-1 bg-white rounded-full shadow-md mb-4">
                <img
                  src={selectedProfile.imageUrl}
                  alt={selectedProfile.name}
                  className="w-28 h-28 rounded-full object-cover border-4 border-gray-50"
                />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 text-center">
                {selectedProfile.name}
              </h2>
              <span className="inline-block px-3 py-1 mt-2 bg-green-50 text-green-700 text-xs font-bold uppercase tracking-wide rounded-full border border-green-100">
                {selectedProfile.designation}
              </span>
            </div>

            <div className="space-y-6">
              {/* Contact Info Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedProfile.email && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-full shadow-sm text-blue-600">
                      <Mail className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 truncate">
                      {selectedProfile.email}
                    </span>
                  </div>
                )}
                {selectedProfile.phone && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-full shadow-sm text-green-600">
                      <Phone className="w-4 h-4" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {selectedProfile.phone}
                    </span>
                  </div>
                )}
                {selectedProfile.assembly && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-full shadow-sm text-orange-600">
                      <Calendar className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase">
                        Assembly
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {selectedProfile.assembly}
                      </span>
                    </div>
                  </div>
                )}
                {selectedProfile.block && (
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                    <div className="p-2 bg-white rounded-full shadow-sm text-purple-600">
                      <Target className="w-4 h-4" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs text-gray-400 uppercase">
                        Block
                      </span>
                      <span className="text-sm font-medium text-gray-700">
                        {selectedProfile.block}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bio */}
              {selectedProfile.bio && (
                <div className="prose prose-sm text-gray-600 bg-gray-50 p-4 rounded-2xl border-l-4 border-orange-300">
                  <p>{selectedProfile.bio}</p>
                </div>
              )}

              {/* Social Links */}
              {selectedProfile.social && (
                <div className="flex justify-center gap-4 py-2 border-t border-gray-100">
                  {selectedProfile.social.twitter && (
                    <a
                      href={selectedProfile.social.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {selectedProfile.social.instagram && (
                    <a
                      href={selectedProfile.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-pink-600 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                  {selectedProfile.social.facebook && (
                    <a
                      href={selectedProfile.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="text-gray-400 hover:text-blue-600 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 2. Overview Tab
  const renderOverview = () => (
    <div className="space-y-10 animate-fadeIn">
      {/* Top Section: District President (Hero Card) */}
      {districtData?.president && (
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="h-8 w-1 bg-orange-500 rounded-full"></div>
            <h3 className="text-xl font-bold text-gray-900">
              District Leadership
            </h3>
          </div>

          <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col md:flex-row group">
            <div className="md:w-1/3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 md:hidden"></div>
              <img
                src={districtData.president.imageUrl}
                alt={districtData.president.name}
                className="w-full h-64 md:h-full object-cover object-top transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-4 left-4 text-white z-20 md:hidden">
                <h4 className="text-xl font-bold">
                  {districtData.president.name}
                </h4>
                <p className="text-orange-200">
                  {districtData.president.designation}
                </p>
              </div>
            </div>
            <div className="p-8 md:w-2/3 flex flex-col justify-center bg-gradient-to-br from-white to-orange-50/30">
              <div className="hidden md:block mb-4">
                <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  Highest Ranking
                </span>
                <h2 className="text-3xl font-bold text-gray-900 mt-2 mb-1">
                  {districtData.president.name}
                </h2>
                <p className="text-lg text-orange-600 font-medium">
                  {districtData.president.designation}
                </p>
              </div>

              <p className="text-gray-600 leading-relaxed mb-6 italic">
                "
                {districtData.president.bio ||
                  'Leading the district with vision and dedication.'}
                "
              </p>

              <div className="flex gap-4">
                <button
                  onClick={() => setSelectedProfile(districtData.president)}
                  className="px-6 py-2 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors"
                >
                  View Full Profile
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assembly Level */}
        {districtData?.assemblyMembers &&
          districtData.assemblyMembers.length > 0 && (
            <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg text-green-700">
                    <Users className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-lg text-gray-800">
                    Assembly Leaders
                  </h4>
                </div>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-bold">
                  {districtData.assemblyMembers.length}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {districtData.assemblyMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedProfile(member)}
                    className="cursor-pointer group p-3 rounded-xl hover:bg-green-50 transition-colors border border-transparent hover:border-green-100"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-gray-200"
                      />
                      <div>
                        <h5 className="font-bold text-sm text-gray-900 group-hover:text-green-700 transition-colors">
                          {member.name}
                        </h5>
                        <p className="text-xs text-gray-500">
                          {member.assembly || 'Assembly Lead'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

        {/* Block Level */}
        {districtData?.blockMembers && districtData.blockMembers.length > 0 && (
          <section className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-6 border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg text-purple-700">
                  <Target className="w-5 h-5" />
                </div>
                <h4 className="font-bold text-lg text-gray-800">
                  Block Presidents
                </h4>
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-md text-xs font-bold">
                {districtData.blockMembers.length}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {districtData.blockMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedProfile(member)}
                  className="cursor-pointer group p-3 rounded-xl hover:bg-purple-50 transition-colors border border-transparent hover:border-purple-100"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xs">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <h5 className="font-bold text-sm text-gray-900 group-hover:text-purple-700 transition-colors">
                        {member.name}
                      </h5>
                      <p className="text-xs text-gray-500 truncate max-w-[120px]">
                        {member.block || 'Block Lead'}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );

  // 3. Card Renderer for Lists (KPYCC, Social, Legal)
  const renderTeamGrid = (
    // Updated type definition to handle mapped SM members which are compatible with KpyccTeamMember structure
    members: any[],
    type: 'kpycc' | 'social' | 'legal'
  ) => {
    if (!members || members.length === 0) {
      return (
        <div className="bg-white rounded-3xl border border-dashed border-gray-300 p-12 text-center flex flex-col items-center justify-center">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-300">
            {type === 'social' ? (
              <MessageSquare />
            ) : type === 'legal' ? (
              <Scale />
            ) : (
              <Users />
            )}
          </div>
          <h3 className="text-lg font-bold text-gray-900">No Members Found</h3>
          <p className="text-gray-500 text-sm">
            This team hasn't been updated for {district} yet.
          </p>
        </div>
      );
    }

    const typeColors = {
      kpycc: 'bg-orange-500',
      social: 'bg-blue-500',
      legal: 'bg-gray-800',
    };

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fadeIn">
        {members.map((member) => (
          <div
            key={member.id}
            className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-orange-100 transition-all duration-300 flex flex-col overflow-hidden"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              <img
                src={member.imageUrl}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-black/50 to-transparent"></div>
              <span
                className={`absolute top-4 right-4 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-white shadow-sm ${typeColors[type]}`}
              >
                {type === 'kpycc'
                  ? 'KPYCC'
                  : type === 'social'
                  ? 'IT Cell'
                  : 'Legal'}
              </span>
            </div>

            <div className="p-6 flex-1 flex flex-col">
              <div className="mb-4">
                <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-600 transition-colors">
                  {member.name}
                </h3>
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wide mt-1">
                  {member.designation}
                </p>
              </div>

              <p className="text-gray-500 text-sm line-clamp-2 mb-6 flex-1">
                {member.bio ||
                  "Dedicated party member working towards the organization's goals."}
              </p>

              <button
                onClick={() => setSelectedProfile(member)}
                className="w-full py-2.5 rounded-xl border border-gray-200 text-gray-600 font-semibold text-sm hover:bg-gray-900 hover:text-white hover:border-gray-900 transition-all flex items-center justify-center gap-2"
              >
                View Profile <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --- Main Layout ---

  return (
    <div className="min-h-screen bg-gray-50/50 font-sans text-gray-800 selection:bg-orange-100 selection:text-orange-900">
      <Navbar />
      {renderProfileModal()}

      <main className="pt-28 pb-20 container mx-auto px-4 md:px-6">
        {/* 1. Header & Navigation */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link
              to="/team"
              className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-orange-600 transition-colors mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
              Back to Karnataka Map
            </Link>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                {district}
              </h1>
              <span className="px-3 py-1 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-wider text-gray-500 shadow-sm">
                District Unit
              </span>
            </div>
            <p className="text-lg text-gray-500 max-w-2xl">
              Executive leadership structure and departmental teams.
            </p>
          </div>

          {/* Stats Pills */}
          <div className="flex gap-3">
            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg text-orange-600">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 leading-none">
                  {districtData?.counts.totalActive || 0}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                  Total Members
                </div>
              </div>
            </div>
            <div className="bg-white px-5 py-3 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xl font-bold text-gray-900 leading-none">
                  {districtData?.counts.assembly || 0}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mt-1">
                  Assemblies
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Floating Tab Navigation */}
        <div className="sticky top-24 z-30 mb-8">
          <div className="bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-lg shadow-gray-200/50 inline-flex flex-wrap gap-1 border border-gray-100 w-full md:w-auto">
            {[
              { key: 'overview', label: 'Overview', icon: TrendingUp },
              { key: 'kpycc', label: 'KPYCC Team', icon: Users },
              { key: 'social', label: 'Social Media', icon: MessageSquare },
              { key: 'legal', label: 'Legal Wing', icon: Scale },
            ].map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key as any)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-200 ${
                  activeTab === key
                    ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-md'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon
                  className={`w-4 h-4 ${
                    activeTab === key ? 'text-orange-400' : ''
                  }`}
                />
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Main Content Area */}
        <div className="min-h-[500px]">
          {activeTab === 'overview' && renderOverview()}

          {activeTab === 'kpycc' &&
            renderTeamGrid(
              kpyccTeam.filter((member) => member.district === district),
              'kpycc'
            )}

          {/* Update 3: Use the filtered districtSmTeam instead of districtData */}
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
