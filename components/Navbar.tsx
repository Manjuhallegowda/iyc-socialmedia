import React, { useState, useEffect, useRef } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTeamDropdownOpen, setTeamDropdownOpen] = useState(false);
  const [isMobileTeamDropdownOpen, setMobileTeamDropdownOpen] = useState(false);
  const [active, setActive] = useState<string>(
    window.location.hash || '/#home'
  );

  const firstLinkRef = useRef<HTMLAnchorElement | null>(null);
  const teamDropdownRef = useRef<HTMLDivElement | null>(null);

  const prominentLeaders = [
    {
      name: 'D.K. Shivakumar',
      role1: 'Karnataka PCC President',
      role2: 'Deputy CM, Govt. of Karnataka',
      img: 'https://ipcmedia.in/public/uploads/profile/1756048100_12.jpg',
      href: '/profile/dk-shivakumar',
    },
    {
      name: 'Siddaramaiah',
      role1: 'Chief Minister',
      role2: 'Govt. of Karnataka',
      img: 'https://www.coorgnews.in/wp-content/uploads/2024/08/siddaramaiah-photo.jpg',
      href: '/profile/siddaramaiah',
    },
    {
      name: 'Manjunath Gowda',
      role1: 'State President',
      role2: 'IYC Karnataka',
      img: 'https://imagesvs.oneindia.com/img/2018/04/manjunath-gowda-1524829569.jpg',
      href: '/profile/manjunath-gowda',
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
    { name: 'Gallery', href: '/#gallery' },
    { name: 'Contact', href: '/#contact' },
  ];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        teamDropdownRef.current &&
        !teamDropdownRef.current.contains(e.target as Node)
      ) {
        setTeamDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    if (isOpen) setTimeout(() => firstLinkRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavClick = (href: string) => {
    setActive(href);
    setIsOpen(false);
    setTeamDropdownOpen(false);
    setMobileTeamDropdownOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white shadow-md border-t-4 border-saffron">
      {/* MAIN BAR */}
      <div className="relative h-24 px-4 flex items-center">
        {/* LOGO (LEFT) */}
        <button
          onClick={() => {
            window.location.hash = '#home';
            setActive('/#home');
          }}
          className="flex items-center gap-3 focus:ring-2 focus:ring-saffron rounded"
        >
          <img src="/assets/IYC_Logo.png" alt="INC Logo" className="h-16" />
          <div>
            <div className="font-bold text-xl text-indiaGreen">
              IYC Karnataka
            </div>
            <div className="text-xs font-semibold text-gray-600">
              SOCIAL MEDIA
            </div>
          </div>
        </button>

        {/* CENTER MENU (DESKTOP – COMPACT) */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-[80%]">
          <div className="flex max-w-[640px] bg-gray-50 px-3 py-2 rounded-full border shadow-sm gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.name} className="relative" ref={teamDropdownRef}>
                  <button
                    onClick={() => setTeamDropdownOpen((prev) => !prev)}
                    className={`h-8 px-3 flex items-center rounded-full text-xs font-semibold uppercase transition
              ${
                isTeamDropdownOpen
                  ? 'bg-saffron text-white'
                  : 'hover:bg-orange-100 text-gray-700'
              }`}
                  >
                    {link.name}
                  </button>

                  {isTeamDropdownOpen && (
                    <div className="absolute mt-2 w-52 bg-white rounded-lg shadow-lg border">
                      {link.dropdown.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          onClick={() => handleNavClick(item.href)}
                          className="block px-4 py-2 text-sm hover:bg-gray-100"
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`h-8 px-3 flex items-center rounded-full text-xs font-semibold uppercase transition
            ${
              active === link.href
                ? 'bg-saffron text-white'
                : 'hover:bg-orange-100 text-gray-700'
            }`}
                >
                  {link.name}
                </a>
              )
            )}
          </div>
        </div>

        {/* RIGHT SIDE LEADERS (DESKTOP) */}
        <div className="hidden md:flex ml-auto items-center gap-5">
          {prominentLeaders.map((leader) => (
            <a
              key={leader.name}
              href={leader.href}
              className="flex items-center gap-2 group"
            >
              <img
                src={leader.img}
                alt={leader.name}
                className="w-11 h-11 rounded-full border-2 transition group-hover:border-saffron"
              />
              <div className="hidden xl:block leading-tight">
                <div className="text-sm font-bold text-indiaGreen group-hover:text-saffron">
                  {leader.name}
                </div>
                <div className="text-[11px] text-gray-500">{leader.role1}</div>
                <div className="text-[10px] text-gray-400">{leader.role2}</div>
              </div>
            </a>
          ))}
        </div>

        {/* MOBILE MENU BUTTON */}
        <div className="md:hidden ml-auto">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 focus:ring-2 focus:ring-saffron rounded"
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="p-3 space-y-1">
            {navLinks.map((link, i) =>
              link.dropdown ? (
                <div key={link.name}>
                  <button
                    onClick={() =>
                      setMobileTeamDropdownOpen(!isMobileTeamDropdownOpen)
                    }
                    className="w-full px-3 py-2 text-left font-semibold"
                  >
                    {link.name}
                  </button>
                  {isMobileTeamDropdownOpen &&
                    link.dropdown.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        onClick={() => handleNavClick(item.href)}
                        className="block pl-6 py-2 text-sm"
                      >
                        {item.name}
                      </Link>
                    ))}
                </div>
              ) : (
                <a
                  key={link.name}
                  href={link.href}
                  ref={i === 0 ? firstLinkRef : undefined}
                  onClick={() => handleNavClick(link.href)}
                  className="block px-3 py-2 font-semibold"
                >
                  {link.name}
                </a>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
