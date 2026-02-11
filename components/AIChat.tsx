
import React, { useState, useRef, useEffect } from 'react';
import { getAIRecommendation } from '../services/geminiService';
import { ChatMessage } from '../types';

const AIChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Hello! I am your AI Design Assistant. Looking for a specific architectural style or firm in a certain city?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userText }]);
    setIsLoading(true);

    const response = await getAIRecommendation(userText);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      {isOpen ? (
        <div className="bg-white rounded-3xl shadow-2xl w-[320px] sm:w-[400px] h-[500px] border border-[#d2d2d7] flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="apple-glass border-b border-[#e5e5e7] p-4 flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="font-semibold text-[15px]">Design Assistant</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-[#86868b] hover:text-[#1d1d1f]">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#fbfbfd]">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-[14px] leading-relaxed ${
                  m.role === 'user' 
                    ? 'bg-[#0071e3] text-white rounded-tr-none' 
                    : 'bg-[#e5e5ea] text-[#1d1d1f] rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-[#e5e5ea] p-3 rounded-2xl rounded-tl-none">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce delay-75"></div>
                    <div className="w-1.5 h-1.5 bg-[#86868b] rounded-full animate-bounce delay-150"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-[#e5e5e7] bg-white">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about architects..."
                className="flex-1 bg-[#f5f5f7] border-none rounded-full px-4 py-2 text-[14px] focus:ring-2 focus:ring-[#0071e3] outline-none"
              />
              <button type="submit" className="bg-[#0071e3] text-white p-2 rounded-full hover:bg-[#0077ed] transition-colors">
                <svg className="w-5 h-5 rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 12 7-7 7 7"/><path d="M12 19V5"/></svg>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-[#0071e3] rounded-full shadow-xl flex items-center justify-center text-white hover:scale-105 transition-transform group"
        >
          <svg className="w-7 h-7 group-hover:rotate-12 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
        </button>
      )}
    </div>
  );
};

export default AIChat;
