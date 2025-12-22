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
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import ExecutiveLeadershipSection from './ExecutiveLeadershipSection'; // Import the new executive leadership section
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
} from 'lucide-react';

// Polished PublicHome with micro-interactions, framer-motion entrances,
// enhanced hover states, focus-visible outlines, lightweight skeletons
// and improved visual affordances. Frontend-only changes; no backend.

const transition = { duration: 0.5, ease: 'easeOut' };

const PublicHome: React.FC = () => {
  const { news, activities, galleryItems, loading, stateLeaders } = useData();
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
    message: '',
    url: '',
  });
  const [formErrors, setFormErrors] = useState<{
    name?: string;
    email?: string;
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
  const aboutImage = useMemo(
    () => galleryItems.find((item) => item.tag === 'about'),
    [galleryItems]
  );
  const standardGalleryItems = useMemo(
    () => galleryItems.filter((item) => !item.tag || item.tag === 'gallery'),
    [galleryItems]
  );

  // Hero auto-advance
  const heroIntervalRef = useRef<number | null>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroPlaying, setHeroPlaying] = useState(true);

  useEffect(() => {
    if (heroImages.length === 0) return;
    if (prefersReducedMotion.current) return;

    const advance = () =>
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);

    if (!heroPaused && heroPlaying) {
      heroIntervalRef.current = window.setInterval(advance, 5000);
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

  // Gallery keyboard
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

  // Contact form validation
  const validateForm = () => {
    const errors: typeof formErrors = {};
    if (!contactForm.name.trim()) errors.name = 'Please enter your name.';
    if (!contactForm.email.trim()) errors.email = 'Please enter your email.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email))
      errors.email = 'Enter a valid email.';
    if (!contactForm.message.trim()) errors.message = 'Please enter a message.';
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
      setContactForm({ name: '', email: '', message: '', url: '' });
      liveRegionRef.current?.focus();
      setTimeout(() => setContactSent(false), 4000);
    }, 900);
  };

  const buildSrcSet = (item?: GalleryItem) => {
    if (!item) return undefined;
    const sizes = (item as any).sizes;
    if (sizes && typeof sizes === 'object') {
      return Object.entries(sizes)
        .map(([w, url]) => `${url} ${w}w`)
        .join(', ');
    }
    return undefined;
  };

  const nameId = useId();
  const emailId = useId();
  const msgId = useId();

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
      // Each card is w-96 (24rem = 384px) and gap is gap-8 (2rem = 32px)
      const itemWidth = 384 + 32;
      const totalWidth = itemWidth * news.length;

      newsControls.start({
        x: [0, -totalWidth],
        transition: {
          ease: 'linear',
          duration: news.length * 7, // Adjust duration for speed
          repeat: Infinity,
          repeatType: 'loop',
        },
      });
    }
  }, [isHoveringNews, news.length, newsControls, prefersReducedMotion]);

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-saffron animate-spin mx-auto mb-4" />
          <p className="text-indiaGreen font-bold">
            Loading IYC Karnataka Portal...
          </p>
          <div className="mt-6 grid gap-3">
            <div className="h-4 w-64 bg-gray-200 rounded animate-pulse mx-auto" />
            <div className="h-4 w-48 bg-gray-200 rounded animate-pulse mx-auto" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:bg-white focus:p-2 focus:rounded"
      >
        Skip to content
      </a>

      <Navbar />

      <main id="main" className="pt-34">
        {/* Hero */}
        <section
          id="home"
          className="relative h-screen flex items-center justify-center bg-gray-900 overflow-hidden pt-24 md:pt-40"
        >
          <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
            {heroImages.length > 0 ? (
              heroImages.map((img, index) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: index === currentHeroIndex ? 0.45 : 0 }}
                  transition={{ duration: 0.8 }}
                  className={`absolute inset-0 transition-opacity duration-1000 ease-in-out`}
                  aria-hidden={index !== currentHeroIndex}
                >
                  <picture>
                    {/* @ts-ignore */}
                    {img.avifUrl ? (
                      <source srcSet={img.avifUrl} type="image/avif" />
                    ) : null}
                    {/* @ts-ignore */}
                    {img.webpUrl ? (
                      <source srcSet={img.webpUrl} type="image/webp" />
                    ) : null}
                    <img
                      src={img.imageUrl}
                      alt={img.alt || `Hero Background ${index + 1}`}
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter saturate-110"
                      // @ts-ignore
                      srcSet={buildSrcSet(img)}
                    />
                  </picture>
                </motion.div>
              ))
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900" />
            )}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/40 to-gray-900"></div>
          </div>

          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...transition, delay: 0.15 }}
              className="inline-block bg-white/10 backdrop-blur-md px-6 py-2 rounded-full text-sm font-bold tracking-widest uppercase mb-4 border border-white/20 shadow-sm"
            >
              <span className="bg-gradient-to-r from-orange-500 via-white to-green-500 bg-clip-text text-transparent drop-shadow-sm filter">
                Indian Youth Congress
              </span>
            </motion.div>

            <motion.h1
              initial={{ scale: 0.98, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ ...transition, delay: 0.25 }}
              className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight drop-shadow-md"
            >
              IYC <span className="text-saffron">Karnataka</span>
              <br />
              <span className="text-3xl md:text-5xl text-gray-200 mt-2 block">
                Social Media
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ ...transition, delay: 0.35 }}
              className="text-lg md:text-xl text-gray-300 mb-8 font-light max-w-2xl mx-auto"
            >
              The digital frontline of Karnataka's youth. We fight propaganda
              with truth, empower voices, and drive the narrative for a
              progressive India.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ ...transition, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              {/*<a
                href="#join"
                className="px-8 py-3 bg-saffron text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-saffron/30 transform hover:-translate-y-1 hover:scale-102 focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center gap-2"
                aria-label="Join Digital Army"
              >
                <Share2 size={20} />
                Join Digital Army
              </a>*/}
              <a
                href="#leadership"
                className="px-8 py-3 bg-white text-indiaGreen rounded-full font-bold text-lg hover:bg-gray-100 transition-all shadow-lg transform hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                aria-label="View Leadership"
              >
                View Leadership
              </a>
            </motion.div>

            {/* hero controls */}
            {heroImages.length > 1 ? (
              <div
                className="mt-6 flex items-center justify-center gap-4"
                aria-hidden={prefersReducedMotion.current}
              >
                {/*<motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setHeroPlaying((p) => !p)}
                  aria-pressed={!heroPlaying}
                  aria-label={
                    heroPlaying ? 'Pause hero rotation' : 'Play hero rotation'
                  }
                  className="bg-white/10 backdrop-blur px-3 py-2 rounded-full flex items-center gap-2 text-white"
                >
                  {heroPlaying ? <Pause size={16} /> : <Play size={16} />}
                  <span className="sr-only">
                    {heroPlaying ? 'Pause' : 'Play'}
                  </span>
                </motion.button>*/}

                <div
                  className="flex items-center gap-2"
                  role="tablist"
                  aria-label="Hero slides"
                >
                  {heroImages.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => goToHeroIndex(i)}
                      aria-selected={i === currentHeroIndex}
                      role="tab"
                      className={`w-3 h-3 rounded-full ${
                        i === currentHeroIndex ? 'bg-white' : 'bg-white/30'
                      } focus:outline-none focus-visible:ring-2 focus-visible:ring-white`}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              </div>
            ) : null}
          </div>

          <div
            className="absolute inset-0"
            onMouseEnter={() => setHeroPaused(true)}
            onMouseLeave={() => setHeroPaused(false)}
            aria-hidden
          />
        </section>

        {/* About */}
        <section
          id="about-preview"
          className="py-20 bg-white scroll-mt-24 border-b border-gray-200 flex rounded-lg border shadow-sm"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              {/* Text */}
              <div>
                <span className="text-sm font-bold tracking-widest text-saffron uppercase">
                  About Us
                </span>

                <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-indiaGreen leading-tight">
                  Voice of Young India
                </h2>

                <p className="mt-6 text-lg text-gray-700 leading-relaxed">
                  Indian Youth Congress is the youth wing of the Indian National
                  Congress, committed to nurturing young leadership, defending
                  constitutional values, and empowering the youth to actively
                  participate in nation-building.
                </p>

                <p className="mt-4 text-gray-600 leading-relaxed">
                  From grassroots movements to digital advocacy, IYC stands at
                  the forefront of social justice, democracy, and inclusive
                  development — led by the energy, courage, and ideas of India’s
                  youth.
                </p>

                <div className="mt-8">
                  <Link
                    to="/about-iyc"
                    className="inline-flex items-center px-8 py-3 bg-saffron text-white rounded-full font-bold text-lg shadow-lg hover:bg-orange-600 hover:-translate-y-1 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  >
                    Know More
                    <ArrowRight className="ml-3 w-5 h-5" />
                  </Link>
                </div>
              </div>

              {/* Visual / Accent */}
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="absolute inset-0 bg-gradient-to-tr from-saffron/20 via-white to-indiaGreen/20 rounded-2xl blur-2xl" />
                <div className="relative bg-gray-50 p-10 rounded-2xl shadow-xl border-l-8 border-saffron">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    Why Indian Youth Congress?
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-saffron rounded-full" />
                      Platform for young leaders and changemakers
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-saffron rounded-full" />
                      Commitment to democracy & constitutional values
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="w-2 h-2 mt-2 bg-saffron rounded-full" />
                      Active participation in social & political movements
                    </li>
                  </ul>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Executive Leadership Section */}
        <ExecutiveLeadershipSection />

        {/* Detailed Leadership Profiles */}
        <section
          id="leadership-profiles"
          className="py-20 bg-gray-50 border-t border-gray-200"
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-indiaGreen uppercase tracking-wide">
                State Leadership
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-saffron via-white to-indiaGreen mx-auto mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {stateLeaders.map((leader) => (
                <article
                  key={leader.id}
                  className="bg-white rounded-2xl shadow-lg p-8 border-l-8 border-saffron"
                >
                  <div className="flex items-start justify-between gap-6 mb-6">
                    {/* Left: Text */}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-800">
                        {leader.name}
                      </h3>
                      <p className="text-saffron font-semibold text-lg">
                        {leader.designation}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {leader.state}
                      </p>
                    </div>

                    {/* Right: Image */}
                    <img
                      src={leader.imageUrl}
                      alt={leader.name}
                      className="w-32 h-32 rounded-lg object-cover border-4 border-saffron flex-shrink-0"
                    />
                  </div>

                  <p className="text-gray-700 leading-relaxed line-clamp-3">
                    {leader.bio}
                  </p>

                  {leader.socialMedia && (
                    <div className="flex space-x-4 mt-4">
                      {leader.socialMedia.twitter && (
                        <a
                          href={leader.socialMedia.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-400 transition-colors"
                        >
                          <FaTwitter size={20} />
                        </a>
                      )}
                      {leader.socialMedia.facebook && (
                        <a
                          href={leader.socialMedia.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-blue-600 transition-colors"
                        >
                          <FaFacebookF size={20} />
                        </a>
                      )}
                      {leader.socialMedia.instagram && (
                        <a
                          href={leader.socialMedia.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-pink-500 transition-colors"
                        >
                          <FaInstagram size={20} />
                        </a>
                      )}
                      {leader.socialMedia.youtube && (
                        <a
                          href={leader.socialMedia.youtube}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <FaYoutube size={20} />
                        </a>
                      )}
                    </div>
                  )}

                  <div className="mt-8">
                    <Link
                      to={`/state-leader/${leader.id}`}
                      className="inline-flex items-center font-semibold text-saffron hover:text-orange-600 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                    >
                      Read More
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Activities */}
        <section id="activities" className="py-20 bg-white scroll-mt-24">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-indiaGreen uppercase tracking-wide">
                <span>Movements</span>
                <span className="block h-1 w-20 bg-saffron mt-2"></span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-saffron via-white to-indiaGreen mx-auto mt-4 rounded-full"></div>
            </div>

            <div className="space-y-12">
              {(activities || []).slice(0, 3).map((activity, index) => (
                <motion.article
                  key={activity.id}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ ...transition, delay: index * 0.06 }}
                  viewport={{ once: true }}
                  className={`flex flex-col ${
                    index % 2 === 1 ? 'md:flex-row-reverse' : 'md:flex-row'
                  } gap-8 items-center`}
                  aria-labelledby={`activity-${activity.id}`}
                >
                  <div className="w-full md:w-1/2">
                    <div className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow">
                      <img
                        src={activity.imageUrl}
                        alt={activity.title}
                        loading="lazy"
                        className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-indiaGreen shadow-sm">
                        {activity.type}
                      </div>
                    </div>
                  </div>

                  <div className="w-full md:w-1/2 space-y-4">
                    <div className="flex items-center gap-2 text-saffron font-bold text-sm">
                      <span>{activity.date}</span>
                      <span className="w-1 h-1 bg-gray-400 rounded-full" />
                      <span>{activity.location}</span>
                    </div>
                    <h3
                      id={`activity-${activity.id}`}
                      className="text-2xl font-bold text-gray-800"
                    >
                      {activity.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {activity.description}
                    </p>
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => setSelectedActivity(activity)}
                        className="flex items-center text-indiaGreen font-semibold hover:text-saffron transition-colors group focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                        aria-label={`Open details for ${activity.title}`}
                      >
                        View Campaign{' '}
                        <ArrowRight
                          size={16}
                          className="ml-2 group-hover:translate-x-1 transition-transform"
                        />
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
                              ?.writeText(window.location.href)
                              .then(() => alert('Link copied'));
                        }}
                        className="px-3 py-1 bg-orange-50 rounded-full text-saffron text-sm font-semibold"
                        aria-label={`Share ${activity.title}`}
                      >
                        <Share2 size={14} />
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
            {(activities || []).length > 3 && (
              <div className="text-center mt-12">
                <Link
                  to="/activities"
                  className="inline-block px-8 py-3 bg-saffron text-white rounded-full font-bold text-lg hover:bg-orange-600 transition-all shadow-lg hover:shadow-saffron/30 transform hover:-translate-y-1 hover:scale-102 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  More Movement
                </Link>
              </div>
            )}
          </div>
        </section>

        <VideoSection />

        {/* Gallery */}
        <section id="gallery" className="py-20 bg-white scroll-mt-24">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-indiaGreen uppercase tracking-wide">
                Gallery
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-saffron via-white to-indiaGreen mx-auto mt-4 rounded-full"></div>
            </div>

            {standardGalleryItems.length === 0 ? (
              <div className="grid place-items-center py-20">
                <p className="text-gray-500">No gallery items yet.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 auto-rows-fr grid-flow-dense">
                {standardGalleryItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedGalleryIndex(index)}
                    className={`relative group overflow-hidden rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-saffron transform transition-transform hover:scale-103`}
                    aria-label={`Open gallery image ${index + 1}`}
                  >
                    <div className="aspect-[4/3] w-full bg-gray-100">
                      <img
                        src={item.thumbnailUrl || item.imageUrl}
                        alt={item.alt || `Gallery image ${index + 1}`}
                        loading="lazy"
                        className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="bg-white/90 text-indiaGreen text-xs font-bold px-3 py-1 rounded-full shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform">
                        View
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* News */}
        <section className="py-20 bg-gray-50">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-bold text-indiaGreen uppercase tracking-wide">
                  Press & Updates
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-saffron via-white to-indiaGreen mt-4 rounded-full"></div>
              </div>
              <span className="hidden sm:inline-block text-saffron font-bold">
                Latest Updates
              </span>
            </div>

            <div
              className="overflow-hidden w-full"
              onMouseEnter={() => setIsHoveringNews(true)}
              onMouseLeave={() => setIsHoveringNews(false)}
            >
              {news.length > 3 ? (
                <motion.div className="flex gap-8" animate={newsControls}>
                  {[...news, ...news].map((n, idx) => (
                    <div key={`${n.id}-${idx}`} className="w-96 flex-shrink-0">
                      <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={n.imageUrl}
                            alt={n.title}
                            loading="lazy"
                            className="w-full h-full object-cover transform transition-transform hover:scale-105"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <span className="text-xs font-bold text-gray-400 mb-2 block">
                            {n.date}
                          </span>
                          <h3 className="text-xl font-bold text-indiaGreen mb-3 line-clamp-2">
                            {n.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                            {n.description}
                          </p>
                          <div className="flex gap-2 items-center mt-auto">
                            <button
                              onClick={() => setSelectedNews(n)}
                              className="text-saffron font-semibold text-sm hover:text-orange-600 flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                            >
                              Read Full Story <FileText size={14} />
                            </button>

                            <div className="ml-auto flex gap-2 items-center">
                              <button
                                onClick={() => {
                                  if ((navigator as any).share) {
                                    (navigator as any)
                                      .share({
                                        title: n.title,
                                        text: n.description,
                                        url: window.location.href,
                                      })
                                      .catch(() => undefined);
                                  } else {
                                    navigator.clipboard
                                      ?.writeText(window.location.href)
                                      .then(() =>
                                        alert('Link copied to clipboard')
                                      );
                                  }
                                }}
                                className="px-2 py-1 rounded-full bg-orange-50 text-saffron text-xs"
                              >
                                <Share2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {news.map((n, idx) => (
                    <motion.article
                      key={n.id}
                      initial={{ opacity: 0, y: 8 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ ...transition, delay: idx * 0.04 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col h-full"
                      aria-labelledby={`news-${n.id}`}
                    >
                      <div className="h-48 overflow-hidden">
                        <img
                          src={n.imageUrl}
                          alt={n.title}
                          loading="lazy"
                          className="w-full h-full object-cover transform transition-transform hover:scale-105"
                        />
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <span className="text-xs font-bold text-gray-400 mb-2 block">
                          {n.date}
                        </span>
                        <h3
                          id={`news-${n.id}`}
                          className="text-xl font-bold text-indiaGreen mb-3 line-clamp-2"
                        >
                          {n.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                          {n.description}
                        </p>
                        <div className="flex gap-2 items-center mt-auto">
                          <button
                            onClick={() => setSelectedNews(n)}
                            className="text-saffron font-semibold text-sm hover:text-orange-600 flex items-center gap-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-saffron"
                            aria-label={`Read full story: ${n.title}`}
                          >
                            Read Full Story <FileText size={14} />
                          </button>

                          <div className="ml-auto flex gap-2 items-center">
                            <button
                              onClick={() => {
                                if ((navigator as any).share) {
                                  (navigator as any)
                                    .share({
                                      title: n.title,
                                      text: n.description,
                                      url: window.location.href,
                                    })
                                    .catch(() => undefined);
                                } else {
                                  navigator.clipboard
                                    ?.writeText(window.location.href)
                                    .then(() =>
                                      alert('Link copied to clipboard')
                                    );
                                }
                              }}
                              className="px-2 py-1 rounded-full bg-orange-50 text-saffron text-xs"
                              aria-label={`Share ${n.title}`}
                            >
                              <Share2 size={14} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>

        <Footer />
      </main>

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
            aria-label={`Image ${selectedGalleryIndex + 1} of ${
              standardGalleryItems.length
            }`}
          >
            <button
              data-gallery-focus
              ref={modalFirstRef}
              type="button"
              className="absolute top-4 right-4 z-20 text-white/70 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors"
              onClick={() => setSelectedGalleryIndex(null)}
              aria-label="Close image viewer"
            >
              <X size={32} />
            </button>

            <button
              data-gallery-focus
              type="button"
              className="absolute left-4 z-20 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors hidden sm:block"
              onClick={(e) => {
                e.stopPropagation();
                handlePrevImage();
              }}
              aria-label="Previous image"
            >
              <ChevronLeft size={48} />
            </button>

            <button
              data-gallery-focus
              type="button"
              className="absolute right-4 z-20 text-white/70 hover:text-white p-3 rounded-full hover:bg-white/10 transition-colors hidden sm:block"
              onClick={(e) => {
                e.stopPropagation();
                handleNextImage();
              }}
              aria-label="Next image"
            >
              <ChevronRight size={48} />
            </button>

            <div
              className="relative w-full h-full max-w-7xl max-h-screen p-4 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.img
                src={standardGalleryItems[selectedGalleryIndex].imageUrl}
                alt={
                  standardGalleryItems[selectedGalleryIndex].alt ||
                  `Gallery image ${selectedGalleryIndex + 1}`
                }
                className="max-w-full max-h-[85vh] object-contain shadow-2xl rounded-sm"
                initial={{ scale: 0.98 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.35 }}
              />
            </div>

            <div
              className="absolute bottom-8 left-0 w-full flex justify-center gap-12 sm:hidden z-20"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-gallery-focus
                ref={modalLastRef}
                type="button"
                onClick={handlePrevImage}
                className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white active:bg-white/20"
                aria-label="Previous"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                data-gallery-focus
                type="button"
                onClick={handleNextImage}
                className="bg-white/10 backdrop-blur-md p-4 rounded-full text-white active:bg-white/20"
                aria-label="Next"
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
