'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, BrainCircuit, TrendingUp, Bitcoin, Globe, Landmark, HelpCircle, ChevronRight } from 'lucide-react';
import ParticleBackground from '@/components/layout/ParticleBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface FaqItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_DATA: FaqItem[] = [
  // General
  {
    category: 'General',
    q: 'What is InvestMind AI?',
    a: 'InvestMind AI is an AI-powered investment education platform built by Samarth Tayal. It acts as your personal financial mentor — explaining complex market concepts using simple language and real-world analogies. It covers NASDAQ, NIFTY 50, FOREX, Crypto, and more. Note: It is for education only, not financial advice.',
  },
  {
    category: 'General',
    q: 'Does InvestMind AI give buy or sell recommendations?',
    a: 'No, never. InvestMind AI strictly focuses on education. It will teach you HOW to evaluate stocks, read charts, understand valuations, and think about risk — but it will never say "buy this" or "sell that." For personalized advice, always consult a SEBI/FINRA registered financial advisor.',
  },
  {
    category: 'General',
    q: 'Is InvestMind AI free to use?',
    a: 'Yes, InvestMind AI is completely free to use. Simply navigate to the Chat page and start asking questions. The platform requires an OpenAI API key configured on the server side — if you\'re running your own instance, add your OPENAI_API_KEY environment variable.',
  },
  // NASDAQ
  {
    category: 'NASDAQ',
    q: 'What is NASDAQ and how is it different from NYSE?',
    a: 'NASDAQ (National Association of Securities Dealers Automated Quotations) is primarily a technology-focused stock exchange where companies like Apple, Microsoft, Google, and Meta are listed. Think of it as the "tech mall" of stock exchanges.\n\nNYSE (New York Stock Exchange) is the older, more traditional exchange — like the "financial district" housing companies like Coca-Cola, JPMorgan, and Walmart.\n\nKey difference: NASDAQ is fully electronic; NYSE has a physical trading floor. NASDAQ tends to have higher-growth tech stocks, while NYSE leans toward blue-chip, established companies.',
  },
  {
    category: 'NASDAQ',
    q: 'What does the NASDAQ Composite vs NASDAQ-100 mean?',
    a: 'Great question! Think of them like different "teams" in the same league:\n\n• NASDAQ Composite: Includes ALL ~3,000+ companies listed on NASDAQ — the entire roster.\n• NASDAQ-100 (QQQ): Just the top 100 non-financial companies — the "all-stars" by market cap.\n\nThe NASDAQ-100 is what most investors track because it represents the most influential tech giants. When people say "NASDAQ is up 2%", they usually mean the NASDAQ-100.',
  },
  {
    category: 'NASDAQ',
    q: 'What is a P/E ratio and why does it matter?',
    a: 'Price-to-Earnings (P/E) ratio is like asking: "How many years will it take for this company\'s earnings to pay back my investment?"\n\nExample: If a stock trades at $100 and earns $5 per share annually, the P/E = 100/5 = 20. This means investors are paying $20 for every $1 of earnings.\n\n• Low P/E (under 15): Often indicates a value stock — possibly undervalued, or a slow-growth company.\n• High P/E (40+): Typical for growth stocks — investors expect big future earnings.\n\nContext matters! A tech startup with a P/E of 80 might be reasonable; a utility company at 80 would be alarming.',
  },
  // NIFTY
  {
    category: 'NIFTY 50',
    q: 'What is NIFTY 50 and how is it calculated?',
    a: 'NIFTY 50 is India\'s benchmark stock market index, representing the top 50 companies listed on the National Stock Exchange (NSE) of India.\n\nThink of it as a "report card" for the Indian economy. When NIFTY goes up, it means the top 50 Indian companies collectively gained value — and vice versa.\n\nCalculation: NIFTY uses a "free-float market capitalization" method. This means it only counts the shares actually available for public trading, not the promoter-held shares. It\'s recalculated every 6 months.',
  },
  {
    category: 'NIFTY 50',
    q: 'What is the difference between NIFTY 50 and Sensex?',
    a: 'Both track the Indian stock market but with different scope:\n\n• NIFTY 50: 50 stocks across 13 sectors on NSE — broader picture\n• Sensex (BSE 30): Only 30 stocks on the Bombay Stock Exchange — older, more prestigious index\n\nAnalogy: NIFTY 50 is like a poll of the top 50 students in school; Sensex is the top 30 students on the honor roll. They usually move together but can diverge on sector-specific news.\n\nMost institutional investors watch NIFTY for derivatives trading; Sensex is more widely quoted in media.',
  },
  {
    category: 'NIFTY 50',
    q: 'What are FII and DII flows in Indian markets?',
    a: 'FII (Foreign Institutional Investors) and DII (Domestic Institutional Investors) are the big players in Indian markets:\n\n• FIIs: Foreign funds — think Goldman Sachs, Fidelity, or sovereign wealth funds investing in India. When global sentiment improves, FIIs pour money into emerging markets like India. Their buying pushes indices up; selling creates sharp falls.\n\n• DIIs: Indian institutions — LIC, mutual funds, insurance companies. They often act as a "buffer" — buying when FIIs sell.\n\nAnalogy: FIIs are like tourists spending money in your town; DIIs are the local shopkeepers. Tourist money boosts the economy but can leave quickly; local money is more stable.',
  },
  // FOREX
  {
    category: 'FOREX',
    q: 'What is a currency pair in FOREX?',
    a: 'In FOREX, you always trade one currency against another — hence "pair."\n\nExample: EUR/USD = 1.08 means 1 Euro buys 1.08 US Dollars.\n\n• The first currency (EUR) is the "base currency" — what you\'re buying\n• The second (USD) is the "quote currency" — what you\'re using to buy\n\nAnalogy: Imagine you\'re at an airport exchange counter. You hand in Euros, you get back Dollars. The exchange rate IS the currency pair price. FOREX is just that — but $7.5 trillion worth of it every single day!\n\nMajor pairs (most traded): EUR/USD, GBP/USD, USD/JPY, USD/CHF.',
  },
  {
    category: 'FOREX',
    q: 'What is leverage in FOREX and why is it risky?',
    a: 'Leverage lets you control a large position with a small amount of capital.\n\nExample: 100:1 leverage means with $1,000, you can control $100,000 worth of currency.\n\nAnalogy: It\'s like buying a $200,000 house with just $2,000 down. If the house price rises 5%, you made $10,000 — a 500% return on your $2,000. BUT if prices fall 5%, you\'ve lost more than your entire investment.\n\n⚠ This is why FOREX is extremely risky for beginners. A 1% move can wipe out your entire account with 100:1 leverage. Most professional traders use far less (5:1 to 10:1).',
  },
  {
    category: 'FOREX',
    q: 'How do central banks affect FOREX rates?',
    a: 'Central banks (like the US Federal Reserve or RBI) are the biggest FOREX influencers:\n\n1. Interest Rates: Higher rates attract foreign capital seeking better returns → currency strengthens. This is why USD rallied when the Fed raised rates aggressively in 2022-2023.\n\n2. Quantitative Easing: Printing more money → dilutes currency value → currency weakens.\n\n3. Intervention: Sometimes central banks directly buy/sell their own currency to stabilize it.\n\nAnalogy: Think of currencies like yield-bearing assets. If one country\'s savings account suddenly offers 5% interest while others offer 1%, everyone will rush to deposit in that bank — driving up demand (and value) for that currency.',
  },
  // Crypto
  {
    category: 'Crypto',
    q: 'What is Bitcoin and how does it work?',
    a: 'Bitcoin is digital money that operates without a central bank or government.\n\nAnalogy: Imagine a public Google Sheet that everyone in the world can see, but no single person can edit alone. Every transaction ever made is recorded on this sheet (called the blockchain), and it takes the collective agreement of thousands of computers to add a new entry.\n\nHow it works:\n• Blockchain: A chain of "blocks" each containing transaction records\n• Mining: Computers solve complex math puzzles to validate transactions and earn Bitcoin rewards\n• Limited supply: Only 21 million Bitcoin will ever exist — like digital gold\n• Decentralized: No CEO, no bank, no single point of failure (or control)',
  },
  {
    category: 'Crypto',
    q: 'What is the difference between Bitcoin and Ethereum?',
    a: 'Great analogy to remember this:\n\n• Bitcoin is like Gold — a store of value, limited supply, primarily used as digital money\n• Ethereum is like a global computer — you can build apps, contracts, and entire financial systems on it\n\nKey differences:\n• Purpose: BTC = digital currency; ETH = programmable blockchain platform\n• Supply: BTC capped at 21M; ETH has no hard cap\n• Smart Contracts: ETH supports them; BTC doesn\'t (natively)\n• Use case: DeFi, NFTs, and most dApps are built on Ethereum\n\nAnalogy: If BTC is the internet\'s reserve currency, ETH is the internet\'s operating system.',
  },
  {
    category: 'Crypto',
    q: 'What is DeFi and how does it differ from traditional finance?',
    a: 'DeFi (Decentralized Finance) is financial services — lending, borrowing, trading, earning interest — but without banks or middlemen.\n\nAnalogy: Traditional finance is like using a bank: you deposit money, they lend it out, pay you 1% interest, and charge borrowers 8%. They keep the difference.\n\nDeFi replaces banks with smart contracts — self-executing code on the blockchain:\n• No account approval needed (just a crypto wallet)\n• No business hours — runs 24/7/365\n• Transparent — all code is publicly auditable\n• Permissionless — anyone anywhere can access it\n\n⚠ Risks: Smart contract bugs, hacks, extreme volatility, regulatory uncertainty, and "rug pulls" by bad actors. High reward potential comes with very high risk.',
  },
  {
    category: 'Crypto',
    q: 'Why is crypto so volatile?',
    a: 'Crypto\'s volatility comes from several factors — think of it like a perfect storm:\n\n1. Small market size: The entire crypto market (~$2T) is tiny vs. global stocks ($100T+). Large trades move prices dramatically.\n\n2. No fundamental anchor: Unlike stocks (backed by company earnings) or bonds (backed by government promises), most cryptos have no intrinsic cash flow to anchor valuation.\n\n3. 24/7 market: No circuit breakers, no overnight breaks. News hits at 3 AM and prices react instantly.\n\n4. Speculation-driven: A large portion of crypto buyers are speculators hoping to sell at a higher price, not long-term investors.\n\n5. Leverage cascade: Many traders use massive leverage — when prices drop, forced liquidations accelerate the decline.\n\nAnalogy: Crypto is like a roller coaster with no seat belts, no height restrictions, and the engineers are still building the track as you ride.',
  },
];

const CATEGORIES = ['All', 'General', 'NASDAQ', 'NIFTY 50', 'FOREX', 'Crypto'];

const CAT_ICONS: Record<string, React.ElementType> = {
  All: HelpCircle,
  General: BrainCircuit,
  NASDAQ: TrendingUp,
  'NIFTY 50': Landmark,
  FOREX: Globe,
  Crypto: Bitcoin,
};

export default function FaqPage() {
  const [active, setActive] = useState<string | null>(null);
  const [category, setCategory] = useState('All');

  const filtered = category === 'All' ? FAQ_DATA : FAQ_DATA.filter((f) => f.category === category);

  return (
    <div className="relative min-h-screen bg-[#020b18] cyber-grid">
      <ParticleBackground />
      <Navbar />

      <main className="relative z-10 pt-28 pb-10 px-4 sm:px-6 max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-purple-400/20 text-xs text-purple-400/80 mb-6">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white mb-4">
            Everything You Want to Know About{' '}
            <span className="gradient-text">Markets</span>
          </h1>
          <p className="text-slate-500 max-w-xl mx-auto">
            Clear, jargon-free explanations for the most common investing questions — powered by InvestMind AI.
          </p>
        </div>

        {/* Category filter */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {CATEGORIES.map((cat) => {
            const Icon = CAT_ICONS[cat];
            const isActive = category === cat;
            return (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-cyan-400/10 text-cyan-400 border border-cyan-400/30 glow-border-cyan'
                    : 'glass border border-slate-700/50 text-slate-400 hover:text-cyan-400 hover:border-cyan-400/20'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat}
              </button>
            );
          })}
        </div>

        {/* FAQ accordion */}
        <div className="flex flex-col gap-3 accordion-cyber">
          {filtered.map((item, i) => {
            const key = `${item.category}-${i}`;
            const isOpen = active === key;
            return (
              <div
                key={key}
                className={`glass rounded-2xl border transition-all duration-300 ${
                  isOpen ? 'border-cyan-400/30 glow-border-cyan' : 'border-slate-700/30 hover:border-slate-600/50'
                }`}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setActive(isOpen ? null : key)}
                >
                  <div className="flex items-start gap-3 flex-1 pr-4">
                    <span className={`mt-0.5 text-xs font-semibold px-2 py-0.5 rounded-full border ${
                      item.category === 'NASDAQ' ? 'border-cyan-500/30 text-cyan-400/70 bg-cyan-400/5' :
                      item.category === 'NIFTY 50' ? 'border-purple-500/30 text-purple-400/70 bg-purple-400/5' :
                      item.category === 'FOREX' ? 'border-teal-500/30 text-teal-400/70 bg-teal-400/5' :
                      item.category === 'Crypto' ? 'border-pink-500/30 text-pink-400/70 bg-pink-400/5' :
                      'border-slate-500/30 text-slate-400/70 bg-slate-400/5'
                    } flex-shrink-0`}>
                      {item.category}
                    </span>
                    <span className={`font-semibold text-sm sm:text-base transition-colors ${isOpen ? 'text-cyan-400' : 'text-slate-200'}`}>
                      {item.q}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 flex-shrink-0 transition-all duration-300 ${
                      isOpen ? 'rotate-180 text-cyan-400' : 'text-slate-600'
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 slide-in-left">
                    <div className="h-px bg-gradient-to-r from-cyan-400/20 to-transparent mb-4" />
                    <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-wrap">
                      {item.a}
                    </p>
                    <div className="mt-4 flex items-center gap-2">
                      <Link
                        href={`/chat?q=${encodeURIComponent(item.q)}`}
                        className="inline-flex items-center gap-1.5 text-xs text-cyan-400/70 hover:text-cyan-400 transition-colors"
                      >
                        Ask AI for more detail
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center glass-purple rounded-3xl border border-purple-500/20 p-8">
          <BrainCircuit className="w-12 h-12 text-purple-400 mx-auto mb-4 float" />
          <h3 className="text-2xl font-black text-white mb-3">
            Still have questions?
          </h3>
          <p className="text-slate-500 mb-6 max-w-sm mx-auto">
            Our AI mentor can answer any investing question in real-time with personalized explanations.
          </p>
          <Link
            href="/chat"
            className="inline-flex items-center gap-2 btn-cyber px-6 py-3 rounded-xl font-semibold text-sm"
          >
            <BrainCircuit className="w-4 h-4" />
            Ask InvestMind AI
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
