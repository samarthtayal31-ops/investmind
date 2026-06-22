import Link from 'next/link';
import { BrainCircuit, Github, Twitter, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-cyan-500/10 glass mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center">
                <BrainCircuit className="w-5 h-5 text-cyan-400" />
              </div>
              <span className="font-bold text-lg">
                <span className="text-cyan-400">Invest</span>
                <span className="text-purple-400">Mind</span>
                <span className="text-slate-300"> AI</span>
              </span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed">
              AI-powered investment education platform. Learn markets, not just watch them.
            </p>
            <p className="text-xs text-slate-600 mt-3">
              ⚠ For educational purposes only. Not financial advice.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-cyan-400/80 text-xs font-semibold uppercase tracking-widest mb-4">Navigate</h4>
            <div className="flex flex-col gap-2">
              {[
                { href: '/', label: 'Home' },
                { href: '/chat', label: 'Chat with AI' },
                { href: '/faq', label: 'FAQ' },
              ].map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-slate-400 hover:text-cyan-400 text-sm transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Markets */}
          <div>
            <h4 className="text-purple-400/80 text-xs font-semibold uppercase tracking-widest mb-4">Markets Covered</h4>
            <div className="flex flex-wrap gap-2">
              {['NASDAQ', 'NIFTY 50', 'FOREX', 'Crypto', 'S&P 500', 'Sensex'].map((m) => (
                <span
                  key={m}
                  className="text-xs px-2 py-1 rounded border border-purple-500/20 text-purple-400/70 bg-purple-500/5"
                >
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-cyan-500/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm text-center sm:text-left">
            Designed &amp; Developed by{' '}
            <span className="gradient-text font-semibold">Samarth Tayal</span> 🚀
          </p>
          <p className="text-slate-600 text-xs">
            &copy; {new Date().getFullYear()} InvestMind AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
