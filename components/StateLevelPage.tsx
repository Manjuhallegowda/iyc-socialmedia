import React, { useState, useMemo } from 'react';
import { useData } from '../context/DataContext';
import { KpyccTeamMember } from '../types';
import Navbar from './Navbar';
import Footer from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Twitter,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Calendar,
  X, // X Logo
  Shield,
  Filter,
  Users,
  Award,
} from 'lucide-react';

const StateLevelPage: React.FC = () => {
  const { kpyccTeam, loading } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');

  // 1. Filter for State level members
  const stateLevelMembers = useMemo(
    () =>
      kpyccTeam.filter((member: KpyccTeamMember) => member.level === 'State'),
    [kpyccTeam]
  );

  // 2. Extract unique Designations for Filter Chips (Simplified)
  const filterCategories = [
    'All',
    'President',
    'Chairperson',
    'Vice President',
    'General Secretary',
    'Secretary',
  ];

  // 3. Apply Search & Category Filter
  const filteredMembers = stateLevelMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.designation.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      activeFilter === 'All' ||
      member.designation.toLowerCase().includes(activeFilter.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-orange-100 selection:text-orange-900 overflow-x-hidden">
      <Navbar />

      <main className="pt-24 pb-20">
        {/* --- PREMIUM HERO SECTION --- */}
        <section className="relative mb-16 pt-10 pb-20 overflow-hidden">
          {/* Background Mesh (Tricolor Theme) */}
          <div className="absolute inset-0 bg-[linear-gradient(120deg,#fff7ed_0%,#ffffff_50%,#f0fdf4_100%)]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

          <div className="container mx-auto px-4 relative z-10 text-center">
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
              className="text-lg text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed"
            >
              The torchbearers of the Indian Youth Congress in Karnataka,
              dedicated to service, progress, and democratic values.
            </motion.p>

            {/* Quick Stats Row */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-4 md:gap-8"
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
              <div className="bg-white/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
                <div className="p-2 bg-orange-50 text-orange-600 rounded-lg">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="text-2xl font-bold leading-none">2025</div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Term Year
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- SEARCH & FILTERS CONTAINER --- */}
        <div className="sticky top-20 z-30 bg-slate-50/95 backdrop-blur-sm py-4 border-b border-slate-200 mb-12">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
              {/* Filter Chips */}
              <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto custom-scrollbar">
                {filterCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveFilter(cat)}
                    className={`px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                      activeFilter === cat
                        ? 'bg-slate-900 text-white shadow-lg'
                        : 'bg-white text-slate-500 border border-slate-200 hover:border-orange-200 hover:text-orange-600'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-80">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Find a leader..."
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
                No leaders match your criteria
              </h3>
              <p className="text-slate-500 mt-2">
                Try selecting "All" or using a different search term.
              </p>
              <button
                onClick={() => {
                  setSearchTerm('');
                  setActiveFilter('All');
                }}
                className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-lg text-sm font-bold hover:bg-slate-800 transition-colors"
              >
                Clear Filters
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
                    key={member.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
                  >
                    {/* Top Accent Line */}
                    <div className="h-1.5 w-full bg-gradient-to-r from-orange-500 via-white to-green-600" />

                    <div className="p-6 flex flex-col flex-1 relative">
                      {/* Profile Header */}
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <img
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
                          <h2 className="text-lg font-bold text-slate-900 leading-tight group-hover:text-orange-600 transition-colors">
                            {member.name}
                          </h2>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mt-1">
                            {member.designation}
                          </p>
                        </div>
                      </div>

                      {/* Bio */}
                      <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-3 flex-1">
                        {member.bio ||
                          'Dedicated to strengthening the organization and serving the people of Karnataka.'}
                      </p>

                      {/* Info & Socials */}
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                        <div className="text-xs text-slate-400 font-medium flex items-center gap-1">
                          {member.startYear > 0 && (
                            <>
                              <Calendar className="w-3 h-3" />{' '}
                              {member.startYear}
                            </>
                          )}
                        </div>

                        <div className="flex gap-2">
                          {member.social?.twitter && (
                            <a
                              href={member.social.twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md hover:bg-slate-100 text-slate-400 hover:text-black transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </a>
                          )}
                          {member.social?.instagram && (
                            <a
                              href={member.social.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded-md hover:bg-pink-50 text-slate-400 hover:text-pink-600 transition-colors"
                            >
                              <Instagram className="w-4 h-4" />
                            </a>
                          )}
                          {/* Call Button if phone exists */}
                          {member.phone && (
                            <a
                              href={`tel:${member.phone}`}
                              className="p-1.5 rounded-md hover:bg-green-50 text-slate-400 hover:text-green-600 transition-colors"
                            >
                              <Phone className="w-4 h-4" />
                            </a>
                          )}
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
