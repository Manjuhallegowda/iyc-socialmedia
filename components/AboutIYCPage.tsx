import React, { useMemo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Target, // Added new icons
  Briefcase,
  MessageSquare,
  TrendingUp, // Added icons for general use
} from 'lucide-react';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';

// --- 1. Define custom color/styling constants ---
const COLORS = {
  // Using Tailwind utility classes for consistency
  saffron: 'text-orange-600',
  indiaGreen: 'text-green-700',
  bg: 'bg-gray-50',
  text: 'text-gray-800',
};

// --- 2. Define Data Arrays Outside the Component ---

const HISTORY_TIMELINE = [
  {
    year: '1960',
    title: 'Foundation of Indian Youth Congress',
    text: 'Founded on August 9, 1960, the Indian Youth Congress was created to channel the energy of young Indians into nation-building and democratic participation.',
  },
  {
    year: 'Late 1960s',
    title: 'Transformation under Indira Gandhi',
    text: 'Indira Gandhi restructured the IYC as a frontal organization, strengthening its role in political training, mass contact, and social work.',
  },
  {
    year: '1980s',
    title: 'Rajiv Gandhi & Youth Empowerment',
    text: 'Rajiv Gandhi emerged from the IYC and expanded democratic participation by lowering the voting age to 18.',
  },
  {
    year: '2000s',
    title: 'Democratic Reforms under Rahul Gandhi',
    text: 'Rahul Gandhi introduced internal elections and transparency, making the IYC more inclusive and accountable.',
  },
];

const LEADER_QUOTES = [
  {
    name: 'Indira Gandhi',
    role: 'Former Prime Minister of India',
    quote:
      'The power to question is the basis of all human progress. Youth must never stop questioning injustice.',
  },
  {
    name: 'Rajiv Gandhi',
    role: 'Former Prime Minister of India',
    quote:
      'Youth is not a question of age. It is a state of mind — the courage to dream and the strength to act.',
  },
  {
    name: 'Rahul Gandhi',
    role: 'Leader, Indian National Congress',
    quote:
      'The future of India depends on fearless young Indians who stand for truth, equality, and democracy.',
  },
];

const IMPACT_POINTS = [
  {
    title: 'Grassroots Mobilisation',
    text: 'Movements, protests, and campaigns on unemployment, education, price rise, and justice.',
    icon: Users,
  },
  {
    title: 'Leadership Development',
    text: 'Training future leaders through structured political programs and fellowships.',
    icon: BookOpen,
  },
  {
    title: 'Ideological Defence',
    text: 'Defending constitutional values against divisive and authoritarian politics.',
    icon: Zap,
  },
];

const CORE_PILLARS = [
  {
    icon: 'Shield',
    title: 'Democratic Values',
    description:
      'Upholding the Constitution and promoting free speech and open debate.',
  },
  {
    icon: 'Scale',
    title: 'Social Justice',
    description:
      'Fighting for equality, inclusivity, and the rights of marginalized communities.',
  },
  {
    icon: 'Heart',
    title: 'Youth Empowerment',
    description:
      'Providing a platform for young voices to lead, contest, and shape policy.',
  },
];

const KEY_STATS = [
  { number: '1M+', label: 'Active Volunteers', icon: 'Users' },
  { number: '29', label: 'State Units', icon: 'MapPin' },
  { number: '60+', label: 'Years of Service', icon: 'Calendar' },
  { number: '100+', label: 'Major Campaigns', icon: 'Target' },
];

const SOCIAL_MEDIA_WING_POINTS = [
  'Countering fake news and propaganda',
  'High-impact digital campaigns',
  'Training disciplined digital volunteers',
  'Youth-led storytelling and ground reports',
];

// --- 3. Utility Functions & Animation Variants ---

// Helper function to dynamically map string name to Lucide Icon component
const iconMap = {
  Shield,
  Scale,
  Heart,
  Users,
  MapPin,
  Calendar,
  Target,
  Zap,
  BookOpen,
  Mic,
  Globe,
  Briefcase,
  MessageSquare,
  TrendingUp,
};

const getIconComponent = (iconName: keyof typeof iconMap) => {
  return iconMap[iconName] || MessageSquare; // Fallback icon
};

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// --- 4. The Component ---

const AboutIYCPage: React.FC = () => {
  const { galleryItems } = useData();

  const aboutImage = useMemo(
    () => galleryItems.find((item) => item.tag === 'about'),
    [galleryItems]
  );

  useEffect(() => {
    document.title = 'About IYC - Indian Youth Congress';
  }, []);

  return (
    <div className={`min-h-screen ${COLORS.bg} ${COLORS.text} font-sans`}>
      <Navbar />

      <main id="main-content" className="pt-20" aria-labelledby="page-title">
        {/* Back Link Section */}
        <div className="max-w-7xl mx-auto px-6 lg:px-12 mb-6 pt-4">
          <Link
            to="/"
            className={`inline-flex items-center gap-2 ${COLORS.saffron} font-semibold hover:text-orange-800 transition-colors`}
            aria-label="Back to Home Page"
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>

        {/* HERO Section (Section 1) */}
        <motion.section {...fadeIn} className="bg-white pt-16 pb-12 shadow-lg">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h1
              id="page-title"
              className={`text-5xl md:text-7xl font-extrabold ${COLORS.indiaGreen} mb-6`}
            >
              Indian Youth Congress
            </h1>

            <p className="text-xl md:text-2xl font-semibold text-gray-700 max-w-4xl">
              The political force of young India — defending democracy,
              constitutional values, and social justice.
            </p>

            {/* National Flag Color Separator */}
            <div className="mt-8 flex gap-1 items-center">
              <div className="h-1 w-12 bg-orange-600 rounded-full" />
              <div className="h-1 w-12 bg-white rounded-full border border-gray-200" />
              <div className="h-1 w-12 bg-green-700 rounded-full" />
            </div>
          </div>
        </motion.section>

        {/* KEY STATISTICS Section (New: Attention Grabber) */}
        <section className="bg-orange-600 py-12 text-white shadow-inner">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {KEY_STATS.map((stat, index) => {
                const Icon = getIconComponent(
                  stat.icon as keyof typeof iconMap
                );
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Icon className="w-10 h-10 mx-auto mb-3 text-white/80" />
                    <div className="text-4xl md:text-5xl font-extrabold">
                      {stat.number}
                    </div>
                    <p className="text-sm font-medium uppercase tracking-wider text-white/90">
                      {stat.label}
                    </p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ABOUT Section (Section 2: Text and Image) */}
        <section className="bg-white pt-16 pb-20">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-4 border-b-2 border-green-700/50 inline-block pb-1">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-700 leading-relaxed space-y-4">
                  <p>
                    The Indian Youth Congress (IYC) is the youth wing of the
                    Indian National Congress and one of the largest democratic
                    youth organizations in the world.
                  </p>
                  <p>
                    It exists to channel the energy, idealism, and courage of
                    India’s youth into nation-building and progressive political
                    action, ensuring a vibrant and equitable future for all
                    citizens.
                  </p>
                </p>
              </div>

              {aboutImage && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.8 }}
                  className="relative group mt-8 md:mt-0"
                >
                  {/* Decorative element for depth */}
                  <div className="absolute inset-0 bg-green-700/10 rounded-3xl -z-10 transform translate-x-3 translate-y-3 group-hover:translate-x-4 group-hover:translate-y-4 transition duration-300 hidden md:block" />

<div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white 
                transform group-hover:-translate-x-1 group-hover:-translate-y-1 
                transition duration-300 h-[360px] bg-white">
                    <img
  src={aboutImage.imageUrl}
  alt={
    aboutImage.alt ||
    'Indian Youth Congress emblem'
  }
  className="w-full h-full object-contain p-6 transition-all duration-500"
  loading="lazy"
/>

                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>

        {/* CORE PILLARS Section (New: Values Focus) */}
        <section
          className={`${COLORS.bg} py-20 border-t border-b border-gray-100`}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2
              className={`text-4xl font-extrabold mb-12 text-center ${COLORS.indiaGreen}`}
            >
              Our Core Pillars
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {CORE_PILLARS.map((value, index) => {
                const Icon = getIconComponent(
                  value.icon as keyof typeof iconMap
                );
                return (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="text-center p-8 bg-white rounded-2xl shadow-xl border-t-8 border-orange-600/50 hover:shadow-2xl transition duration-300"
                  >
                    <Icon
                      className={`w-12 h-12 mx-auto mb-4 ${COLORS.saffron}`}
                      strokeWidth={2.5}
                    />
                    <h3 className="text-2xl font-bold mb-3">{value.title}</h3>
                    <p className="text-gray-600">{value.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* HISTORY Section (Section 3: Timeline) */}
        <section className={`bg-white py-20`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2
              className={`text-4xl font-extrabold mb-12 border-b-4 border-orange-600 inline-block pb-3 ${COLORS.indiaGreen}`}
            >
              Our History & Legacy
            </h2>

            <div className="relative border-l-4 border-orange-600/70 pl-10 space-y-12">
              {HISTORY_TIMELINE.map((item, index) => (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                  role="listitem"
                >
                  <div className="absolute -left-[30px] top-2 w-5 h-5 bg-white border-4 border-orange-600 rounded-full shadow-md" />

                  <div className="bg-gray-50 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-shadow duration-300">
                    <span
                      className={`inline-block mb-3 px-3 py-1 rounded-full bg-orange-100 ${COLORS.saffron} font-bold text-xs`}
                    >
                      {item.year}
                    </span>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-base text-gray-600 leading-relaxed">
                      {item.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* LEADER QUOTES Section (Section 4) */}
        <section className={`${COLORS.bg} py-20`}>
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2
              className={`text-4xl font-extrabold mb-12 border-b-4 border-green-700 inline-block pb-3 ${COLORS.indiaGreen}`}
            >
              Voices That Shaped the Movement
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {LEADER_QUOTES.map((leader, index) => (
                <motion.blockquote
                  key={leader.name}
                  initial={{ opacity: 0, scale: 0.98 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative bg-white rounded-2xl p-8 shadow-xl"
                  aria-label={`Quote by ${leader.name}`}
                >
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-orange-600 to-green-700 rounded-tl-2xl rounded-bl-2xl" />

                  <p className="text-lg text-gray-800 leading-relaxed mb-6 pl-5 italic">
                    <Mic
                      className={`inline-block mr-2 w-5 h-5 ${COLORS.saffron}`}
                    />
                    “{leader.quote}”
                  </p>

                  <footer className="border-t pt-4 pl-5">
                    <p className="font-bold text-lg">{leader.name}</p>
                    <p className="text-sm text-gray-500">{leader.role}</p>
                  </footer>
                </motion.blockquote>
              ))}
            </div>
          </div>
        </section>

        {/* IMPACT Section (Section 5) */}
        <section className="bg-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2
              className={`text-4xl font-extrabold mb-12 border-b-4 border-green-700 inline-block pb-3 ${COLORS.indiaGreen}`}
            >
              Our Core Impact
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {IMPACT_POINTS.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-50 rounded-2xl p-8 shadow-xl border-t-4 border-green-700 hover:border-orange-600 transition-colors"
                  >
                    <Icon className={`w-8 h-8 mb-4 ${COLORS.indiaGreen}`} />
                    <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                    <p className="text-base text-gray-600">{item.text}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* SOCIAL MEDIA WING (Section 6: Distinct Branding) */}
        <section className="bg-gray-900 text-white py-20">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-8">
              The Social Media Wing
              <span className="block text-orange-600 mt-2 text-3xl">
                Our Digital Frontline
              </span>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-base">
              {SOCIAL_MEDIA_WING_POINTS.map((text, index) => (
                <motion.div
                  key={text}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gray-800 rounded-xl p-6 border-l-4 border-orange-600 flex items-center shadow-lg"
                >
                  <TrendingUp className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                  <p>{text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CALL TO ACTION (New: Footer Connection) */}
        <section className="bg-green-700 py-16">
          <div className="max-w-4xl mx-auto text-center px-6 lg:px-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
              Ready to make an impact?
            </h3>
            <p className="text-lg text-green-100 mb-8">
              Join the movement, stand for constitutional values, and shape the
              future of India.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-green-700 bg-white hover:bg-gray-100 transition-colors shadow-lg transform hover:scale-[1.02]"
            >
              Join the IYC Today <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutIYCPage;