import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Flag,
  Phone,
  Mail,
  ChevronRight,
  Quote,
  Star,
  Calendar,
  IndianRupee,
  Briefcase,
  Award,
  MapPin,
  TrendingUp,
  GraduationCap,
  ArrowRight,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

// Define the shape of a milestone for the timeline
interface Milestone {
  year: string;
  role: string;
  description: string;
}

const HSManjunathaProfilePage: React.FC = () => {
  const milestones: Milestone[] = [
    {
      year: '2015-2020',
      role: 'Student Leader (NSUI)',
      description:
        'Served two consecutive terms as the State President of NSUI Karnataka. Led massive statewide protests demanding better hostel facilities for SC/ST students and affordable education.',
    },
    {
      year: '2023',
      role: 'Organizational Builder',
      description:
        'Played a key role in the "Yuva Dhwani" yatra, connecting with rural youth across 30 districts and strengthening the booth-level cadre.',
    },
    {
      year: '2025',
      role: 'KPYCC President',
      description:
        'Elected as the President of Karnataka Youth Congress with a historic mandate of over 1.80 Lakh votes in the internal organizational elections.',
    },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main>
        {/* HERO SECTION: Split Screen Editorial Look */}
        <section className="relative w-full min-h-[90vh] flex flex-col lg:flex-row bg-slate-50">
          {/* Text Side */}
          <div className="flex-1 flex flex-col justify-center px-6 py-20 lg:px-24 z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-[2px] w-12 bg-orange-500"></span>
                <span className="text-orange-600 font-bold tracking-widest uppercase text-xs">
                  Indian Youth Congress
                </span>
              </div>

              <h1 className="text-6xl lg:text-8xl font-serif font-black tracking-tighter leading-[0.9] text-slate-900 mb-6">
                H.S.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">
                  Manjunatha
                </span>
              </h1>

              <p className="text-xl text-slate-600 max-w-lg leading-relaxed mb-8">
                From the grassroots of <strong>Mandya</strong> to leading{' '}
                <strong>Karnataka's Youth.</strong> The voice of the unheard,
                the architect of a new generation.
              </p>

              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-8 py-4 bg-blue-700 text-white font-bold rounded-none hover:bg-blue-800 transition-all shadow-xl shadow-blue-200">
                  Join the Movement <ArrowRight className="h-5 w-5" />
                </button>
                <button className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-700 font-bold rounded-none hover:border-slate-900 transition-all">
                  Read Biography
                </button>
              </div>
            </motion.div>
          </div>

          {/* Image Side - Full height cover */}
          <div className="lg:w-[45%] h-[50vh] lg:h-auto relative overflow-hidden bg-slate-200">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-slate-900/50 mix-blend-multiply z-10"></div>
            <div className="absolute bottom-10 left-10 z-20 text-white">
              <p className="text-6xl font-bold font-mono">1.8L+</p>
              <p className="text-sm uppercase tracking-widest opacity-80">
                Votes Secured
              </p>
            </div>

            <motion.img
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5 }}
              src="/assets/hsmanju.jpeg" // Ensure this path is correct in your folder
              alt="HS Manjunatha addressing a rally"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </section>

        {/* STATS STRIP */}
        <div className="bg-slate-900 text-white py-12 border-b-4 border-orange-500">
          <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-1">
              <MapPin className="h-6 w-6 mx-auto text-orange-500 mb-2" />
              <div className="text-2xl font-bold">Mandya</div>
              <div className="text-xs text-slate-400 uppercase">
                Native Roots
              </div>
            </div>
            <div className="space-y-1">
              <GraduationCap className="h-6 w-6 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold">BA Graduate</div>
              <div className="text-xs text-slate-400 uppercase">
                Seshadripuram College
              </div>
            </div>
            <div className="space-y-1">
              <Users className="h-6 w-6 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold">2 Terms</div>
              <div className="text-xs text-slate-400 uppercase">
                NSUI State President
              </div>
            </div>
            <div className="space-y-1">
              <Flag className="h-6 w-6 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold">KPYCC</div>
              <div className="text-xs text-slate-400 uppercase">
                Current President
              </div>
            </div>
          </div>
        </div>

        {/* HISTORY & TIMELINE SECTION */}
        <section className="py-24 px-6 max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left: Narrative */}
            <div>
              <h3 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-4">
                The Journey
              </h3>
              <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8 leading-tight">
                Decades of Dedication to Student Rights.
              </h2>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                H.S. Manjunatha is not an overnight leader. His journey began in
                the corridors of colleges, fighting for the basic rights of
                students.
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                Hailing from <strong>Hindasanahalli, Nagamangala Taluk</strong>,
                he understands the struggles of rural students. As a two-time
                NSUI President, he led aggressive campaigns against hostel
                mismanagement and fee hikes, earning him the trust of the
                student community across Karnataka.
              </p>

              <div className="p-6 bg-blue-50 border-l-4 border-blue-600 rounded-r-lg mt-8">
                <Quote className="h-8 w-8 text-blue-300 mb-2" />
                <p className="italic text-slate-700 font-medium">
                  "Leadership is not about the position you hold, but the number
                  of lives you empower. My office is always open to every youth
                  of Karnataka."
                </p>
              </div>
            </div>

            {/* Right: Timeline */}
            <div className="relative border-l-2 border-slate-200 pl-8 space-y-12 my-auto">
              {milestones.map((item, index) => (
                <div key={index} className="relative group">
                  {/* Dot */}
                  <span className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-white bg-slate-300 group-hover:bg-blue-600 transition-colors shadow-sm"></span>

                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center mb-2">
                    <span className="text-4xl font-black text-slate-200 group-hover:text-slate-300 transition-colors font-serif">
                      {item.year}
                    </span>
                    <h4 className="text-xl font-bold text-slate-900">
                      {item.role}
                    </h4>
                  </div>
                  <p className="text-slate-600 leading-relaxed max-w-sm">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AGENDA CARDS - Modern Grid */}
        <section className="py-24 bg-slate-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex justify-between items-end mb-16">
              <h2 className="text-4xl font-serif font-bold">
                Priority Agendas
              </h2>
              <div className="hidden md:block h-[1px] flex-1 bg-slate-700 mx-8 mb-4"></div>
              <p className="text-slate-400 max-w-xs text-right hidden md:block">
                Building a sustainable future for the youth of Karnataka.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1 */}
              <div className="group bg-slate-800 p-8 rounded-none hover:bg-orange-600 transition-all duration-300 cursor-pointer">
                <Briefcase className="h-10 w-10 text-orange-500 group-hover:text-white mb-6" />
                <h3 className="text-2xl font-bold mb-4">Employment</h3>
                <p className="text-slate-400 group-hover:text-white/90 leading-relaxed">
                  Launching district-level job drives and skill development
                  workshops to bridge the gap between education and industry.
                </p>
              </div>

              {/* Card 2 */}
              <div className="group bg-slate-800 p-8 rounded-none hover:bg-white hover:text-slate-900 transition-all duration-300 cursor-pointer">
                <IndianRupee className="h-10 w-10 text-green-500 group-hover:text-green-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">Youth Budget</h3>
                <p className="text-slate-400 group-hover:text-slate-600 leading-relaxed">
                  Demanding a separate budget allocation for youth
                  entrepreneurship (Startups) in the State Budget.
                </p>
              </div>

              {/* Card 3 */}
              <div className="group bg-slate-800 p-8 rounded-none hover:bg-blue-600 transition-all duration-300 cursor-pointer">
                <TrendingUp className="h-10 w-10 text-blue-500 group-hover:text-white mb-6" />
                <h3 className="text-2xl font-bold mb-4">Political Power</h3>
                <p className="text-slate-400 group-hover:text-white/90 leading-relaxed">
                  Ensuring 50% representation for youth in local body elections
                  to create a new crop of leadership.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* --- DIVIDER: Footer Top --- */}
      <div className="h-2 bg-gradient-to-r from-saffron via-white to-indiaGreen"></div>

      <Footer />
    </div>
  );
};

export default HSManjunathaProfilePage;
