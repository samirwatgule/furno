import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane } from 'react-icons/fa';
import { HiChatAlt2, HiSparkles } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const WA_NUMBER = '918045678901';
const WA_MSG = encodeURIComponent("Hi! I'm interested in interior design services from FurnoTech. Can you help me?");

const QUICK_REPLIES = [
  { label: '🏠 Full Home Interior', key: 'full_home' },
  { label: '🍳 Modular Kitchen',    key: 'kitchen'   },
  { label: '🗄️ Wardrobe Design',   key: 'wardrobe'  },
  { label: '💰 Get Price Estimate', key: 'estimate'  },
  { label: '📅 Book Consultation',  key: 'consult'   },
];

const BOT_RESPONSES = {
  full_home: { text: 'Our full home interiors start at ₹3.62L for 1 BHK with a 45-day delivery guarantee. Want me to book a free consultation for you?', link: null },
  kitchen:   { text: 'Modular kitchens from ₹1.7L* with 750+ design options! Our experts match your style and budget. Shall I show you designs?', link: '/design-ideas/modular-kitchen' },
  wardrobe:  { text: 'Custom wardrobes from ₹8,000/running ft — we maximise every inch. Want to explore wardrobe designs?', link: '/design-ideas/wardrobe' },
  estimate:  { text: 'Get an instant price estimate using our smart calculator. Choose room type, material & city in seconds! 🎯', link: '/estimate' },
  consult:   { text: "Great choice! A free 30-min consultation with our top designer — no commitment. Let me set it up for you! 🎨", link: '/contact' },
};

// ── Typing dots indicator ─────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="flex justify-start gap-2">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#E8733A] to-[#d4621f] flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5 shadow-sm">
        F
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-md flex items-center gap-1"
        style={{ background: '#fff', border: '1px solid #EAECF0', boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
      >
        {[0, 1, 2].map(i => (
          <motion.span key={i}
            className="w-2 h-2 rounded-full"
            style={{ background: '#E8733A' }}
            animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
}

export default function FloatingChat() {
  const [chatOpen, setChatOpen]   = useState(false);
  const [messages, setMessages]   = useState([
    { from: 'bot', text: "Hi there! 👋 I'm Furno, your personal design assistant. What can I help you with today?" },
  ]);
  const [input, setInput]         = useState('');
  const [showQuick, setShowQuick] = useState(true);
  const [typing, setTyping]       = useState(false);
  const messagesEndRef            = useRef(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (chatOpen) {
      setTimeout(scrollToBottom, 60);
    }
  }, [messages, chatOpen, typing, scrollToBottom]);

  function sendMessage(text, key) {
    const responseData = BOT_RESPONSES[key] || {
      text: "Thanks for your message! Our design team will get back within 2 hours. For instant help, WhatsApp us! 💬",
      link: null,
    };
    setMessages(prev => [...prev, { from: 'user', text }]);
    setShowQuick(false);
    setTyping(true);
    // Simulate bot typing delay
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { from: 'bot', text: responseData.text, link: responseData.link }]);
    }, 1200 + Math.random() * 600);
  }

  function handleInputSend() {
    const trimmed = input.trim();
    if (!trimmed) return;
    setInput('');
    sendMessage(trimmed, null);
  }

  return (
    <>
      {/* ── Chat popup — positioned absolutely above the buttons ── */}
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 16 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
            className="fixed z-50 w-[330px] sm:w-[370px] flex flex-col rounded-3xl overflow-hidden"
            style={{
              bottom: 'calc(6rem + 80px)',
              right: '1.5rem',
              maxHeight: 'min(480px, calc(100vh - 200px))',
              boxShadow: '0 24px 80px rgba(14,22,55,0.22), 0 0 0 1px rgba(255,255,255,0.06)',
            }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-5 py-4 flex-shrink-0 relative overflow-hidden"
              style={{ background: 'linear-gradient(135deg, #0E1637 0%, #1B2A4A 60%, #243665 100%)' }}
            >
              {/* Decorative orb */}
              <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle, rgba(232,115,58,0.3) 0%, transparent 70%)' }}
              />

              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                  <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-black text-base"
                    style={{ background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)', boxShadow: '0 0 0 3px rgba(232,115,58,0.25)' }}
                  >
                    F
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-[#1B2A4A] bg-green-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <p className="text-sm font-bold text-white">Furno Assistant</p>
                    <HiSparkles className="w-3.5 h-3.5" style={{ color: '#E8733A' }} />
                  </div>
                  <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>
                    AI-powered · replies instantly
                  </p>
                </div>
              </div>

              <button onClick={() => setChatOpen(false)}
                className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all hover:bg-white/15 active:scale-90"
                style={{ color: 'rgba(255,255,255,0.5)' }}
              >
                <FaTimes className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* ── Messages area ── */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0"
              style={{
                background: 'linear-gradient(180deg, #F0F2FA 0%, #F6F7FB 100%)',
                scrollbarWidth: 'thin',
                scrollbarColor: '#E5E7EB transparent',
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex ${msg.from === 'user' ? 'justify-end' : 'justify-start'} gap-2`}
                >
                  {msg.from === 'bot' && (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 mt-0.5 shadow-sm"
                      style={{ background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)' }}
                    >
                      F
                    </div>
                  )}
                  <div className="max-w-[78%]">
                    <motion.div
                      className="px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed"
                      style={msg.from === 'user'
                        ? {
                            background: 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)',
                            color: '#fff',
                            borderBottomRightRadius: '6px',
                            boxShadow: '0 4px 14px rgba(232,115,58,0.35)',
                          }
                        : {
                            background: '#fff',
                            color: '#374151',
                            borderBottomLeftRadius: '6px',
                            border: '1px solid #EAECF0',
                            boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                          }
                      }
                    >
                      {msg.text}
                    </motion.div>
                    {msg.link && (
                      <Link to={msg.link} onClick={() => setChatOpen(false)}
                        className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-bold px-3 py-1 rounded-full transition-all hover:shadow-md active:scale-95"
                        style={{ background: 'rgba(232,115,58,0.1)', color: '#E8733A', border: '1px solid rgba(232,115,58,0.25)' }}
                      >
                        View Now →
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    key="typing"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.2 }}
                  >
                    <TypingIndicator />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Quick reply chips */}
              <AnimatePresence>
                {showQuick && !typing && (
                  <motion.div
                    key="quick"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="flex flex-col gap-1.5 pt-1"
                  >
                    {QUICK_REPLIES.map((q, i) => (
                      <motion.button
                        key={q.key}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.06 }}
                        onClick={() => sendMessage(q.label, q.key)}
                        className="text-left text-xs font-semibold px-3.5 py-2.5 rounded-xl transition-all hover:-translate-x-0.5 hover:shadow-md active:scale-98"
                        style={{ background: '#fff', color: '#E8733A', border: '1.5px solid rgba(232,115,58,0.3)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
                      >
                        {q.label}
                      </motion.button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              <div ref={messagesEndRef} />
            </div>

            {/* ── Input bar ── */}
            <div className="flex gap-2 px-3 py-3 flex-shrink-0"
              style={{ background: '#fff', borderTop: '1px solid #F0F2F5' }}
            >
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleInputSend()}
                placeholder="Type a message..."
                className="flex-1 text-sm px-4 py-2.5 rounded-xl border-2 outline-none transition-all"
                style={{ borderColor: input ? '#E8733A' : '#E5E7EB', color: '#374151', background: '#F6F7FB' }}
              />
              <motion.button
                onClick={handleInputSend}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 transition-all"
                style={{
                  background: input.trim() ? 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)' : '#E5E7EB',
                  boxShadow: input.trim() ? '0 4px 14px rgba(232,115,58,0.4)' : 'none',
                }}
              >
                <FaPaperPlane className="w-3.5 h-3.5" style={{ color: input.trim() ? '#fff' : '#9CA3AF' }} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Floating buttons ── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">

        {/* WhatsApp */}
        <motion.a
          href={`https://wa.me/${WA_NUMBER}?text=${WA_MSG}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.12, y: -2 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Chat on WhatsApp"
          className="flex items-center justify-center rounded-full text-white shadow-lg relative"
          style={{ width: 52, height: 52, background: '#25D366', boxShadow: '0 4px 20px rgba(37,211,102,0.45)' }}
        >
          <FaWhatsapp className="w-6 h-6" />
          {/* Tooltip */}
          <motion.span
            initial={{ opacity: 0, x: 6 }}
            whileHover={{ opacity: 1, x: 0 }}
            className="absolute right-14 whitespace-nowrap text-xs font-semibold px-2.5 py-1.5 rounded-xl pointer-events-none"
            style={{ background: '#25D366', color: '#fff', boxShadow: '0 4px 12px rgba(37,211,102,0.3)' }}
          >
            WhatsApp Us
          </motion.span>
        </motion.a>

        {/* Chat toggle */}
        <motion.button
          onClick={() => setChatOpen(v => !v)}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.92 }}
          aria-label={chatOpen ? 'Close chat' : 'Chat with us'}
          className="relative flex items-center justify-center rounded-full text-white"
          style={{
            width: 56,
            height: 56,
            background: chatOpen
              ? 'linear-gradient(135deg, #E8733A 0%, #d4621f 100%)'
              : 'linear-gradient(135deg, #1B2A4A 0%, #243665 100%)',
            boxShadow: chatOpen
              ? '0 6px 28px rgba(232,115,58,0.55)'
              : '0 6px 28px rgba(27,42,74,0.45)',
            transition: 'background 0.3s, box-shadow 0.3s',
          }}
        >
          <AnimatePresence mode="wait">
            {chatOpen ? (
              <motion.span key="x"
                initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.18 }}
              >
                <FaTimes className="w-5 h-5" />
              </motion.span>
            ) : (
              <motion.span key="chat"
                initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.18 }}
              >
                <HiChatAlt2 className="w-6 h-6" />
              </motion.span>
            )}
          </AnimatePresence>

          {/* Pulse ring (when closed) */}
          {!chatOpen && (
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{ border: '2px solid rgba(27,42,74,0.5)' }}
              animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          )}

          {/* Unread badge (shows when chat has never been opened) */}
          {!chatOpen && messages.length <= 1 && (
            <motion.span
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 1 }}
              className="absolute -top-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-black text-white"
              style={{ background: '#E8733A' }}
            >
              1
            </motion.span>
          )}
        </motion.button>
      </div>
    </>
  );
}
