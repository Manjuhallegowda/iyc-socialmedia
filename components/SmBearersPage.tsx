import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import { SocialMediaTeamMember } from '../types';

import {
  ArrowLeft,
  Search,
  Users,
  ExternalLink,
  Mail,
  Phone,
  X,
  Award,
  CheckCircle2,
  Twitter,
  Instagram,
  Facebook,
  ArrowRight,
  MapPin,
  ChevronRight,
  Quote,
  Activity,
} from 'lucide-react';

const SmBearersPage: React.FC = () => {
  // Now fetching the specific Social Media Team data from Context
  const { socialMediaTeam } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProfile, setSelectedProfile] =
    useState<SocialMediaTeamMember | null>(null);

  // Fallback if data isn't loaded yet
  const allMembers: SocialMediaTeamMember[] = socialMediaTeam || [];

  // Filter logic for the search bar
  const filteredMembers = useMemo(() => {
    return allMembers.filter(
      (member) =>
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (member.placeName &&
          member.placeName.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [allMembers, searchTerm]);

  // --- MODAL COMPONENT ---
  const renderProfileModal = () => {
    if (!selectedProfile) return null;

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Dark Glass Backdrop */}

        <div
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xl transition-all duration-500"
          onClick={() => setSelectedProfile(null)}
        />

        <div className="relative w-full max-w-4xl bg-white/90 backdrop-blur-md rounded-[2rem] shadow-2xl overflow-hidden flex flex-col md:flex-row animate-in fade-in zoom-in-95 duration-300 border border-white/50">
          {/* Close Button */}

          <button
            className="absolute top-4 right-4 z-20 p-2 bg-slate-100/50 hover:bg-slate-200 rounded-full transition-colors"
            onClick={() => setSelectedProfile(null)}
          >
            <X size={20} className="text-slate-600" />
          </button>

          {/* Left: Image & Socials (Dark Sidebar) */}

          <div className="w-full md:w-1/3 bg-slate-900 text-white relative overflow-hidden p-8 flex flex-col items-center justify-center text-center">
            {/* Decorative Background Mesh */}

            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-600/20 to-transparent"></div>

            <div className="absolute -bottom-20 -left-20 w-60 h-60 bg-blue-600/20 rounded-full blur-[80px]"></div>

            <div className="relative z-10">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-500 to-yellow-500 rounded-full blur-lg opacity-40"></div>

                <img
                  src={
                    selectedProfile.imageUrl ||
                    'https://via.placeholder.com/150'
                  }
                  alt={selectedProfile.name}
                  className="relative w-40 h-40 rounded-full object-cover border-[6px] border-slate-800 shadow-2xl"
                />

                <div className="absolute bottom-2 right-2 bg-blue-500 text-white p-1.5 rounded-full ring-4 ring-slate-900">
                  <CheckCircle2 size={16} />
                </div>
              </div>

              <h3 className="mt-6 text-2xl font-serif font-medium tracking-wide">
                {selectedProfile.name}
              </h3>

              <p className="text-orange-400 text-xs font-bold uppercase tracking-widest mt-2 opacity-90">
                {selectedProfile.position}
              </p>

              <div className="flex gap-4 mt-8 justify-center">
                {selectedProfile.socialMedia?.twitter && (
                  <a
                    href={selectedProfile.socialMedia.twitter}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <Twitter size={20} />
                  </a>
                )}

                {selectedProfile.socialMedia?.instagram && (
                  <a
                    href={selectedProfile.socialMedia.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <Instagram size={20} />
                  </a>
                )}

                {selectedProfile.socialMedia?.facebook && (
                  <a
                    href={selectedProfile.socialMedia.facebook}
                    target="_blank"
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white transition-colors"
                  >
                    <Facebook size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Right: Content (Light Area) */}

          <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[60vh] md:max-h-[80vh]">
            <div className="flex items-center gap-2 mb-6">
              <span className="w-2 h-8 bg-orange-500 rounded-full"></span>

              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-widest">
                Official Record
              </h2>
            </div>

            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <MapPin className="text-orange-500" size={18} />

                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Jurisdiction
                    </span>
                  </div>

                  <p className="text-slate-900 font-semibold">
                    {selectedProfile.placeName || 'Karnataka'}
                  </p>

                  <p className="text-slate-400 text-sm">
                    {selectedProfile.level}
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <Activity className="text-green-500" size={18} />

                    <span className="text-xs font-bold text-slate-500 uppercase">
                      Status
                    </span>
                  </div>

                  <p className="text-slate-900 font-semibold">Active Member</p>

                  <p className="text-slate-400 text-sm">Verified Profile</p>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-xl text-slate-900 mb-3 flex items-center gap-2">
                  <Quote size={16} className="text-slate-300" /> Biography
                </h4>

                <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                  {selectedProfile.bio ||
                    'Dedicated member of the Indian Youth Congress social media team, working towards digital empowerment and grassroots connectivity.'}
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-slate-100">
                {(selectedProfile as any).email && (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600">
                      <Mail size={16} />
                    </div>

                    <span className="text-slate-600 font-medium">
                      {(selectedProfile as any).email}
                    </span>
                  </div>
                )}

                {(selectedProfile as any).phone && (
                  <div className="flex items-center gap-4 text-sm">
                    <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center text-green-600">
                      <Phone size={16} />
                    </div>

                    <span className="text-slate-600 font-medium">
                      {(selectedProfile as any).phone}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <Navbar />
      {renderProfileModal()}

      <main className="pt-24 pb-20">
        {/* --- HERO SECTION WITH CHAIRPERSON --- */}
        {/* --- HERO SECTION WITH CHAIRPERSON --- */}
        <div className="relative text-white py-12 md:py-20 px-4 overflow-hidden">
          {/* --- BACKGROUND LAYERS --- */}

          {/* 1. The Background Image URL - REPLACE '/assets/hero-bg.jpg' with your actual image path */}
          {/* Using a placeholder suitable for a political/social theme */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('/assets/backend.png')`,
            }}
          ></div>

          {/* 2. Dark Overlay for contrast (Crucial for readability) */}
          <div className="absolute inset-0 bg-slate-950/50 bg-gradient-to-t from-slate-900/50 via-slate-800/50 to-transparent mix-blend-multiply"></div>

          {/* 3. Subtle Texture Overlay (Kept from original for depth) */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-soft-light"></div>

          {/* --- MAIN CONTENT --- */}
          <div className="container mx-auto relative z-10 max-w-6xl">
            <Link
              to="/"
              className="inline-flex items-center text-slate-300 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>

            <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
              {/* Left Side: Title & Stats */}
              <div className="flex-1 text-center lg:text-left">
                <span className="text-orange-400 font-bold tracking-widest uppercase text-sm mb-3 block">
                  Indian Youth Congress • Karnataka
                </span>
                <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-white drop-shadow-sm">
                  Social Media <br className="hidden md:block" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-200 font-black">
                    Department
                  </span>
                </h1>
                <p className="text-lg text-slate-200 max-w-xl mx-auto lg:mx-0 mb-8 leading-relaxed">
                  The digital war room of KPYCC. Amplifying the voice of youth
                  and driving the narrative across Karnataka.
                </p>

                <div className="inline-flex items-center gap-2 bg-slate-900/60 backdrop-blur-md px-5 py-3 rounded-full border border-slate-700/50 shadow-lg">
                  <Users className="text-green-500" size={20} />
                  <span className="font-mono font-bold text-xl text-white">
                    {allMembers.length}
                  </span>
                  <span className="text-slate-300 text-sm font-medium">
                    Active Bearers
                  </span>
                </div>
              </div>

              {/* Right Side: Chairperson Card (Hardcoded) - NO CHANGES MADE HERE */}
              <div className="w-full max-w-md lg:w-[450px]">
                <div className="group relative bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/30 border border-slate-100 overflow-hidden hover:-translate-y-2 transition-all duration-500">
                  {/* Top Decorative Tricolor Strip */}
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600 z-20" />

                  {/* Image Section */}
                  <div className="relative h-[22rem] overflow-hidden">
                    <div className="absolute inset-0 bg-slate-100 animate-pulse" />{' '}
                    {/* Loading placeholder */}
                    <img
                      src="/assets/siddu.jpeg"
                      alt="Siddu Halleygowda"
                      className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=2070&auto=format&fit=crop';
                      }}
                    />
                    {/* Gradient Overlay at bottom of image for text contrast */}
                    <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
                    {/* Floating Action Badge */}
                    <div className="absolute top-6 right-6 z-10">
                      <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 group-hover:rotate-12 transition-transform duration-300">
                        <img
                          src="/assets/IYC_Logo.png"
                          alt="Logo"
                          className="w-10 h-10 object-contain"
                          onError={(e) =>
                            ((e.target as HTMLImageElement).style.display =
                              'none')
                          }
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content Section (Overlapping the image slightly) */}
                  <div className="relative px-8 pb-8 -mt-12">
                    <div className="relative z-10">
                      <div className="inline-block px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-100 mb-4 shadow-sm">
                        State Chairperson
                      </div>

                      <h2 className="text-4xl font-black text-slate-900 leading-[0.9] mb-2">
                        Siddu <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                          Halleygowda
                        </span>
                      </h2>

                      <div className="flex items-center gap-2 text-slate-500 font-medium text-sm mb-6">
                        <MapPin size={16} className="text-green-600" />
                        <span>Ballari, Karnataka</span>
                        <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                        <span>Social Media Dept</span>
                      </div>

                      {/* Action Grid */}
                      <div className="grid grid-cols-[1fr_auto] gap-3">
                        <Link
                          to="/siddu-halleygowda"
                          className="flex items-center justify-center gap-3 bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold uppercase text-sm tracking-wide hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 transition-all duration-300 group/btn"
                        >
                          View Profile
                          <ArrowRight
                            size={18}
                            className="group-hover/btn:translate-x-1 transition-transform"
                          />
                        </Link>

                        <Link
                          to="/siddu-halleygowda"
                          className="flex items-center justify-center w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl border border-orange-200 hover:bg-orange-600 hover:text-white transition-all duration-300"
                        >
                          <ChevronRight size={24} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- SEARCH & CONTENT --- */}
        <div className="container mx-auto px-4 mt-12 relative z-20 max-w-6xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="h-8 w-1 bg-orange-500 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-900">
              State Team Directory
            </h2>
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-xl shadow-xl p-2 border border-gray-100 flex items-center max-w-2xl mb-12">
            <div className="p-3 text-gray-400">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Search by name, position or place..."
              className="w-full p-2 outline-none text-lg text-gray-700 placeholder-gray-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Members Grid */}
          {filteredMembers.length === 0 ? (
            <div className="text-center py-20 opacity-50 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
              <div className="bg-white w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Search className="w-8 h-8 text-gray-300" />
              </div>
              <p className="text-lg text-gray-500 font-medium">
                No members found matching "{searchTerm}"
              </p>
              <button
                onClick={() => setSearchTerm('')}
                className="mt-4 text-orange-600 font-semibold hover:underline"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedProfile(member)}
                  className="group relative bg-white rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100 cursor-pointer overflow-hidden"
                >
                  {/* Top Color Bar */}
                  <div className="h-2 w-full bg-gradient-to-r from-orange-500 to-orange-600"></div>

                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="relative">
                        <img
                          src={
                            member.imageUrl || 'https://via.placeholder.com/150'
                          }
                          alt={member.name}
                          className="w-20 h-20 rounded-full object-cover border-2 border-gray-100 group-hover:border-orange-200 transition-colors"
                        />
                        {/* Badge */}
                        <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-full shadow-sm">
                          <Award className="w-4 h-4 text-orange-500" />
                        </div>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-2 group-hover:translate-x-0">
                        <div className="bg-slate-50 p-2 rounded-full hover:bg-slate-100 text-slate-600">
                          <ExternalLink size={18} />
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-bold text-lg text-gray-900 leading-snug group-hover:text-orange-600 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-sm font-medium text-gray-500 mt-1 uppercase tracking-wider text-xs">
                        {member.position}
                      </p>
                      {/* Location Badge */}
                      {member.placeName && (
                        <span className="inline-block mt-2 px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] uppercase rounded font-semibold">
                          {member.level} • {member.placeName}
                        </span>
                      )}
                    </div>

                    {/* Contact Strip */}
                    <div className="mt-6 pt-4 border-t border-gray-50 flex gap-3">
                      {member.socialMedia?.twitter ? (
                        <div className="text-blue-400">
                          <Twitter size={16} />
                        </div>
                      ) : (
                        <div className="text-gray-300">
                          <Twitter size={16} />
                        </div>
                      )}
                      {member.socialMedia?.instagram ? (
                        <div className="text-pink-500">
                          <Instagram size={16} />
                        </div>
                      ) : (
                        <div className="text-gray-300">
                          <Instagram size={16} />
                        </div>
                      )}
                      {member.socialMedia?.facebook ? (
                        <div className="text-blue-700">
                          <Facebook size={16} />
                        </div>
                      ) : (
                        <div className="text-gray-300">
                          <Facebook size={16} />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SmBearersPage;
