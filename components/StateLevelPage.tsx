import React, { useState, useMemo } from 'react';
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
  ExternalLink,
  MapPin,
} from 'lucide-react';

// --- MODAL COMPONENT ---
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
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />
      <motion.div
        layoutId={`card-${member.id}`}
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col max-h-[90vh]"
      >
        {/* Header Image Area */}
        <div className="relative h-48 bg-gradient-to-br from-orange-500 to-orange-600">
          <div className="absolute top-4 right-4 z-20">
            <button
              onClick={onClose}
              className="p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="absolute -bottom-16 left-8">
            <motion.img
              layoutId={`image-${member.id}`}
              src={member.imageUrl}
              alt={member.name}
              className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://via.placeholder.com/150?text=IY';
              }}
            />
          </div>
          {/* Decorative Pattern */}
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="pt-20 px-8 pb-8 overflow-y-auto custom-scrollbar">
          <motion.div layoutId={`info-${member.id}`}>
            <h2 className="text-2xl font-black text-slate-900 leading-tight">
              {member.name}
            </h2>
            <div className="flex items-center gap-2 mt-2 mb-6">
              <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider rounded-full border border-orange-100">
                {member.designation}
              </span>
              {member.level === 'State' && (
                <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider rounded-full border border-blue-100">
                  State Committee
                </span>
              )}
            </div>

            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">
              About Leader
            </h3>
            <p className="text-slate-600 text-base leading-relaxed mb-8">
              {member.bio ||
                'A dedicated leader committed to the values of the organization and the welfare of the people. Working tirelessly to empower youth and strengthen democracy.'}
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <Calendar className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Since</span>
                </div>
                <div className="text-slate-900 font-bold">
                  {member.startYear > 0 ? member.startYear : '2023'}
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <div className="flex items-center gap-2 text-slate-400 mb-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase">Location</span>
                </div>
                <div className="text-slate-900 font-bold">Karnataka</div>
              </div>
            </div>

            <div className="flex gap-3">
              {member.social?.twitter && (
                <a
                  href={member.social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-black text-white rounded-xl flex items-center justify-center gap-2 font-bold text-sm hover:opacity-80 transition-opacity"
                >
                  <X className="w-4 h-4" /> X (Twitter)
                </a>
              )}
              {member.phone && (
                <a
                  href={`tel:${member.phone}`}
                  className="flex-1 py-3 bg-green-600 text-white rounded-xl flex items-center justify-center gap-2 font-bold text-sm hover:bg-green-700 transition-colors"
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
    'State General Secretary',
    'State Secretary',
  ];

  // 4. Main Grid Logic (Excludes President if "All" is selected to avoid dupe with hero)
  const filteredMembers = stateLevelMembers
    .filter((member) => {
      // If showing "All" or "State President", hide the president from GRID because he is in HERO
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
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
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
        <section className="relative mb-12 pt-8 pb-16 lg:pt-16 lg:pb-24 overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,#fff7ed_0%,#ffffff_50%,#f0fdf4_100%)]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left Side: Text */}
              <div className="flex-1 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-orange-100 shadow-sm text-orange-700 text-xs font-bold uppercase tracking-wider mb-6"
                >
                  <Shield className="w-3 h-3 text-orange-600" /> State Committee
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tight"
                >
                  Leadership{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                    Team
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
                >
                  The torchbearers of the Indian Youth Congress in Karnataka,
                  dedicated to service, progress, and democratic values.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex flex-wrap justify-center lg:justify-start gap-4"
                >
                  <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                      <Users className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-2xl font-bold leading-none">
                        {stateLevelMembers.length}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Leaders
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Side: State President Profile */}
              {statePresident && (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="w-full lg:w-5/12 max-w-md"
                >
                  <div
                    onClick={() => setSelectedMember(statePresident)}
                    className="relative group cursor-pointer"
                  >
                    {/* Background Decorative Blob */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-pink-500 rounded-[2rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

                    <div className="relative bg-white rounded-[1.75rem] p-6 border border-slate-100 shadow-xl overflow-hidden">
                      <div className="absolute top-0 right-0 p-6 opacity-10">
                        <Award className="w-32 h-32 text-orange-500" />
                      </div>

                      <div className="flex items-center gap-4 mb-6 relative z-10">
                        <motion.img
                          layoutId={`image-${statePresident.id}`}
                          src={statePresident.imageUrl}
                          alt={statePresident.name}
                          className="w-24 h-24 rounded-2xl object-cover shadow-md border-2 border-white ring-2 ring-orange-100"
                        />
                        <div>
                          <span className="inline-block px-2 py-1 bg-orange-100 text-orange-700 text-[10px] font-bold uppercase tracking-wider rounded-md mb-2">
                            Current President
                          </span>
                          <motion.h3
                            layoutId={`name-${statePresident.id}`}
                            className="text-2xl font-black text-slate-900 leading-none"
                          >
                            {statePresident.name}
                          </motion.h3>
                          <p className="text-slate-500 text-sm font-medium mt-1">
                            Karnataka Youth Congress
                          </p>
                        </div>
                      </div>

                      <div className="space-y-3 relative z-10">
                        <p className="text-slate-600 text-sm line-clamp-2 leading-relaxed">
                          {statePresident.bio ||
                            'Leading the youth of Karnataka towards a brighter, inclusive future.'}
                        </p>

                        <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                            View Full Profile
                          </span>
                          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white group-hover:bg-orange-600 transition-colors">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* --- SEARCH & FILTERS --- */}
        <div className="sticky top-20 z-30 bg-slate-50/95 backdrop-blur-sm py-4 border-b border-slate-200 mb-12 shadow-sm">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar no-scrollbar">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeFilter === cat
                        ? 'bg-slate-900 text-white shadow-lg transform scale-105'
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-orange-200 hover:text-orange-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search leaders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 shadow-sm text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- TEAM GRID --- */}
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 max-w-lg mx-auto">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                <Filter className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">
                No leaders match
              </h3>
              <p className="text-slate-500 mt-2 mb-6">
                We couldn't find anyone matching your current filters.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('All');
                }}
                className="px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
              >
                Reset
              </button>
            </div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
            >
              <AnimatePresence>
                {filteredMembers.map((member) => (
                  <motion.div
                    layout
                    layoutId={`card-${member.id}`}
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    onClick={() => setSelectedMember(member)}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col cursor-pointer relative"
                  >
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                      <span className="bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                        Tap to view
                      </span>
                    </div>

                    <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600" />

                    <div className="p-6 flex flex-col flex-1 relative">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <motion.img
                            layoutId={`image-${member.id}`}
                            src={member.imageUrl}
                            alt={member.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-slate-100 group-hover:border-orange-200 transition-colors"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                'https://via.placeholder.com/150?text=IY';
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100">
                            <Shield className="w-3 h-3 text-blue-600 fill-blue-600" />
                          </div>
                        </div>
                        <div>
                          <motion.h2
                            layoutId={`name-${member.id}`}
                            className="text-lg font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors"
                          >
                            {member.name}
                          </motion.h2>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                            {member.designation}
                          </p>
                        </div>
                      </div>

                      <motion.div
                        layoutId={`info-${member.id}`}
                        className="flex-1"
                      >
                        <p className="text-slate-500 text-sm leading-relaxed mb-4 line-clamp-2">
                          {member.bio ||
                            'Dedicated to strengthening the organization and serving the people of Karnataka.'}
                        </p>
                      </motion.div>

                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                        <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          {member.startYear > 0 && (
                            <>
                              <Calendar className="w-3 h-3" />{' '}
                              {member.startYear}
                            </>
                          )}
                        </div>
                        <div className="flex items-center gap-1 text-orange-600 text-xs font-bold uppercase tracking-wider group-hover:translate-x-1 transition-transform">
                          View Profile <ChevronRight className="w-3 h-3" />
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
