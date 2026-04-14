import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot, User, Sparkles, RotateCcw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  text: string;
}

const SUGGESTED_QUESTIONS = [
  'Tell me about Ayush',
  'What projects has he built?',
  'What are his skills?',
  'How can I contact him?',
  'What certifications does he have?',
  'Tell me about his hackathon experience',
];

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2">
      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
        <Bot className="w-3.5 h-3.5 text-primary" />
      </div>
      <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-card border border-border">
        <div className="flex gap-1 items-center h-4">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-primary"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.22, ease: 'easeOut' as const }}
      className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
        {isUser ? (
          <User className="w-3.5 h-3.5 text-primary" />
        ) : (
          <Bot className="w-3.5 h-3.5 text-primary" />
        )}
      </div>

      <div
        className={`max-w-[80%] px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? 'rounded-2xl rounded-br-sm bg-primary text-background font-medium'
            : 'rounded-2xl rounded-bl-sm bg-card border border-border text-foreground'
        }`}
        style={isUser ? { boxShadow: '0 0 12px rgba(0,212,255,0.25)' } : {}}
      >
        {isUser ? (
          <span>{msg.text}</span>
        ) : (
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-1 last:mb-0">{children}</p>,
              strong: ({ children }) => (
                <strong className="text-primary font-semibold">{children}</strong>
              ),
              a: ({ href, children }) => (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline underline-offset-2 hover:opacity-80 transition-opacity"
                >
                  {children}
                </a>
              ),
              ul: ({ children }) => <ul className="mt-1 space-y-0.5 pl-1">{children}</ul>,
              li: ({ children }) => (
                <li className="flex items-start gap-1.5 text-xs">
                  <span className="text-primary mt-0.5 flex-shrink-0">•</span>
                  <span>{children}</span>
                </li>
              ),
            }}
          >
            {msg.text}
          </ReactMarkdown>
        )}
      </div>
    </motion.div>
  );
}

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Hi! 👋 I'm Ayush's assistant. Ask me anything about his background, projects, skills, or how to get in touch!",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setTooltipVisible(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) {
      setTooltipVisible(false);
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || loading) return;
    setShowSuggestions(false);

    const userMsg: Message = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: text.trim(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text.trim() }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };

      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: data.reply ?? data.error ?? 'Sorry, something went wrong.',
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: `a-${Date.now()}`,
          role: 'assistant',
          text: "Oops! Couldn't connect. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const resetChat = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: "Hi! 👋 I'm Ayush's assistant. Ask me anything about his background, projects, skills, or how to get in touch!",
      },
    ]);
    setShowSuggestions(true);
    setInput('');
  };

  return (
    <>
      {/* Chat window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.88, y: 16 }}
            transition={{ duration: 0.28, ease: 'easeOut' as const }}
            className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl border border-border overflow-hidden"
            style={{
              width: 'min(380px, calc(100vw - 2rem))',
              height: '500px',
              background: 'rgba(10,10,20,0.97)',
              backdropFilter: 'blur(24px)',
              boxShadow:
                '0 0 0 1px rgba(0,212,255,0.1), 0 0 40px rgba(0,212,255,0.1), 0 24px 64px rgba(0,0,0,0.7)',
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-4 py-3 border-b border-border flex-shrink-0"
              style={{
                background:
                  'linear-gradient(135deg, rgba(0,212,255,0.06) 0%, rgba(124,58,237,0.06) 100%)',
              }}
            >
              <div className="relative flex-shrink-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, rgba(0,212,255,0.2), rgba(124,58,237,0.2))',
                    border: '1px solid rgba(0,212,255,0.3)',
                  }}
                >
                  <Bot className="w-4 h-4 text-primary" />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-400 border-2 border-background" />
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground font-mono leading-tight">
                  Ayush's Assistant
                </p>
                <p className="text-xs text-green-400 font-mono">● Online</p>
              </div>

              <button
                onClick={resetChat}
                title="Reset conversation"
                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setOpen(false)}
                className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                aria-label="Close chat"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg) => (
                <MessageBubble key={msg.id} msg={msg} />
              ))}

              <AnimatePresence>
                {showSuggestions && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                    className="flex flex-col gap-2 mt-1"
                  >
                    <p className="text-xs text-muted-foreground font-mono text-center">
                      — try asking —
                    </p>
                    <div className="flex flex-wrap gap-1.5 justify-center">
                      {SUGGESTED_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => sendMessage(q)}
                          className="text-xs px-3 py-1.5 rounded-full border border-primary/25 text-primary bg-primary/5 hover:bg-primary/15 transition-colors font-mono"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {loading && <TypingIndicator />}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2 px-3 py-3 border-t border-border flex-shrink-0"
              style={{ background: 'rgba(0,0,0,0.25)' }}
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about Ayush..."
                maxLength={500}
                disabled={loading}
                className="flex-1 bg-muted/40 border border-border rounded-xl px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
              />
              <motion.button
                type="submit"
                disabled={!input.trim() || loading}
                whileTap={{ scale: 0.9 }}
                className="w-9 h-9 rounded-xl flex items-center justify-center text-background transition-all disabled:opacity-35 disabled:cursor-not-allowed flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
                  boxShadow: input.trim() ? '0 0 14px rgba(0,212,255,0.45)' : 'none',
                }}
                aria-label="Send"
              >
                <Send className="w-3.5 h-3.5" />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* FAB button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center text-white shadow-xl"
        style={{
          background: 'linear-gradient(135deg, #00d4ff, #7c3aed)',
          boxShadow: open
            ? '0 4px 20px rgba(0,0,0,0.4)'
            : '0 0 28px rgba(0,212,255,0.55), 0 0 56px rgba(0,212,255,0.2)',
        }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.18 }}
            >
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.18 }}
              className="relative"
            >
              <MessageCircle className="w-5 h-5" />
              <motion.span
                className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-green-400 border-2 border-white"
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 2.2, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Pulse ring */}
      <AnimatePresence>
        {!open && (
          <motion.div
            key="pulse"
            className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full pointer-events-none"
            style={{ background: 'rgba(0,212,255,0.18)' }}
            animate={{ scale: [1, 1.7, 1.7], opacity: [0.5, 0, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: 'easeOut' as const }}
          />
        )}
      </AnimatePresence>

      {/* Tooltip hint */}
      <AnimatePresence>
        {tooltipVisible && !open && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-8 right-[4.5rem] z-40 pointer-events-none"
          >
            <div
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-mono text-primary border border-primary/30 bg-card whitespace-nowrap"
              style={{ boxShadow: '0 0 16px rgba(0,212,255,0.15)' }}
            >
              <Sparkles className="w-3 h-3 flex-shrink-0" />
              Ask me about Ayush!
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
