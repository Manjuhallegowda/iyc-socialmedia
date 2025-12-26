import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Flag,
  Briefcase,
  IndianRupee,
  TrendingUp,
  Quote,
  MapPin,
  GraduationCap,
  ChevronRight,
  Award,
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

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      <main>
        {/* --- HERO SECTION: Immersive Editorial --- */}
        <section className="relative w-full h-[85vh] flex items-center justify-center overflow-hidden">
          {/* Background Image with Parallax-like fix */}
          <div className="absolute inset-0 z-0">
            {/* Replace src with your actual image path */}
            <img
              src="/assets/HSManjunath.jpeg"
              alt="HS Manjunatha Background"
              className="w-full h-full object-cover object-top filter brightness-50"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
          </div>

          {/* Hero Content */}
          <div className="relative z-10 container mx-auto px-6 text-center pt-20">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeInUp}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-orange-400 font-bold tracking-widest text-xs uppercase mb-6">
                <Flag className="w-3 h-3" /> Karnataka Youth Congress
              </div>

              <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-6 leading-tight tracking-tight">
                H.S.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">
                  Manjunatha
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto font-light leading-relaxed mb-10">
                The voice of the unheard. The architect of a new generation.
                From the roots of{' '}
                <span className="text-white font-semibold">Mandya</span> to the
                helm of{' '}
                <span className="text-white font-semibold">
                  Karnataka's Youth
                </span>
                .
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="px-8 py-4 bg-orange-600 text-white font-bold rounded hover:bg-orange-700 transition-all shadow-lg shadow-orange-900/50 flex items-center gap-2 group">
                  Join the Movement{' '}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FLOATING STATS STRIP --- */}
        <div className="relative z-20 -mt-16 px-6">
          <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-2xl border-t-3 border-orange-500 overflow-hidden">
            <div className="grid grid-cols-2 md:grid-cols-3 divide-x divide-slate-100">
              {[
                {
                  label: 'Native',
                  value: 'Mandya',
                  icon: MapPin,
                  color: 'text-orange-600',
                },
                {
                  label: 'Experience',
                  value: '2 Terms NSUI',
                  icon: Users,
                  color: 'text-green-600',
                },
                {
                  label: 'Mandate',
                  value: '1.8L+ Votes',
                  icon: Award,
                  color: 'text-purple-600',
                },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="p-6 md:p-8 text-center hover:bg-slate-50 transition-colors group"
                >
                  <stat.icon
                    className={`w-8 h-8 mx-auto mb-3 ${stat.color} opacity-80 group-hover:scale-110 transition-transform`}
                  />
                  <div className="text-2xl font-bold text-slate-900">
                    {stat.value}
                  </div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- BIOGRAPHY & NARRATIVE --- */}
        <section className="py-24 px-6 overflow-hidden">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-12 gap-12 items-start">
              {/* Left Column: Story */}
              <div className="lg:col-span-7 space-y-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">
                    The Journey
                  </h3>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-8">
                    Decades of Dedication <br />
                    to Student Rights.
                  </h2>

                  <div className="prose prose-lg text-slate-600">
                    <p>
                      <img
                        src="/assets/hsmanju.jpeg" // <-- change to your image path
                        alt="H.S. Manjunatha"
                        className="w-40 h-50 object-cover rounded-lg float-left mr-4 mt-[-4px] shadow-lg"
                      />
                      H.S. Manjunatha is not an overnight leader. His journey
                      began in the corridors of colleges, fighting for the basic
                      rights of students. Hailing from{' '}
                      <strong>Hindasanahalli, Nagamangala Taluk</strong>, he
                      understands the struggles of rural students intimately.
                    </p>
                    <p className="mt-4">
                      As a two-time NSUI President, he led aggressive campaigns
                      against hostel mismanagement and fee hikes, earning him
                      the trust of the student community across Karnataka. He
                      believes that political power is a tool to serve the last
                      person in the queue.
                    </p>
                  </div>

                  <div className="mt-8 p-8 bg-slate-900 rounded-2xl relative overflow-hidden">
                    <Quote className="absolute top-4 right-4 text-slate-700 w-12 h-12" />
                    <p className="relative z-10 text-xl text-white font-serif italic leading-relaxed">
                      "Leadership is not about the position you hold, but the
                      number of lives you empower. My office is always open to
                      every youth of Karnataka."
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold">
                        HM
                      </div>
                      <div className="text-slate-400 text-sm font-medium">
                        H.S. Manjunatha
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Timeline */}
              <div className="lg:col-span-5 relative">
                <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-slate-200"></div>
                <div className="space-y-12 pl-0">
                  {milestones.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="relative pl-16 group"
                    >
                      {/* Timeline Dot */}
                      <div className="absolute left-[26px] top-1 w-4 h-4 rounded-full bg-white border-4 border-slate-300 group-hover:border-orange-500 transition-colors z-10"></div>

                      <span className="block text-5xl font-black text-slate-100 absolute -top-4 right-0 -z-10 group-hover:text-slate-200 transition-colors">
                        {item.year}
                      </span>

                      <div className="relative">
                        <span className="text-sm font-bold text-orange-600 block mb-1">
                          {item.year}
                        </span>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {item.role}
                        </h4>
                        <p className="text-slate-600 text-sm leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- AGENDA SECTION: Modern Cards --- */}
        <section className="py-24 bg-slate-900 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600 rounded-full blur-[120px] opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-orange-600 rounded-full blur-[120px] opacity-10"></div>

          <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
                The Vision for Tomorrow
              </h2>
              <p className="text-slate-400 text-lg">
                Prioritizing the needs of Karnataka's youth through concrete
                policy changes and aggressive representation.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: 'Employment',
                  icon: Briefcase,
                  desc: 'Launching district-level job drives and skill development workshops to bridge the gap between education and industry.',
                  color: 'group-hover:text-orange-500',
                  bg: 'hover:border-orange-500/50',
                },
                {
                  title: 'Youth Budget',
                  icon: IndianRupee,
                  desc: 'Demanding a separate budget allocation for youth entrepreneurship (Startups) in the State Budget.',
                  color: 'group-hover:text-green-500',
                  bg: 'hover:border-green-500/50',
                },
                {
                  title: 'Political Power',
                  icon: TrendingUp,
                  desc: 'Ensuring 50% representation for youth in local body elections to create a new crop of leadership.',
                  color: 'group-hover:text-blue-500',
                  bg: 'hover:border-blue-500/50',
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`group bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-white/5 ${card.bg} transition-all duration-300 hover:-translate-y-2`}
                >
                  <div
                    className={`w-14 h-14 rounded-xl bg-slate-900 flex items-center justify-center mb-6 shadow-lg`}
                  >
                    <card.icon
                      className={`w-7 h-7 text-white transition-colors duration-300 ${card.color}`}
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {card.title}
                  </h3>
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {card.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* --- Tricolor Line --- */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"></div>

      <Footer />
    </div>
  );
};

export default HSManjunathaProfilePage;
