import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import {
  ArrowLeft,
  ExternalLink,
  Shield,
  Users,
  MapPin,
  Grid,
  Check,
  Copy,
  Building2,
} from 'lucide-react';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

// --- TYPES ---
type SocialAccount = {
  name: string;
  handle: string;
  url: string;
  verified?: boolean;
};

type PlatformData = {
  'State Accounts': SocialAccount[];
  'District Accounts': SocialAccount[];
  'Assembly Accounts': SocialAccount[];
  'Block Accounts': SocialAccount[];
};

// --- DATA CONSTANTS ---
// Updated with sample IYC hierarchy data
const OFFICIAL_SOCIALS: Record<string, PlatformData> = {
  facebook: {
    'State Accounts': [
      {
        name: 'Indian Youth Congress',
        handle: 'iyc',
        url: 'https://www.facebook.com/iyc',
        verified: true,
      },
      {
        name: 'Karnataka Youth Congress',
        handle: 'kpycc',
        url: 'https://www.facebook.com/kpycc',
        verified: true,
      },
    ],
    'District Accounts': [
      {
        name: 'Bangalore Urban IYC',
        handle: 'iycbangalore',
        url: 'https://www.facebook.com/iycbangalore',
      },
      {
        name: 'Bellary District IYC',
        handle: 'iycbellary',
        url: 'https://www.facebook.com/iycbellary',
      },
    ],
    'Assembly Accounts': [
      {
        name: 'Bellary City Assembly',
        handle: 'iyc_bellarycity',
        url: 'https://facebook.com/iyc_bellarycity',
      },
    ],
    'Block Accounts': [],
  },
  instagram: {
    'State Accounts': [
      {
        name: 'Indian Youth Congress',
        handle: 'iyc',
        url: 'https://www.instagram.com/iyc',
        verified: true,
      },
      {
        name: 'Karnataka Youth Congress',
        handle: 'kpycc',
        url: 'https://www.instagram.com/kpycc',
        verified: true,
      },
    ],
    'District Accounts': [
      {
        name: 'Bangalore IYC',
        handle: 'iyc_bangalore',
        url: 'https://instagram.com/iyc_bangalore',
      },
    ],
    'Assembly Accounts': [],
    'Block Accounts': [],
  },
  twitter: {
    'State Accounts': [
      {
        name: 'Indian Youth Congress',
        handle: 'iyc',
        url: 'https://twitter.com/iyc',
        verified: true,
      },
      {
        name: 'Karnataka Youth Congress',
        handle: 'kpycc',
        url: 'https://twitter.com/kpycc',
        verified: true,
      },
      {
        name: 'BV Srinivas',
        handle: 'srinivasiyc',
        url: 'https://twitter.com/srinivasiyc',
        verified: true,
      },
    ],
    'District Accounts': [],
    'Assembly Accounts': [],
    'Block Accounts': [],
  },
};

const PLATFORM_DETAILS: Record<string, any> = {
  facebook: {
    icon: FaFacebookF,
    name: 'Facebook',
    themeColor: 'blue',
    gradient: 'from-blue-700 to-blue-900', // Darker blue for professional look
    softBg: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-100',
    shadow: 'shadow-blue-500/10',
  },
  instagram: {
    icon: FaInstagram,
    name: 'Instagram',
    themeColor: 'pink',
    gradient: 'from-fuchsia-700 to-rose-700',
    softBg: 'bg-rose-50',
    text: 'text-rose-600',
    border: 'border-rose-100',
    shadow: 'shadow-rose-500/10',
  },
  twitter: {
    icon: FaXTwitter,
    name: 'X (Twitter)',
    themeColor: 'gray',
    gradient: 'from-gray-800 to-black',
    softBg: 'bg-gray-50',
    text: 'text-gray-800',
    border: 'border-gray-200',
    shadow: 'shadow-gray-500/10',
  },
};

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

// --- SUB-COMPONENTS ---

// Helper for Icons based on organizational hierarchy
const CategoryIcon = ({ category }: { category: string }) => {
  if (category.includes('State')) return <Shield size={18} />;
  if (category.includes('District')) return <MapPin size={18} />;
  if (category.includes('Assembly')) return <Users size={18} />;
  if (category.includes('Block')) return <Building2 size={18} />;
  return <Grid size={18} />;
};

const CopyButton = ({
  text,
  colorClass,
}: {
  text: string;
  colorClass: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent opening the link
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
        copied ? 'text-green-600' : 'text-gray-400'
      }`}
      title="Copy Link"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
};

const OfficialSocialsPage: React.FC = () => {
  const { platform } = useParams<{ platform: string }>();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Validation
  const isValidPlatform =
    platform && OFFICIAL_SOCIALS[platform] && PLATFORM_DETAILS[platform];

  if (!isValidPlatform) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <div className="bg-white p-8 rounded-2xl shadow-xl text-center max-w-md w-full">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Grid size={32} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Platform not found
            </h1>
            <p className="text-gray-500 mb-6">
              The social media platform you are looking for is not listed in our
              directory.
            </p>
            <Link
              to="/social-media"
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-xl hover:bg-gray-800 transition-all w-full"
            >
              Return to Directory
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const currentPlatform = platform as keyof typeof OFFICIAL_SOCIALS;
  const accountsByCategory = OFFICIAL_SOCIALS[currentPlatform];
  const style = PLATFORM_DETAILS[currentPlatform];

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-gray-100">
      <Navbar />

      <main className="pt-28 pb-24 container mx-auto px-4 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Breadcrumb / Back */}
          <Link
            to="/social-media"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors mb-8"
          >
            <span className="p-1.5 rounded-full bg-gray-50 group-hover:bg-gray-100 transition-colors border border-gray-100">
              <ArrowLeft size={14} />
            </span>
            Back to Network
          </Link>

          {/* Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`relative overflow-hidden rounded-[2rem] p-8 md:p-10 mb-16 bg-gradient-to-br ${style.gradient} text-white shadow-xl`}
          >
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm border border-white/10 text-xs font-semibold tracking-wide uppercase mb-4">
                  Official IYC Directory
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-3 tracking-tight">
                  {style.name} Handles
                </h1>
                <p className="text-white/80 text-lg max-w-xl leading-relaxed">
                  Follow the official Indian Youth Congress accounts to stay
                  updated with our latest campaigns and activities.
                </p>
              </div>

              <div className="shrink-0 p-5 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 shadow-inner">
                {React.createElement(style.icon, {
                  size: 52,
                  className: 'text-white',
                })}
              </div>
            </div>

            {/* Background Decorations */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-64 h-64 rounded-full bg-black/10 blur-3xl" />
          </motion.div>

          {/* Content Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {Object.entries(accountsByCategory).map(([category, accounts]) => (
              <motion.div
                key={category}
                variants={itemVariants}
                className="relative"
              >
                {/* Section Header */}
                <div className="flex items-center gap-3 mb-8">
                  <span
                    className={`flex items-center justify-center w-10 h-10 rounded-xl ${style.softBg} ${style.text}`}
                  >
                    <CategoryIcon category={category} />
                  </span>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {category}
                    </h2>
                    <p className="text-sm text-gray-500">
                      Official verified sources
                    </p>
                  </div>
                  <span className="ml-auto text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">
                    {accounts.length}
                  </span>
                </div>

                {/* Accounts Cards */}
                {accounts.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                    {accounts.map((account) => (
                      <motion.div
                        key={account.handle}
                        whileHover={{ y: -4 }}
                        className={`group relative flex items-center justify-between p-1 bg-white rounded-2xl border ${style.border} hover:shadow-xl hover:${style.shadow} transition-all duration-300`}
                      >
                        {/* Clickable Area */}
                        <a
                          href={account.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-4 p-4 flex-grow"
                        >
                          <div
                            className={`w-14 h-14 rounded-full flex items-center justify-center ${style.softBg} ${style.text} group-hover:scale-105 transition-transform duration-300`}
                          >
                            {React.createElement(style.icon, { size: 24 })}
                          </div>

                          <div className="flex flex-col">
                            <div className="flex items-center gap-1.5">
                              <h3 className="font-bold text-gray-900 group-hover:text-black text-lg">
                                {account.name}
                              </h3>
                              {account.verified && (
                                <span
                                  className="text-blue-500"
                                  title="Verified Account"
                                >
                                  <svg
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4"
                                  >
                                    <path d="M12.5 2C12.5 2 12.5 2 12.5 2C12.5 2 12.4 2 12.4 2C9.8 2 8 4.1 8 6.4V7.5C8 9.1 7 10.5 5.2 11.2C4.1 11.6 4.1 13.1 5.2 13.5C7 14.1 8 15.6 8 17.1V18.2C8 20.6 9.8 22.7 12.4 22.7C12.4 22.7 12.5 22.7 12.5 22.7C12.5 22.7 12.5 22.7 12.5 22.7C15.2 22.7 17 20.6 17 18.2V17.1C17 15.6 18 14.1 19.8 13.5C20.9 13.1 20.9 11.6 19.8 11.2C18 10.5 17 9.1 17 7.5V6.4C17 4.1 15.2 2 12.5 2ZM10.5 16.5L7.5 13.5L8.9 12.1L10.5 13.7L15.6 8.6L17 10L10.5 16.5Z" />
                                  </svg>
                                </span>
                              )}
                            </div>
                            <p
                              className={`text-sm font-medium ${style.text} opacity-80`}
                            >
                              @{account.handle}
                            </p>
                          </div>
                        </a>

                        {/* Actions Area */}
                        <div className="flex flex-col items-center justify-center border-l border-gray-100 pl-2 pr-2 gap-1">
                          <CopyButton
                            text={account.url}
                            colorClass={style.text}
                          />
                          <a
                            href={account.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-300 hover:text-gray-600 transition-colors"
                          >
                            <ExternalLink size={16} />
                          </a>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  // Empty State for Category
                  <div className="flex flex-col items-center justify-center py-12 rounded-2xl border-2 border-dashed border-gray-100 bg-gray-50/30">
                    <div className="p-3 bg-gray-100 rounded-full text-gray-300 mb-3">
                      <CategoryIcon category={category} />
                    </div>
                    <p className="text-gray-500 font-medium">
                      No {category} listed yet
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Check back soon for updates
                    </p>
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OfficialSocialsPage;
