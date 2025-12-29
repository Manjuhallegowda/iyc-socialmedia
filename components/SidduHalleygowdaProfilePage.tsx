import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  ArrowRight,
  Target,
  Quote,
  X as Twitter,
  Instagram,
  Facebook,
  ChevronDown,
  Award,
  Zap,
  Activity,
  Flag,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { Link } from 'react-router-dom';

// --- DATA CONSTANTS ---
const JOURNEY_DATA = [
  {
    id: 3,
    title: 'NSUI President',
    role: '2014-2020 • Ballari',
    desc: 'Revitalized student politics across 3 districts.',
    iconUrl:
      'https://d13loartjoc1yn.cloudfront.net/article/1684477870_nsui.jpg',
    stat: '3 Districts',
    accentBorder: 'border-orange-200',
    accentText: 'text-orange-600',
    accentBg: 'bg-orange-50',
  },
  {
    id: 1,
    title: 'Youth Congress',
    role: '2020-2025 • Dist. President',
    desc: 'Led massive flood relief and pandemic response.',
    iconUrl:
      'https://swadesicom-wp-media.s3.amazonaws.com/2025/09/indian-youth-congress-1046085.jpg',
    stat: '150+ Camps',
    accentBorder: 'border-green-200',
    accentText: 'text-green-600',
    accentBg: 'bg-green-50',
  },
];

const VISION_DATA = [
  {
    title: 'Digital First',
    desc: 'Every village connected. Every grievance heard.',
    icon: Zap,
    color: 'text-orange-600',
    bg: 'bg-orange-100',
    border: 'border-orange-200',
  },
  {
    title: 'Constitutional Values',
    desc: 'Upholding secularism and democracy.',
    icon: Flag,
    color: 'text-blue-900',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  {
    title: 'Green State',
    desc: 'Sustainable development & wildlife conservation.',
    icon: Activity,
    color: 'text-green-600',
    bg: 'bg-green-100',
    border: 'border-green-200',
  },
];

const SidduHalleygowdaProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vision' | 'journey'>('journey');

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-orange-200 selection:text-orange-900 overflow-x-hidden">
      <Navbar />

      <main>
        {/* --- HERO SECTION: TRICOLOR GRADIENT MESH --- */}
        <section className="relative min-h-[90vh] flex flex-col justify-center pt-20 overflow-hidden bg-white">
          <div className="absolute inset-0 bg-[linear-gradient(120deg,#fff7ed_0%,#ffffff_50%,#f0fdf4_100%)]" />

          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[100px] pointer-events-none -translate-x-1/3 translate-y-1/3" />

          <div className="container mx-auto px-4 md:px-6 relative z-10">
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-200 bg-orange-50"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  <span className="text-xs font-bold tracking-widest uppercase text-orange-800">
                    State Chairman • Social Media
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, ease: 'circOut' }}
                  className="text-6xl sm:text-7xl lg:text-9xl font-black leading-[0.9] tracking-tighter text-slate-900"
                >
                  SIDDU
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600">
                    GOUDA
                  </span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed pl-6 border-l-4 border-blue-900"
                >
                  <span className="font-semibold text-blue-900">
                    Digital Innovation.
                  </span>{' '}
                  <span className="font-semibold text-green-700">
                    Grassroots Power.
                  </span>{' '}
                  The new voice of Karnataka.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4"
                >
                  <div className="px-8 py-4 bg-orange-600 text-white font-bold uppercase tracking-wider rounded-lg shadow-lg shadow-orange-200 hover:bg-orange-700 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                    Join The Mission
                  </div>
                  <Link
                    to="/dk-shivakumar-profile"
                    className="px-8 py-4 bg-white border-2 border-green-600 text-green-700 font-bold uppercase tracking-wider rounded-lg hover:bg-green-50 transition-colors inline-block text-center"
                  >
                    My Leader
                  </Link>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full lg:w-1/2 relative"
              >
                <div className="relative aspect-[4/5] md:aspect-square w-full max-w-md mx-auto">
                  <div className="absolute -inset-2 rounded-3xl bg-gradient-to-tr from-green-500 via-white to-orange-500 opacity-50 blur-sm" />

                  <div className="relative h-full w-full bg-white rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
                    <img
                      src="/assets/siddu.jpeg"
                      alt="Siddu Halleygowda"
                      className="w-full h-full object-cover object-top"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=1000&auto=format&fit=crop';
                      }}
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-2 flex">
            <div className="h-full w-1/3 bg-orange-500"></div>
            <div className="h-full w-1/3 bg-white"></div>
            <div className="h-full w-1/3 bg-green-600"></div>
          </div>
        </section>

        {/* --- TABS SECTION --- */}
        <section className="py-24 relative bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-16">
              <h2 className="text-sm font-bold text-blue-900 tracking-[0.2em] uppercase mb-4">
                The Journey So Far
              </h2>

              <div className="bg-white p-1 rounded-full border border-slate-200 shadow-sm inline-flex relative">
                {[
                  { id: 'journey', label: 'Service', color: 'bg-orange-500' },
                  { id: 'vision', label: 'Vision', color: 'bg-green-600' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`relative px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wider z-10 transition-colors duration-300 ${
                      activeTab === tab.id
                        ? 'text-white'
                        : 'text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {activeTab === tab.id && (
                      <motion.div
                        layoutId="activeTab"
                        className={`absolute inset-0 ${tab.color} rounded-full shadow-md`}
                      />
                    )}
                    <span className="relative z-10">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="min-h-[400px]">
              <AnimatePresence mode="wait">
                {activeTab === 'journey' ? (
                  <motion.div
                    key="journey"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6"
                  >
                    <div className="lg:col-span-8 bg-white rounded-3xl p-8 lg:p-12 border border-slate-200 shadow-xl relative overflow-hidden group">
                      <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 to-orange-600" />

                      <div className="relative z-10">
                        <span className="inline-block px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-xs font-bold uppercase mb-6 border border-orange-100">
                          Current Role
                        </span>
                        <h3 className="text-4xl font-bold text-slate-900 mb-4">
                          State Chairman{' '}
                          <span className="text-slate-400">(Social Media)</span>
                        </h3>
                        <p className="text-slate-600 text-lg mb-8 max-w-lg">
                          Defining strategy, countering misinformation, and
                          ensuring the Congress message reaches every smartphone
                          in Karnataka.
                        </p>

                        <div className="grid grid-cols-2 gap-8 border-t border-slate-100 pt-8">
                          <div>
                            <div className="text-3xl font-black text-slate-900">
                              31
                            </div>
                            <div className="text-sm text-slate-500 uppercase tracking-wide font-bold">
                              Districts Live
                            </div>
                          </div>
                          <div>
                            <div className="text-3xl font-black text-slate-900">
                              12M+
                            </div>
                            <div className="text-sm text-slate-500 uppercase tracking-wide font-bold">
                              Monthly Reach
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-4 flex flex-col gap-6">
                      {JOURNEY_DATA.map((item) => (
                        <div
                          key={item.id}
                          className={`flex-1 bg-white rounded-3xl p-6 border-l-4 ${item.accentBorder} shadow-lg hover:shadow-xl transition-all group`}
                        >
                          <div className="flex justify-between items-start mb-4">
                            <div
                              className={`w-12 h-12 rounded-xl ${item.accentBg} ${item.accentText} flex items-center justify-center`}
                            >
                              <img
                                src={item.iconUrl}
                                className="w-8 h-8 object-contain mix-blend-multiply"
                                alt=""
                              />
                            </div>
                            <span className="text-xs font-bold text-slate-400 uppercase">
                              {item.role}
                            </span>
                          </div>
                          <h4 className="text-xl font-bold text-slate-900 mb-1">
                            {item.title}
                          </h4>
                          <p className="text-slate-500 text-sm mb-3">
                            {item.desc}
                          </p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="vision"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid md:grid-cols-3 gap-6"
                  >
                    {VISION_DATA.map((item, idx) => (
                      <div
                        key={idx}
                        className={`bg-white rounded-3xl p-8 border ${item.border} shadow-lg hover:-translate-y-1 transition-transform duration-300`}
                      >
                        <div
                          className={`w-14 h-14 ${item.bg} ${item.color} rounded-2xl flex items-center justify-center mb-6`}
                        >
                          <item.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mb-3">
                          {item.title}
                        </h3>
                        <p className="text-slate-600 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* --- QUOTE / STATEMENT --- */}
        <section className="py-24 bg-white relative overflow-hidden">
          <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/3 w-[600px] h-[600px] border-[40px] border-slate-50 rounded-full opacity-50 pointer-events-none" />

          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="w-12 h-12 text-orange-500 mx-auto mb-8 opacity-50" />
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 leading-tight mb-8">
                "We are not just building a political career; we are building a{' '}
                <span className="text-orange-500">legacy of service</span>."
              </h2>
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-1 bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full border border-slate-100" />
                <div className="font-bold text-sm text-slate-900 uppercase tracking-widest">
                  H. Siddana Gouda
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CONNECT FOOTER --- */}
        <section className="py-20 bg-green-50 border-t border-green-100">
          <div className="container mx-auto px-6">
            <div className="bg-white rounded-3xl p-8 md:p-16 relative overflow-hidden shadow-2xl border border-green-100">
              <div className="absolute top-0 left-0 w-2 h-full bg-green-600" />
              <div className="absolute top-0 left-0 w-full h-2 bg-orange-500" />

              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                <div className="text-center lg:text-left space-y-6 max-w-xl">
                  <div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-3">
                      LET'S <span className="text-orange-600">CONNECT</span>
                    </h2>
                    <p className="text-slate-500 text-lg leading-relaxed">
                      Have a suggestion for the constituency or want to
                      volunteer? Reach out to my digital office directly.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Email
                        </div>
                        <div className="font-semibold text-slate-900">
                          siddusuindia@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 px-5 py-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-700">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          Office
                        </div>
                        <div className="font-semibold text-slate-900">
                          Contact by Mail
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Right Side: Social Grid */}
                <div className="grid grid-cols-2 gap-4 w-full max-w-md">
                  <a
                    href="#"
                    className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-slate-900 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <Twitter className="w-8 h-8 text-slate-400 group-hover:text-slate-900 mb-3 transition-colors" />
                    <span className="font-bold text-slate-900">Twitter</span>
                    <span className="text-xs text-slate-400">@siddu_inc</span>
                  </a>

                  <a
                    href="https://www.instagram.com/siddu_halleygowda/"
                    className="group flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-pink-500 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <Instagram className="w-8 h-8 text-slate-400 group-hover:text-pink-600 mb-3 transition-colors" />
                    <span className="font-bold text-slate-900">Instagram</span>
                    <span className="text-xs text-slate-400">
                      Daily Updates
                    </span>
                  </a>

                  <a
                    href="https://www.facebook.com/BallariDistrictRuralYouthCongressPresident"
                    className="col-span-2 group flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-slate-200 hover:border-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                  >
                    <Facebook className="w-8 h-8 text-slate-400 group-hover:text-blue-700 mb-3 transition-colors" />
                    <span className="font-bold text-slate-900">Facebook</span>
                    <span className="text-xs text-slate-400">Community</span>
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-col md:flex-row justify-between items-center gap-6 text-slate-500 text-sm">
              <div className="flex gap-1 items-center">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <div className="w-3 h-3 bg-white border border-slate-200 rounded-full"></div>
                <div className="w-3 h-3 bg-green-600 rounded-full"></div>
                <span className="ml-2 font-medium">
                  Jai Hind. Jai Karnataka.
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SidduHalleygowdaProfilePage;
