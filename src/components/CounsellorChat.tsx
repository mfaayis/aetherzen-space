import React, { useState, useRef, useEffect } from "react";
import { ChatMessage } from "../types";
import { Send, HelpCircle, Bot, User, Sparkles, RefreshCw, Zap } from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const SHORTCUTS = [
  "Is Math compulsory to prepare for B.Arch (NATA)?",
  "Commerce alternatives without CA?",
  "Explain IIM's IPMAT Integrated Program",
  "How does JoSAA counseling work?",
  "Science stream jobs other than Engineering & MBBS?",
];

export default function CounsellorChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-msg",
      sender: "ai",
      text: "👋 Pranam! I am **MargDarshak**, your personal AI Career Counselor.\n\nI specialise in post-12th (+2) academic opportunities across India — from JEE, NEET and CUET to CLAT, IPMAT, design entrances, and more.\n\nClick any shortcut below or ask me anything directly.",
      timestamp: "Just Now",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      const parent = scrollRef.current.parentElement;
      if (parent) {
        parent.scrollTop = parent.scrollHeight;
      }
    }
  }, [messages]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      sender: "user",
      text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const res = await fetch("/api/advisor/counselor-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });
      if (!res.ok) throw new Error("Server error");
      const data = await res.json();
      setMessages(prev => [
        ...prev,
        {
          id: "ai-" + Date.now(),
          sender: "ai",
          text: data.text || "Unable to fetch a response. Please retry.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } catch {
      setMessages(prev => [
        ...prev,
        {
          id: "err-" + Date.now(),
          sender: "ai",
          text: "❗ **Connection issue.** Ensure the API key is configured in your .env file, then retry.",
          timestamp: "Just Now",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const val = input.trim();
    if (!val) return;
    setInput("");
    sendMessage(val);
  };

  /* ── Styles ── */
  const cardBase: React.CSSProperties = {
    background: "rgba(255,255,255,0.025)",
    border: "1px solid rgba(255,255,255,0.09)",
    borderRadius: "1.25rem",
    overflow: "hidden",
  };

  return (
    <div
      id="counsellor-chat-root"
      style={{
        display: "grid",
        gridTemplateColumns: "260px 1fr",
        gap: 16,
        minHeight: 560,
      }}
    >
      {/* ── Left: Shortcuts ── */}
      <div
        style={{
          ...cardBase,
          display: "flex",
          flexDirection: "column",
          padding: "24px 20px",
          gap: 16,
        }}
      >
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 14, borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <Zap size={13} color="rgba(255,255,255,0.4)" />
          <span style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,0.28)" }}>
            Quick Queries
          </span>
        </div>

        <p style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", lineHeight: 1.65 }}>
          Tap any prompt below to instantly ask MargDarshak.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {SHORTCUTS.map((p, i) => (
            <button
              key={i}
              id={`shortcut-${i}`}
              onClick={() => sendMessage(p)}
              disabled={isLoading}
              style={{
                textAlign: "left",
                padding: "11px 14px",
                borderRadius: "0.875rem",
                border: "1px solid rgba(255,255,255,0.07)",
                background: "rgba(255,255,255,0.02)",
                color: "rgba(255,255,255,0.55)",
                fontSize: "0.72rem",
                lineHeight: 1.5,
                fontFamily: "'Epilogue', sans-serif",
                fontWeight: 500,
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.4 : 1,
                transition: "all 0.2s ease",
              }}
              onMouseEnter={e => {
                if (!isLoading) {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                  e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                }
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
                e.currentTarget.style.background = "rgba(255,255,255,0.02)";
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* ── Right: Chat area ── */}
      <div
        style={{
          ...cardBase,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Top bar */}
        <div style={{
          padding: "16px 22px",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(255,255,255,0.02)",
          flexShrink: 0,
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Bot size={15} color="rgba(255,255,255,0.7)" />
            </div>
            <div>
              <div style={{ fontSize: "0.82rem", fontWeight: 700, color: "#fff", letterSpacing: "-0.01em" }}>
                MargDarshak
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 1 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#10b981", display: "inline-block", animation: "ns-spin 2s linear infinite", boxShadow: "0 0 4px #10b981" }} />
                <span style={{ fontSize: "0.58rem", fontFamily: "'JetBrains Mono', monospace", color: "rgba(255,255,255,0.3)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                  Live Academic Counselor
                </span>
              </div>
            </div>
          </div>
          <Sparkles size={15} color="rgba(255,255,255,0.25)" />
        </div>

        {/* Messages */}
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 16,
          minHeight: 380,
          maxHeight: 420,
        }}>
          {messages.map((m) => {
            const isAI = m.sender === "ai";
            return (
              <div
                key={m.id}
                style={{
                  display: "flex",
                  gap: 10,
                  maxWidth: "82%",
                  alignSelf: isAI ? "flex-start" : "flex-end",
                  flexDirection: isAI ? "row" : "row-reverse",
                  alignItems: "flex-start",
                }}
              >
                {/* Avatar */}
                <div style={{
                  width: 30, height: 30,
                  borderRadius: "50%",
                  flexShrink: 0,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: isAI
                    ? "rgba(255,255,255,0.06)"
                    : "rgba(var(--color-accent-rgb, 0,242,254), 0.15)",
                  border: isAI
                    ? "1px solid rgba(255,255,255,0.1)"
                    : "1px solid rgba(var(--color-accent-rgb, 0,242,254), 0.3)",
                }}>
                  {isAI
                    ? <Bot size={14} color="rgba(255,255,255,0.6)" />
                    : <User size={14} color="var(--color-accent, #00f2fe)" />
                  }
                </div>

                {/* Bubble */}
                <div>
                  <div style={{
                    padding: "12px 15px",
                    borderRadius: isAI ? "4px 14px 14px 14px" : "14px 4px 14px 14px",
                    fontSize: "0.78rem",
                    lineHeight: 1.7,
                    whiteSpace: "pre-line",
                    background: isAI
                      ? "rgba(255,255,255,0.04)"
                      : "rgba(var(--color-accent-rgb, 0,242,254), 0.1)",
                    border: isAI
                      ? "1px solid rgba(255,255,255,0.08)"
                      : "1px solid rgba(var(--color-accent-rgb, 0,242,254), 0.2)",
                    color: isAI ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.9)",
                  }}>
                    {isAI ? (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                          table: ({node, ...props}) => <div style={{overflowX: 'auto'}}><table style={{ borderCollapse: 'collapse', width: '100%', margin: '12px 0', fontSize: '0.75rem', border: '1px solid rgba(255,255,255,0.1)' }} {...props} /></div>,
                          th: ({node, ...props}) => <th style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '10px 12px', background: 'rgba(255,255,255,0.03)', textAlign: 'left', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }} {...props} />,
                          td: ({node, ...props}) => <td style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '10px 12px' }} {...props} />,
                          a: ({node, ...props}) => <a style={{ color: '#00f2fe', textDecoration: 'none', borderBottom: '1px dashed rgba(0,242,254,0.4)' }} target="_blank" rel="noopener noreferrer" {...props} />,
                          p: ({node, ...props}) => <p style={{ margin: '0 0 12px 0', lineHeight: '1.6' }} {...props} />,
                          ul: ({node, ...props}) => <ul style={{ margin: '0 0 12px 0', paddingLeft: '22px', listStyleType: 'disc' }} {...props} />,
                          ol: ({node, ...props}) => <ol style={{ margin: '0 0 12px 0', paddingLeft: '22px' }} {...props} />,
                          li: ({node, ...props}) => <li style={{ marginBottom: '6px' }} {...props} />,
                          h1: ({node, ...props}) => <h1 style={{ fontSize: '1.2rem', margin: '18px 0 12px', color: '#fff', fontWeight: 600 }} {...props} />,
                          h2: ({node, ...props}) => <h2 style={{ fontSize: '1.1rem', margin: '18px 0 10px', color: '#fff', fontWeight: 600 }} {...props} />,
                          h3: ({node, ...props}) => <h3 style={{ fontSize: '0.95rem', margin: '16px 0 8px', color: '#fff', fontWeight: 600 }} {...props} />,
                          h4: ({node, ...props}) => <h4 style={{ fontSize: '0.85rem', margin: '12px 0 6px', color: '#fff', fontWeight: 600 }} {...props} />,
                          strong: ({node, ...props}) => <strong style={{ color: 'rgba(255,255,255,0.95)', fontWeight: 600 }} {...props} />,
                          hr: ({node, ...props}) => <hr style={{ border: 'none', borderTop: '1px solid rgba(255,255,255,0.1)', margin: '18px 0' }} {...props} />,
                          blockquote: ({node, ...props}) => <blockquote style={{ margin: '0 0 12px 0', paddingLeft: '14px', borderLeft: '2px solid rgba(0,242,254,0.5)', color: 'rgba(255,255,255,0.6)' }} {...props} />,
                          code: ({node, inline, ...props}: any) => inline 
                            ? <code style={{ background: 'rgba(255,255,255,0.08)', padding: '2px 4px', borderRadius: '4px', fontSize: '0.85em', fontFamily: 'monospace' }} {...props} />
                            : <code style={{ display: 'block', background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '6px', overflowX: 'auto', fontSize: '0.85em', fontFamily: 'monospace', margin: '0 0 12px 0' }} {...props} />
                        }}
                      >
                        {m.text}
                      </ReactMarkdown>
                    ) : (
                      <span style={{ whiteSpace: "pre-line" }}>{m.text}</span>
                    )}
                  </div>
                  <span style={{
                    display: "block",
                    fontSize: "0.55rem",
                    fontFamily: "'JetBrains Mono', monospace",
                    color: "rgba(255,255,255,0.2)",
                    marginTop: 5,
                    paddingLeft: isAI ? 2 : 0,
                    textAlign: isAI ? "left" : "right",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                  }}>
                    {m.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, alignSelf: "flex-start" }}>
              <div style={{
                width: 30, height: 30, borderRadius: "50%",
                background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <RefreshCw size={13} color="rgba(255,255,255,0.5)" style={{ animation: "ns-spin 1s linear infinite" }} />
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 5,
                padding: "10px 14px",
                borderRadius: "4px 14px 14px 14px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}>
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "rgba(255,255,255,0.3)",
                      animation: `ns-bounce 1.2s ${i * 0.2}s ease-in-out infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>

        {/* Input bar */}
        <form
          onSubmit={handleSubmit}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.07)",
            padding: "14px 18px",
            display: "flex",
            gap: 10,
            background: "rgba(255,255,255,0.02)",
            flexShrink: 0,
          }}
        >
          <input
            id="chat-input-text"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Type your concern here… (e.g., 'What marks are needed to clear NID cutoff?')"
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "0.875rem",
              padding: "11px 16px",
              fontSize: "0.78rem",
              color: "#fff",
              fontFamily: "'Epilogue', sans-serif",
              outline: "none",
              transition: "border-color 0.2s ease",
            }}
            onFocus={e => (e.currentTarget.style.borderColor = "rgba(var(--color-accent-rgb,0,242,254),0.5)")}
            onBlur={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)")}
          />
          <button
            id="chat-submit-btn"
            type="submit"
            disabled={isLoading || !input.trim()}
            style={{
              width: 44, height: 44,
              borderRadius: "0.875rem",
              border: "1px solid rgba(255,255,255,0.12)",
              background: !input.trim() || isLoading
                ? "rgba(255,255,255,0.04)"
                : "rgba(var(--color-accent-rgb,0,242,254),0.12)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: isLoading || !input.trim() ? "not-allowed" : "pointer",
              transition: "all 0.2s ease",
              flexShrink: 0,
            }}
            onMouseEnter={e => {
              if (!isLoading && input.trim()) {
                e.currentTarget.style.background = "rgba(var(--color-accent-rgb,0,242,254),0.2)";
                e.currentTarget.style.borderColor = "rgba(var(--color-accent-rgb,0,242,254),0.4)";
              }
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = !input.trim() || isLoading
                ? "rgba(255,255,255,0.04)"
                : "rgba(var(--color-accent-rgb,0,242,254),0.12)";
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            }}
          >
            <Send size={15} color={isLoading || !input.trim() ? "rgba(255,255,255,0.2)" : "var(--color-accent,#00f2fe)"} />
          </button>
        </form>
      </div>

      {/* Bounce keyframes */}
      <style>{`
        @keyframes ns-bounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.3; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
