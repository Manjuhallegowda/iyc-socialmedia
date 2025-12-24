import React from 'react';
import { motion } from 'framer-motion';
import {
  Landmark,
  Users,
  Flag,
  Phone,
  Mail,
  ChevronRight,
  Quote,
  Star,
  Calendar,
  IndianRupee, // Added for his finance background
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const SiddaramaiahProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION: The Chief Minister */}
        <section className="relative w-full overflow-hidden bg-stone-900 text-white">
          {/* Background Gradient - Deep Indigo/Slate for calmness/authority */}
          <div className="absolute inset-0 bg-gradient-to-br from-stone-900 via-indigo-950 to-slate-900 opacity-90" />

          {/* Abstract Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]"></div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-sm font-medium tracking-wide uppercase">
                <Flag className="h-4 w-4" />
                Indian National Congress
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">
                Siddaramaiah
              </h1>

              <p className="text-xl md:text-2xl text-stone-300 font-light max-w-2xl border-l-4 border-yellow-500 pl-6">
                Hon'ble Chief Minister of Karnataka <br />
                <span className="text-sm md:text-lg opacity-70 mt-1 block">
                  Leader of the Masses | Champion of Social Justice
                </span>
              </p>

              <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="px-8 py-3 bg-indigo-700 hover:bg-indigo-800 text-white font-semibold rounded-sm transition-all shadow-lg shadow-indigo-900/50 uppercase tracking-wider text-sm">
                  Government Schemes
                </button>
                <button className="px-8 py-3 bg-transparent border border-stone-600 hover:bg-stone-800 text-white font-semibold rounded-sm transition-all uppercase tracking-wider text-sm">
                  Biography
                </button>
              </div>
            </motion.div>

            {/* Leader Image - Portrait Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0"
            >
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-indigo-500/30 rounded-full transform rotate-6 scale-105"></div>
              <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-full transform -rotate-3 scale-110"></div>

              <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-stone-800 shadow-2xl bg-stone-800">
                <img
                  src="https://www.coorgnews.in/wp-content/uploads/2024/08/siddaramaiah-photo.jpg"
                  alt="Siddaramaiah"
                  className="h-full w-full object-cover object-top transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUOTE SECTION: The Philosophy */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <Quote className="h-12 w-12 text-indigo-500 mx-auto mb-6 opacity-50" />
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-stone-900 leading-snug">
              "Development has no meaning if it does not touch the lives of the{' '}
              <br />
              <span className="text-indigo-800 italic decoration-yellow-500 underline decoration-2 underline-offset-4">
                most marginalized
              </span>
              ."
            </h2>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-1 w-12 bg-indigo-500"></div>
              <p className="text-stone-500 uppercase tracking-widest text-sm font-bold">
                The Mission
              </p>
              <div className="h-1 w-12 bg-yellow-500"></div>
            </div>
          </div>
        </section>

        {/* GOVERNANCE FOCUS - Magazine Layout */}
        <section className="py-20 px-6 bg-stone-100">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h3 className="text-indigo-600 font-bold tracking-widest uppercase text-sm mb-2">
                  Governance
                </h3>
                <h2 className="text-4xl font-serif font-bold text-stone-900">
                  Karnataka's Growth Story
                </h2>
              </div>
              <a
                href="#"
                className="hidden md:flex items-center gap-2 text-stone-600 hover:text-indigo-600 font-medium transition-colors"
              >
                View All Schemes <ChevronRight className="h-4 w-4" />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1: Social Justice */}
              <div className="group relative bg-white h-80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-yellow-500">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <Users className="h-10 w-10 text-stone-400 mb-6 group-hover:text-yellow-600 transition-colors" />
                    <h4 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                      Inclusive Growth
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Pioneering the AHINDA movement to ensure political and
                      economic representation for minorities, backward classes,
                      and Dalits.
                    </p>
                  </div>
                  <span className="text-yellow-700 font-bold text-sm uppercase tracking-wide group-hover:underline">
                    Learn More &rarr;
                  </span>
                </div>
              </div>

              {/* Card 2: Finance (Unique to him) */}
              <div className="group relative bg-indigo-950 h-80 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="relative p-8 h-full flex flex-col justify-end">
                  <IndianRupee className="h-10 w-10 text-yellow-500 mb-4" />
                  <h4 className="text-2xl font-serif font-bold text-white mb-3">
                    Fiscal Prudence
                  </h4>
                  <p className="text-stone-300 leading-relaxed">
                    A record number of budget presentations, focusing on fiscal
                    discipline combined with robust welfare spending.
                  </p>
                </div>
              </div>

              {/* Card 3: Welfare */}
              <div className="group relative bg-white h-80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-indigo-600">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <Landmark className="h-10 w-10 text-stone-400 mb-6 group-hover:text-indigo-600 transition-colors" />
                    <h4 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                      The 5 Guarantees
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Delivering on the promise of universal basic income, free
                      travel for women, and food security for all.
                    </p>
                  </div>
                  <span className="text-indigo-700 font-bold text-sm uppercase tracking-wide group-hover:underline">
                    View Guarantees &rarr;
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JOURNEY / MILESTONES */}
        <section className="py-20 px-6 bg-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl font-serif font-bold text-stone-900 text-center mb-16">
              Decades of Dedication
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  year: 'Constituency',
                  title: 'Varuna',
                  desc: "The stronghold and home of the people's leader.",
                  icon: Star,
                },
                {
                  year: 'Record',
                  title: '13+ Budgets',
                  desc: 'Presented the highest number of state budgets.',
                  icon: IndianRupee,
                },
                {
                  year: 'Leadership',
                  title: '2nd Term CM',
                  desc: 'Trusted by the high command and the people.',
                  icon: Landmark,
                },
                {
                  year: 'Origin',
                  title: 'Mysuru',
                  desc: 'Deep roots in the cultural capital of Karnataka.',
                  icon: Calendar,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-6 border border-stone-100 rounded-lg hover:border-indigo-200 transition-colors"
                >
                  <div className="h-12 w-12 bg-stone-50 rounded-full flex items-center justify-center mb-4 text-indigo-600">
                    <item.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
                    {item.year}
                  </span>
                  <h3 className="text-xl font-serif font-bold text-stone-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-stone-600 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* OFFICIAL CONNECT */}
        <section className="py-16 bg-stone-900 text-stone-300 border-t border-stone-800">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-white mb-4">
                Chief Minister's Office (CMO)
              </h2>
              <p className="mb-8 max-w-md">
                Dedicated to transparent governance. Reach out for official
                matters or public grievances.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-stone-800 rounded-lg border border-stone-700">
                  <Phone className="h-5 w-5 text-indigo-500" />
                  <span className="font-mono text-lg">+91 XXXXX XXXXX</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-stone-800 rounded-lg border border-stone-700">
                  <Mail className="h-5 w-5 text-yellow-500" />
                  <span className="font-mono text-lg">cm@karnataka.gov.in</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-indigo-800 to-blue-900 p-8 rounded-xl text-white shadow-2xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-2xl font-bold mb-2">
                  Subscribe to CM Updates
                </h3>
                <p className="text-indigo-100 text-sm mb-6">
                  Get the latest news on Cabinet decisions and state progress.
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 rounded bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white"
                  />
                  <button className="bg-white text-indigo-900 px-6 py-3 rounded font-bold hover:bg-indigo-50 transition-colors">
                    Subscribe
                  </button>
                </div>
              </div>
              {/* Decor */}
              <Flag className="absolute -bottom-6 -right-6 h-40 w-40 text-black/10 rotate-12" />
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default SiddaramaiahProfilePage;
