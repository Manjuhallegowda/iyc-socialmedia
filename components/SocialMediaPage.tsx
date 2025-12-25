import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useData } from '../context/DataContext';
import {
  FaFacebookF,
  FaInstagram,
  FaHandPaper, // Changed to HandPaper (Palm) which resembles the INC symbol
  FaWhatsapp,
} from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import {
  Loader2,
  MapPin,
  Users,
  ChevronRight,
  Target,
  Megaphone,
  TrendingUp,
  Award,
} from 'lucide-react';

// --- Components ---

const SectionHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) => (
  <div className="mb-12 text-center">
    <div className="inline-flex items-center gap-2 px-3 py-1 mb-3 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest border border-orange-200">
      <span className="w-2 h-2 rounded-full bg-orange-600 animate-pulse"></span>
      IYC Karnataka
    </div>
    <h2 className="text-3xl md:text-4xl font-black text-gray-900 uppercase tracking-tight mb-3">
      {title}
    </h2>
    {subtitle && (
      <div className="w-24 h-1 mx-auto bg-gradient-to-r from-orange-500 via-white to-green-600 rounded-full border border-gray-100"></div>
    )}
  </div>
);

const SocialMediaPage: React.FC = () => {
  const { socialMediaTeam, loading } = useData();

  // Updated stats with icons that fit a political narrative
  const networkStats = [
    {
      platform: 'Connect',
      count: 'Official',
      label: 'Instagram',
      icon: FaInstagram,
      color: 'text-pink-600',
      bg: 'bg-pink-50',
      border: 'border-pink-500',
    },
    {
      platform: 'Community',
      count: 'Network',
      label: 'Facebook',
      icon: FaFacebookF,
      color: 'text-blue-700',
      bg: 'bg-blue-50',
      border: 'border-blue-600',
    },
    {
      platform: 'Voice',
      count: 'Real-time',
      label: 'Twitter (X)',
      icon: FaXTwitter,
      color: 'text-slate-800',
      bg: 'bg-slate-100',
      border: 'border-slate-800',
    },
    {
      platform: 'Ideology',
      count: 'Congress',
      label: 'Ideology',
      icon: FaHandPaper, // Symbol of the party
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-600',
    },
  ];

  if (loading) {
    return (
      <div className="h-screen w-full flex flex-col items-center justify-center bg-white gap-4">
        <Loader2 className="w-10 h-10 text-orange-500 animate-spin" />
        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest">
          Loading IYC Network...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900">
      <Navbar />

      <main className="pt-20">
        {/* --- HERO SECTION --- */}
        <section
          className="relative text-white overflow-hidden py-24 md:py-32"
          style={{
            backgroundImage: 'url(/assets/social.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/50"></div>

          <div className="container relative mx-auto px-4 flex flex-col items-center text-center">
            <span className="mb-6 inline-block px-4 py-1.5 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm text-sm font-bold uppercase tracking-[0.2em] text-orange-400">
              Indian Youth Congress
            </span>
            <h1
              className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight text-indigo-700"
              style={{
                textShadow: `
      -2px -2px 0 #ffffff,
       2px -2px 0 #ffffff,
      -2px  2px 0 #ffffff,
       2px  2px 0 #ffffff
    `,
              }}
            >
              The Digital Voice of Young India
            </h1>
            <p className="max-w-2xl text-lg md:text-xl text-slate-300 mb-10 leading-relaxed">
              Strengthening the organization from the booth level to the
              national stage. Join the revolution of truth, service, and
              progress.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button className="px-8 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg shadow-lg shadow-orange-900/20 transition-all transform hover:-translate-y-1 uppercase tracking-wider text-sm flex items-center justify-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center">
                  <FaWhatsapp size={20} />
                </span>
                Join WhatsApp Group
              </button>
              <Link
                to="/gallery"
                className="px-8 py-4 bg-white text-slate-900 hover:bg-slate-100 font-bold rounded-lg shadow-lg transition-all uppercase tracking-wider text-sm"
              >
                View Gallery
              </Link>
            </div>
          </div>

          {/* Tricolor Strip at bottom of Hero */}
          <div className="h-2 w-full flex absolute bottom-0 left-0 right-0">
            <div className="h-full w-1/3 bg-orange-500"></div>
            <div className="h-full w-1/3 bg-white"></div>
            <div className="h-full w-1/3 bg-green-600"></div>
          </div>
        </section>

        {/* --- STATS / PLATFORMS GRID --- */}
        <section className="py-16 bg-white relative z-10 -mt-8 mx-4 md:mx-auto max-w-7xl rounded-xl shadow-2xl border-t border-gray-100">
          <div className="px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {networkStats.map((stat, idx) => (
                <Link
                  to={`/socials/${stat.label.toLowerCase()}`}
                  key={idx}
                  className="group relative p-6 bg-slate-50 rounded-xl hover:bg-white border border-slate-100 hover:border-orange-200 transition-all duration-300 hover:shadow-xl"
                >
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                    {stat.label}
                  </h3>
                  <p className="text-sm text-gray-500 font-medium uppercase tracking-wider">
                    {stat.count}
                  </p>
                  <div className="absolute bottom-0 left-0 w-0 h-1 bg-gradient-to-r from-orange-500 to-green-500 group-hover:w-full transition-all duration-500 rounded-b-xl"></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* --- TEAM SECTION --- */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <SectionHeader
              title="State Leadership"
              subtitle="The Torchbearers of Democracy"
            />

            {/* Empty State */}
            {socialMediaTeam.length === 0 && (
              <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
                <Users className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-slate-700">
                  Team Roster Updating
                </h3>
                <p className="text-slate-500">
                  District and Assembly lists are being synchronized.
                </p>
              </div>
            )}

            {/* Team Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {socialMediaTeam.map((member) => (
                <div
                  key={member.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-slate-100"
                >
                  {/* Card Header / Image */}
                  <div className="relative h-64 overflow-hidden bg-slate-200">
                    {member.imageUrl ? (
                      <img
                        src={member.imageUrl}
                        alt={member.name}
                        className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-slate-100">
                        <Users size={48} className="mb-2 opacity-50" />
                      </div>
                    )}

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent opacity-90"></div>

                    {/* Floating Info */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="inline-block px-2 py-0.5 bg-orange-600 text-white text-[10px] font-bold uppercase tracking-widest rounded mb-2">
                        {member.level}
                      </div>
                      <h3 className="text-xl font-bold text-white leading-tight mb-1">
                        {member.name}
                      </h3>
                      <p className="text-slate-300 text-xs font-medium uppercase tracking-wider flex items-center gap-1">
                        <Award className="w-3 h-3 text-orange-400" />
                        {member.position || 'Active Leader'}
                      </p>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
                      <div className="flex items-center text-slate-600">
                        <MapPin className="w-4 h-4 mr-2 text-orange-500" />
                        <span className="text-sm font-semibold">
                          {member.placeName}
                        </span>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-blue-800">
                        <FaHandPaper size={14} />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <SocialButton
                        href={member.socialMedia.facebook}
                        icon={FaFacebookF}
                        color="hover:bg-blue-600"
                      />
                      <SocialButton
                        href={member.socialMedia.twitter}
                        icon={FaXTwitter}
                        color="hover:bg-slate-900"
                      />
                      <SocialButton
                        href={member.socialMedia.instagram}
                        icon={FaInstagram}
                        color="hover:bg-pink-600"
                      />
                    </div>
                  </div>

                  {/* Subtle Tricolor Bottom Border */}
                  <div className="h-1 w-full bg-gradient-to-r from-orange-500 via-white to-green-600"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MISSION / CTA SECTION --- */}
        <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
              backgroundSize: '30px 30px',
            }}
          ></div>

          <div className="container mx-auto px-4 relative z-10 text-center">
            <Target className="w-16 h-16 text-orange-500 mx-auto mb-6" />
            <h2 className="text-3xl md:text-5xl font-black mb-6 uppercase tracking-tight">
              Are you ready to Lead?
            </h2>
            <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-10">
              The Indian Youth Congress is looking for dynamic individuals to
              drive the social media narrative in your district.
            </p>
            <Link
              to="/join"
              className="inline-flex items-center px-8 py-4 bg-white text-slate-900 font-bold rounded-lg hover:bg-orange-500 hover:text-white transition-all duration-300 shadow-lg shadow-white/10 uppercase tracking-widest text-sm"
            >
              Register as Volunteer <ChevronRight className="ml-2 w-4 h-4" />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

// Helper for Social Buttons to keep code clean
const SocialButton = ({
  href,
  icon: Icon,
  color,
}: {
  href?: string;
  icon: any;
  color: string;
}) => {
  if (!href)
    return (
      <div className="h-10 rounded bg-slate-50 flex items-center justify-center text-slate-300 cursor-not-allowed">
        <Icon />
      </div>
    );

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`h-10 rounded bg-slate-100 text-slate-500 flex items-center justify-center transition-all duration-300 ${color} hover:text-white`}
    >
      <Icon />
    </a>
  );
};

export default SocialMediaPage;
