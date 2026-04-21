"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface UserProp {
  user: {
    id: string;
    name?: string | null;
    email?: string | null;
    role?: string;
  };
}

interface Message {
  id: string;
  content: string;
  createdAt: string;
  senderName: string;
  senderRole: string;
  userId: string;
}

export function MessagesView({ user }: UserProp) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!loading) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const fetchMessages = async () => {
    try {
      const res = await fetch("/api/messages");
      const data = await res.json();
      if (data.messages) {
        setMessages(data.messages);
      }
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    const content = newMessage;
    setNewMessage(""); // Optimistic clear

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          content,
        }),
      });

      if (res.ok) {
        fetchMessages(); // Refresh immediately
      } else {
        alert("Failed to send message");
        setNewMessage(content); // Revert
      }
    } catch (error) {
      console.error("Error sending:", error);
      setNewMessage(content); // Revert
    } finally {
      setIsSending(false);
    }
  };

  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getRoleBadgeColor = (role: string) => {
    const r = role.toUpperCase();
    if (r === "ADMIN") return "bg-[#ffdad6] text-[#93000a]";
    if (r === "DOCTOR") return "bg-[#80f9c8] text-[#00513a]";
    return "bg-teal-100 text-teal-800"; // PATIENT
  };

  return (
    <div className="flex flex-col h-[calc(100vh-160px)] max-h-[800px] bg-white rounded-4xl shadow-sm border border-[#e0e3e5] overflow-hidden animate-in fade-in duration-300 relative">
      <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-[#005c55] via-[#80f9c8] to-[#0f766e]"></div>
      
      {/* Header */}
      <div className="px-8 py-6 border-b border-[#e0e3e5] bg-slate-50 flex items-center justify-between z-10">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[#005c55] rounded-full flex items-center justify-center text-white shadow-md">
            <span className="material-symbols-outlined">forum</span>
          </div>
          <div>
            <h2 className="text-xl font-bold font-headline text-[#191c1e]">Global Chat Room</h2>
            <p className="text-xs font-semibold text-[#3e4947] flex items-center gap-2 mt-1">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Live Discussion
            </p>
          </div>
        </div>
        <div className="hidden md:block px-4 py-2 bg-white rounded-full border border-slate-200 shadow-sm text-xs font-bold text-slate-500">
          Be respectful and professional in your communications.
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 bg-slate-50/50 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-[#005c55] border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center opacity-60">
            <span className="material-symbols-outlined text-6xl text-slate-300 mb-4">chat_bubble_outline</span>
            <p className="text-slate-500 font-medium font-body text-lg">No messages yet. Start the conversation!</p>
          </div>
        ) : (
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => {
              const isMine = msg.userId === user.id;
              const showAvatar = index === 0 || messages[index - 1].userId !== msg.userId;

              return (
                <motion.div 
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex flex-col ${isMine ? "items-end" : "items-start"}`}
                >
                  {showAvatar && (
                    <div className={`flex items-center gap-2 mb-1 ${isMine ? "flex-row-reverse" : "flex-row"} mt-4`}>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${getRoleBadgeColor(msg.senderRole)}`}>
                        {msg.senderRole}
                      </span>
                      <span className="text-xs font-bold text-slate-600">{isMine ? "You" : msg.senderName}</span>
                      <span className="text-[10px] font-semibold text-slate-400">{formatTime(msg.createdAt)}</span>
                    </div>
                  )}
                  <div className={`flex items-end gap-2 max-w-[85%] md:max-w-[70%] ${isMine ? "flex-row-reverse" : "flex-row"}`}>
                     {showAvatar && !isMine && (
                       <div className="w-8 h-8 rounded-full bg-teal-100 shrink-0 flex items-center justify-center text-teal-800 font-bold text-xs mb-1">
                         {msg.senderName.charAt(0).toUpperCase()}
                       </div>
                     )}
                     {showAvatar && isMine && (
                       <div className="w-8 h-8 rounded-full bg-[#005c55] shrink-0 flex items-center justify-center text-white font-bold text-xs mb-1">
                         {msg.senderName.charAt(0).toUpperCase()}
                       </div>
                     )}
                     {!showAvatar && <div className="w-8 shrink-0"></div>}

                     <div 
                      className={`px-5 py-3.5 shadow-sm text-sm font-medium leading-relaxed ${
                        isMine 
                          ? "bg-[#005c55] text-white rounded-3xl rounded-br-lg" 
                          : "bg-white border border-slate-100 text-slate-700 rounded-3xl rounded-bl-lg"
                      }`}
                      style={{ wordBreak: 'break-word' }}
                     >
                        {msg.content}
                     </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
        <div ref={messagesEndRef} className="h-1" />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-[#e0e3e5]">
        <form onSubmit={handleSendMessage} className="flex items-center gap-3 max-w-5xl mx-auto">
          <div className="flex-1 relative flex items-center">
            <span className="material-symbols-outlined absolute left-4 text-slate-400">sentiment_satisfied</span>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to the global board..."
              className="w-full bg-slate-100 border-none rounded-full py-4 pl-12 pr-6 focus:ring-2 focus:ring-[#005c55] focus:bg-white transition-all text-sm font-medium outline-none shadow-inner"
            />
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim() || isSending}
            className="w-14 h-14 bg-[#005c55] hover:bg-[#0f766e] disabled:opacity-50 disabled:hover:bg-[#005c55] text-white rounded-full flex items-center justify-center shadow-lg shadow-[#005c55]/20 transition-all hover:scale-105 active:scale-95 shrink-0"
          >
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              {isSending ? "hourglass_empty" : "send"}
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}
