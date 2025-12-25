import React from 'react';
import { motion } from 'framer-motion';
import {
  FaFlag,
  FaBullhorn,
  FaAngleRight,
  FaFacebookF,
  FaInstagram,
  FaHandPaper,
  FaUsers,
  FaBolt,
  FaQuoteLeft,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import Navbar from './Navbar';
import Footer from './Footer';

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const HSManjunathProfile: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col overflow-x-hidden">
      <Navbar />

      <main className="flex-1">
        {/* ================= HERO SECTION (Modern Dark Mode) ================= */}
        <section className="relative min-h-[90vh] flex items-center bg-slate-900 overflow-hidden pt-20">
          {/* Background Elements */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-600/20 rounded-full blur-[120px] mix-blend-screen"></div>

          <div className="container mx-auto px-6 relative z-10 h-full flex flex-col md:flex-row items-center">
            {/* Left Content */}
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="w-full md:w-1/2 pt-12 md:pt-0 z-20"
            >
              <motion.div
                variants={fadeInUp}
                className="flex items-center gap-3 mb-6"
              >
                <span className="px-3 py-1 bg-orange-500 text-white text-xs font-bold uppercase tracking-widest rounded-sm">
                  Leader
                </span>
                <span className="h-px w-12 bg-gray-600"></span>
                <span className="text-gray-400 font-medium text-sm uppercase tracking-wider">
                  Indian Youth Congress
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-6xl md:text-8xl font-black text-white leading-[0.9] tracking-tighter mb-6"
              >
                H.S.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-green-400">
                  MANJUNATH
                </span>
                <br />
                GOWDA
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-400 max-w-lg leading-relaxed mb-10 border-l-2 border-orange-500 pl-6"
              >
                President, Karnataka Pradesh Youth Congress. <br />
                <span className="text-white font-medium">
                  Rewriting the narrative of youth politics in India.
                </span>
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <button className="group relative px-8 py-4 bg-white text-slate-900 font-bold uppercase tracking-wider overflow-hidden">
                  <span className="relative z-10 flex items-center gap-2">
                    Join the Movement{' '}
                    <span className="transform transition-transform duration-300">
                      <FaAngleRight />
                    </span>
                  </span>
                  <div className="absolute inset-0 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
                  <span className="absolute inset-0 z-10 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100 text-white transition-opacity duration-300">
                    Join the Movement <FaAngleRight />
                  </span>
                </button>

                <div className="flex items-center gap-4 px-6">
                  <SocialLink
                    Icon={FaXTwitter}
                    href="#"
                    color="hover:text-blue-400"
                  />
                  <SocialLink
                    Icon={FaFacebookF}
                    href="#"
                    color="hover:text-blue-600"
                  />
                  <SocialLink
                    Icon={FaInstagram}
                    href="#"
                    color="hover:text-pink-500"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Right Image (Cutout Style) */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="w-full md:w-1/2 relative h-[50vh] md:h-[80vh] mt-10 md:mt-0 flex items-end justify-center"
            >
              {/* Decorative Circle behind head */}
              <div className="absolute bottom-0 w-[400px] h-[400px] border border-white/10 rounded-full md:mb-20"></div>

              <img
                src="/assets/hsmanju.jpg"
                alt="HS Manjunath"
                className="relative z-10 h-full w-auto object-contain object-bottom drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] mask-image-gradient-b"
              />

              {/* Floating Badge */}
              <div className="absolute bottom-10 right-10 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-sm max-w-xs hidden md:block">
                <span className="text-3xl text-orange-500 mb-2">
                  <FaHandPaper />
                </span>
                <p className="text-white font-bold text-lg leading-tight">
                  "The power of the youth is the power of the nation."
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= FLOATING STATS ================= */}
        <div className="relative z-30 -mt-16 md:-mt-24 container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatCard
              number="25+"
              label="Members per Booth"
              icon={<FaUsers />}
              color="blue"
            />
            <StatCard
              number="224"
              label="Constituencies Covered"
              icon={<FaFlag />}
              color="orange"
            />
            <StatCard
              number="5.6L"
              label="Votes Secured"
              icon={<FaHandPaper />}
              color="green"
            />
          </div>
        </div>

        {/* ================= VISION / AGENDA ================= */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row gap-16">
              {/* Sticky Title Side */}
              <div className="md:w-1/3">
                <div className="sticky top-24">
                  <h4 className="text-orange-500 font-bold uppercase tracking-widest text-sm mb-4">
                    The Agenda
                  </h4>
                  <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 leading-tight">
                    NEW ENERGY FOR <br />
                    <span className="text-green-600">KARNATAKA</span>
                  </h2>
                  <p className="text-slate-500 text-lg leading-relaxed mb-8">
                    A comprehensive roadmap to empower the youth, ensuring
                    representation, employment, and justice for every segment of
                    society.
                  </p>
                  <FaQuoteLeft size="3.75rem" color="#f3f4f6" />
                </div>
              </div>

              {/* Cards Side */}
              <div className="md:w-2/3 grid gap-8">
                <AgendaCard
                  title="Booth Sankalpa"
                  desc="A grassroots revolution targeting 25 active youth members in every single booth. Building the party from the ground up."
                  icon={<FaUsers />}
                  color="border-l-blue-600"
                />
                <AgendaCard
                  title="Yuva Nyaya"
                  desc="Fighting for the 'Right to Employment'. Ensuring the implementation of Yuva Nidhi and apprenticeship guarantees for every graduate."
                  icon={<FaBolt />}
                  color="border-l-orange-500"
                />
                <AgendaCard
                  title="Voice of Dissent"
                  desc="Leading the charge against injustice. When the youth speak, the government listens. We are the voice of the voiceless."
                  icon={<FaBullhorn />}
                  color="border-l-green-600"
                />
              </div>
            </div>
          </div>
        </section>

        {/* ================= MODERN TIMELINE ================= */}
        <section className="py-24 bg-slate-50">
          <div className="container mx-auto px-6 max-w-5xl">
            <div className="text-center mb-20">
              <h2 className="text-3xl font-black uppercase tracking-tight text-slate-900">
                The Journey
              </h2>
              <div className="w-20 h-1 bg-gradient-to-r from-orange-500 to-green-500 mx-auto mt-4"></div>
            </div>

            <div className="relative">
              {/* Center Line */}
              <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-gray-300 transform md:-translate-x-1/2 ml-4 md:ml-0"></div>

              <TimelineItem
                year="Early Days"
                title="Student Leader"
                desc="Started activism with NSUI, fighting for student rights on campuses across the state."
                side="left"
              />
              <TimelineItem
                year="2 Terms"
                title="NSUI State President"
                desc="Revitalized the student wing, organizing massive rallies and membership drives."
                side="right"
              />
              <TimelineItem
                year="Present"
                title="IYC State President"
                desc="Elected with a historic margin. Leading the youth brigade to strengthen Congress ideology."
                side="left"
                isCurrent
              />
            </div>
          </div>
        </section>

        {/* ================= CALL TO ACTION ================= */}
        <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 opacity-10">
            <FaHandPaper size={400} />
          </div>

          <div className="container mx-auto px-6 relative z-10 text-center">
            <h2 className="text-4xl md:text-6xl font-black uppercase mb-8">
              Are You Ready To{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                Lead?
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
              The Indian Youth Congress is looking for the next generation of
              leaders. Join the movement under the leadership of HS Manjunath
              Gowda.
            </p>
            <button className="bg-white text-slate-900 px-12 py-5 rounded-full font-bold text-lg hover:bg-orange-500 hover:text-white transition-colors duration-300 shadow-2xl">
              Become a Member
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// --- Sub Components ---

const SocialLink = ({
  Icon,
  href,
  color,
}: {
  Icon: React.ComponentType<any>;
  href: string;
  color: string;
}) => (
  <a href={href} className={`text-gray-400 text-xl transition-colors ${color}`}>
    {/* Use size for FaXTwitter, className for others */}
    {Icon === FaXTwitter ? <Icon size={20} /> : <Icon className="inline" />}
  </a>
);

const StatCard = ({
  number,
  label,
  icon,
  color,
}: {
  number: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}) => {
  const colorClasses: Record<string, string> = {
    blue: 'text-blue-600 border-blue-600',
    orange: 'text-orange-600 border-orange-600',
    green: 'text-green-600 border-green-600',
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      className="bg-white/90 backdrop-blur-lg p-8 shadow-xl border-t-4 border-transparent hover:transform hover:-translate-y-2 transition-all duration-300 rounded-sm"
      style={{
        borderTopColor:
          color === 'blue'
            ? '#2563EB'
            : color === 'orange'
            ? '#EA580C'
            : '#16A34A',
      }}
    >
      <div className={`text-3xl mb-4 ${colorClasses[color].split(' ')[0]}`}>
        {icon}
      </div>
      <h3 className="text-4xl font-black text-slate-800 mb-2">{number}</h3>
      <p className="text-gray-500 font-bold text-sm uppercase tracking-wider">
        {label}
      </p>
    </motion.div>
  );
};

const AgendaCard = ({
  title,
  desc,
  icon,
  color,
}: {
  title: string;
  desc: string;
  icon: React.ReactNode;
  color: string;
}) => (
  <motion.div
    whileHover={{ x: 10 }}
    className={`bg-white p-8 border-l-8 shadow-sm hover:shadow-xl transition-all ${color}`}
  >
    <div className="flex items-start gap-6">
      <div className="p-4 bg-gray-50 rounded-full text-2xl text-slate-700">
        {icon}
      </div>
      <div>
        <h3 className="text-2xl font-bold text-slate-900 mb-3 uppercase">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed font-medium">{desc}</p>
      </div>
    </div>
  </motion.div>
);

const TimelineItem = ({
  year,
  title,
  desc,
  side,
  isCurrent,
}: {
  year: string;
  title: string;
  desc: string;
  side: 'left' | 'right';
  isCurrent?: boolean;
}) => {
  return (
    <div
      className={`mb-12 flex flex-col md:flex-row items-center w-full ${
        side === 'right' ? 'md:flex-row-reverse' : ''
      }`}
    >
      {/* Content Box */}
      <div
        className={`w-full md:w-5/12 pl-12 md:pl-0 ${
          side === 'left' ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
        }`}
      >
        <div
          className={`inline-block px-3 py-1 text-xs font-bold uppercase rounded mb-2 ${
            isCurrent ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-600'
          }`}
        >
          {year}
        </div>
        <h3 className="text-2xl font-black text-slate-900 uppercase mb-2">
          {title}
        </h3>
        <p className="text-gray-500">{desc}</p>
      </div>

      {/* Center Dot */}
      <div className="absolute left-4 md:left-1/2 w-4 h-4 bg-white border-4 border-slate-900 rounded-full transform -translate-x-1/2 z-10"></div>

      {/* Empty space for the other side */}
      <div className="hidden md:block w-5/12"></div>
    </div>
  );
};

export default HSManjunathProfile;
