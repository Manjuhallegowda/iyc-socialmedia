import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useData } from '../context/DataContext';
import { KpyccTeamMember } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Twitter,
  Instagram,
  Phone,
  Calendar,
  X,
  Shield,
  Filter,
  Users,
  Award,
  ChevronRight,
  MapPin,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

// --- MODAL COMPONENT (Unchanged) ---
const MemberDetailModal: React.FC<{
  member: KpyccTeamMember | null;
  onClose: () => void;
}> = ({ member, onClose }) => {
  if (!member) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
      />
      <motion.div
        layoutId={`card-${member.id}`}
        className="relative w-full max-w-lg bg-white rounded-[2rem] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        <div className="relative h-48 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={onClose}
              className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />

          <div className="absolute -bottom-16 left-8">
            <motion.img
              layoutId={`image-${member.id}`}
              src={member.imageUrl}
              alt={member.name}
              className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-2xl"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/150?text=IY';
              }}
            />
          </div>
        </div>

        <div className="pt-20 px-8 pb-8 overflow-y-auto custom-scrollbar">
          <motion.div layoutId={`info-${member.id}`}>
            <h2 className="text-3xl font-black text-slate-900 leading-tight">
              {member.name}
            </h2>
            <div className="flex flex-wrap items-center gap-2 mt-3 mb-6">
              <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-orange-100">
                {member.designation}
              </span>
              {member.level === 'State' && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-lg border border-blue-100">
                  State Committee
                </span>
              )}
            </div>

            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3 flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> About Leader
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              {member.bio ||
                'A dedicated leader committed to the values of the organization and the welfare of the people. Working tirelessly to empower youth and strengthen democracy.'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Joined
                  </span>
                </div>
                <div className="text-slate-900 font-bold text-lg">
                  {member.startYear > 0 ? member.startYear : '2023'}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    Region
                  </span>
                </div>
                <div className="text-slate-900 font-bold text-lg">
                  Karnataka
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              {member.social?.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-4 bg-black text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-sm hover:scale-[1.02] transition-transform shadow-lg shadow-black/20"
                >
                  <X className="w-4 h-4" /> X (Twitter)
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="flex-1 py-4 bg-green-600 text-white rounded-2xl flex items-center justify-center gap-2 font-bold text-sm hover:bg-green-700 hover:scale-[1.02] transition-all shadow-lg shadow-green-600/20"
                >
                  <Phone className="w-4 h-4" /> Call
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

// --- MAIN PAGE COMPONENT ---
const StateLevelPage: React.FC = () => {
  const navigate = useNavigate();
  const { kpyccTeam, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedMember, setSelectedMember] = useState<KpyccTeamMember | null>(
    null
  );

  // 1. Filter for State level members
  const stateLevelMembers = useMemo(
    () =>
      kpyccTeam.filter((member: KpyccTeamMember) => member.level === 'State'),
    [kpyccTeam]
  );

  // 2. Identify State President for Hero Section
  const statePresident = useMemo(
    () => stateLevelMembers.find((m) => m.designation === 'State President'),
    [stateLevelMembers]
  );

  // 3. Filter Categories
  const filterCategories = [
    'All',
    'State President',
    'KPYCC Chairman',
    'State Vice President',
    'State General Secretary',
    'State Secretary',
  ];

  const priorityOrder = [
    'State President',
    'KPYCC Chairman (Social Media)',
    'State Vice President',
    'State General Secretary (Admin)',
    'State General Secretary',
    'State Secretary',
  ];

  // 4. Main Grid Logic
  const filteredMembers = stateLevelMembers
    .filter((member) => {
      // Hide president from GRID because he is in HERO
      if (activeFilter === 'All' && member.designation === 'State President') {
        return false;
      }

      const matchesSearch =
        member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        member.designation.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCategory =
        activeFilter === 'All' ||
        member.designation.toLowerCase().includes(activeFilter.toLowerCase());

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const aIndex = priorityOrder.indexOf(a.designation);
      const bIndex = priorityOrder.indexOf(b.designation);

      if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
      if (aIndex !== -1) return -1;
      if (bIndex !== -1) return 1;

      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      <Navbar />

      <AnimatePresence>
        {selectedMember && (
          <MemberDetailModal
            member={selectedMember}
            onClose={() => setSelectedMember(null)}
          />
        )}
      </AnimatePresence>

      <main className="pt-24 pb-20">
        {/* --- HERO SECTION --- */}
        <section className="relative mb-16 pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
          {/* Background: Clean Grid + Soft Glow */}
          <div className="absolute inset-0 bg-white" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-orange-100/40 rounded-full blur-[120px] pointer-events-none translate-x-1/3 -translate-y-1/3 mix-blend-multiply" />
          <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-green-100/40 rounded-full blur-[120px] pointer-events-none -translate-x-1/3 translate-y-1/3 mix-blend-multiply" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
              {/* Left Side: Modern Typography */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 text-white text-[11px] font-bold uppercase tracking-widest mb-8 shadow-xl shadow-slate-900/10"
                >
                  <Shield className="w-3 h-3 fill-orange-500 text-orange-500" />
                  <span className="text-slate-200">State Committee 2025</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-6xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[0.9]"
                >
                  Our <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-red-600">
                    Leaders
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-slate-500 max-w-xl mx-auto lg:mx-0 mb-10 font-medium leading-relaxed"
                >
                  Meet the visionaries shaping the future of Karnataka.
                  Dedicated to service, progress, and the values of the Indian
                  Youth Congress.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex -space-x-4">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-xs font-bold text-slate-400"
                        >
                          <Users className="w-4 h-4" />
                        </div>
                      ))}
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-slate-900">
                        {stateLevelMembers.length}+
                      </div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Active Leaders
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block w-px h-10 bg-slate-200"></div>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-orange-50 flex items-center justify-center text-orange-600">
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-lg font-bold text-slate-900">
                        Excellence
                      </div>
                      <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                        Committed
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: State President Profile (PRESERVED AS REQUESTED) */}
              {statePresident && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                  className="w-full max-w-md lg:w-[450px]"
                >
                  <div className="group relative bg-white rounded-[2.5rem] shadow-2xl shadow-slate-900/30 border border-slate-100 overflow-hidden hover:-translate-y-2 transition-all duration-500">
                    {/* Top Decorative Tricolor Strip */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-orange-500 via-white to-green-600 z-20" />

                    {/* Image Section */}
                    <div className="relative h-[22rem] overflow-hidden">
                      <div className="absolute inset-0 bg-slate-100 animate-pulse" />{' '}
                      {/* Loading placeholder */}
                      <img
                        src={statePresident.imageUrl}
                        alt={statePresident.name}
                        className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/600x800?text=IYC';
                        }}
                      />
                      {/* Gradient Overlay at bottom of image for text contrast */}
                      <div className="absolute bottom-0 left-0 w-full h-28 bg-gradient-to-t from-white via-white/20 to-transparent" />
                      {/* Floating Action Badge */}
                      <div className="absolute top-6 right-6 z-10">
                        <div className="bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-lg border border-white/50 group-hover:rotate-12 transition-transform duration-300">
                          <img
                            src="/assets/IYC_Logo.png"
                            alt="IYC"
                            className="w-10 h-10 object-contain"
                            onError={(e) => {
                              e.currentTarget.style.display = 'none';
                            }}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content Section (Overlapping the image slightly) */}
                    <div className="relative px-8 pb-8 -mt-12">
                      <div className="relative z-10">
                        <div className="inline-block px-4 py-1.5 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-widest rounded-full border border-orange-100 mb-4 shadow-sm">
                          State President
                        </div>

                        {/* Name Splitting Logic for Two-Tone Effect */}
                        <h2 className="text-4xl font-black text-slate-900 leading-[0.9] mb-2">
                          {statePresident.name.split(' ')[0]} <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                            {statePresident.name.split(' ').slice(1).join(' ')}
                          </span>
                        </h2>

                        <div className="flex items-center gap-2 text-slate-500 font-medium text-sm mb-6">
                          <MapPin size={16} className="text-green-600" />
                          <span>Karnataka</span>
                          <span className="w-1 h-1 rounded-full bg-slate-300 mx-1" />
                          <span>Presidential Office</span>
                        </div>

                        {/* Action Grid */}
                        <div className="grid grid-cols-[1fr_auto] gap-3">
                          <Link
                            to="/hsmanjunath"
                            className="flex items-center justify-center gap-3 bg-slate-900 text-white py-4 px-6 rounded-2xl font-bold uppercase text-sm tracking-wide hover:bg-slate-800 hover:shadow-lg hover:shadow-slate-200 transition-all duration-300 group/btn"
                          >
                            View Profile
                            <ArrowRight
                              size={18}
                              className="group-hover/btn:translate-x-1 transition-transform"
                            />
                          </Link>

                          <Link
                            to="/hsmanjunath"
                            className="flex items-center justify-center w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl border border-orange-200 hover:bg-orange-600 hover:text-white transition-all duration-300"
                          >
                            <ChevronRight size={24} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* --- MODERN SEARCH & FILTERS --- */}
        <div className="sticky top-20 z-40 mb-16">
          <div className="container mx-auto px-4">
            <div className="bg-white/80 backdrop-blur-xl border border-white/50 shadow-2xl shadow-slate-200/50 rounded-[2rem] p-3 flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Filter Pills */}
              <div className="flex gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar no-scrollbar px-2">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${
                      activeFilter === cat
                        ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20'
                        : 'text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input
                  type="text"
                  placeholder="Find a leader..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-3 bg-slate-50 border-none rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all font-medium text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- NEW GRID LOOK --- */}
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-24">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                <Filter className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">
                No leaders found
              </h3>
              <p className="text-slate-500 mb-8">
                Try adjusting your search or filters to find what you're looking
                for.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('All');
                }}
                className="px-8 py-3 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8"
            >
              <AnimatePresence>
                {filteredMembers.map((member) => (
                  <motion.div
                    layout
                    layoutId={`card-${member.id}`}
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedMember(member)}
                    className="group relative bg-white rounded-[2rem] shadow-sm hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 cursor-pointer overflow-hidden border border-slate-100"
                  >
                    {/* Header Gradient */}
                    <div className="h-24 bg-gradient-to-r from-orange-50 to-orange-100 group-hover:from-orange-500 group-hover:to-orange-600 transition-colors duration-500" />

                    {/* Floating Avatar */}
                    <div className="absolute top-8 left-6">
                      <motion.img
                        layoutId={`image-${member.id}`}
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-24 h-24 rounded-2xl object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://via.placeholder.com/150?text=IY';
                        }}
                      />
                      <div className="absolute -bottom-2 -right-2 bg-white p-1.5 rounded-full shadow-sm">
                        <Shield className="w-4 h-4 text-blue-600 fill-blue-600" />
                      </div>
                    </div>

                    <div className="pt-12 px-6 pb-6 mt-2">
                      {/* Badge */}
                      <div className="flex justify-end mb-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-orange-500 transition-colors">
                          {member.startYear > 0
                            ? `Since ${member.startYear}`
                            : 'Active'}
                        </span>
                      </div>

                      {/* Content */}
                      <motion.h2
                        layoutId={`name-${member.id}`}
                        className="text-xl font-black text-slate-900 leading-tight mb-1 group-hover:text-orange-600 transition-colors"
                      >
                        {member.name}
                      </motion.h2>
                      <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4">
                        {member.designation}
                      </p>

                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                        {member.bio ||
                          'Dedicated to strengthening the organization and serving the people.'}
                      </p>

                      {/* Action Footer */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="flex gap-2">
                          {member.social?.twitter && (
                            <Twitter className="w-4 h-4 text-slate-300 hover:text-black transition-colors" />
                          )}
                          {member.social?.instagram && (
                            <Instagram className="w-4 h-4 text-slate-300 hover:text-pink-600 transition-colors" />
                          )}
                        </div>

                        <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default StateLevelPage;
