'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, BrainCircuit, TrendingUp, MessageCircle, HelpCircle } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home', icon: TrendingUp },
  { href: '/chat', label: 'Chat', icon: MessageCircle },
  { href: '/faq', label: 'FAQ', icon: HelpCircle },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-cyan-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center group-hover:border-cyan-400/60 transition-all">
            <BrainCircuit className="w-5 h-5 text-cyan-400" />
          </div>
          <span className="font-bold text-lg">
            <span className="text-cyan-400 glow-cyan">Invest</span>
            <span className="text-purple-400">Mind</span>
            <span className="text-slate-300"> AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  active
                    ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30'
                    : 'text-slate-400 hover:text-cyan-400 hover:bg-cyan-400/5'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
          <Link
            href="/chat"
            className="ml-3 btn-cyber px-4 py-2 rounded-lg text-sm font-semibold"
          >
            Ask AI &rarr;
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-cyan-400 p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-cyan-500/10 px-4 py-3 flex flex-col gap-2">
          {navLinks.map(({ href, label, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  active
                    ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/20'
                    : 'text-slate-400 hover:text-cyan-400'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
}
