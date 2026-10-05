import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { Sparkles, Terminal, Trophy, UserCheck, Menu, X, ArrowRight, LogOut, Code2 } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { currentStudent, getStudentRank, logout } = useGrowth();

  const rank = currentStudent ? getStudentRank(currentStudent.id) : null;

  const navLinks = [
    { path: '/playground', label: 'AI Project Playground' },
    { path: '/campus-challenge', label: 'Campus Challenge' },
    { path: '/whatsapp-flow', label: 'WhatsApp Growth Flow' },
    { path: '/workshop', label: '60-Minute Workshop' },
    { path: '/leaderboard', label: 'Leaderboard' },
    { path: '/admin', label: 'Growth Admin' },
  ];

  const isActive = (path: string) => {
    if (path.includes('#')) return false;
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    if (path.includes('#')) {
      const id = path.split('#')[1];
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Title */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition shadow-xs">
              <Code2 className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold tracking-tight text-slate-900 text-sm sm:text-base leading-tight">
                  Build Your First AI Project
                </span>
                <span className="bg-slate-100 text-slate-700 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-200 font-mono">
                  in 60 Mins
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                Free Live Workshop for Engineering Students
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1">
            {navLinks.map((link) => {
              const isCurrent = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-2.5 xl:px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium transition ${
                    isCurrent
                      ? 'text-emerald-600 bg-emerald-50/80 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden lg:flex items-center gap-2 xl:gap-3">
            <Link
              to="/presentation"
              className="flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 transition border border-slate-200 shadow-2xs group"
              title="Watch 3-minute video presentation studio"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>🎬 3-Min Video</span>
            </Link>

            {currentStudent ? (
              <div className="flex items-center gap-2">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-900 text-xs font-semibold px-3 py-2 rounded-xl transition border border-slate-200 shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Dashboard ({currentStudent.fullName.split(' ')[0]})</span>
                  <span className="bg-white text-emerald-700 px-1.5 py-0.5 rounded text-[10px] font-mono border border-slate-200 font-bold">
                    #{rank}
                  </span>
                </Link>
                <button
                  onClick={logout}
                  title="Sign out of student session"
                  className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <Link
                to="/register"
                className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition shadow-xs hover:shadow"
              >
                <span>Register for Free</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => handleNavClick(link.path)}
              className={`block px-3 py-2 rounded-lg text-sm font-medium ${
                isActive(link.path)
                  ? 'text-emerald-600 bg-emerald-50 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-3 border-t border-slate-100 space-y-2">
            <Link
              to="/presentation"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-xs"
            >
              <span>🎬 3-Min Video Presentation</span>
            </Link>

            {currentStudent ? (
              <div className="space-y-2">
                <Link
                  to="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between w-full bg-emerald-50 text-emerald-700 font-semibold px-4 py-2.5 rounded-xl text-sm border border-emerald-100"
                >
                  <span>My Dashboard ({currentStudent.fullName})</span>
                  <span className="font-mono bg-white px-2 py-0.5 rounded text-xs border border-emerald-200">
                    Rank #{rank}
                  </span>
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full text-center text-xs text-slate-500 py-1 hover:text-slate-800"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                to="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center w-full bg-emerald-600 text-white font-semibold px-4 py-2.5 rounded-xl text-sm shadow-xs"
              >
                Register for Free
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
