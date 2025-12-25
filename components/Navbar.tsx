import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredDropdown, setHoveredDropdown] = useState<string | null>(null);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState<string | null>(
    null
  );

  const location = useLocation();
  const [active, setActive] = useState<string>(
    location.pathname + location.hash
  );

  // Handle Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const prominentLeaders = [
    {
      name: 'D.K. Shivakumar',
      role1: 'KPCC President',
      role2: 'Deputy CM',
      img: 'https://ipcmedia.in/public/uploads/profile/1756048100_12.jpg',
      href: '/dk-shivakumar-profile',
    },
    {
      name: 'Siddaramaiah',
      role1: 'Chief Minister',
      role2: 'Karnataka',
      img: 'https://www.coorgnews.in/wp-content/uploads/2024/08/siddaramaiah-photo.jpg',
      href: '/siddaramaiah-profile',
    },
    {
      name: 'Manjunath Gowda',
      role1: 'State President',
      role2: 'IYC Karnataka',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLW4RHRvfmWY9Nw9cebeqJfH0954kKP7Xv6w&s',
      href: '/hsmanjunatha',
    },
  ];

  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    {
      name: 'Leadership',
      dropdown: [
        { name: 'Office Bearers', href: '/team' },
        { name: 'Legal Team', href: '/legal' },
        { name: 'Media & Communication', href: '/social-media' },
      ],
    },
    { name: 'Activities', href: '/#activities' },
    { name: 'Videos', href: '/#videos' },
    { name: 'Gallery', href: '/gallery' },
  ];

  const handleNavClick = (href: string) => {
    setActive(href);
    setIsOpen(false);
    setMobileDropdownOpen(null);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-t-4 border-orange-500
        ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-lg py-2'
            : 'bg-white py-4 shadow-sm'
        }`}
      >
        <div className="w-full px-0 flex items-center justify-between ml-2">
          {/* ================= LOGO SECTION ================= */}
          <Link
            to="/"
            onClick={() => setActive('/#home')}
            className="flex items-center gap-1 group"
          >
            <div className="relative">
              <img
                src="/assets/IYC_Logo.png"
                alt="IYC Logo"
                className={`transition-all duration-300 ${
                  isScrolled ? 'h-12' : 'h-16'
                }`}
              />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-3xl leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#FF9933] to-[#138808]">
                IYC Karnataka
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-1">
                Social Media
              </span>
            </div>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          {/* Hidden on smaller screens, visible on XL screens */}
          <div className="hidden xl:flex flex-1 justify-center">
            <div className="flex items-center bg-slate-50 rounded-full px-2 py-1.5 border border-slate-200 shadow-inner">
              {navLinks.map((link) => (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    link.dropdown && setHoveredDropdown(link.name)
                  }
                  onMouseLeave={() => link.dropdown && setHoveredDropdown(null)}
                >
                  {link.dropdown ? (
                    <button
                      className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide flex items-center gap-1 transition-all
                      ${
                        hoveredDropdown === link.name
                          ? 'bg-white text-orange-600 shadow-sm'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      {link.name} <ChevronDown size={14} />
                    </button>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wide transition-all
                      ${
                        active === link.href
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900'
                      }`}
                    >
                      {link.name}
                    </a>
                  )}

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {link.dropdown && hoveredDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2"
                      >
                        {link.dropdown.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => handleNavClick(item.href)}
                            className="block px-5 py-3 text-sm font-semibold text-slate-600 hover:text-orange-600 hover:bg-orange-50 transition-colors border-l-2 border-transparent hover:border-orange-500"
                          >
                            {item.name}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* ================= LEADERS STRIP ================= */}
          <div className="hidden md:flex items-center gap-4 mr-6">
            {prominentLeaders.map((leader) => (
              <Link
                key={leader.name}
                to={leader.href}
                className="flex items-center gap-3 group"
              >
                <img
                  src={leader.img}
                  alt={leader.name}
                  className="w-11 h-11 rounded-full border-2 border-transparent group-hover:border-orange-500 transition-all object-cover shadow-sm bg-gray-200"
                />
                {/* Changed hidden 2xl:block to hidden lg:block so it shows on laptops */}
                <div className="hidden lg:block leading-tight text-left">
                  <div className="text-sm font-bold text-slate-900 group-hover:text-orange-600 transition-colors">
                    {leader.name}
                  </div>
                  <div className="text-[11px] font-semibold text-gray-500">
                    {leader.role1}
                  </div>
                  <div className="text-[10px] text-gray-400 font-medium">
                    {leader.role2}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* ================= MOBILE MENU BUTTON ================= */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* ================= MOBILE MENU OVERLAY ================= */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-40 bg-white pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <div key={link.name} className="border-b border-slate-100 pb-2">
                  {link.dropdown ? (
                    <div>
                      <button
                        onClick={() =>
                          setMobileDropdownOpen(
                            mobileDropdownOpen === link.name ? null : link.name
                          )
                        }
                        className="flex items-center justify-between w-full text-lg font-bold text-slate-900 py-2"
                      >
                        {link.name}
                        <ChevronDown
                          className={`transform transition-transform ${
                            mobileDropdownOpen === link.name ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      <AnimatePresence>
                        {mobileDropdownOpen === link.name && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pl-4 space-y-3 pb-2"
                          >
                            {link.dropdown.map((subItem) => (
                              <Link
                                key={subItem.name}
                                to={subItem.href}
                                onClick={() => handleNavClick(subItem.href)}
                                className="block text-slate-500 font-medium hover:text-orange-600"
                              >
                                {subItem.name}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="block text-lg font-bold text-slate-900 py-2"
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}

              <div className="pt-6">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">
                  Leadership
                </p>
                <div className="flex flex-col gap-4">
                  {prominentLeaders.map((leader, i) => (
                    <Link
                      key={i}
                      to={leader.href}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={leader.img}
                        alt={leader.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-slate-100"
                      />
                      <div>
                        <div className="font-bold text-slate-900 text-sm">
                          {leader.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {leader.role1}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
