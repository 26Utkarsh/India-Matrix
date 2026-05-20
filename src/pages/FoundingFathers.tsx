import React from 'react';
import { motion } from 'framer-motion';
import { Landmark, Compass, Award, Star, BookOpen, Shield, Award as Medal } from 'lucide-react';

interface FoundingFather {
  name: string;
  role: string;
  years: string;
  icon: React.ReactNode;
  description: string;
  keyContributions: string[];
  quote: string;
}

export default function FoundingFathersPage() {
  const fathers: FoundingFather[] = [
    {
      name: "Mahatma Gandhi",
      role: "Father of the Nation",
      years: "1869 – 1948",
      icon: <Compass size={24} className="text-saffron" />,
      description: "Led India's non-violent freedom struggle (Satyagraha) against British rule, uniting millions across diverse backgrounds and establishing moral authority on the global stage.",
      keyContributions: [
        "Satyagraha & Ahimsa (Non-violence philosophy)",
        "Salt Satyagraha / Dandi March (1930)",
        "Quit India Movement (1942)",
        "Social reforms: Upliftment of untouchables (Harijans) and rural self-reliance"
      ],
      quote: "My life is my message."
    },
    {
      name: "Sardar Vallabhbhai Patel",
      role: "The Iron Man of India",
      years: "1875 – 1950",
      icon: <Shield size={24} className="text-blue-500" />,
      description: "Architect of India's political integration. Merged over 560 princely states into the Indian Union within months of independence, preventing fragmentation.",
      keyContributions: [
        "Integration of 562 princely states into the Indian Union",
        "Created the modern All India Services (IAS/IPS)",
        "Handled partition refugee rehabilitation",
        "Resolute leadership during the 1947 Kashmir crisis"
      ],
      quote: "Manpower without unity is not a strength unless it is harmonized and united properly."
    },
    {
      name: "Dr. B. R. Ambedkar",
      role: "Architect of the Indian Constitution",
      years: "1891 – 1956",
      icon: <Landmark size={24} className="text-purple-500" />,
      description: "Polymathetic scholar and social reformer who drafted one of the world's longest and most inclusive democratic constitutions, institutionalizing fundamental rights and social equality.",
      keyContributions: [
        "Chairman of the Constitution Drafting Committee",
        "Pioneered constitutional safeguards for SC, ST, and OBC communities",
        "Enacted labor reforms (reduced working hours, maternity benefits)",
        "Laid the conceptual framework for the Reserve Bank of India (RBI)"
      ],
      quote: "Cultivation of mind should be the ultimate aim of human existence."
    },
    {
      name: "Netaji Subhas Chandra Bose",
      role: "Supreme Commander of Azad Hind Fauj",
      years: "1897 – 1945",
      icon: <Medal size={24} className="text-red-500" />,
      description: "Led a militant, uncompromising campaign to liberate India from British rule, organizing the Indian National Army (INA) overseas to attack colonial forces.",
      keyContributions: [
        "Reorganized and led the Indian National Army (Azad Hind Fauj)",
        "Established the Provisional Government of Azad Hind in exile (1943)",
        "Popularized the national slogans 'Jai Hind' and 'Delhi Chalo'",
        "International diplomacy to build alliances for Indian liberation"
      ],
      quote: "Give me blood and I will give you freedom!"
    },
    {
      name: "Maulana Abul Kalam Azad",
      role: "First Minister of Education",
      years: "1888 – 1958",
      icon: <BookOpen size={24} className="text-emerald-500" />,
      description: "Brilliant scholar, journalist, and nationalist leader who laid the foundations of India's education system and strongly opposed the partition of India on communal lines.",
      keyContributions: [
        "First Education Minister of independent India",
        "Established the University Grants Commission (UGC) and IISc expansion",
        "Founded the first Indian Institute of Technology (IIT Kharagpur in 1951)",
        "Established national cultural academies (Lalit Kala, Sahitya, Sangeet Natak)"
      ],
      quote: "Educationists should build the capacities of the spirit of inquiry, creativity, entrepreneurial and moral leadership among students."
    },
    {
      name: "Lal Bahadur Shastri",
      role: "Second Prime Minister & Patriot",
      years: "1904 – 1966",
      icon: <Award size={24} className="text-amber-500" />,
      description: "Led India with quiet resolve through the 1965 war, launching structural reforms to secure food security and making integrity the benchmark of public office.",
      keyContributions: [
        "Coined the historic rallying cry 'Jai Jawan Jai Kisan'",
        "Led India to military victory in the 1965 Indo-Pakistani War",
        "Launched the National Dairy Development Board, starting the White Revolution",
        "Initiated early reforms that paved the way for the Green Revolution"
      ],
      quote: "We believe in peace and peaceful development, not only for ourselves but for people all over the world."
    }
  ];

  return (
    <div className="space-y-8 pb-24">
      {/* Page Header */}
      <div className="glass rounded-2xl p-6 border-l-4 border-l-saffron relative overflow-hidden flex flex-row items-center justify-between gap-4">
        <div className="space-y-2 max-w-2xl">
          <div className="flex items-center gap-3">
            <h1 className="font-display text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Founding Fathers of Modern India</h1>
          </div>
          <p className="text-slate-600 dark:text-white/60 text-sm leading-relaxed">
            Honoring the visionary architects who fought for India's independence, integrated its territories, drafted its constitutional framework, and built its democratic foundations.
          </p>
        </div>
        <img src="/ashoka_stumbha.png" alt="Ashoka Stumbha" className="h-16 object-contain flex-shrink-0 opacity-80 dark:invert" />
      </div>

      {/* Special Feature: Pandit Jawaharlal Nehru's Legacy */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-3xl p-6 md:p-8 border border-slate-200 dark:border-white/10 relative overflow-hidden shadow-lg"
      >
        {/* Decorative Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-saffron/10 dark:bg-saffron/5 blur-3xl rounded-full pointer-events-none" />
        
        {/* Nehru Header Block */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-8 relative z-10">
          <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0 border-2 border-saffron/20 shadow-md">
            <img 
              src="/nehru.png" 
              alt="Pandit Jawaharlal Nehru"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-saffron bg-saffron/10 px-3 py-1 rounded-full border border-saffron/20">
              Architect of Modern India & First Prime Minister
            </span>
            <h2 className="font-display text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
              Pandit Jawaharlal Nehru
            </h2>
            <p className="text-xs text-slate-500 dark:text-white/40 font-mono mt-0.5">Term: 1947 – 1964 (17 Years of Nation-Building)</p>
          </div>
        </div>

        {/* Detailed Legacy Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8 border-t border-slate-200/50 dark:border-white/5 pt-6 relative z-10 text-sm">
          {/* Section 1: Institution & Science Building */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Star size={16} className="text-saffron" />
              Scientific & Higher Education Infrastructure
            </h3>
            <p className="text-slate-600 dark:text-white/70 text-xs md:text-sm leading-relaxed">
              Nehru held a deep conviction in "scientific temper" as a prerequisite for national development. He spearheaded the creation of India's elite educational and scientific hubs, ensuring India would not rely indefinitely on foreign technology:
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-slate-600 dark:text-white/70 space-y-2 pl-2">
              <li><strong>IITs & IIMs:</strong> Founded the first Indian Institute of Technology (IIT Kharagpur) in 1951, followed by others, and the Indian Institutes of Management.</li>
              <li><strong>Space Program:</strong> Established the <em>Indian National Committee for Space Research (INCOSPAR)</em> in 1962 under Dr. Vikram Sarabhai, which evolved into ISRO.</li>
              <li><strong>Atomic Energy:</strong> Set up the Atomic Energy Commission in 1948 and Atomic Energy Establishment Trombay (BARC) with Dr. Homi J. Bhabha.</li>
              <li><strong>Industrial Research:</strong> Built a network of national laboratories under the Council of Scientific and Industrial Research (CSIR).</li>
            </ul>
          </div>

          {/* Section 2: Heavy Industry & Infrastructure */}
          <div className="space-y-4">
            <h3 className="font-display font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
              <Landmark size={16} className="text-saffron" />
              Heavy Industries & Multipurpose Dams
            </h3>
            <p className="text-slate-600 dark:text-white/70 text-xs md:text-sm leading-relaxed">
              To pull India out of colonial deindustrialization, Nehru focused on core public sector infrastructure (dams, steel plants, power grids) which he poetically dubbed the **"Temples of Modern India"**:
            </p>
            <ul className="list-disc list-inside text-xs md:text-sm text-slate-600 dark:text-white/70 space-y-2 pl-2">
              <li><strong>Heavy Steel Plants:</strong> Established the public sector steel complexes at Bhilai (with Soviet help), Rourkela (West German help), and Durgapur (British help).</li>
              <li><strong>Mega Dams:</strong> Undertook colossal river valley projects like the Bhakra-Nangal Dam, Hirakud Dam, and Damodar Valley projects to secure electricity and irrigation.</li>
              <li><strong>Public Sector Undertakings (PSUs):</strong> Designed the public sector as the "engine of growth" to manufacture locomotives, heavy machinery, and antibiotics.</li>
              <li><strong>Democratic Institutions:</strong> Institutionalized the independence of the Judiciary, Union Public Service Commission, and Election Commission of India.</li>
            </ul>
          </div>
        </div>

        {/* Nehru Quote Block */}
        <div className="mt-8 bg-slate-50 dark:bg-white/5 rounded-2xl p-4 border border-slate-200/50 dark:border-white/5 relative z-10">
          <p className="font-serif italic text-slate-700 dark:text-white/90 text-center text-sm">
            "At the stroke of the midnight hour, when the world sleeps, India will awake to life and freedom... A moment comes, which comes but rarely in history, when we step out from the old to the new, when an age ends, and when the soul of a nation, long suppressed, finds utterance."
          </p>
          <p className="text-right text-xs font-bold text-slate-500 dark:text-white/40 mt-2 font-mono">— Tryst with Destiny Speech, 14 August 1947</p>
        </div>
      </motion.div>

      {/* Grid of Other Founding Fathers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {fathers.map((father, i) => (
          <motion.div 
            key={father.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-5 border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-saffron/20 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center border border-slate-200/50 dark:border-white/10">
                  {father.icon}
                </div>
                <span className="text-xs font-mono font-bold text-slate-400 dark:text-white/30">{father.years}</span>
              </div>
              
              <h3 className="font-display font-extrabold text-lg text-slate-900 dark:text-white group-hover:text-saffron transition-colors">
                {father.name}
              </h3>
              <p className="text-xs font-bold text-saffron dark:text-saffron mb-3">{father.role}</p>
              
              <p className="text-slate-600 dark:text-white/70 text-xs md:text-sm leading-relaxed mb-4">
                {father.description}
              </p>

              <div className="space-y-1.5 border-t border-slate-100 dark:border-white/5 pt-3">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-white/30">Key Works / Contributions</div>
                <ul className="space-y-1">
                  {father.keyContributions.map((contrib, idx) => (
                    <li key={idx} className="text-xs text-slate-600 dark:text-white/60 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-saffron shrink-0 mt-1.5" />
                      <span>{contrib}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 bg-slate-50 dark:bg-white/5 rounded-xl p-3 border border-slate-200/30 dark:border-white/5">
              <p className="font-serif italic text-[11px] text-slate-500 dark:text-white/50 text-center">
                "{father.quote}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
