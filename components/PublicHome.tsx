import React, {
  FormEvent,
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
  useId,
} from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Navbar from './Navbar';
import ActivityModal from './ActivityModal';
import NewsModal from './NewsModal';
import VideoSection from './VideoSection';
import Footer from './Footer';
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaHandRock,
  FaHandPaper,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import ExecutiveLeadershipSection from './ExecutiveLeadershipSection';
import { useData } from '../context/DataContext';
import { Activity, NewsItem, GalleryItem } from '../types';
import {
  Pause,
  Play,
  Loader2,
  Share2,
  ArrowRight,
  FileText,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Megaphone,
  MapPin,
  Calendar,
  CheckCircle,
} from 'lucide-react';

// --- ANIMATION VARIANTS ---
const transition = { duration: 0.5, ease: 'easeOut' };

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

// --- WORKING PRESIDENTS DATA ---
const WORKING_PRESIDENTS = [
  {
    id: 1,
    name: 'Tanveer Sait',
    role1: 'MLA - Narasimharaja',
    role2: 'Former Minister',
    image: 'https://andolana.in/wp-content/uploads/2024/04/tanveer-sait.jpg', // Replace with real image path
  },
  {
    id: 2,
    name: 'G C Chandrashekhar',
    role1: 'MP - Rajya Sabha',
    role2: 'Former Minister',
    image:
      'https://upload.wikimedia.org/wikipedia/commons/7/79/GC_Chandrashekhar.jpg', // Replace with real image path
  },
  {
    id: 3,
    name: 'Vinay Kulkarni',
    role1: 'MLA - Dharwad',
    role2: 'Former Minister',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSIRRV-bJvh9IdVWbv9iyn1_A1vAXzHn6yn-g&s', // Replace with real image path
  },
  {
    id: 4,
    name: 'Manjunath Bhandary',
    role1: 'MLC - DK & Udupi',
    role2: 'Former Minister',
    image:
      'https://www.sahyadri.edu.in/_next/image?url=%2Fimages%2Fchairman%2Fchairman.jpg&w=3840&q=75', // Replace with real image path
  },
  {
    id: 5,
    name: 'Vasanth Kumar ',
    role1: 'MLC - Karnataka',
    role2: 'Former Minister',
    image:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSGD7ud711RCYtf0lb_ma2EyQWPFDmR_wreGA&s', // Replace with real image path
  },
];

const LEADER_QUOTES = [
  {
    name: 'Indira Gandhi',
    role: 'Former Prime Minister',
    quote:
      'The power to question is the basis of all human progress. Youth must never stop questioning.',
    color: 'from-orange-500 to-orange-600',
    bgImage: '/assets/indra.png',
  },
  {
    name: 'Rajiv Gandhi',
    role: 'Former Prime Minister',
    quote:
      'Youth is not a question of age. It is a state of mind - the courage to dream and the strength to act.',
    color: 'from-blue-200 to-indigo-700',
    bgImage: '/assets/rajiv.png',
  },
  {
    name: 'Sonia Gandhi',
    role: 'Chairperson, AICC',
    quote:
      'The future of India depends on fearless young Indians who stand for truth, equality, and democracy.',
    color: 'from-indigo-700 to-blue-200',
    bgImage: '/assets/sonia.png',
  },
  {
    name: 'Rahul Gandhi',
    role: 'Opposition Leader, INC',
    quote:
      'We have unleashed the aspirations of youngsters. Democracy is not going to go backwards.',
    color: 'from-indigo-700 to-blue-200',
    bgImage: '/assets/rahul.png',
  },
  {
    name: 'Mallikarjun Kharge',
    role: 'President, AICC',
    quote:
      "India's youth is vying for change, dreaming about a better and secured life. Let's empower them to lead.",
    color: 'from-green-600 to-green-700',
    bgImage: '/assets/mallikarjun.png',
  },
];

const LeaderQuotes: React.FC = () => {
  const [[index, direction], setIndex] = React.useState<[number, number]>([
    0, 0,
  ]);

  const next = React.useCallback(() => {
    setIndex(([i]) => [(i + 1) % LEADER_QUOTES.length, 1]);
  }, []);

  const prev = React.useCallback(() => {
    setIndex(([i]) => [
      (i - 1 + LEADER_QUOTES.length) % LEADER_QUOTES.length,
      -1,
    ]);
  }, []);

  // Auto-slide
  React.useEffect(() => {
    const id = setInterval(next, 4000);
    return () => clearInterval(id);
  }, [next]);

  return (
    <div className="relative md:hidden overflow-hidden rounded-xl h-80 shadow-lg">
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          initial={{ x: direction > 0 ? 300 : -300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: direction > 0 ? -300 : 300, opacity: 0 }}
          transition={{
            x: { type: 'spring', stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 },
          }}
          className="absolute inset-0 w-full h-full text-white bg-gray-900"
        >
          {/* background image */}
          <img
            src={LEADER_QUOTES[index].bgImage}
            alt={LEADER_QUOTES[index].name}
            className="absolute inset-0 w-full h-full object-cover opacity-80"
          />

          {/* Stronger gradient for text readability on mobile */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>

          <div className="absolute bottom-0 left-0 w-full p-6 z-10">
            <p className="font-semibold italic text-lg leading-snug mb-4 drop-shadow-md text-gray-100">
              “{LEADER_QUOTES[index].quote}”
            </p>

            <div>
              <h4 className="font-bold text-xl text-saffron">
                {LEADER_QUOTES[index].name}
              </h4>
              <span className="text-sm text-gray-300 font-medium">
                {LEADER_QUOTES[index].role}
              </span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const PublicHome: React.FC = () => {
  const { news, activities, galleryItems, loading, stateLeaders } = useData();

  // --- STATE MANAGEMENT ---
  const [contactSent, setContactSent] = useState(false);
  const [contactSending, setContactSending] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(
    null
  );
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  // Gallery Modal State
  const [selectedGalleryIndex, setSelectedGalleryIndex] = useState<
    number | null
  >(null);

  // Form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    mobile: '',
    message: '',
    url: '',
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
    mobile?: string;
    message?: string;
  }>({});

  // Reduced motion
  const prefersReducedMotion = useRef(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    prefersReducedMotion.current = mq.matches;
    const onChange = () => (prefersReducedMotion.current = mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  // Prevent background scroll when modal open
  useEffect(() => {
    const modalOpen =
      selectedGalleryIndex !== null || !!selectedActivity || !!selectedNews;
    document.body.style.overflow = modalOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedGalleryIndex, selectedActivity, selectedNews]);

  const heroImages = useMemo(
    () => galleryItems.filter((item) => item.tag === 'hero'),
    [galleryItems]
  );
  const standardGalleryItems = useMemo(
    () => galleryItems.filter((item) => !item.tag || item.tag === 'gallery'),
    [galleryItems]
  );

  const aboutImage = useMemo(
    () => galleryItems.find((item) => item.tag === 'about'),
    [galleryItems]
  );

  // --- HERO LOGIC ---
  const heroIntervalRef = useRef<number | null>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroPlaying, setHeroPlaying] = useState(true);

  useEffect(() => {
    if (heroImages.length === 0) return;
    if (prefersReducedMotion.current) return;

    const advance = () =>
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);

    if (!heroPaused && heroPlaying) {
      heroIntervalRef.current = window.setInterval(advance, 6000);
    }

    return () => {
      if (heroIntervalRef.current)
        window.clearInterval(heroIntervalRef.current);
      heroIntervalRef.current = null;
    };
  }, [heroImages.length, heroPaused, heroPlaying]);

  const goToHeroIndex = useCallback(
    (i: number) => setCurrentHeroIndex(i % Math.max(1, heroImages.length)),
    [heroImages.length]
  );

  // --- GALLERY KEYBOARD LOGIC ---
  const handleNextImage = useCallback(() => {
    if (standardGalleryItems.length === 0) return;
    setSelectedGalleryIndex((prev) =>
      prev === null ? 0 : (prev + 1) % standardGalleryItems.length
    );
  }, [standardGalleryItems.length]);

  const handlePrevImage = useCallback(() => {
    if (standardGalleryItems.length === 0) return;
    setSelectedGalleryIndex((prev) =>
      prev === null
        ? standardGalleryItems.length - 1
        : (prev - 1 + standardGalleryItems.length) % standardGalleryItems.length
    );
  }, [standardGalleryItems.length]);

  // Modal focus trap
  const modalFirstRef = useRef<HTMLButtonElement | null>(null);
  const modalLastRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (selectedGalleryIndex === null) return;
    modalFirstRef.current?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Tab') {
        const focusable = Array.from(
          document.querySelectorAll<HTMLElement>('[data-gallery-focus]')
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedGalleryIndex === null) return;

      if (e.key === 'Escape') setSelectedGalleryIndex(null);
      if (e.key === 'ArrowLeft') handlePrevImage();
      if (e.key === 'ArrowRight') handleNextImage();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedGalleryIndex, handleNextImage, handlePrevImage]);

  // --- FORM VALIDATION LOGIC ---
  const validateForm = () => {
    const errors: typeof formErrors = {};
    if (!contactForm.name.trim()) errors.name = 'Please enter your name.';
    if (!contactForm.email.trim()) errors.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email))
      errors.email = 'Enter a valid email.';
    if (!contactForm.mobile?.trim()) errors.mobile = 'Mobile number required.';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (contactForm.url.trim()) return;
    if (!validateForm()) return;

    setContactSending(true);
    setTimeout(() => {
      setContactSending(false);
      setContactSent(true);
      setContactForm({ name: '', email: '', mobile: '', message: '', url: '' });
      liveRegionRef.current?.focus();
      setTimeout(() => setContactSent(false), 5000);
    }, 1200);
  };

  // --- NEWS TICKER LOGIC ---
  const newsControls = useAnimation();
  const [isHoveringNews, setIsHoveringNews] = useState(false);

  useEffect(() => {
    if (news.length <= 3 || prefersReducedMotion.current) {
      newsControls.stop();
      return;
    }

    if (isHoveringNews) {
      newsControls.stop();
    } else {
      // Logic adjusted for mobile responsiveness
      const isMobile = window.innerWidth < 768;
      const itemWidth = isMobile ? window.innerWidth * 0.85 + 24 : 424; // Width + gap
      const totalWidth = itemWidth * news.length;

      newsControls.start({
        x: [0, -totalWidth],
        transition: {
          ease: 'linear',
          duration: news.length * (isMobile ? 6 : 8), // Faster on mobile
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    }
  }, [isHoveringNews, news.length, newsControls, prefersReducedMotion]);

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-100 border-t-saffron rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://static.wixstatic.com/media/b34acd_88e53092a7034b25a80466040841ba96~mv2.png/v1/fit/w_2500,h_1330,al_c/b34acd_88e53092a7034b25a80466040841ba96~mv2.png"
              alt="IYC Logo"
              className="w-15 h-15 object-contain opacity-100"
            />
          </div>
        </div>
        <p className="mt-6 text-indiaGreen font-bold tracking-widest uppercase text-sm animate-pulse">
          Loading IYC Portal...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-saffron selection:text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:text-indiaGreen focus:p-4 focus:z-50 focus:font-bold focus:shadow-xl focus:rounded-lg"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="pt-16 md:pt-20">
        {/* ================= HERO SECTION ================= */}
        <section
          id="home"
          className="relative h-[90vh] md:h-screen flex items-center justify-center bg-gray-900 overflow-hidden"
        >
          {/* Background Images */}
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
            <AnimatePresence mode="wait">
              {heroImages.length > 0 ? (
                <motion.div
                  key={currentHeroIndex}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.5 }}
                  className="absolute inset-0"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20 z-10" />
                  <img
                    src={heroImages[currentHeroIndex].imageUrl}
                    alt={heroImages[currentHeroIndex].alt || 'Hero Background'}
                    className="w-full h-full object-cover object-top filter contrast-110 select-none"
                  />
                </motion.div>
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-indiaGreen" />
              )}
            </AnimatePresence>
          </div>

          {/* Centered Content */}
          <div className="relative z-20 container mx-auto px-4 h-full flex flex-col items-center justify-center text-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="max-w-5xl space-y-6 md:space-y-8"
            >
              <motion.div variants={fadeInUp} className="flex justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white text-[10px] md:text-sm font-bold tracking-widest uppercase shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-saffron animate-pulse"></span>
                  Official IYC Karnataka Portal
                </div>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl font-black text-white leading-[0.95] md:leading-[0.9] tracking-tighter drop-shadow-2xl"
              >
                YOUTH <br className="md:hidden" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron via-white to-green-500">
                  POWER
                </span>{' '}
                <br />
                <span className="text-2xl sm:text-3xl md:text-6xl lg:text-7xl text-gray-300 font-extrabold block mt-2 tracking-normal">
                  FOR THE NATION
                </span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-sm md:text-2xl text-gray-200 max-w-lg md:max-w-2xl mx-auto font-light leading-relaxed drop-shadow-md px-2"
              >
                The digital frontline of Karnataka's youth. We fight propaganda
                with truth, empower voices, and drive the narrative for a
                progressive India.
              </motion.p>
            </motion.div>
          </div>

          {/* Angled Separator Bottom */}
          <div className="absolute bottom-0 left-0 right-0 z-20">
            <svg
              viewBox="0 0 1440 80"
              className="w-full h-auto text-white fill-current"
            >
              <path d="M0,20L60,25C120,30,240,40,360,45C480,50,600,50,720,40C840,30,960,10,1080,5C1200,0,1320,10,1380,15L1440,20L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z"></path>
            </svg>
          </div>
        </section>

        {/* ================= ABOUT SECTION ================= */}
        <section
          id="about-preview"
          className="py-12 md:py-20 relative bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center"
            >
              {/* Text */}
              <div className="order-1 md:order-2">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-1 bg-saffron"></div>
                  <span className="text-sm font-black tracking-[0.2em] text-gray-500 uppercase">
                    Who We Are
                  </span>
                </div>

                <h2 className="text-3xl md:text-6xl font-black text-saffron leading-none mb-6 md:mb-8">
                  DEFENDING <br />
                  THE <span className="text-indiaGreen">IDEA OF INDIA</span>
                </h2>

                <p className="text-lg md:text-xl text-gray-800 font-medium leading-relaxed mb-4 md:mb-6">
                  Indian Youth Congress is not just an organization; it is a
                  movement. Committed to nurturing young leadership, defending
                  constitutional values, and empowering the youth to actively
                  participate in nation-building.
                </p>

                <p className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed mb-8">
                  From grassroots movements to digital advocacy, IYC stands at
                  the forefront of social justice, democracy, and inclusive
                  development - led by the energy, courage, and ideas of India’s
                  youth.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    to="/about-iyc"
                    className="inline-flex items-center px-6 md:px-8 py-3 bg-white border-2 border-gray-900 text-gray-900 rounded-full font-bold text-base md:text-lg hover:bg-gray-900 hover:text-white transition-all duration-300 w-full md:w-auto justify-center"
                  >
                    Read Our History
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Visual - Mobile Optimized */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative order-1 md:order-2"
              >
                {/* Decorative political frame */}
                <div className="hidden md:block absolute inset-0 border-4 border-gray-100 transform translate-x-4 translate-y-4 rounded-lg"></div>

                <div className="relative bg-white rounded-lg md:p-2 md:shadow-2xl md:border-t-4 md:border-saffron">
                  {/* MOBILE — show quotes */}
                  <LeaderQuotes />

                  {/* DESKTOP — keep your original image */}
                  <div className="hidden md:block">
                    {aboutImage ? (
                      <img
                        src={aboutImage.imageUrl}
                        alt="About IYC"
                        className="w-full h-auto rounded filter contrast-105"
                      />
                    ) : (
                      <div className="h-64 bg-gray-200 rounded flex items-center justify-center text-gray-400">
                        About Image
                      </div>
                    )}
                  </div>

                  <div className="absolute -bottom-6 -left-6 hidden md:block bg-white p-6 rounded shadow-xl max-w-xs border-l-4 border-indiaGreen">
                    <p className="text-gray-800 font-bold italic text-lg leading-tight">
                      "The power of youth is the common wealth for the entire
                      world."
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ================= WORKING PRESIDENTS LOOP (REDESIGNED) ================= */}
        <section className="py-16 bg-slate-50 border-t border-gray-200 overflow-hidden relative">
          {/* Background Decorative Pattern */}
          <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ff9933_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="container mx-auto px-4 mb-10 relative z-10">
            <div className="flex flex-col items-center justify-center">
              <span className="inline-block py-1 px-3 rounded-full bg-orange-100 text-saffron text-xs font-bold tracking-widest uppercase mb-3 border border-orange-200">
                Leadership
              </span>
              <h3 className="text-center text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
                KPCC{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-saffron to-orange-600">
                  Working Presidents
                </span>
              </h3>
              <div className="w-24 h-1.5 bg-gradient-to-r from-saffron via-white to-indiaGreen mt-4 rounded-full shadow-sm"></div>
            </div>
          </div>

          {/* Gradient Masks (Wider for better fade) */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 z-20 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent pointer-events-none"></div>

          <div className="flex overflow-hidden relative z-10">
            <motion.div
              className="flex gap-6 items-center pl-6"
              // Loop Animation
              animate={{
                x: ['0%', '-50%'],
              }}
              transition={{
                duration: 150, // Slightly slower for better readability
                ease: 'linear',
                repeat: Infinity,
              }}
              style={{ width: 'fit-content', display: 'flex' }}
            >
              {/* Render List Twice for seamless Loop */}
              {[
                ...WORKING_PRESIDENTS,
                ...WORKING_PRESIDENTS,
                ...WORKING_PRESIDENTS,
                ...WORKING_PRESIDENTS, // Added one more repetition to ensure smoothness on large screens
              ].map((leader, index) => (
                <div
                  key={`${leader.id}-${index}`}
                  className="relative group w-80 flex-shrink-0"
                >
                  <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-1 overflow-hidden border border-gray-100 h-full">
                    <div className="flex p-5 gap-5 items-center">
                      {/* Larger Square Image */}
                      <div className="relative w-24 h-24 rounded-xl overflow-hidden shadow-inner flex-shrink-0 bg-gray-100">
                        <img
                          src={leader.image}
                          alt={leader.name}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://via.placeholder.com/150?text=INC';
                          }}
                        />
                      </div>

                      {/* Text Content */}
                      <div className="flex flex-col justify-center">
                        <h4 className="font-black text-gray-800 text-lg leading-tight group-hover:text-saffron transition-colors line-clamp-2">
                          {leader.name}
                        </h4>

                        <div className="h-px w-12 bg-gray-200 my-2 group-hover:w-full transition-all duration-500"></div>

                        <div className="space-y-0.5">
                          {/* Role 1 */}
                          {leader.role1 && (
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-saffron"></span>
                              {leader.role1}
                            </p>
                          )}
                          {/* Role 2 (Optional check) */}
                          {leader.role2 ? (
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-indiaGreen"></span>
                              {leader.role2}
                            </p>
                          ) : (
                            // Fallback if role2 doesn't exist in data, just show standard role text or nothing
                            <span className="hidden"></span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Tricolor Bottom Bar */}
                    <div className="h-1.5 w-full flex">
                      <div className="h-full w-1/3 bg-saffron"></div>
                      <div className="h-full w-1/3 bg-white border-t border-b border-gray-100"></div>
                      <div className="h-full w-1/3 bg-indiaGreen"></div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ================= LEADERSHIP SECTION ================= */}
        <div className="bg-gray-50 relative pt-12 pb-20 clip-path-slant">
          <ExecutiveLeadershipSection />

          <section
            id="leadership-profiles"
            className="mt-12 md:mt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
          >
            {/* Section Header */}
            <div className="flex items-center justify-center gap-4 md:gap-6 mb-12">
              <div className="h-1 bg-gray-200 w-12 md:w-32 rounded-full"></div>
              <h2 className="text-2xl md:text-4xl font-black text-gray-800 uppercase tracking-tight text-center">
                State <span className="text-indiaGreen">Office Bearers</span>
              </h2>
              <div className="h-1 bg-gray-200 w-12 md:w-32 rounded-full"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {stateLeaders.map((leader) => (
                <article
                  key={leader.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row overflow-hidden border border-gray-100 border-t-4 sm:border-t sm:border-l-8 border-saffron group"
                >
                  {/* Image Section */}
                  <div className="w-full sm:w-1/3 h-64 sm:h-auto relative overflow-hidden bg-gray-200">
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-full h-full object-cover object-top transform group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-black/10 opacity-60"></div>
                  </div>

                  {/* Content Section */}
                  <div className="w-full sm:w-2/3 p-5 md:p-6 flex flex-col justify-between relative bg-white">
                    {/* Watermark Icon */}
                    <div className="absolute top-4 right-4 text-5xl md:text-6xl opacity-50 pointer-events-none group-hover:text-indiaGreen/10 transition-colors">
                      <img
                        src="/assets/IYC_Logo.png"
                        alt="Logo"
                        className="w-14 h-14 md:w-16 md:h-16 object-contain"
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-start relative z-10">
                        <div>
                          <h3 className="text-xl md:text-2xl font-black text-gray-800 uppercase leading-none tracking-tight group-hover:text-indiaGreen transition-colors">
                            {leader.name}
                          </h3>
                          <div className="inline-block px-2 py-1 bg-orange-50 text-saffron text-[10px] md:text-xs font-bold uppercase mt-2 rounded border border-orange-100">
                            {leader.designation}
                          </div>
                        </div>
                      </div>

                      <p className="text-gray-600 mt-3 md:mt-4 line-clamp-2 text-sm leading-relaxed font-medium">
                        {leader.bio}
                      </p>
                    </div>

                    <div className="mt-5 md:mt-6 pt-4 border-t border-gray-100 flex justify-between items-center relative z-10">
                      <div className="flex space-x-4">
                        {leader.socialMedia?.twitter && (
                          <a
                            href={leader.socialMedia.twitter}
                            className="text-gray-400 hover:text-[#1DA1F2] transition-colors transform hover:scale-110"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaXTwitter size={16} />
                          </a>
                        )}
                        {leader.socialMedia?.facebook && (
                          <a
                            href={leader.socialMedia.facebook}
                            className="text-gray-400 hover:text-[#4267B2] transition-colors transform hover:scale-110"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaFacebookF size={16} />
                          </a>
                        )}
                        {leader.socialMedia?.facebook && (
                          <a
                            href={leader.socialMedia.facebook}
                            className="text-gray-400 hover:text-[#4267B2] transition-colors transform hover:scale-110"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FaInstagram size={16} />
                          </a>
                        )}
                      </div>
                      <Link
                        to={`/state-leader/${leader.id}`}
                        className="text-xs font-bold text-gray-400 hover:text-saffron flex items-center gap-1 md:gap-2 uppercase tracking-widest transition-colors group/link"
                      >
                        Profile{' '}
                        <ArrowRight
                          size={12}
                          className="group-hover/link:translate-x-1 transition-transform"
                        />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>

        {/* ================= ACTIVITIES SECTION ================= */}
        <section
          id="activities"
          className="py-12 md:py-20 bg-gray-900 text-white relative overflow-hidden"
        >
          {/* Background Texture */}
          <div className="absolute inset-0 opacity-5 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px]"></div>

          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 border-b border-gray-700 pb-6">
              <div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight text-white">
                  Ground Zero
                </h2>
                <p className="text-gray-400 mt-2 text-base md:text-lg">
                  Protests, Rallies, and Seva Campaigns
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <Link
                  to="/activities"
                  className="text-saffron font-bold uppercase tracking-wider flex items-center gap-2 hover:text-white transition-colors text-sm md:text-base"
                >
                  View All Reports <ArrowRight size={20} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {(activities || []).slice(0, 3).map((activity, index) => (
                <motion.article
                  key={activity.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden group hover:border-saffron transition-all"
                >
                  <div className="h-52 md:h-60 relative overflow-hidden">
                    <img
                      src={activity.imageUrl}
                      alt={activity.title}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute top-4 left-4 bg-saffron text-white text-[10px] md:text-xs font-bold px-3 py-1 rounded shadow-md uppercase tracking-wider">
                      {activity.type}
                    </div>
                  </div>

                  <div className="p-5 md:p-6">
                    <div className="flex items-center gap-4 text-xs font-bold text-gray-500 mb-3 md:mb-4 uppercase tracking-wide">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {activity.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {activity.location}
                      </span>
                    </div>

                    <h3 className="text-lg md:text-xl font-bold text-white mb-3 leading-snug group-hover:text-saffron transition-colors">
                      {activity.title}
                    </h3>

                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-5 md:mb-6">
                      {activity.description}
                    </p>

                    <div className="flex justify-between items-center border-t border-gray-700 pt-4">
                      <button
                        onClick={() => setSelectedActivity(activity)}
                        className="text-white font-bold text-xs md:text-sm hover:text-saffron transition-colors flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-saffron rounded"
                        aria-label={`Open details for ${activity.title}`}
                      >
                        FULL REPORT <ChevronRight size={16} />
                      </button>

                      <button
                        onClick={() => {
                          const shareData = {
                            title: activity.title,
                            text: activity.description,
                            url: window.location.href,
                          };
                          if ((navigator as any).share)
                            (navigator as any)
                              .share(shareData)
                              .catch(() => undefined);
                          else
                            navigator.clipboard
                              .writeText(window.location.href)
                              .then(() => alert('Link copied'));
                        }}
                        className="text-gray-500 hover:text-white transition-colors"
                        aria-label="Share"
                      >
                        <Share2 size={18} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <VideoSection />

        {/* ================= NEWS TICKER SECTION ================= */}
        <section className="py-12 md:py-20 bg-gray-50 border-t border-gray-200 overflow-hidden">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
              <div className="bg-red-600 text-white font-bold px-3 py-1.5 md:px-4 md:py-2 uppercase text-[10px] md:text-sm tracking-wider flex items-center gap-2 animate-pulse shadow-sm rounded-sm">
                <Megaphone size={14} className="md:w-4 md:h-4" /> Press Releases
              </div>
              <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                Latest Updates
              </h2>
            </div>

            <div
              className="overflow-hidden w-full relative"
              onMouseEnter={() => setIsHoveringNews(true)}
              onMouseLeave={() => setIsHoveringNews(false)}
            >
              {/* Gradient Masks for edges */}
              <div className="absolute -left-1 md:-left-4 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
              <div className="absolute -right-1 md:-right-4 top-0 bottom-0 w-8 md:w-20 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

              <motion.div
                className="flex gap-4 md:gap-6"
                animate={newsControls}
              >
                {[...news, ...news, ...news].map((n, idx) => (
                  <div
                    key={`${n.id}-${idx}`}
                    // FIXED FOR MOBILE: w-[85vw] on mobile, w-[400px] on desktop
                    className="w-[85vw] sm:w-[350px] md:w-[400px] flex-shrink-0"
                  >
                    <div
                      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 md:p-5 border border-gray-200 flex gap-4 cursor-pointer h-full items-start"
                      onClick={() => setSelectedNews(n)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && setSelectedNews(n)}
                    >
                      <img
                        src={n.imageUrl}
                        alt={n.title}
                        className="w-20 h-20 md:w-24 md:h-24 object-cover rounded bg-gray-100 flex-shrink-0"
                      />
                      <div className="flex flex-col justify-between h-full">
                        <div>
                          <span className="text-[10px] md:text-xs font-bold text-saffron uppercase mb-1 block">
                            {n.date}
                          </span>
                          <h3 className="text-sm md:text-base font-bold text-gray-900 leading-snug line-clamp-2 mb-2">
                            {n.title}
                          </h3>
                        </div>
                        <div className="text-[10px] md:text-xs font-semibold text-gray-500 hover:text-indiaGreen flex items-center gap-1 mt-auto">
                          Read Full Story <FileText size={12} />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* ================= GALLERY SECTION ================= */}
        <section id="gallery" className="py-12 md:py-20 bg-white">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-10 md:mb-16">
              <h2 className="text-2xl md:text-4xl font-black text-indiaGreen uppercase tracking-wide">
                Media Gallery
              </h2>
              <div className="w-16 md:w-20 h-2 bg-saffron mx-auto mt-4"></div>
            </div>

            {standardGalleryItems.length === 0 ? (
              <div className="grid place-items-center py-20 bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
                <p className="text-gray-500 font-bold">
                  No gallery items uploaded.
                </p>
              </div>
            ) : (
              // Masonry-ish Grid Layout
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[150px] md:auto-rows-[200px]">
                {standardGalleryItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGalleryIndex(index)}
                    className={`relative group overflow-hidden rounded-md md:rounded-sm cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-saffron focus:ring-opacity-50 ${
                      // Make every 5th item large
                      index % 5 === 0 ? 'col-span-2 row-span-2' : ''
                    }`}
                    aria-label={`Open gallery image ${index + 1}`}
                  >
                    <img
                      src={item.thumbnailUrl || item.imageUrl}
                      alt={item.alt || `Gallery image ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="bg-white text-gray-900 p-2 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-transform">
                        <Share2 size={20} />
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            <div className="text-center mt-10 md:mt-12">
              <a
                href="/gallery"
                className="px-6 py-3 border-2 border-gray-900 text-gray-900 font-bold uppercase hover:bg-gray-900 hover:text-white transition-colors inline-block text-sm md:text-base"
              >
                Load More Photos
              </a>
            </div>
          </div>
        </section>

        {/* --- DIVIDER: Footer Top --- */}
        <div className="h-2 bg-gradient-to-r from-saffron via-white to-indiaGreen"></div>

        <Footer />
      </main>

      {/* ================= MODALS ================= */}

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedGalleryIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            onClick={() => setSelectedGalleryIndex(null)}
            role="dialog"
            aria-modal="true"
          >
            <button
              data-gallery-focus
              ref={modalFirstRef}
              type="button"
              className="absolute top-4 right-4 z-20 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors focus:ring-2 focus:ring-white focus:outline-none"
              onClick={() => setSelectedGalleryIndex(null)}
            >
              <X size={28} className="md:w-8 md:h-8" />
            </button>

            <button
              data-gallery-focus
              type="button"
              className="absolute left-4 z-20 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors hidden sm:block focus:ring-2 focus:ring-white focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
            >
              <ChevronLeft size={48} />
            </button>

            <button
              data-gallery-focus
              type="button"
              className="absolute right-4 z-20 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors hidden sm:block focus:ring-2 focus:ring-white focus:outline-none"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
            >
              <ChevronRight size={48} />
            </button>

            <div
              className="relative w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                key={selectedGalleryIndex}
                src={standardGalleryItems[selectedGalleryIndex].imageUrl}
                alt="gallery"
                className="max-w-full max-h-[70vh] md:max-h-[85vh] object-contain shadow-2xl rounded-sm border-2 md:border-4 border-white"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Mobile Controls (Larger touch targets) */}
            <div
              className="absolute bottom-8 left-0 w-full flex justify-center gap-12 sm:hidden z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-gallery-focus
                ref={modalLastRef}
                type="button"
                onClick={handlePrevImage}
                className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white active:bg-white/30"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                data-gallery-focus
                type="button"
                onClick={handleNextImage}
                className="bg-white/20 backdrop-blur-md p-4 rounded-full text-white active:bg-white/30"
              >
                <ChevronRight size={28} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedActivity && (
        <ActivityModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
      {selectedNews && (
        <NewsModal news={selectedNews} onClose={() => setSelectedNews(null)} />
      )}
    </div>
  );
};

export default PublicHome;
