import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  charts?: any[];
  engine?: string;
}

// Zero-dependency, lightweight Markdown & Table renderer in React
const MarkdownContent: React.FC<{ text: string }> = ({ text }) => {
  if (!text) return null;

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: React.ReactNode[] = [];
  let inList = false;
  let inTable = false;
  let tableHeader: string[] = [];
  let tableRows: string[][] = [];

  const renderTextWithStyles = (lineText: string) => {
    // Support bold (**text**) and inline code (`code`)
    const boldParts = lineText.split(/\*\*([\s\S]*?)\*\*/g);
    return boldParts.map((part, idx) => {
      if (idx % 2 === 1) {
        return <strong key={idx} className="font-extrabold text-saffron dark:text-saffron">{part}</strong>;
      }
      
      const codeParts = part.split(/`([\s\S]*?)`/g);
      return codeParts.map((subPart, subIdx) => {
        if (subIdx % 2 === 1) {
          return <code key={subIdx} className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-white/5 font-mono text-[10px] text-pink-500 font-bold border border-slate-200 dark:border-white/5">{subPart}</code>;
        }
        return subPart;
      });
    });
  };

  const flushList = (key: number) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${key}`} className="list-disc pl-5 space-y-1 my-2 text-slate-700 dark:text-white/80">
          {currentList}
        </ul>
      );
      currentList = [];
    }
    inList = false;
  };

  const flushTable = (key: number) => {
    if (tableHeader.length > 0) {
      elements.push(
        <div key={`table-${key}`} className="my-3 overflow-x-auto w-full glass rounded-xl border border-slate-200 dark:border-white/10 shadow-sm font-mono text-[10px] sm:text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-100 dark:bg-white/5 border-b border-slate-200 dark:border-white/10 font-bold text-slate-800 dark:text-white/90">
                {tableHeader.map((h, i) => (
                  <th key={i} className="px-3 py-2">{h.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-white/5 text-slate-700 dark:text-white/85">
              {tableRows.map((row, i) => (
                <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-white/3 transition-colors">
                  {row.map((cell, j) => (
                    <td key={j} className="px-3 py-2 font-medium">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableHeader = [];
      tableRows = [];
    }
    inTable = false;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Table checking
    if (trimmed.startsWith('|')) {
      if (inList) flushList(i);
      inTable = true;
      const cells = line.split('|').map(c => c.trim()).filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      const isSeparator = cells.every(c => c.replace(/:/g, '').replace(/-/g, '').trim() === '');
      if (isSeparator) {
        continue; // Skip separator row
      }
      if (tableHeader.length === 0) {
        tableHeader = cells;
      } else {
        tableRows.push(cells);
      }
      continue;
    } else if (inTable) {
      flushTable(i);
    }

    // Headers
    if (trimmed.startsWith('###')) {
      if (inList) flushList(i);
      elements.push(<h4 key={i} className="font-display font-extrabold text-sm text-slate-900 dark:text-white mt-4 mb-1.5">{renderTextWithStyles(trimmed.slice(3).trim())}</h4>);
      continue;
    }
    if (trimmed.startsWith('##')) {
      if (inList) flushList(i);
      elements.push(<h3 key={i} className="font-display font-extrabold text-base text-slate-900 dark:text-white mt-5 mb-2">{renderTextWithStyles(trimmed.slice(2).trim())}</h3>);
      continue;
    }

    // Blockquotes
    if (trimmed.startsWith('>')) {
      if (inList) flushList(i);
      elements.push(
        <blockquote key={i} className="pl-3.5 border-l-2 border-saffron text-slate-500 dark:text-white/40 italic my-2 font-medium">
          {renderTextWithStyles(trimmed.slice(1).trim())}
        </blockquote>
      );
      continue;
    }

    // Lists
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      inList = true;
      currentList.push(<li key={`li-${i}`} className="leading-relaxed">{renderTextWithStyles(trimmed.slice(2))}</li>);
      continue;
    } else if (inList) {
      flushList(i);
    }

    // Standard paragraphs
    if (trimmed !== '') {
      elements.push(<p key={i} className="my-1 leading-relaxed">{renderTextWithStyles(line)}</p>);
    }
  }

  if (inList) flushList(lines.length);
  if (inTable) flushTable(lines.length);

  return <div className="space-y-1.5">{elements}</div>;
};

export const AIInsightsPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Namaste! I am India Matrix AI, your research companion. I am fully updated with latest 2026 data (including India's $4.2 Trillion GDP, UPI milestones, and space achievements). How can I assist your research today? Feel free to ask for economic trends, agricultural shifts, or policy comparisons—I can generate real-time interactive charts to visualize them!",
          engine: 'Secure AI Engine'
        }
      ]);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const parseAIResponse = (text: string) => {
    const chartRegex = /```json_chart([\s\S]*?)```/g;
    let match;
    const charts = [];
    let cleanText = text;

    while ((match = chartRegex.exec(text)) !== null) {
      try {
        const chartData = JSON.parse(match[1].trim());
        charts.push(chartData);
        cleanText = cleanText.replace(match[0], '');
      } catch (e) {
        console.error("Failed to parse AI chart JSON", e);
      }
    }
    
    const genericJsonRegex = /```json([\s\S]*?)```/g;
    while ((match = genericJsonRegex.exec(cleanText)) !== null) {
      try {
        const data = JSON.parse(match[1].trim());
        if (data.type === 'bar' || data.type === 'line' || data.type === 'pie') {
          charts.push(data);
          cleanText = cleanText.replace(match[0], '');
        }
      } catch (e) {}
    }

    return { content: cleanText.trim(), charts };
  };

  const renderChart = (chartConfig: any, index: number) => {
    if (!chartConfig || !chartConfig.type || !chartConfig.data) return null;

    const COLORS = ['#FF9933', '#10B981', '#3B82F6', '#EC4899', '#8B5CF6', '#F59E0B', '#06B6D4'];

    return (
      <div key={`chart-${index}`} className="my-4 bg-white dark:bg-[#070c1a] p-4 rounded-xl border border-slate-200 dark:border-white/10 w-full max-w-2xl shadow-lg">
        {chartConfig.title && <h4 className="font-display font-semibold text-slate-800 dark:text-white mb-4 text-center text-sm">{chartConfig.title}</h4>}
        <ResponsiveContainer width="100%" height={260}>
          {chartConfig.type === 'bar' ? (
            <BarChart data={chartConfig.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
              <XAxis dataKey={chartConfig.xAxisKey || 'name'} tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/50" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/50" />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#fff' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {chartConfig.series?.map((s: any, i: number) => (
                <Bar key={s.key} dataKey={s.key} name={s.name || s.key} fill={s.color || COLORS[i % COLORS.length]} radius={[4, 4, 0, 0]} />
              ))}
            </BarChart>
          ) : chartConfig.type === 'line' ? (
            <LineChart data={chartConfig.data}>
              <CartesianGrid strokeDasharray="3 3" stroke="currentColor" className="text-slate-200 dark:text-white/5" />
              <XAxis dataKey={chartConfig.xAxisKey || 'name'} tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/50" />
              <YAxis tick={{ fill: 'currentColor', fontSize: 9 }} className="text-slate-500 dark:text-white/50" />
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#fff' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              {chartConfig.series?.map((s: any, i: number) => (
                <Line key={s.key} type="monotone" dataKey={s.key} name={s.name || s.key} stroke={s.color || COLORS[i % COLORS.length]} strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              ))}
            </LineChart>
          ) : chartConfig.type === 'pie' ? (
            <PieChart>
              <Tooltip contentStyle={{ background: 'rgba(15,23,42,0.95)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, fontSize: 12, color: '#fff' }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Pie
                data={chartConfig.data}
                dataKey={chartConfig.dataKey || 'value'}
                nameKey={chartConfig.nameKey || 'name'}
                cx="50%" cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label={{ fill: 'currentColor', fontSize: 9 }}
              >
                {chartConfig.data.map((_: any, index: number) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          ) : <div />}
        </ResponsiveContainer>
      </div>
    );
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          messages: newMessages.map(m => ({ role: m.role, content: m.content }))
        })
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(errData.detail || `Server Error: ${response.status}`);
      }

      const result = await response.json();
      const parsed = parseAIResponse(result.content);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: parsed.content, 
        charts: parsed.charts, 
        engine: result.engine 
      }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error encountered: ${(error as Error).message}. Please ensure backend API keys are configured and the server is running.`,
        engine: 'System Error Handler'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    { label: "Compare UPA vs NDA GDP", text: "Provide a detailed comparison of GDP growth rate achievements between the UPA (2004-2014) and NDA (2014-2026) in a Markdown table. Make sure to detail the average growth rates and the absolute size trajectory, with a touch of Grok-inspired humor." },
    { label: "1991 LPG Reforms details", text: "Explain the causes and economic consequences of the historic 1991 LPG Reforms in India in simple terms, using funny analogies about local bureaucracy." },
    { label: "Show UPI monthly growth chart", text: "Show the growth of UPI monthly transaction volumes from 2016 to 2026 in a line chart, and explain the digital public goods impact." },
    { label: "Which PM has best economic record?", text: "Analyze the economic metrics (avg growth, inflation, forex reserves) of major Prime Ministers like Narasimha Rao, Vajpayee, Manmohan Singh, and Modi, and compare them in a structured table." }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
      {/* Tab bar header */}
      <div className="glass rounded-t-2xl p-4 border-b border-slate-200 dark:border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-10 w-auto object-contain flex-shrink-0 dark:invert" />
          <div>
            <h1 className="font-display font-bold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              India Matrix AI Insights
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-bold uppercase tracking-wider">
                2026 Ready
              </span>
            </h1>
            <p className="text-[10px] text-slate-500 dark:text-white/40 font-mono">
              Active model: Secured Backend LLM (Gemini 2.5 Flash / Groq Fallback)
            </p>
          </div>
        </div>
      </div>

      {/* Feed list */}
      <div className="flex-1 glass border-t-0 border-b-0 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
        
        {/* Empty Starter Prompts State Panel */}
        {messages.length <= 1 && (
          <div className="flex flex-col items-center justify-center text-center py-6 sm:py-10 max-w-lg mx-auto space-y-4">
            <span className="text-4xl">🤖</span>
            <h2 className="font-display font-extrabold text-slate-900 dark:text-white text-sm">India Matrix Research Companion</h2>
            <p className="text-xs text-slate-500 dark:text-white/40 leading-relaxed font-medium">
              Ask anything about India's economic history, space milestones, reforms, or regional parameters. Select a starter prompt to see me parse comparison data and generate charts in real-time!
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full pt-2">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p.text)}
                  className="px-3.5 py-3 rounded-xl bg-slate-50 dark:bg-white/5 hover:bg-slate-100/70 dark:hover:bg-white/10 border border-slate-200 dark:border-white/5 text-xs text-slate-600 dark:text-white/70 font-extrabold transition-all text-left flex items-center justify-between group shadow-sm"
                >
                  <span className="truncate pr-2">{p.label}</span>
                  <span className="text-lime-500 group-hover:translate-x-0.5 transition-transform flex-shrink-0">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Chat Bubbles */}
        {messages.length > 1 && messages.map((m, idx) => (
          <div key={idx} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 shadow-sm
              ${m.role === 'user' ? 'bg-saffron text-white' : 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'}`}>
              {m.role === 'user' ? <User size={15} /> : <Bot size={15} />}
            </div>
            
            <div className={`flex flex-col max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              {m.content && (
                <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed shadow-sm
                  ${m.role === 'user' 
                    ? 'bg-saffron text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 dark:bg-[#070c1a] dark:border-white/10 dark:text-white/85 rounded-tl-none'}`}
                >
                  {m.role === 'user' ? (
                    <div className="whitespace-pre-wrap">{m.content}</div>
                  ) : (
                    <MarkdownContent text={m.content} />
                  )}
                </div>
              )}
              
              {m.charts && m.charts.length > 0 && (
                <div className="mt-4 w-full flex flex-col items-center">
                  {m.charts.map((chart, i) => renderChart(chart, i))}
                </div>
              )}
              
              {m.role === 'assistant' && m.engine && (
                <span className="text-[10px] font-mono text-slate-400 dark:text-white/20 mt-1 ml-1">
                  ⚡ {m.engine}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {/* Shimmering Skeletons loader */}
        {isLoading && (
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 flex items-center justify-center animate-pulse">
              <Bot size={15} />
            </div>
            <div className="space-y-2 w-full max-w-[70%] bg-white border border-slate-200 dark:bg-[#070c1a] dark:border-white/10 p-4 rounded-2xl rounded-tl-none shadow-sm">
              <div className="h-3.5 bg-slate-100 dark:bg-white/5 rounded w-3/4 skeleton"></div>
              <div className="h-2.5 bg-slate-100 dark:bg-white/5 rounded w-1/2 skeleton"></div>
              <div className="h-2.5 bg-slate-100 dark:bg-white/5 rounded w-2/3 skeleton"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input container */}
      <div className="glass rounded-b-2xl p-4 border-t border-slate-200 dark:border-white/10">
        <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about India's GDP, Prime Ministers, policies (e.g. 'Compare GDP of UPA vs NDA in a table')..."
            className="w-full bg-white dark:bg-[#070c1a] border border-slate-200 dark:border-white/10 rounded-xl pl-4 pr-12 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-saffron/50 shadow-inner disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-lg bg-saffron text-white hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-md cursor-pointer"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
