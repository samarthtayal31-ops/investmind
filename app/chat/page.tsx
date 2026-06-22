'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  BrainCircuit, Send, ChevronRight, Trash2, Plus,
  TrendingUp, Bitcoin, Globe, Landmark, Zap, BookOpen,
  User, AlertTriangle, BarChart2, Copy, Check, Menu, X
} from 'lucide-react';
import ParticleBackground from '@/components/layout/ParticleBackground';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
}

const QUICK_SUGGESTIONS = [
  { icon: TrendingUp, label: 'What is NASDAQ?', prompt: 'Explain what NASDAQ is and how it differs from NYSE in simple terms.' },
  { icon: Landmark, label: 'NIFTY 50 basics', prompt: 'Explain the NIFTY 50 index to a complete beginner using a simple analogy.' },
  { icon: Globe, label: 'How does FOREX work?', prompt: 'How does the foreign exchange (FOREX) market work? Use a simple analogy.' },
  { icon: Bitcoin, label: 'Bitcoin basics', prompt: 'Explain Bitcoin and blockchain technology using a simple real-world analogy.' },
  { icon: BarChart2, label: 'What is a bull market?', prompt: 'What is a bull market vs a bear market? Explain with analogies.' },
  { icon: Zap, label: 'What are options?', prompt: 'Explain stock options (calls and puts) using a simple everyday analogy.' },
  { icon: BookOpen, label: 'Portfolio diversification', prompt: 'Why is portfolio diversification important? Explain with an analogy.' },
  { icon: AlertTriangle, label: 'What is volatility?', prompt: 'What does market volatility mean and how does it affect investors?' },
];

function TypingDots() {
  return (
    <div className="flex items-center gap-1.5 py-2 px-1">
      <div className="w-2 h-2 rounded-full bg-cyan-400 dot-1" />
      <div className="w-2 h-2 rounded-full bg-cyan-400 dot-2" />
      <div className="w-2 h-2 rounded-full bg-cyan-400 dot-3" />
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''} group slide-in-left`}>
      {/* Avatar */}
      <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center ${
        isUser
          ? 'bg-gradient-to-br from-purple-500/30 to-purple-700/20 border border-purple-500/30'
          : 'bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 border border-cyan-400/20'
      }`}>
        {isUser
          ? <User className="w-4 h-4 text-purple-400" />
          : <BrainCircuit className="w-4 h-4 text-cyan-400" />
        }
      </div>

      {/* Bubble */}
      <div className={`max-w-[75%] relative ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
          isUser ? 'msg-user text-slate-200 rounded-tr-sm' : 'msg-ai text-slate-200 rounded-tl-sm'
        }`}>
          {msg.content}
        </div>
        <div className={`flex items-center gap-2 ${isUser ? 'flex-row-reverse' : ''}`}>
          <span className="text-slate-600 text-xs">
            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
          <button
            onClick={copy}
            className="opacity-0 group-hover:opacity-100 transition-opacity text-slate-600 hover:text-cyan-400"
          >
            {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          </button>
        </div>
      </div>
    </div>
  );
}

const WELCOME_MSG: Message = {
  id: 'welcome',
  role: 'assistant',
  content: `Hey there! I'm InvestMind AI, your personal investment education mentor. 🧠\n\nI'm here to help you understand financial markets — NASDAQ, NIFTY 50, FOREX, Crypto, and more — using simple language and real-world analogies.\n\n⚠️ Just a quick note: I'm an educational AI. I won't give you buy/sell recommendations, but I'll teach you everything you need to evaluate investments yourself.\n\nWhat would you like to learn today?`,
  timestamp: new Date(),
};

export default function ChatPage() {
  const [conversations, setConversations] = useState<Conversation[]>([
    { id: 'default', title: 'New Chat', messages: [WELCOME_MSG], createdAt: new Date() },
  ]);
  const [activeId, setActiveId] = useState('default');
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [apiKeyMissing, setApiKeyMissing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  const active = conversations.find((c) => c.id === activeId)!;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [active?.messages, streaming]);

  const autoResize = () => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
  };

  const newChat = () => {
    const id = Date.now().toString();
    setConversations((prev) => [
      ...prev,
      { id, title: 'New Chat', messages: [{ ...WELCOME_MSG, id: `w-${id}`, timestamp: new Date() }], createdAt: new Date() },
    ]);
    setActiveId(id);
    setSidebarOpen(false);
  };

  const deleteChat = (id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    if (activeId === id) {
      const remaining = conversations.filter((c) => c.id !== id);
      if (remaining.length) setActiveId(remaining[0].id);
      else newChat();
    }
  };

  const updateMessages = (id: string, updater: (msgs: Message[]) => Message[]) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, messages: updater(c.messages) } : c))
    );
  };

  const send = useCallback(async (text?: string) => {
    const content = (text ?? input).trim();
    if (!content || streaming) return;

    setInput('');
    if (textareaRef.current) textareaRef.current.style.height = 'auto';

    const userMsg: Message = { id: Date.now().toString(), role: 'user', content, timestamp: new Date() };
    const aiId = (Date.now() + 1).toString();
    const aiMsg: Message = { id: aiId, role: 'assistant', content: '', timestamp: new Date() };

    // Update title from first user message
    setConversations((prev) =>
      prev.map((c) => {
        if (c.id !== activeId) return c;
        const title = c.messages.filter((m) => m.role === 'user').length === 0
          ? content.slice(0, 40) + (content.length > 40 ? '...' : '')
          : c.title;
        return { ...c, title, messages: [...c.messages, userMsg, aiMsg] };
      })
    );

    setStreaming(true);
    setApiKeyMissing(false);

    const history = active.messages
      .filter((m) => m.id !== 'welcome' && !m.id.startsWith('w-'))
      .concat(userMsg)
      .map(({ role, content }) => ({ role, content }));

    try {
      const controller = new AbortController();
      abortRef.current = controller;

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json();
        if (err.error?.includes('API key')) setApiKeyMissing(true);
        updateMessages(activeId, (msgs) =>
          msgs.map((m) => m.id === aiId ? { ...m, content: `Error: ${err.error}` } : m)
        );
        return;
      }

      const reader = res.body!.getReader();
      const decoder = new TextDecoder();
      let full = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        full += chunk;
        const snapshot = full;
        updateMessages(activeId, (msgs) =>
          msgs.map((m) => m.id === aiId ? { ...m, content: snapshot } : m)
        );
      }
    } catch (e: any) {
      if (e.name !== 'AbortError') {
        updateMessages(activeId, (msgs) =>
          msgs.map((m) => m.id === aiId ? { ...m, content: 'Sorry, something went wrong. Please try again.' } : m)
        );
      }
    } finally {
      setStreaming(false);
      abortRef.current = null;
    }
  }, [input, streaming, activeId, active]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  const showSuggestions = active.messages.length <= 2;

  return (
    <div className="relative min-h-screen bg-[#020b18] cyber-grid flex flex-col">
      <ParticleBackground />
      <Navbar />

      <div className="relative z-10 flex flex-1 pt-16 max-w-7xl mx-auto w-full">
        {/* ── Sidebar ── */}
        <>
          {/* Mobile overlay */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}

          <aside className={`
            fixed md:sticky top-16 z-30 h-[calc(100vh-4rem)]
            w-64 glass border-r border-cyan-500/10 flex flex-col
            transition-transform duration-300
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          `}>
            <div className="p-4 border-b border-cyan-500/10 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-cyan-400/60">Conversations</span>
              <button
                onClick={newChat}
                className="w-7 h-7 rounded-lg btn-cyber flex items-center justify-center"
                title="New chat"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-1">
              {conversations.map((c) => (
                <div
                  key={c.id}
                  className={`group flex items-center gap-2 px-3 py-2.5 rounded-lg cursor-pointer transition-all ${
                    c.id === activeId
                      ? 'bg-cyan-400/10 border border-cyan-400/20 text-cyan-400'
                      : 'hover:bg-slate-800/50 text-slate-400 hover:text-slate-200'
                  }`}
                  onClick={() => { setActiveId(c.id); setSidebarOpen(false); }}
                >
                  <BrainCircuit className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="text-xs truncate flex-1">{c.title}</span>
                  {conversations.length > 1 && (
                    <button
                      onClick={(e) => { e.stopPropagation(); deleteChat(c.id); }}
                      className="opacity-0 group-hover:opacity-100 text-slate-600 hover:text-red-400 transition-all"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-cyan-500/10">
              <p className="text-slate-600 text-xs leading-relaxed">
                ⚠ Educational use only. Not financial advice.
              </p>
            </div>
          </aside>
        </>

        {/* ── Main Chat Area ── */}
        <main className="flex-1 flex flex-col min-w-0 h-[calc(100vh-4rem)] sticky top-16">
          {/* Chat header */}
          <div className="glass border-b border-cyan-500/10 px-4 py-3 flex items-center gap-3">
            <button
              className="md:hidden text-slate-400 hover:text-cyan-400 p-1"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-purple-600/20 border border-cyan-400/30 flex items-center justify-center">
              <BrainCircuit className="w-4 h-4 text-cyan-400" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white">InvestMind AI</p>
              <p className="text-xs text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                Online &bull; Investment Mentor
              </p>
            </div>
          </div>

          {/* API key warning */}
          {apiKeyMissing && (
            <div className="mx-4 mt-3 p-3 rounded-xl border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold">OpenAI API Key Required</p>
                <p className="text-amber-400/70 mt-1">Add your <code>OPENAI_API_KEY</code> environment variable to enable AI responses.</p>
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-6 flex flex-col gap-5">
            {active.messages.map((msg) => (
              <MessageBubble key={msg.id} msg={msg} />
            ))}

            {streaming && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                  <BrainCircuit className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="msg-ai rounded-2xl rounded-tl-sm px-4">
                  <TypingDots />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions */}
          {showSuggestions && (
            <div className="px-4 pb-3">
              <p className="text-slate-600 text-xs mb-2 uppercase tracking-widest">Suggested questions</p>
              <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                {QUICK_SUGGESTIONS.map(({ icon: Icon, label, prompt }) => (
                  <button
                    key={label}
                    onClick={() => send(prompt)}
                    disabled={streaming}
                    className="flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium glass border border-slate-700/50 hover:border-cyan-400/30 text-slate-400 hover:text-cyan-400 transition-all disabled:opacity-50"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input area */}
          <div className="glass border-t border-cyan-500/10 p-4">
            <div className="flex gap-3 items-end max-w-4xl mx-auto">
              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => { setInput(e.target.value); autoResize(); }}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me about stocks, crypto, FOREX, or investing basics..."
                  rows={1}
                  disabled={streaming}
                  className="w-full bg-slate-900/80 border border-slate-700/50 focus:border-cyan-400/50 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder:text-slate-600 outline-none resize-none transition-all focus:shadow-[0_0_0_1px_rgba(0,240,255,0.2)] disabled:opacity-50"
                  style={{ minHeight: '48px', maxHeight: '160px' }}
                />
              </div>
              <button
                onClick={() => send()}
                disabled={streaming || !input.trim()}
                className="flex-shrink-0 w-12 h-12 rounded-xl btn-cyber flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-center text-slate-700 text-xs mt-2">
              InvestMind AI is for education only. Not financial advice. Always consult a registered advisor.
            </p>
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
