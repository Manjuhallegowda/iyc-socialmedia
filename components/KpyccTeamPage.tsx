import React, { useMemo, useState } from 'react';
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
  Calendar,
  Target,
  ChevronRight,
  ExternalLink,
  X,
  Share2,
  Award,
} from 'lucide-react';

const KpyccTeamPage: React.FC = () => {
  const { district } = useParams<{ district: string }>();

  // --- DATA LOGIC (Preserved) ---
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

  // Filter and map Social Media Team data (Logic Preserved)
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

  // 1. Modernized Glass Modal
  const renderProfileModal = () => {
    if (!selectedProfile) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-300"
          onClick={() => setSelectedProfile(null)}
        ></div>

        <div className="bg-white rounded-[2rem] shadow-2xl w-full max-w-md relative z-10 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200">
          {/* Header Image Pattern */}
          <div className="h-32 bg-gradient-to-br from-orange-500 via-orange-600 to-red-600 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent"></div>
            <button
              className="absolute top-4 right-4 bg-black/20 hover:bg-black/40 text-white rounded-full p-2 transition-all backdrop-blur-sm"
              onClick={() => setSelectedProfile(null)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 pb-8 relative">
            {/* Profile Image - Floating */}
            <div className="-mt-16 mb-4 flex justify-center">
              <div className="p-1.5 bg-white rounded-full shadow-xl">
                <img
                  src={selectedProfile.imageUrl}
                  alt={selectedProfile.name}
                  className="w-32 h-32 rounded-full object-cover border border-gray-100"
                />
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
                {selectedProfile.name}
              </h2>
              <p className="text-orange-600 font-medium text-sm mt-1 uppercase tracking-wide">
                {selectedProfile.designation}
              </p>
            </div>

            <div className="space-y-4 overflow-y-auto max-h-[40vh] pr-2 custom-scrollbar">
              {/* Bio Section */}
              {selectedProfile.bio && (
                <div className="bg-orange-50/50 p-4 rounded-2xl border border-orange-100 text-sm text-gray-600 leading-relaxed text-center italic">
                  "{selectedProfile.bio}"
                </div>
              )}

              {/* Contact Details List */}
              <div className="space-y-2">
                {selectedProfile.phone && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-green-600 mr-4 group-hover:scale-110 transition-transform">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">
                        Phone
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {selectedProfile.phone}
                      </p>
                    </div>
                  </div>
                )}
                {selectedProfile.email && (
                  <div className="flex items-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors group">
                    <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center text-blue-600 mr-4 group-hover:scale-110 transition-transform">
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-semibold uppercase">
                        Email
                      </p>
                      <p className="text-sm font-medium text-gray-900 truncate max-w-[200px]">
                        {selectedProfile.email}
                      </p>
                    </div>
                  </div>
                )}
                {(selectedProfile.assembly || selectedProfile.block) && (
                  <div className="flex gap-2">
                    {selectedProfile.assembly && (
                      <div className="flex-1 flex items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-xs font-bold text-gray-500 uppercase mr-2">
                          Assembly:
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {selectedProfile.assembly}
                        </span>
                      </div>
                    )}
                    {selectedProfile.block && (
                      <div className="flex-1 flex items-center justify-center p-3 bg-gray-50 rounded-xl border border-gray-100">
                        <span className="text-xs font-bold text-gray-500 uppercase mr-2">
                          Block:
                        </span>
                        <span className="text-sm font-bold text-gray-900">
                          {selectedProfile.block}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Social Actions */}
              {selectedProfile.social && (
                <div className="pt-4 mt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
                  {selectedProfile.social.twitter && (
                    <a
                      href={selectedProfile.social.twitter}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-sky-50 text-gray-400 hover:text-sky-500 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Twitter</span>
                    </a>
                  )}
                  {selectedProfile.social.instagram && (
                    <a
                      href={selectedProfile.social.instagram}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-pink-50 text-gray-400 hover:text-pink-600 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Insta</span>
                    </a>
                  )}
                  {selectedProfile.social.facebook && (
                    <a
                      href={selectedProfile.social.facebook}
                      target="_blank"
                      rel="noreferrer"
                      className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-blue-50 text-gray-400 hover:text-blue-700 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                      <span className="text-[10px] font-bold">Facebook</span>
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

  // 2. Overview Tab (New Design)
  const renderOverview = () => (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Hero Card - President */}
      {districtData?.president && (
        <section className="relative overflow-hidden rounded-[2.5rem] bg-gray-900 shadow-2xl group">
          <div className="absolute inset-0">
            <img
              src={districtData.president.imageUrl}
              className="w-full h-full object-cover opacity-40 group-hover:scale-105 transition-transform duration-1000"
              alt="Background"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/90 to-transparent"></div>
          </div>

          <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-br from-orange-400 to-yellow-300">
                <img
                  src={districtData.president.imageUrl}
                  alt={districtData.president.name}
                  className="w-full h-full rounded-full object-cover border-4 border-gray-900"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 bg-orange-500 text-white p-2 rounded-full shadow-lg">
                <Award className="w-6 h-6" />
              </div>
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-block px-3 py-1 bg-white/10 backdrop-blur-sm rounded-full text-orange-400 text-xs font-bold uppercase tracking-widest mb-3 border border-white/10">
                District President
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                {districtData.president.name}
              </h2>
              <p className="text-gray-400 text-lg mb-6 max-w-2xl">
                {districtData.president.bio ||
                  'Leading with vision and integrity for the future of our district.'}
              </p>
              <button
                onClick={() => setSelectedProfile(districtData.president)}
                className="inline-flex items-center px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-semibold transition-all shadow-lg shadow-orange-900/20"
              >
                View Full Profile <ChevronRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Grid for Sub-Leaders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Assembly Panel */}
        {districtData?.assemblyMembers &&
          districtData.assemblyMembers.length > 0 && (
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center text-green-600">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-800">
                    Assembly Leads
                  </h3>
                </div>
                <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                  {districtData.assemblyMembers.length} Active
                </span>
              </div>

              <div className="space-y-3">
                {districtData.assemblyMembers.slice(0, 5).map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedProfile(member)}
                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group border border-transparent hover:border-gray-200"
                  >
                    <img
                      src={member.imageUrl}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h5 className="font-bold text-gray-900 group-hover:text-green-700 transition-colors">
                        {member.name}
                      </h5>
                      <p className="text-xs text-gray-500 uppercase tracking-wide">
                        {member.assembly}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-gray-600" />
                  </div>
                ))}
              </div>
            </div>
          )}

        {/* Block Panel */}
        {districtData?.blockMembers && districtData.blockMembers.length > 0 && (
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                  <Target className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-gray-800">
                  Block Presidents
                </h3>
              </div>
              <span className="text-xs font-bold text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                {districtData.blockMembers.length} Active
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {districtData.blockMembers.slice(0, 6).map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedProfile(member)}
                  className="p-3 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors cursor-pointer text-center border border-transparent hover:border-blue-100"
                >
                  <div className="w-10 h-10 mx-auto rounded-full bg-white text-blue-600 font-bold flex items-center justify-center text-sm shadow-sm mb-2">
                    {member.name.charAt(0)}
                  </div>
                  <h5 className="font-bold text-sm text-gray-900 truncate">
                    {member.name}
                  </h5>
                  <p className="text-[10px] text-gray-500 uppercase">
                    {member.block}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );

  // 3. Render Team Grid (Universal for Tabs)
  const renderTeamGrid = (
    members: any[],
    type: 'kpycc' | 'social' | 'legal'
  ) => {
    if (!members || members.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-6">
            <Users className="w-8 h-8 opacity-50" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            No Members Found
          </h3>
          <p className="text-gray-500 max-w-sm mx-auto">
            The{' '}
            {type === 'social'
              ? 'Social Media'
              : type === 'legal'
              ? 'Legal'
              : 'KPYCC'}{' '}
            team roster for {district} is currently being updated.
          </p>
        </div>
      );
    }

    const badgeColor =
      type === 'kpycc'
        ? 'bg-orange-100 text-orange-700'
        : type === 'social'
        ? 'bg-sky-100 text-sky-700'
        : 'bg-slate-100 text-slate-700';

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-8 duration-500">
        {members.map((member) => (
          <div
            key={member.id}
            onClick={() => setSelectedProfile(member)}
            className="group bg-white rounded-3xl p-5 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-100 relative cursor-pointer"
          >
            {/* Top Row */}
            <div className="flex justify-between items-start mb-4">
              <span
                className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider ${badgeColor}`}
              >
                {type === 'social'
                  ? 'Social'
                  : type === 'legal'
                  ? 'Legal'
                  : 'Leader'}
              </span>
              <div className="w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 group-hover:bg-gray-900 group-hover:text-white transition-colors">
                <Share2 className="w-4 h-4" />
              </div>
            </div>

            {/* Image & Info */}
            <div className="flex flex-col items-center text-center">
              <div className="relative w-24 h-24 mb-4">
                <img
                  src={member.imageUrl}
                  alt={member.name}
                  className="w-full h-full rounded-full object-cover border-4 border-gray-50 shadow-inner group-hover:scale-110 transition-transform duration-300"
                />
                {type === 'social' && (
                  <div className="absolute bottom-0 right-0 bg-sky-500 border-2 border-white rounded-full p-1.5">
                    <MessageSquare className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>

              <h3 className="text-lg font-bold text-gray-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors">
                {member.name}
              </h3>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 h-8 flex items-center justify-center">
                {member.designation}
              </p>

              <div className="w-full pt-4 border-t border-gray-50 flex items-center justify-center gap-2 text-sm text-gray-500 font-medium group-hover:text-gray-900">
                View Profile <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // --- MAIN LAYOUT ---

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-800">
      <Navbar />
      {renderProfileModal()}

      {/* Decorative Background Mesh */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-full h-[500px] bg-gradient-to-b from-orange-50/50 to-transparent"></div>
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-blue-50/30 rounded-full blur-3xl opacity-60 mix-blend-multiply"></div>
      </div>

      <main className="relative z-10 pt-28 pb-20 container mx-auto px-4 md:px-6">
        {/* 1. Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="space-y-4">
            <Link
              to="/team"
              className="inline-flex items-center text-sm font-semibold text-gray-400 hover:text-orange-600 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Map
            </Link>
            <div>
              <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-2">
                {district}
              </h1>
              <p className="text-lg text-gray-500 font-medium">
                District Committee Structure & Leadership
              </p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4">
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4 min-w-[160px]">
              <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {districtData?.counts.totalActive || 0}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Members
                </div>
              </div>
            </div>
            <div className="bg-white/80 backdrop-blur-sm p-4 rounded-2xl border border-white shadow-sm flex items-center gap-4 min-w-[160px]">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {districtData?.counts.assembly || 0}
                </div>
                <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                  Assemblies
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Navigation Tabs (Sticky Pill Design) */}
        <div className="sticky top-24 z-30 mb-10">
          <div className="bg-white/90 backdrop-blur-md border border-gray-200/60 p-1.5 rounded-2xl shadow-lg shadow-gray-200/50 inline-flex w-full md:w-auto overflow-x-auto">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'kpycc', label: 'KPYCC Team', icon: Users },
              { id: 'social', label: 'Social Media', icon: MessageSquare },
              { id: 'legal', label: 'Legal Wing', icon: Scale },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`
                    flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold transition-all duration-300 whitespace-nowrap
                    ${
                      activeTab === tab.id
                        ? 'bg-gray-900 text-white shadow-md'
                        : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                    }
                  `}
              >
                <tab.icon
                  className={`w-4 h-4 ${
                    activeTab === tab.id ? 'text-orange-400' : ''
                  }`}
                />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 3. Dynamic Content Area */}
        <div className="min-h-[600px] animate-in fade-in duration-300">
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
