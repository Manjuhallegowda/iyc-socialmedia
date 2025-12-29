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
  const [openInnerDropdown, setOpenInnerDropdown] = useState<string | null>(
    null
  );

  const location = useLocation();
  const [active, setActive] = useState<string>(
    location.pathname + location.hash
  );

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      img: 'https://scontent.fblr24-1.fna.fbcdn.net/v/t39.30808-6/476459119_1202341457927670_5557239319869858832_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=ivaj2SUXuhwQ7kNvwHIk9n3&_nc_oc=AdlYiF0gGQgmDyqOw_pCC23HrNN9JbE_zcUeRx_Kv33kW6FkPtyAMxrJnTX0oG6rN_FtVddhaTQDsB_xWdybbfKl&_nc_zt=23&_nc_ht=scontent.fblr24-1.fna&_nc_gid=MhnTjQuLkuzRp5TtuE_G_g&oh=00_Afn7K6yakChTZlLkdBp9j-wNDr2So0gs4R49cgC7guISew&oe=6954751D',
      href: '/hsmanjunatha',
    },
  ];

  // ⭐ Nested navigation structure
  const navLinks = [
    { name: 'Home', href: '/#home' },
    { name: 'About', href: '/#about' },
    {
      name: 'Leadership',
      dropdown: [
        {
          name: 'Office Bearers',
          children: [
            { name: 'KPYCC State Bearers', href: '/team' },
            { name: 'Social Media Bearers', href: '/sm-bearers' },
          ],
        },
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

  const isActive = (href?: string) => active === href;

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
          {/* LOGO */}
          <Link
            to="/"
            onClick={() => setActive('/#home')}
            className="flex items-center gap-1 group"
          >
            <img
              src="/assets/IYC_Logo.png"
              alt="IYC Logo"
              className={`transition-all duration-300 ${
                isScrolled ? 'h-12' : 'h-16'
              }`}
            />
            <div className="flex flex-col">
              <span className="font-bold text-2xl md:text-3xl bg-gradient-to-r from-[#FF9933] to-[#138808] bg-clip-text text-transparent">
                IYC Karnataka
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-gray-500 uppercase mt-1">
                Social Media
              </span>
            </div>
          </Link>

          {/* DESKTOP NAV */}
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
                      className={`px-5 py-2 rounded-full text-xs font-bold uppercase transition-all
                      ${
                        isActive(link.href)
                          ? 'bg-orange-500 text-white shadow-md'
                          : 'text-slate-600 hover:bg-white hover:shadow-sm hover:text-slate-900'
                      }`}
                    >
                      {link.name}
                    </a>
                  )}

                  {/* ⭐ Nested Desktop Dropdown */}
                  <AnimatePresence>
                    {link.dropdown && hoveredDropdown === link.name && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden py-2"
                      >
                        {link.dropdown.map((item) =>
                          item.children ? (
                            <div key={item.name}>
                              <div
                                onClick={() =>
                                  setOpenInnerDropdown(
                                    openInnerDropdown === item.name
                                      ? null
                                      : item.name
                                  )
                                }
                                className="px-5 py-3 text-sm font-semibold text-slate-700 bg-slate-50 flex items-center justify-between cursor-pointer"
                              >
                                {item.name}

                                <ChevronDown
                                  size={14}
                                  className={`text-slate-400 transition-transform ${
                                    openInnerDropdown === item.name
                                      ? 'rotate-180'
                                      : ''
                                  }`}
                                />
                              </div>

                              <AnimatePresence>
                                {openInnerDropdown === item.name && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="pl-5 pb-2 pt-2 space-y-1"
                                  >
                                    {item.children.map((child) => (
                                      <Link
                                        key={child.name}
                                        to={child.href}
                                        onClick={() => {
                                          handleNavClick(child.href);
                                          setHoveredDropdown(null);
                                          setOpenInnerDropdown(null);
                                        }}
                                        className="block px-4 py-2 text-sm rounded-md text-slate-600 hover:text-orange-600 hover:bg-orange-50"
                                      >
                                        {child.name}
                                      </Link>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>

                              <hr className="my-2 border-slate-100" />
                            </div>
                          ) : (
                            <Link
                              key={item.name}
                              to={item.href}
                              onClick={() => {
                                handleNavClick(item.href);
                                setHoveredDropdown(null);
                              }}
                              className={`block px-5 py-3 text-sm font-semibold transition-colors
                                ${
                                  isActive(item.href)
                                    ? 'text-orange-600 bg-orange-50'
                                    : 'text-slate-600 hover:text-orange-600 hover:bg-orange-50'
                                }`}
                            >
                              {item.name}
                            </Link>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* LEADERS STRIP */}
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
                  className="w-12 h-12 rounded-full border-2 group-hover:border-orange-500 transition-all object-top shadow-sm bg-gray-200"
                />
                <div className="hidden lg:block leading-tight text-left">
                  <div className="text-sm font-bold group-hover:text-orange-600">
                    {leader.name}
                  </div>
                  <div className="text-[11px] text-gray-500">
                    {leader.role1}
                  </div>
                  <div className="text-[10px] text-gray-400">
                    {leader.role2}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* MOBILE BUTTON */}
          <div className="xl:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 hover:bg-slate-100 rounded-lg"
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
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
                        className="flex items-center justify-between w-full text-lg font-bold py-2"
                      >
                        {link.name}
                        <ChevronDown
                          className={`transition-transform ${
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
                            {link.dropdown.map((subItem) =>
                              subItem.children ? (
                                <div key={subItem.name}>
                                  <p className="font-semibold mt-2">
                                    {subItem.name}
                                  </p>
                                  <div className="pl-3 mt-2 space-y-2">
                                    {subItem.children.map((child) => (
                                      <Link
                                        key={child.name}
                                        to={child.href}
                                        onClick={() =>
                                          handleNavClick(child.href)
                                        }
                                        className={`block font-medium
                                          ${
                                            isActive(child.href)
                                              ? 'text-orange-600'
                                              : 'text-slate-500 hover:text-orange-600'
                                          }`}
                                      >
                                        {child.name}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                <Link
                                  key={subItem.name}
                                  to={subItem.href}
                                  onClick={() => handleNavClick(subItem.href)}
                                  className={`block font-medium
                                    ${
                                      isActive(subItem.href)
                                        ? 'text-orange-600'
                                        : 'text-slate-500 hover:text-orange-600'
                                    }`}
                                >
                                  {subItem.name}
                                </Link>
                              )
                            )}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ) : (
                    <a
                      href={link.href}
                      onClick={() => handleNavClick(link.href)}
                      className="block text-lg font-bold py-2"
                    >
                      {link.name}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
