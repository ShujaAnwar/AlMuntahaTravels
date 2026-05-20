import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, User, Bot, Loader2, MessageSquarePlus } from 'lucide-react';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export default function ChatAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [history, setHistory] = useState<Message[]>([
    { role: 'model', text: 'Assalamu Alaikum! I am Muntaha AI. How can I help you with your spiritual journey today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMsg: Message = { role: 'user', text: message };
    setHistory(prev => [...prev, userMsg]);
    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, history })
      });
      const data = await response.json();
      
      if (data.text) {
        setHistory(prev => [...prev, { role: 'model', text: data.text }]);
      } else {
        setHistory(prev => [...prev, { role: 'model', text: 'Sorry, I am having some trouble. Please contact us on WhatsApp directly.' }]);
      }
    } catch (err) {
      setHistory(prev => [...prev, { role: 'model', text: 'Connection lost. Please try again or WhatsApp us.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed bottom-6 right-6 md:bottom-12 md:right-32 z-50 p-4 rounded-full shadow-2xl transition-all",
          isOpen ? "bg-red-500 scale-90" : "bg-emerald-deep hover:bg-emerald-900 scale-100"
        )}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        whileHover={{ y: -5 }}
      >
        {isOpen ? <X className="text-white" /> : <Bot className="text-gold-premium" />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 md:bottom-32 md:right-12 w-[90vw] md:w-[400px] h-[500px] glass-dark border border-white/10 rounded-3xl z-50 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-6 bg-emerald-deep/40 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gold-premium rounded-xl flex items-center justify-center text-black font-urdu text-2xl">م</div>
                <div>
                  <h3 className="text-white font-bold leading-none">Muntaha AI</h3>
                  <span className="text-[10px] text-gold-premium/80 uppercase tracking-widest font-bold">Spiritual Assistant</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[10px] text-white/40 uppercase font-bold">Online</span>
              </div>
            </div>

            {/* Chat Body */}
            <div 
              ref={scrollRef}
              className="flex-grow overflow-y-auto p-6 space-y-4 scroll-smooth"
            >
              {history.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={cn(
                    "flex gap-3",
                    msg.role === 'user' ? "flex-row-reverse" : "flex-row"
                  )}
                >
                  <div className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0",
                    msg.role === 'user' ? "bg-white/10" : "bg-gold-premium/20"
                  )}>
                    {msg.role === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-gold-premium" />}
                  </div>
                  <div className={cn(
                    "p-3 rounded-2xl max-w-[80%] text-sm",
                    msg.role === 'user' 
                      ? "bg-gold-premium text-black rounded-tr-none font-medium" 
                      : "bg-white/5 text-white/90 border border-white/5 rounded-tl-none"
                  )}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gold-premium/20 flex items-center justify-center">
                    <Loader2 size={16} className="text-gold-premium animate-spin" />
                  </div>
                  <div className="bg-white/5 p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-gold-premium/50 rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-gold-premium/50 rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-gold-premium/50 rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className="p-6 pt-2 bg-black/20 border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Umrah packages..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-white/20 focus:outline-none focus:border-gold-premium/50 transition-all text-sm"
                />
                <MessageSquarePlus className="absolute left-4 text-white/20" size={18} />
                <button
                  onClick={handleSend}
                  disabled={!message.trim() || isLoading}
                  className="absolute right-3 p-2 bg-gold-premium text-black rounded-xl hover:scale-105 transition-all disabled:opacity-50 disabled:scale-100"
                >
                  <Send size={18} />
                </button>
              </div>
              <p className="text-[10px] text-center text-white/30 mt-3 uppercase tracking-tighter">
                Powered by AL MUNTAHA AI • Real-time spiritual travel assistant
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
