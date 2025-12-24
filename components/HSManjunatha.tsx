import React from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Flag,
  Target,
  Megaphone,
  ChevronsUp,
  Award,
  Calendar,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Zap,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';

const HSManjunathProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION: The Youth Captain */}
        <section className="relative w-full overflow-hidden bg-blue-700 text-white">
          {/* Dynamic Background Patterns */}
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-900 via-blue-700 to-cyan-600 opacity-95" />
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

          {/* Floating abstract elements for energy */}
          <div className="absolute top-20 right-20 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-48 h-48 bg-orange-500 opacity-10 rounded-full blur-2xl"></div>

          <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-12">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="flex-1 text-center md:text-left space-y-6 z-10"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 bg-white/10 text-cyan-100 text-sm font-bold tracking-wide uppercase backdrop-blur-sm">
                <Flag className="h-4 w-4 text-orange-400" />
                Indian Youth Congress
              </div>

              <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">
                H.S. <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-200">
                  Manjunath Gowda
                </span>
              </h1>

              <p className="text-lg md:text-xl text-blue-100 font-light max-w-xl border-l-4 border-orange-500 pl-6">
                President, Karnataka Pradesh Youth Congress (KPYCC) <br />
                <span className="text-sm md:text-base opacity-80 mt-2 block font-medium">
                  "Building the future, one booth at a time."
                </span>
              </p>

              <div className="pt-6 flex flex-wrap gap-4 justify-center md:justify-start">
                <button className="px-8 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-full transition-all shadow-lg shadow-orange-900/30 uppercase tracking-wider text-sm flex items-center gap-2">
                  Join IYC Karnataka <ChevronsUp className="h-4 w-4" />
                </button>
                <button className="px-8 py-3 bg-transparent border border-white/30 hover:bg-white/10 text-white font-semibold rounded-full transition-all uppercase tracking-wider text-sm">
                  Yuva Nyaya Agenda
                </button>
              </div>
            </motion.div>

            {/* Dynamic Portrait - Cutout Style if possible, else framed */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-80 h-80 md:w-[28rem] md:h-[28rem] flex-shrink-0"
            >
              {/* Background Splash Effect */}
              <div className="absolute inset-0 bg-white/10 rounded-full scale-90 blur-xl animate-pulse"></div>

              <div className="relative h-full w-full rounded-2xl overflow-hidden border-[6px] border-white/20 shadow-2xl bg-gradient-to-b from-slate-300 to-slate-400">
                {/* Placeholder for his specific image */}
                <img
                  src="/assets/hsmanju.jpg"
                  alt="HS Manjunath Gowda"
                  className="h-full w-full object-cover object-top hover:scale-110 transition-transform duration-500"
                />

                {/* Badge Overlay */}
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-blue-900 px-4 py-2 rounded-lg shadow-lg">
                  <p className="text-xs font-bold uppercase tracking-wider">
                    Elected with
                  </p>
                  <p className="text-xl font-black">5.6 Lakh+ Votes</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* STATS STRIP - High Energy */}
        <div className="bg-orange-600 text-white py-6">
          <div className="mx-auto max-w-7xl px-6 flex flex-wrap justify-around gap-6 text-center">
            <div>
              <p className="text-3xl font-black">25+</p>
              <p className="text-xs uppercase tracking-widest opacity-80">
                Members per Booth
              </p>
            </div>
            <div className="w-px bg-white/20 hidden md:block"></div>
            <div>
              <p className="text-3xl font-black">224</p>
              <p className="text-xs uppercase tracking-widest opacity-80">
                Assembly Constituencies
              </p>
            </div>
            <div className="w-px bg-white/20 hidden md:block"></div>
            <div>
              <p className="text-3xl font-black">1 Mission</p>
              <p className="text-xs uppercase tracking-widest opacity-80">
                Youth Empowerment
              </p>
            </div>
          </div>
        </div>

        {/* MISSION / ACTIVISM GRID */}
        <section className="py-20 px-6 bg-slate-50">
          <div className="mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h3 className="text-blue-600 font-bold tracking-widest uppercase text-sm mb-2">
                The Agenda
              </h3>
              <h2 className="text-4xl font-serif font-bold text-slate-900">
                New Energy for Karnataka
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1: Organization */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all border-b-4 border-blue-600 group">
                <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Users className="h-6 w-6 text-blue-600 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Booth Sankalpa
                </h4>
                <p className="text-slate-600">
                  Strengthening the party from the grassroots. The target is
                  clear: 25 active youth members in every single booth across
                  the state.
                </p>
              </div>

              {/* Card 2: Unemployment */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all border-b-4 border-orange-500 group">
                <div className="h-12 w-12 bg-orange-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-500 transition-colors">
                  <Zap className="h-6 w-6 text-orange-500 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Yuva Nyaya
                </h4>
                <p className="text-slate-600">
                  Fighting for the "Right to Employment". Ensuring the
                  implementation of Yuva Nidhi and apprenticeship guarantees for
                  every graduate.
                </p>
              </div>

              {/* Card 3: Voice */}
              <div className="bg-white rounded-xl p-8 shadow-sm hover:shadow-xl transition-all border-b-4 border-green-600 group">
                <div className="h-12 w-12 bg-green-50 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-600 transition-colors">
                  <Megaphone className="h-6 w-6 text-green-600 group-hover:text-white" />
                </div>
                <h4 className="text-xl font-bold text-slate-900 mb-3">
                  Voice of Dissent
                </h4>
                <p className="text-slate-600">
                  Leading protests and movements against injustice. When the
                  youth speak, the government listens.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RISE THROUGH RANKS - Vertical Timeline */}
        <section className="py-20 px-6 bg-white">
          <div className="mx-auto max-w-4xl">
            <h2 className="text-3xl font-serif font-bold text-slate-900 mb-12 text-center">
              A Journey of Struggle & Success
            </h2>

            <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-300 before:to-transparent">
              {/* Item 1 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-slate-300 group-[.is-active]:bg-blue-600 text-slate-500 group-[.is-active]:text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Target className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">
                      Student Leader
                    </div>
                    <time className="font-mono text-xs text-slate-500">
                      Early Days
                    </time>
                  </div>
                  <div className="text-slate-600 text-sm">
                    Started activism with NSUI, fighting for student rights and
                    campus welfare.
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-blue-600 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Award className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-slate-50 p-6 rounded-xl border border-slate-100 shadow-sm">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">
                      NSUI State President
                    </div>
                    <time className="font-mono text-xs text-slate-500">
                      2 Terms
                    </time>
                  </div>
                  <div className="text-slate-600 text-sm">
                    Led the National Students' Union of India in Karnataka for
                    two consecutive terms, revitalizing the student wing.
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-white bg-orange-500 text-white shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">
                  <Flag className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white p-6 rounded-xl border-l-4 border-orange-500 shadow-md">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-slate-900">
                      IYC State President
                    </div>
                    <time className="font-mono text-xs text-orange-600 font-bold">
                      Present
                    </time>
                  </div>
                  <div className="text-slate-600 text-sm">
                    Elected with a historic margin in the internal
                    organizational elections. Now leading the youth brigade.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* JOIN THE FORCE */}
        <section className="py-16 bg-blue-900 text-white">
          <div className="mx-auto max-w-5xl px-6 text-center">
            <h2 className="text-3xl font-bold mb-6">Are you ready to lead?</h2>
            <p className="text-blue-200 mb-8 max-w-2xl mx-auto">
              The Indian Youth Congress is looking for the next generation of
              leaders. Join the movement under the leadership of HS Manjunath
              Gowda.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors flex items-center justify-center gap-2">
                <Users className="h-5 w-5" /> Become a Member
              </button>
              <div className="flex items-center justify-center gap-4 px-6">
                <a
                  href="#"
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="p-3 bg-white/10 rounded-full hover:bg-white/20 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HSManjunathProfile;
