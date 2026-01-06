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
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const DKShivakumarPoliticalPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-stone-50 font-sans text-stone-800 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION: Statesman Style */}
        <section className="relative w-full pt-20 md:pt-30 overflow-hidden bg-stone-900 text-white">
          {/* Background Gradient - Tricolor influence but deep and rich */}
          <div className="absolute inset-0 bg-gradient-to-br from-orange-900 via-stone-900 to-green-900 opacity-90" />

          {/* Abstract Pattern overlay */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-32 flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center md:text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-500/30 bg-orange-500/10 text-orange-300 text-sm font-medium tracking-wide uppercase">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/77/Indian_National_Congress_Flag.svg/960px-Indian_National_Congress_Flag.svg.png" // <-- your image path here
                  alt="Indian National Congress"
                  className="h-6 w-6 object-contain"
                />
                Indian National Congress
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">
                D. K. <br />
                <span className="text-orange-500">Shivakumar</span>
              </h1>

              <p className="text-xl md:text-2xl text-stone-300 font-light max-w-2xl border-l-4 border-green-600 pl-6">
                Deputy Chief Minister of Karnataka & <br />
                President, Karnataka Pradesh Congress Committee
              </p>

              {/*<div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-sm transition-all shadow-lg shadow-orange-900/50 uppercase tracking-wider text-sm">
                  Join the Movement
                </button>
                <button className="px-8 py-3 bg-transparent border border-stone-600 hover:bg-stone-800 text-white font-semibold rounded-sm transition-all uppercase tracking-wider text-sm">
                  View Manifesto
                </button>
              </div>*/}
            </motion.div>

            {/* Leader Image - Portrait Style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-72 h-72 md:w-96 md:h-96 flex-shrink-0"
            >
              {/* Decorative Frame */}
              <div className="absolute inset-0 border-2 border-orange-500/30 rounded-full transform rotate-6 scale-105"></div>
              <div className="absolute inset-0 border-2 border-green-500/30 rounded-full transform -rotate-3 scale-110"></div>

              <div className="relative h-full w-full rounded-full overflow-hidden border-4 border-stone-800 shadow-2xl bg-stone-800">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6bAjtTJBypww4RcZUtq7QW8QMhqs4rtTUqw&s"
                  alt="D. K. Shivakumar"
                  className="h-full w-full object-cover transform hover:scale-105 transition-transform duration-700"
                />
              </div>
            </motion.div>
          </div>
        </section>

        {/* QUOTE SECTION: The Visionary */}
        <section className="py-20 bg-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <Quote className="h-12 w-12 text-orange-500 mx-auto mb-6 opacity-50" />
            <h2 className="text-3xl md:text-5xl font-serif font-medium text-stone-900 leading-snug">
              "Power is not about position. <br />
              It is about the{' '}
              <span className="text-green-700 italic decoration-orange-500 underline decoration-2 underline-offset-4">
                responsibility
              </span>{' '}
              to change lives."
            </h2>
            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-1 w-12 bg-orange-500"></div>
              <p className="text-stone-500 uppercase tracking-widest text-sm font-bold">
                The Vision
              </p>
              <div className="h-1 w-12 bg-green-600"></div>
            </div>
          </div>
        </section>

        {/* JOURNEY / MILESTONES - Not a Resume */}
        <section className="py-16 px-6 bg-white">
          <div className="mx-auto max-w-6xl">
            <h2 className="text-4xl font-serif font-bold text-stone-900 text-center mb-16">
              A Legacy of Service
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  year: 'Constituency',
                  title: 'Kanakapura',
                  desc: 'Representing the people with unwavering dedication.',
                  icon: Star,
                },
                {
                  year: 'Leadership',
                  title: 'KPCC President',
                  desc: 'Uniting the cadre and leading from the front.',
                  icon: Flag,
                },
                {
                  year: 'Governance',
                  title: 'Deputy CM',
                  desc: 'Steering the state towards prosperity.',
                  icon: Landmark,
                },
                {
                  year: 'Experience',
                  title: '3+ Decades',
                  desc: 'A lifetime spent in the service of the nation.',
                  icon: Calendar,
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center p-6 border border-stone-100 rounded-lg hover:border-orange-200 transition-colors"
                >
                  <div className="h-12 w-12 bg-stone-50 rounded-full flex items-center justify-center mb-4 text-orange-600">
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

        {/* AGENDA / FOCUS AREAS - Magazine Layout */}
        <section className="py-20 px-6 bg-stone-100">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12">
              <div>
                <h3 className="text-orange-600 font-bold tracking-widest uppercase text-sm mb-2">
                  Our Priorities
                </h3>
                <h2 className="text-4xl font-serif font-bold text-stone-900">
                  Building a Stronger Karnataka
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="group relative bg-white h-80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-green-600">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <Landmark className="h-10 w-10 text-stone-400 mb-6 group-hover:text-green-600 transition-colors" />
                    <h4 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                      Development
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Transforming infrastructure to attract global investment
                      while preserving our cultural heritage.
                    </p>
                  </div>
                </div>
              </div>

              {/* Card 2 */}
              <div className="group relative bg-stone-900 h-80 overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                <div className="relative p-8 h-full flex flex-col justify-end">
                  <Users className="h-10 w-10 text-orange-500 mb-4" />
                  <h4 className="text-2xl font-serif font-bold text-white mb-3">
                    Social Justice
                  </h4>
                  <p className="text-stone-300 leading-relaxed">
                    Ensuring every community, from Kanakapura to the coast, has
                    a voice in the halls of power.
                  </p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="group relative bg-white h-80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border-t-4 border-orange-600">
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <Users className="h-10 w-10 text-stone-400 mb-6 group-hover:text-orange-600 transition-colors" />
                    <h4 className="text-2xl font-serif font-bold text-stone-900 mb-3">
                      Youth & Future
                    </h4>
                    <p className="text-stone-600 leading-relaxed">
                      Empowering the next generation through education reform,
                      skill development, and job creation.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* OFFICIAL CONNECT */}
        <section className="py-16 bg-stone-900 text-stone-300 border-t border-stone-800">
          <div className="mx-auto max-w-7xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-serif text-white mb-4">
                Connect with the Office
              </h2>
              <p className="mb-8 max-w-md">
                For grievances, appointments, or media inquiries, please reach
                out through the official channels.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-stone-800 rounded-lg border border-stone-700">
                  <Phone className="h-5 w-5 text-green-500" />
                  <span className="font-mono text-lg">080-23619000</span>
                </div>
                <div className="flex items-center gap-4 p-4 bg-stone-800 rounded-lg border border-stone-700">
                  <Mail className="h-5 w-5 text-orange-500" />
                  <span className="font-mono text-lg">dk@dkshivakumar.com</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default DKShivakumarPoliticalPage;
