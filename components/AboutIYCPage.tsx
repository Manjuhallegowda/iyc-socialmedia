import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Zap,
  Users,
  BookOpen,
  Mic,
  Globe,
  Shield,
  Scale,
  Heart,
  MapPin,
  Calendar,
  Target,
  Briefcase,
  MessageSquare,
  TrendingUp,
  CheckCircle,
  Flag,
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';

// --- 1. Constants & Data ---

const THEME = {
  saffron: '#FF9933', // Official Flag Saffron
  white: '#FFFFFF',
  green: '#138808', // Official Flag Green
  navy: '#000080', // Ashok Chakra Navy
};

const HISTORY_TIMELINE = [
  {
    year: '1960',
    title: 'Foundation',
    text: 'Founded on August 9, 1960, to channel the energy of young Indians into nation-building.',
  },
  {
    year: '1970s',
    title: 'Transformation',
    text: 'Restructured as a frontal organization, strengthening its role in mass contact and social work.',
  },
  {
    year: '1980s',
    title: 'Youth Empowerment',
    text: 'Expanded democratic participation by lowering the voting age to 18 under Rajiv Gandhi.',
  },
  {
    year: '2000s',
    title: 'Democratic Reforms',
    text: 'Introduction of internal elections and transparency to make the IYC inclusive.',
  },
];

const LEADER_QUOTES = [
  {
    name: 'Indira Gandhi',
    role: 'Former Prime Minister',
    quote:
      'The power to question is the basis of all human progress. Youth must never stop questioning.',
    color: 'from-orange-500 to-orange-600',
    // CHANGE THIS PATH to your actual image
    bgImage: '/assets/indra.png',
  },
  {
    name: 'Rajiv Gandhi',
    role: 'Former Prime Minister',
    quote:
      'Youth is not a question of age. It is a state of mind — the courage to dream and the strength to act.',
    color: 'from-blue-200 to-indigo-700',
    // CHANGE THIS PATH to your actual image
    bgImage: '/assets/rajiv.png',
  },
  {
    name: 'Sonia Gandhi',
    role: 'Chairperson, AICC',
    quote:
      'The future of India depends on fearless young Indians who stand for truth, equality, and democracy.',
    color: 'from-indigo-700 to-blue-200',
    // CHANGE THIS PATH to your actual image
    bgImage: '/assets/sonia.png',
  },
  {
    name: 'Mallikarjun Kharge',
    role: 'President, AICC',
    quote:
      "India's youth is vying for change, dreaming about a better and secured life. Let's empower them to lead.",
    color: 'from-green-600 to-green-700',
    // CHANGE THIS PATH to your actual image
    bgImage: '/assets/mallikarjun.png',
  },
];

const CORE_PILLARS = [
  {
    icon: Shield,
    title: 'Democratic Values',
    description: 'Upholding the Constitution and promoting free speech.',
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    icon: Scale,
    title: 'Social Justice',
    description:
      'Fighting for equality and rights of marginalized communities.',
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    icon: Heart,
    title: 'Youth Empowerment',
    description:
      'Providing a platform for young voices to lead and shape policy.',
    color: 'text-green-700',
    bg: 'bg-green-50',
  },
];

const KEY_STATS = [
  { number: '1M+', label: 'Volunteers', icon: Users },
  { number: '29', label: 'States', icon: MapPin },
  { number: '60+', label: 'Years', icon: Calendar },
  { number: '100+', label: 'Campaigns', icon: Flag },
];

const IMPACT_POINTS = [
  {
    title: 'Grassroots Mobilisation',
    text: 'Movements on unemployment & education.',
    icon: Users,
  },
  {
    title: 'Leadership Development',
    text: 'Training future leaders via fellowships.',
    icon: BookOpen,
  },
  {
    title: 'Ideological Defence',
    text: 'Defending constitutional values.',
    icon: Shield,
  },
];

// --- 2. Sub-Components for Cleanliness ---

const SectionHeader = ({
  title,
  subtitle,
  color = 'text-gray-900',
  align = 'center',
}: any) => (
  <div className={`mb-12 ${align === 'center' ? 'text-center' : 'text-left'}`}>
    <h2
      className={`text-3xl md:text-4xl font-extrabold ${color} mb-3 tracking-tight`}
    >
      {title}
    </h2>
    {subtitle && (
      <div
        className={`h-1 w-24 ${
          align === 'center' ? 'mx-auto' : ''
        } bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full`}
      />
    )}
  </div>
);

// --- 3. Main Component ---

const AboutIYCPage: React.FC = () => {
  const { galleryItems } = useData();

  // Parallax scroll hook
  const { scrollYProgress } = useScroll();
  const yRange = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const aboutImage = useMemo(
    () => galleryItems.find((item) => item.tag === 'about'),
    [galleryItems]
  );

  useEffect(() => {
    document.title = 'About Us | Indian Youth Congress';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-800 selection:bg-orange-200 selection:text-orange-900">
      <Navbar />

      <main className="pt-20">
        {/* --- HERO SECTION --- */}
        <div className="relative bg-white overflow-hidden">
          {/* Abstract Background Decoration */}
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-orange-100 blur-3xl opacity-50"></div>
          <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-green-100 blur-3xl opacity-50"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-20 relative z-10">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-orange-600 transition-colors mb-8"
            >
              <ArrowLeft size={16} /> Back to Home
            </Link>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="max-w-4xl"
            >
              <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-6">
                The Political Force of <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 via-orange-500 to-yellow-500">
                  Young India
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 font-light leading-relaxed max-w-3xl border-l-4 border-green-600 pl-6">
                Defending democracy, upholding constitutional values, and
                fighting for social justice. We are the future, today.
              </p>
            </motion.div>
          </div>
        </div>

        {/* --- STATS STRIP --- */}
        <div className="bg-gray-900 text-white py-12 relative overflow-hidden shadow-2xl">
          {/* Subtle Tricolor border at top */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-white to-green-600"></div>

          <div className="max-w-7xl mx-auto px-6 lg:px-12 grid grid-cols-2 md:grid-cols-4 gap-8">
            {KEY_STATS.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group hover:-translate-y-1 transition-transform duration-300"
              >
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-orange-500 group-hover:text-white transition-colors" />
                <div className="text-4xl font-bold mb-1">{stat.number}</div>
                <div className="text-sm uppercase tracking-widest text-gray-400 font-semibold">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* --- MISSION SECTION (Split Layout) --- */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <SectionHeader
                  title="Our Mission"
                  subtitle={true}
                  align="left"
                />
                <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                  <p>
                    The{' '}
                    <span className="font-bold text-gray-900">
                      Indian Youth Congress (IYC)
                    </span>{' '}
                    is the vibrant youth wing of the Indian National Congress.
                    We are not just a political organization; we are a movement.
                  </p>
                  <p>
                    We exist to channel the boundless energy, idealism, and
                    courage of India’s youth into constructive nation-building.
                    From the streets to the parliament, we ensure that the voice
                    of the common youth resonates in the halls of power.
                  </p>

                  <div className="pt-4 flex flex-wrap gap-4">
                    <div className="flex items-center gap-2 bg-orange-50 px-4 py-2 rounded-lg border border-orange-100">
                      <CheckCircle size={18} className="text-orange-600" />
                      <span className="font-medium text-orange-900">
                        Secularism
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-green-50 px-4 py-2 rounded-lg border border-green-100">
                      <CheckCircle size={18} className="text-green-700" />
                      <span className="font-medium text-green-900">
                        Democracy
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-lg border border-blue-100">
                      <CheckCircle size={18} className="text-blue-700" />
                      <span className="font-medium text-blue-900">
                        Equality
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-green-600 rounded-2xl transform rotate-3 blur-sm opacity-30"></div>
                <div className="relative bg-white p-2 rounded-2xl shadow-xl border border-gray-100 overflow-hidden h-[450px]">
                  {aboutImage ? (
                    <img
                      src={aboutImage.imageUrl}
                      alt="IYC Event"
                      className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center text-gray-400 flex-col">
                      <Users size={48} className="mb-4 opacity-50" />
                      <span>About Us Image</span>
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- LEADERSHIP VOICES --- */}
        <section className="py-24 bg-slate-900 text-white overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-16">
              <span className="text-orange-500">Voice's</span> That{' '}
              <span className="text-green-500">Guide Us</span>
            </h2>
          </div>

          <div
            className="[mask-image:linear-gradient(to-right,transparent,white_20%,white_80%,transparent)] group"
            style={
              {
                '--animation-duration': '80s',
              } as React.CSSProperties
            }
          >
            <div className="flex w-max flex-nowrap gap-8 animate-scroll">
              {[...LEADER_QUOTES, ...LEADER_QUOTES].map((leader, idx) => (
                <div
                  key={`${leader.name}-${idx}`}
                  className="relative rounded-2xl p-8 overflow-hidden group shadow-xl h-full flex flex-col justify-between w-full max-w-sm flex-shrink-0"
                >
                  {/* 1. BACKGROUND IMAGE LAYER */}
                  <div
                    className="absolute inset-0 z-0 transition-transform duration-700 group-hover:scale-110"
                    style={{
                      backgroundImage: `url('${leader.bgImage}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center top',
                    }}
                  />

                  {/* 2. DARK OVERLAY (Gradient makes text readable) */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/70 to-black/60 z-10 transition-opacity group-hover:opacity-90"></div>

                  {/* 3. COLOR STRIP AT TOP */}
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${leader.color} z-20`}
                  ></div>

                  {/* 4. CONTENT (Relative z-20 ensures it sits on top) */}
                  <div className="relative z-20">
                    <Mic className="w-8 h-8 text-white/60 mb-6" />

                    <p className="text-lg text-white italic mb-8 leading-relaxed font-medium">
                      "{leader.quote}"
                    </p>

                    <div className="flex items-center gap-4 mt-auto border-t border-white/10 pt-4">
                      <div>
                        <h4 className="font-bold text-white text-lg">
                          {leader.name}
                        </h4>
                        <p className="text-sm text-gray-300">{leader.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- HISTORY TIMELINE --- */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Background Map Effect (Optional placeholder) */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#138808_1px,transparent_1px)] [background-size:16px_16px]"></div>

          <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
            <SectionHeader title="Our Legacy" subtitle={true} />

            <div className="relative">
              {/* Central Line */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200"></div>

              <div className="space-y-12">
                {HISTORY_TIMELINE.map((item, idx) => (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 }}
                    className={`flex flex-col md:flex-row items-center justify-between gap-8 ${
                      idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Text Side */}
                    <div className="w-full md:w-[45%] bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:border-orange-200 transition-colors">
                      <div className="text-3xl font-bold text-orange-600 mb-2">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.text}
                      </p>
                    </div>

                    {/* Dot */}
                    <div className="w-4 h-4 bg-green-600 rounded-full border-4 border-white shadow-md z-10 hidden md:block relative">
                      {/* Pulsing effect */}
                      <div className="absolute inset-0 bg-green-600 rounded-full animate-ping opacity-20"></div>
                    </div>

                    {/* Empty Side for Balance */}
                    <div className="w-full md:w-[45%] hidden md:block"></div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* --- PILLARS --- */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <SectionHeader title="Our Core Pillars" subtitle={true} />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {CORE_PILLARS.map((pillar, idx) => (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className={`bg-white p-8 rounded-2xl shadow-lg border-t-4 ${
                    pillar.color === 'text-orange-600'
                      ? 'border-orange-500'
                      : pillar.color === 'text-green-700'
                      ? 'border-green-600'
                      : 'border-blue-600'
                  } hover:shadow-2xl transition-shadow duration-300`}
                >
                  <div
                    className={`w-14 h-14 ${pillar.bg} ${pillar.color} rounded-full flex items-center justify-center mb-6`}
                  >
                    <pillar.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{pillar.title}</h3>
                  <p className="text-gray-600">{pillar.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- DIGITAL WING --- */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col md:flex-row items-center gap-12 overflow-hidden relative">
              {/* Decorative Circle */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 -mr-16 -mt-16"></div>

              <div className="flex-1 z-10">
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="text-green-600" />
                  <span className="font-bold text-green-700 tracking-wide text-sm uppercase">
                    Digital Frontier
                  </span>
                </div>
                <h2 className="text-4xl font-extrabold text-gray-900 mb-6">
                  The IYC Social Media Wing
                </h2>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Combating misinformation with facts and ground reports.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Driving high-impact digital campaigns for social justice.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">
                      Empowering youth volunteers with digital literacy.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="flex-1 w-full z-10">
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl shadow-lg text-white">
                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-blue-400" /> Connect with Us
                  </h3>
                  <div className="space-y-4">
                    <p className="text-gray-400 text-sm">
                      Join the digital army. Follow us for real-time updates.
                    </p>
                    <div className="flex gap-4">
                      {/* Social placeholders */}
                      <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                        X
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                        Fb
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                        In
                      </div>
                      <div className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center cursor-pointer transition-colors">
                        Yt
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- CTA SECTION ---
        <section className="bg-gradient-to-r from-orange-600 to-orange-500 py-20 text-center relative overflow-hidden">
          {/* Abstract Pattern overlay
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h2 className="text-4xl font-extrabold text-white mb-6">
              Ready to Serve the Nation?
            </h2>
            <p className="text-orange-100 text-xl mb-8">
              Join the movement that defines the future of India. Be the change
              you wish to see.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/join"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-orange-700 font-bold rounded-full shadow-lg hover:shadow-xl hover:bg-gray-100 transition-all transform hover:-translate-y-1"
              >
                Become a Member <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              <Link
                to="/donate"
                className="inline-flex items-center justify-center px-8 py-4 bg-orange-700 border border-orange-400 text-white font-bold rounded-full shadow-lg hover:bg-orange-800 transition-all"
              >
                Contribute
              </Link>
            </div>
          </div>
        </section>*/}
      </main>
      <Footer />
    </div>
  );
};

export default AboutIYCPage;
