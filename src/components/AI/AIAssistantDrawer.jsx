import React, { useState } from 'react';
import { Sparkles, Send, X, Bot, User, Loader2, Lightbulb, MessageSquare } from 'lucide-react';
import { askPlanningAssistant } from '../../services/gemini.js';

const QUICK_PROMPTS = [
  'Why is this location ranked #1?',
  'Compare the top 2 candidate locations',
  'What happens if we add 2 more charging stations?',
  'Summarize this deployment plan for state regulators'
];

export default function AIAssistantDrawer({
  isOpen,
  onClose,
  selectedCandidate,
  optimizationResult,
  cityData
}) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: `Hello! I am **ChargeOpt AI Planning Assistant**.

I can explain why specific sites were selected in **${cityData.name}**, breakdown trade-offs between coverage vs utilization, and synthesize executive operator summaries using our deterministic MCLP-Greedy optimization engine.`
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSend = async (textToSend) => {
    const query = textToSend || input;
    if (!query.trim() || isLoading) return;

    const userMsg = { role: 'user', text: query };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const reply = await askPlanningAssistant({
        prompt: query,
        candidate: selectedCandidate,
        optimizationResult,
        cityData,
        history: messages
      });

      setMessages(prev => [...prev, { role: 'assistant', text: reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { role: 'assistant', text: 'Sorry, I encountered an error. Please try again.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[440px] bg-dark-900 border-l border-slate-700/80 shadow-2xl flex flex-col animate-slide-left">
      {/* Header */}
      <div className="p-4 border-b border-slate-800 bg-dark-850/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-cyan-500 flex items-center justify-center shadow-glow-emerald">
            <Sparkles className="w-4 h-4 text-dark-950 fill-dark-950" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-1.5">
              ChargeOpt AI Assistant
            </h3>
            <p className="text-[10px] text-emerald-400 font-mono">Context: {cityData.name} • Live Scenario Active</p>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="p-3 border-b border-slate-800/80 bg-dark-950/40">
        <div className="flex items-center gap-1 text-[10px] uppercase font-bold text-slate-400 mb-2">
          <Lightbulb className="w-3 h-3 text-amber-400" />
          <span>Recommended Questions:</span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {QUICK_PROMPTS.map((prompt, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSend(prompt)}
              className="text-[11px] bg-dark-850 hover:bg-slate-800 border border-slate-700/70 text-slate-300 hover:text-emerald-300 px-2.5 py-1 rounded-lg transition-colors text-left"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Body */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2.5 ${
              msg.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            {msg.role === 'assistant' && (
              <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Bot className="w-3.5 h-3.5 text-emerald-400" />
              </div>
            )}

            <div
              className={`p-3 rounded-2xl max-w-[85%] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-emerald-600 text-dark-950 font-medium rounded-tr-none'
                  : 'bg-dark-850 border border-slate-800 text-slate-200 rounded-tl-none whitespace-pre-wrap'
              }`}
            >
              {msg.text}
            </div>

            {msg.role === 'user' && (
              <div className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                <User className="w-3.5 h-3.5 text-slate-300" />
              </div>
            )}
          </div>
        ))}

        {isLoading && (
          <div className="flex items-center gap-2 text-slate-400 text-xs bg-dark-850 p-2.5 rounded-xl border border-slate-800 w-fit">
            <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-400" />
            <span>Analyzing scenario telemetry...</span>
          </div>
        )}
      </div>

      {/* Input Bar */}
      <div className="p-3 border-t border-slate-800 bg-dark-850/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about site suitability, coverage lift, or tradeoffs..."
            className="flex-1 bg-dark-950 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-40 text-dark-950 font-bold transition-all"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <p className="text-[10px] text-slate-500 mt-1.5 text-center">
          Powered by Gemini 1.5 & ChargeOpt Deterministic Engine • Modeled Estimates
        </p>
      </div>
    </div>
  );
}
