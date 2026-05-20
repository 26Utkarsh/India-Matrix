import React, { useState, useRef, useEffect } from 'react';
import { Brain, Send, User, Bot, Loader2, Key, Settings, Trash2, CheckCircle2, HelpCircle } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  charts?: any[];
  engine?: string;
}

export const AIInsightsPage: React.FC = () => {
  const [geminiKey, setGeminiKey] = useState(localStorage.getItem('gemini_api_key') || (import.meta.env.VITE_GEMINI_API_KEY as string) || '');
  const [groqKey, setGroqKey] = useState(localStorage.getItem('groq_api_key') || (import.meta.env.VITE_GROQ_API_KEY as string) || '');
  const [isConfigured, setIsConfigured] = useState(
    !!(localStorage.getItem('gemini_api_key') || import.meta.env.VITE_GEMINI_API_KEY ||
       localStorage.getItem('groq_api_key') || import.meta.env.VITE_GROQ_API_KEY)
  );
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isConfigured && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Namaste! I am India Matrix AI, your research assistant. I am fully updated with latest 2026 data (including India's $4.2 Trillion GDP, UPI milestones, and space achievements). How can I assist your research today? Feel free to ask for economic trends, agricultural shifts, or policy comparisons—I can generate real-time interactive charts to visualize them!",
          engine: geminiKey ? 'Gemini 2.5 Flash (Primary)' : 'Groq LLaMA 3.3 (Secondary)'
        }
      ]);
    }
  }, [isConfigured]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSaveKeys = () => {
    if (geminiKey.trim()) {
      localStorage.setItem('gemini_api_key', geminiKey.trim());
    } else {
      localStorage.removeItem('gemini_api_key');
    }

    if (groqKey.trim()) {
      localStorage.setItem('groq_api_key', groqKey.trim());
    } else {
      localStorage.removeItem('groq_api_key');
    }

    const configured = !!(geminiKey.trim() || groqKey.trim());
    setIsConfigured(configured);
    setShowSettings(false);

    if (configured && messages.length === 0) {
      setMessages([
        {
          role: 'assistant',
          content: "Namaste! API Keys configured successfully. I am ready to analyze India's datasets and history up to 2026. What would you like to explore first?",
          engine: geminiKey.trim() ? 'Gemini 2.5 Flash' : 'Groq LLaMA 3.3'
        }
      ]);
    }
  };

  const handleResetKeys = () => {
    localStorage.removeItem('gemini_api_key');
    localStorage.removeItem('groq_api_key');
    setGeminiKey('');
    setGroqKey('');
    setIsConfigured(false);
    setMessages([]);
  };

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

  const callGeminiAPI = async (key: string, apiMessages: any[]) => {
    const systemMsg = apiMessages.find(m => m.role === 'system');
    const chatMsgs = apiMessages.filter(m => m.role !== 'system');
    
    const contents = chatMsgs.map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }]
    }));

    const payload: any = {
      contents,
      generationConfig: {
        temperature: 0.2
      }
    };

    if (systemMsg) {
      payload.systemInstruction = {
        parts: [{ text: systemMsg.content }]
      };
    }

    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${key}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini Error: ${response.status} - ${errText}`);
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) throw new Error("Empty response from Gemini API");
    return text;
  };

  const callGroqAPI = async (key: string, apiMessages: any[]) => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: apiMessages,
        temperature: 0.2
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Groq Error: ${response.status} - ${errText}`);
    }

    const data = await response.json();
    const text = data.choices[0].message.content;
    if (!text) throw new Error("Empty response from Groq API");
    return text;
  };

  const handleSend = async (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || !isConfigured) return;

    const userMessage: Message = { role: 'user', content: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const systemPrompt = `You are India Matrix AI, a state-of-the-art research assistant on India's growth, history, economy, demographics, infrastructure, and politics.
You are running in the year 2026. Keep all references aligned with 2026.

TONE, HUMOR & CONVERSATION STYLE (Grok-inspired):
- Talk with the same witty, sharp, and humorous personality that Grok (xAI) has. Be slightly rebellious, highly engaging, and fun, with a touch of clever sarcasm when pointing out ironies (like absolute majorities vs coalition results!).
- Speak like a brilliant, friendly, and slightly opinionated peer who loves data, not a boring robotic corporate chatbot.
- You MUST answer mostly in clear, structured, and punchy bullet points to keep information readable, digestible, and dense.

CRITICAL Indian Economy Status (2026):
- India's GDP stands at $4.2 Trillion USD.
- India is the 5th largest economy, rapidly marching towards the $5 Trillion goal.
- UPI transaction volume exceeds 17 billion transactions per month.
- Installed Power Capacity is over 485 GW, with renewable energy contributing 46%.
- National Highways span over 162,000 km.
- Forex reserves are stable around $710 Billion USD.
- Literacy rate is estimated at 79.5%.
- Infant mortality rate has declined to 25 per 1000 live births.
- Life expectancy is 71.2 years.
- Internet user base is over 1.05 billion.

COMPARING COALITION vs ABSOLUTE MAJORITY ERAS (UPA vs NDA):
- When comparing the UPA (2004-2014) and NDA (2014-2026) eras, you MUST highlight that:
  - During the UPA era, India's economy size tripled from $700 Billion to $2.1 Trillion.
  - This tripling was achieved despite UPA running a coalition government (which faced political constraints and lacked a single-party absolute majority). UPA's average annual GDP growth rate was 8.1%.
  - In contrast, during the NDA era (2014-2026), despite having a full absolute single-party majority on its own (giving it complete legislative control and policy stability), the government failed to achieve even a constant 8% GDP growth rate, with its average annual growth rate sitting at around 7.3% (even though the absolute GDP size reached $4.2 Trillion by 2026).

Use this latest 2026 context in your answers. Answer clearly, dynamically, and witty.

CRITICAL VISUALIZATION INSTRUCTION: If the user asks for data that can be compared, charted, or represents trends, you MUST generate a chart.
To render a chart, output a JSON block wrapped in \`\`\`json_chart and \`\`\`
The JSON must follow this exact schema:
{
  "type": "bar" | "line" | "pie",
  "title": "Chart Title",
  "xAxisKey": "name",
  "data": [{"name": "1990", "gdp": 320}, {"name": "2000", "gdp": 470}],
  "series": [
     {"key": "gdp", "name": "GDP in USD Billion", "color": "#FF9933"}
  ]
}
Do not include comments inside the JSON. After the JSON block, explain the chart briefly.`;

      const apiMessages = [
        { role: 'system', content: systemPrompt },
        ...newMessages.map(m => ({ role: m.role, content: m.content }))
      ];

      let responseText = '';
      let usedModel = '';

      if (geminiKey.trim()) {
        try {
          usedModel = 'Gemini 2.5 Flash';
          responseText = await callGeminiAPI(geminiKey.trim(), apiMessages);
        } catch (geminiError) {
          console.warn("Gemini failure, trying Groq fallback:", geminiError);
          if (groqKey.trim()) {
            usedModel = 'Groq LLaMA 3.3 (Fallback)';
            responseText = await callGroqAPI(groqKey.trim(), apiMessages);
          } else {
            throw new Error(`Gemini request failed: ${(geminiError as Error).message}`);
          }
        }
      } else if (groqKey.trim()) {
        usedModel = 'Groq LLaMA 3.3';
        responseText = await callGroqAPI(groqKey.trim(), apiMessages);
      } else {
        throw new Error("No API keys found");
      }

      const parsed = parseAIResponse(responseText);
      setMessages(prev => [...prev, { role: 'assistant', content: parsed.content, charts: parsed.charts, engine: usedModel }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error encountered: ${(error as Error).message}. Please ensure your API keys are valid and check your network connection.`,
        engine: 'System Error Handler'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const samplePrompts = [
    { label: "Compare GDP: UPA vs NDA", text: "Compare India's GDP growth during UPA (2004-2014) vs NDA (2014-2026) using a bar chart and summarize key milestones." },
    { label: "UPI & Digital Growth", text: "Show the growth of UPI monthly transaction volumes from 2016 to 2026 in a line chart." },
    { label: "Highway Expansion", text: "Visualize the national highways expansion from 2014 to 2026 in a line chart." }
  ];

  if (!isConfigured || showSettings) {
    return (
      <div className="space-y-6 max-w-2xl mx-auto py-6">
        <div className="glass rounded-2xl p-6 border-l-4 border-saffron flex items-center justify-between gap-4">
          <div className="space-y-1">
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-1 flex items-center gap-2">
              <Brain className="text-saffron animate-pulse" />
              AI Insights Engine Setup
            </h1>
            <p className="text-slate-500 dark:text-white/50 text-sm">
              Configure your API keys. We support Gemini as primary and Groq as fallback for high availability.
            </p>
          </div>
          <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-14 object-contain flex-shrink-0 opacity-80 dark:invert" />
        </div>

        <div className="glass rounded-2xl p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-2 flex items-center gap-1.5">
                <span>Gemini API Key (Primary)</span>
                <span className="text-xs text-emerald-500 lowercase normal-case">(Recommended)</span>
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={geminiKey}
                  onChange={e => setGeminiKey(e.target.value)}
                  placeholder="AIzaSy..." 
                  className="w-full bg-white dark:bg-[#070c1a] border border-slate-200 dark:border-white/12 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-saffron/50 font-mono text-sm" 
                />
                <Key className="absolute left-3.5 top-3.5 text-slate-400 dark:text-white/20" size={16} />
              </div>
              <p className="text-xs text-slate-400 dark:text-white/30 mt-1">Starts with AIzaSy. Used for fast primary inferences.</p>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-white/40 mb-2">
                Groq API Key (Secondary / Fallback)
              </label>
              <div className="relative">
                <input 
                  type="password" 
                  value={groqKey}
                  onChange={e => setGroqKey(e.target.value)}
                  placeholder="gsk_..." 
                  className="w-full bg-white dark:bg-[#070c1a] border border-slate-200 dark:border-white/12 rounded-xl pl-10 pr-4 py-3 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-white/20 focus:outline-none focus:border-saffron/50 font-mono text-sm" 
                />
                <Key className="absolute left-3.5 top-3.5 text-slate-400 dark:text-white/20" size={16} />
              </div>
              <p className="text-xs text-slate-400 dark:text-white/30 mt-1">Starts with gsk_. Used as an automatic fallback if Gemini limit is reached.</p>
            </div>
          </div>

          <div className="flex gap-3 justify-end pt-2">
            {isConfigured && (
              <button 
                onClick={() => setShowSettings(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 dark:border-white/10 dark:text-white/60 hover:bg-slate-50 dark:hover:bg-white/5 text-xs font-semibold transition-all"
              >
                Cancel
              </button>
            )}
            <button 
              onClick={handleSaveKeys}
              className="px-6 py-2.5 rounded-xl bg-saffron text-white text-xs font-semibold hover:bg-opacity-90 transition-all shadow-md flex items-center gap-1.5"
            >
              <CheckCircle2 size={14} />
              Save & Activate Engine
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-180px)]">
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
            <p className="text-xs text-slate-500 dark:text-white/40 font-mono">
              Active model: {geminiKey ? 'Gemini 2.5 Flash (Primary)' : 'Groq LLaMA 3.3'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 dark:border-white/10 dark:text-white/40 dark:hover:bg-white/5 transition-all"
            title="API Settings"
          >
            <Settings size={14} />
          </button>
          <button 
            onClick={handleResetKeys}
            className="p-2 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 dark:border-red-500/10 dark:text-red-400 dark:hover:bg-red-500/5 transition-all"
            title="Reset All Keys"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="flex-1 glass border-t-0 border-b-0 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex gap-4 ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
            <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 shadow-sm
              ${m.role === 'user' ? 'bg-saffron text-white' : 'bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400'}`}>
              {m.role === 'user' ? <User size={15} /> : <Bot size={15} />}
            </div>
            
            <div className={`flex flex-col max-w-[85%] ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
              {m.content && (
                <div className={`px-4 py-3 rounded-2xl text-xs whitespace-pre-wrap leading-relaxed shadow-sm
                  ${m.role === 'user' 
                    ? 'bg-saffron text-white rounded-tr-none' 
                    : 'bg-white border border-slate-200 text-slate-700 dark:bg-[#070c1a] dark:border-white/10 dark:text-white/80 rounded-tl-none'}`}
                >
                  {m.content}
                </div>
              )}
              
              {m.charts && m.charts.length > 0 && (
                <div className="mt-4 w-full flex flex-col items-center">
                  {m.charts.map((chart, i) => renderChart(chart, i))}
                </div>
              )}
              
              {m.role === 'assistant' && m.engine && (
                <span className="text-xs font-mono text-slate-400 dark:text-white/20 mt-1 ml-1">
                  ⚡ {m.engine}
                </span>
              )}
            </div>
          </div>
        ))}
        
        {messages.length <= 1 && (
          <div className="pt-4 border-t border-slate-100 dark:border-white/5">
            <p className="text-xs uppercase tracking-wider text-slate-400 dark:text-white/30 font-bold mb-2 flex items-center gap-1">
              <HelpCircle size={10} />
              Sample Queries
            </p>
            <div className="flex flex-wrap gap-2">
              {samplePrompts.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(p.text)}
                  className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-white/5 hover:bg-slate-100 dark:hover:bg-white/10 border border-slate-200 dark:border-white/10 text-sm text-slate-600 dark:text-white/60 transition-all font-medium text-left"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400 flex items-center justify-center animate-pulse">
              <Loader2 size={15} className="animate-spin" />
            </div>
            <div className="px-4 py-2.5 rounded-2xl bg-white border border-slate-200 dark:bg-[#070c1a] dark:border-white/10 text-xs text-slate-400 flex items-center gap-2 rounded-tl-none font-medium">
              Analyzing datasets<span className="animate-pulse">...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="glass rounded-b-2xl p-4 border-t border-slate-200 dark:border-white/10">
        <form onSubmit={e => { e.preventDefault(); handleSend(); }} className="relative flex items-center">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Ask about India's GDP, Prime Ministers, policies (e.g. 'Compare GDP of UPA vs NDA in a bar chart')..."
            className="w-full bg-white dark:bg-[#070c1a] border border-slate-200 dark:border-white/10 rounded-xl pl-4 pr-12 py-3 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-saffron/50 shadow-inner disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="absolute right-2 p-2 rounded-lg bg-saffron text-white hover:bg-opacity-90 disabled:opacity-50 transition-all shadow-md"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
