"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Send, Bot, AlertCircle } from "lucide-react";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export default function CounselorPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "init", role: "ai", content: "Hello! I am your AI Career Counselor powered by Gemini. What questions do you have about your post-12th journey?" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    setError(null);

    const userMessage: Message = { id: Date.now().toString(), role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: "ai", content: data.text }]);
    } catch (err: any) {
      setError(err.message);
      // Remove the user message if it failed, or just show error.
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <main className="min-h-screen pt-32 pb-16 px-6 z-10 relative bg-black/50 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8 text-center"
        >
          <h1 className="text-4xl md:text-6xl font-heading font-bold uppercase tracking-tighter text-white">
            AI Counselor
          </h1>
          <p className="text-neutral-400 font-sans text-lg mt-2">
            Ask anything about streams, courses, and entrance exams. Powered by Gemini.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full h-[65vh] glass-panel bg-black/40 rounded-3xl border border-white/10 flex flex-col overflow-hidden shadow-2xl"
        >
          {error && (
            <div className="bg-red-500/20 border-b border-red-500/50 p-4 flex items-center justify-center gap-2 text-red-400 font-sans text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 font-sans no-scrollbar">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {msg.role === "ai" && (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mr-3 mt-1 shrink-0">
                    <Bot size={16} className="text-blue-400" />
                  </div>
                )}
                <div className={`max-w-[85%] md:max-w-[75%] rounded-3xl px-6 py-4 ${
                  msg.role === "user" 
                    ? "bg-white text-black rounded-tr-sm" 
                    : "bg-white/5 border border-white/10 text-neutral-200 rounded-tl-sm"
                }`}>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start items-center">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/50 flex items-center justify-center mr-3 shrink-0">
                  <Bot size={16} className="text-blue-400" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-3xl rounded-tl-sm px-6 py-5 flex items-center gap-1.5">
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0 }} className="w-2 h-2 bg-neutral-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.2 }} className="w-2 h-2 bg-neutral-400 rounded-full" />
                  <motion.div animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 0.6, delay: 0.4 }} className="w-2 h-2 bg-neutral-400 rounded-full" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-white/10 bg-white/5">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center max-w-3xl mx-auto"
            >
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message the Counselor..."
                className="w-full bg-black/50 border border-white/20 rounded-full py-4 pl-6 pr-14 text-base text-white placeholder-neutral-500 focus:outline-none focus:border-white/50 transition-colors font-sans shadow-inner"
              />
              <button
                type="submit"
                disabled={!input.trim() || isTyping}
                className="absolute right-2 w-10 h-10 rounded-full bg-white text-black flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-neutral-200 transition-colors"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
