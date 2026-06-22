'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  BrainCircuit, TrendingUp, TrendingDown, Zap, Shield,
  ChevronRight, BarChart2, Globe, Bitcoin, Landmark,
  ArrowUpRight, Cpu, Star
} from 'lucide-react';
import ParticleBackground from '@/components/layout/ParticleBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TICKER_DATA = [
  { symbol: 'AAPL', price: '189.30', change: '+1.24%', up: true },
  { symbol: 'TSLA', price: '248.42', change: '-0.87%', up: false },
  { symbol: 'NIFTY50', price: '22,350', change: '+0.62%', up: true },
  { symbol: 'BTC/USD', price: '67,240', change: '+2.15%', up: true },
  { symbol: 'EUR/USD', price: '1.0842', change: '-0.12%', up: false },
  { symbol: 'GOOGL', price: '176.55', change: '+0.94%', up: true },
  { symbol: 'MSFT', price: '415.20', change: '+1.31%', up: true },
  { symbol: 'ETH/USD', price: '3,480', change: '-0.45%', up: false },
  { symbol: 'SENSEX', price: '73,650', change: '+0.78%', up: true },
  { symbol: 'GBP/USD', price: '1.2712', change: '+0.09%', up: true },
  { symbol: 'AMZN', price: '192.80', change: '+1.67%', up: true },
  { symbol: 'NVDA', price: '875.40', change: '+3.22%', up: true },
  { symbol: 'SOL/USD', price: '172.50', change: '-1.03%', up: false },
  { symbol: 'USD/JPY', price: '151.23', change: '+0.22%', up: true },
  { symbol: 'RELIANCE', price: '2,950', change: '+0.55%', up: true },
];

const MARKET_CARDS = [
  {
    icon: BarChart2,
    title: 'NASDAQ',
    tag: 'US Tech',
    desc: 'Master the world\'s premier technology stock exchange. Learn about P/E ratios, earnings reports, and how Big Tech moves the market.',
    stats: ['15,000+ Companies', 'Est. 1971', 'Tech-Heavy'],
    color: 'cyan',
    gradient: 'from-cyan-400/20 to-cyan-600/5',
    border: 'border-cyan-500/20',
    glow: 'hover:shadow-cyan-500/20',
  },
  {
    icon: Landmark,
    title: 'NIFTY 50',
    tag: 'Indian Market',
    desc: 'Understand India\'s benchmark index — sectoral weightage, FII flows, and how RBI policy shapes equity markets.',
    stats: ['50 Blue Chips', 'NSE Listed', 'Top 13 Sectors'],
    color: 'purple',
    gradient: 'from-purple-400/20 to-purple-600/5',
    border: 'border-purple-500/20',
    glow: 'hover:shadow-purple-500/20',
  },
  {
    icon: Globe,
    title: 'FOREX',
    tag: 'Currency Markets',
    desc: 'Decode the $7.5 trillion/day currency market. Learn pips, leverage, currency pairs, and how macroeconomics drives FX.',
    stats: ['$7.5T Daily Vol.', '24/5 Trading', '180+ Currencies'],
    color: 'cyan',
    gradient: 'from-cyan-400/15 to-teal-600/5',
    border: 'border-teal-500/20',
    glow: 'hover:shadow-teal-500/20',
  },
  {
    icon: Bitcoin,
    title: 'Crypto',
    tag: 'Digital Assets',
    desc: 'Navigate the wild frontier of digital assets. Understand blockchain, DeFi, market cycles, and crypto fundamentals.',
    stats: ['10,000+ Coins', '24/7 Trading', 'Decentralized'],
    color: 'purple',
    gradient: 'from-purple-400/15 to-pink-600/5',
    border: 'border-pink-500/20',
    glow: 'hover:shadow-pink-500/20',
  },
  {
    icon: TrendingUp,
    title: 'S&P 500',
    tag: 'US Equities',
    desc: 'Explore the index that tracks America\'s 500 largest companies. Learn index investing, ETFs, and portfolio construction basics.',
    stats: ['500 Companies', 'Market Cap-Wt', 'Since 1957'],
    color: 'cyan',
    gradient: 'from-cyan-400/10 to-blue-600/5',
    border: 'border-blue-500/20',
    glow: 'hover:shadow-blue-500/20',
  },
  {
    icon: Zap,
    title: 'Derivatives',
    tag: 'F&O Basics',
    desc: 'Understand futures & options — the building blocks of advanced trading strategies without the reckless gamble.',
    stats: ['Futures & Options', 'Hedging Tools', 'Risk Mgmt'],
    color: 'purple',
    gradient: 'from-purple-400/10 to-violet-600/5',
    border: 'border-violet-500/20',
    glow: 'hover:shadow-violet-500/20',
  },
];

const FEATURES = [
  {
    icon: Cpu,
    title: 'GPT-4 Powered',
    desc: 'State-of-the-art AI that explains complex market concepts in plain English with helpful analogies.',
  },
  {
    icon: Shield,
    title: 'Education First',
    desc: 'We never give buy/sell calls. Our goal is building your financial literacy — safely and responsibly.',
  },
  {
    icon: Zap,
    title: 'Instant Answers',
    desc: 'Streaming AI responses deliver knowledge at the speed of thought. No waiting, no delays.',
  },
  {
    icon: Star,
    title: 'Beginner Friendly',
    desc: 'Rich analogies and step-by-step explanations make even the most complex topics accessible.',
  },
];

export default function LandingPage() {
  const tickerRef = useRef<HTMLDivElement>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setHeroVisible(true), 100);
  }, []);

  const doubled = [...TICKER_DATA, ...TICKER_DATA];

  return (
    <div className="relative min-h-screen bg-[#020b18] cyber-grid scanlines">
      <ParticleBackground />
      <Navbar />

      {/* ───── HERO ───── */}
      <section className="relative z-10 pt-32 pb-20 px-4 sm:px-6 max-w-7xl mx-auto text-center">
        {/* Creator badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-cyan-400/20 text-xs text-cyan-400/80 mb-8 transition-all duration-700 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-ring" />
          Built with ❤️ by Samarth Tayal &nbsp;|&nbsp; AI Investment Mentor
        </div>

        <h1
          className={`text-4xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight transition-all duration-700 delay-100 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <span className="text-white">Your AI </span>
          <span className="gradient-text">Investment</span>
          <br />
          <span className="text-white">Mentor is </span>
          <span className="text-cyan-400 glow-cyan">Here</span>
        </h1>

        <p
          className={`text-slate-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-700 delay-200 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          Learn NASDAQ, NIFTY, FOREX & Crypto from an AI that speaks{' '}
          <span className="text-cyan-400">human</span>. No jargon. No fluff.
          Just pure <span className="text-purple-400">financial intelligence</span>.
        </p>

        <div
          className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-700 delay-300 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          <Link
            href="/chat"
            className="btn-cyber px-8 py-4 rounded-xl text-base font-bold flex items-center gap-2 group"
          >
            <BrainCircuit className="w-5 h-5" />
            Start Learning Now
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/faq"
            className="px-8 py-4 rounded-xl text-base font-medium text-slate-400 hover:text-purple-400 border border-slate-700/50 hover:border-purple-500/30 transition-all"
          >
            Explore FAQs
          </Link>
        </div>

        {/* Stats */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto transition-all duration-700 delay-400 ${heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        >
          {[
            { value: '4', label: 'Markets Covered' },
            { value: 'GPT-4o', label: 'AI Engine' },
            { value: '∞', label: 'Questions Answered' },
            { value: '100%', label: 'Free to Use' },
          ].map(({ value, label }) => (
            <div key={label} className="glass rounded-xl p-4 text-center">
              <div className="text-2xl font-black gradient-text mb-1">{value}</div>
              <div className="text-slate-500 text-xs">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── TICKER ───── */}
      <div className="relative z-10 overflow-hidden py-3 border-y border-cyan-500/10 bg-black/30 mb-16">
        <div className="flex ticker-track gap-8 whitespace-nowrap">
          {doubled.map((item, i) => (
            <div key={i} className="inline-flex items-center gap-2 px-4">
              <span className="text-slate-400 text-xs font-mono font-semibold">{item.symbol}</span>
              <span className="text-white text-xs font-mono">{item.price}</span>
              <span
                className={`text-xs font-mono font-semibold flex items-center gap-0.5 ${
                  item.up ? 'text-emerald-400' : 'text-red-400'
                }`}
              >
                {item.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {item.change}
              </span>
              <span className="text-slate-700 text-xs">|</span>
            </div>
          ))}
        </div>
      </div>

      {/* ───── MARKET CARDS ───── */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-24">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-purple-400/70 mb-3">
            <span className="w-8 h-px bg-purple-400/40" />
            Markets We Teach
            <span className="w-8 h-px bg-purple-400/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
            Master Every <span className="gradient-text">Market</span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            From equities to digital assets — InvestMind AI covers the full spectrum of global financial markets.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MARKET_CARDS.map((card, i) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                href="/chat"
                className={`market-card glass rounded-2xl p-6 border ${card.border} bg-gradient-to-br ${card.gradient} group cursor-pointer block`}
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br ${card.gradient} border ${card.border}`}>
                    <Icon className={`w-6 h-6 ${card.color === 'cyan' ? 'text-cyan-400' : 'text-purple-400'}`} />
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium border ${card.color === 'cyan' ? 'border-cyan-500/30 text-cyan-400/70 bg-cyan-400/5' : 'border-purple-500/30 text-purple-400/70 bg-purple-400/5'}`}>
                    {card.tag}
                  </div>
                </div>

                <h3 className="text-white font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors">
                  {card.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {card.desc}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {card.stats.map((s) => (
                    <span key={s} className="text-xs text-slate-600 bg-slate-800/50 px-2 py-1 rounded">
                      {s}
                    </span>
                  ))}
                </div>

                <div className={`flex items-center gap-1 text-xs font-semibold ${card.color === 'cyan' ? 'text-cyan-400/70' : 'text-purple-400/70'} group-hover:gap-2 transition-all`}>
                  Start learning
                  <ArrowUpRight className="w-3 h-3" />
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ───── FEATURES ───── */}
      <section className="relative z-10 px-4 sm:px-6 max-w-7xl mx-auto mb-24">
        <div className="glass rounded-3xl p-8 sm:p-12 border border-cyan-500/10">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">
              Why <span className="gradient-text">InvestMind AI</span>?
            </h2>
            <p className="text-slate-500 max-w-lg mx-auto">
              Built for the next generation of investors who want to understand markets, not just follow them blindly.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="text-center p-6 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 border border-slate-700/30 hover:border-cyan-500/20 transition-all">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/20 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-6 h-6 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA ───── */}
      <section className="relative z-10 px-4 sm:px-6 max-w-3xl mx-auto mb-20 text-center">
        <div className="glass-purple rounded-3xl p-10 border border-purple-500/20">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-400/20 to-purple-600/30 border border-purple-500/30 flex items-center justify-center mx-auto mb-6 float">
            <BrainCircuit className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-black text-white mb-4">
            Ready to become a smarter investor?
          </h2>
          <p className="text-slate-400 mb-8 leading-relaxed">
            Ask anything about markets. InvestMind AI will break it down, use real-world analogies, and help you build genuine financial intelligence.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 btn-cyber px-8 py-4 rounded-xl text-base font-bold"
          >
            <BrainCircuit className="w-5 h-5" />
            Chat with InvestMind AI
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
