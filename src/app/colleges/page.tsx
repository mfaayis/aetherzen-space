"use client";

import { useState, useMemo } from "react";
import { colleges } from "@/data/colleges";
import { Search, MapPin, Building2, ExternalLink, GraduationCap, Banknote, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function CollegesPage() {
  const [search, setSearch] = useState("");
  const [streamFilter, setStreamFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selectedCollege, setSelectedCollege] = useState<string | null>(null);

  const streams = ["All", ...Array.from(new Set(colleges.flatMap(c => c.coursesOffered)))];
  const types = ["All", "Government", "Private", "Deemed"];

  const filteredColleges = useMemo(() => {
    return colleges.filter(college => {
      const matchSearch = college.name.toLowerCase().includes(search.toLowerCase()) || 
                          college.location.city.toLowerCase().includes(search.toLowerCase());
      const matchStream = streamFilter === "All" || college.coursesOffered.includes(streamFilter);
      const matchType = typeFilter === "All" || college.type === typeFilter;
      return matchSearch && matchStream && matchType;
    });
  }, [search, streamFilter, typeFilter]);

  const activeCollege = colleges.find(c => c.id === selectedCollege);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 bg-black/50">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-12">
          <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-white/20 bg-white/5 text-neutral-300 inline-block mb-4">
            Discover Institutions
          </span>
          <h1 className="text-4xl md:text-7xl font-heading font-bold text-white mb-6 tracking-tighter leading-tight">
            College Directory
          </h1>
          <p className="text-lg text-neutral-400 font-sans max-w-2xl">
            Browse through top institutions, filter by your preferred stream, and understand admission processes and fee structures.
          </p>
        </div>

        {/* Filters */}
        <div className="glass-panel p-6 rounded-3xl border border-white/10 mb-12 flex flex-col md:flex-row gap-4 items-center">
          <div className="relative w-full md:flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none" />
            <input 
              type="text"
              placeholder="Search by college name or city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-sans outline-none focus:border-white/30 transition-colors"
            />
          </div>
          <div className="flex gap-4 w-full md:w-auto">
            <select 
              value={streamFilter}
              onChange={(e) => setStreamFilter(e.target.value)}
              className="flex-1 md:w-48 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-sans outline-none focus:border-white/30 appearance-none"
            >
              {streams.map(s => <option key={s} value={s} className="bg-neutral-900">{s === "All" ? "All Streams" : s}</option>)}
            </select>
            <select 
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="flex-1 md:w-48 px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white font-sans outline-none focus:border-white/30 appearance-none"
            >
              {types.map(t => <option key={t} value={t} className="bg-neutral-900">{t === "All" ? "All Types" : t}</option>)}
            </select>
          </div>
        </div>

        {/* Results */}
        {filteredColleges.length === 0 ? (
          <div className="text-center py-20">
            <ShieldAlert size={40} className="mx-auto mb-4 text-neutral-600" />
            <h3 className="text-xl font-heading text-white">No colleges found</h3>
            <p className="text-neutral-500 font-sans text-sm mt-2">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredColleges.map((college) => (
              <motion.div 
                key={college.id}
                layoutId={`card-${college.id}`}
                onClick={() => setSelectedCollege(college.id)}
                className="glass-panel p-6 rounded-3xl border border-white/10 cursor-pointer hover:border-white/30 transition-all hover:bg-white/5 group flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-4">
                  <span className="px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-md border border-white/10 bg-black/40 text-neutral-300">
                    {college.type}
                  </span>
                  {college.nirfRank && (
                    <span className="px-2.5 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-md border border-amber-500/30 bg-amber-500/10 text-amber-500">
                      NIRF #{college.nirfRank}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-heading font-bold text-white mb-3 group-hover:text-blue-400 transition-colors line-clamp-2 flex-1">
                  {college.name}
                </h3>
                
                <div className="space-y-3 mt-auto">
                  <div className="flex items-center gap-2 text-neutral-400 text-xs font-sans">
                    <MapPin size={14} className="shrink-0" />
                    <span className="truncate">{college.location.city}, {college.location.state}</span>
                  </div>
                  <div className="flex items-center gap-2 text-neutral-400 text-xs font-sans">
                    <Banknote size={14} className="shrink-0" />
                    <span>{college.approxFee}</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {college.coursesOffered.map((course, i) => (
                      <span key={i} className="text-[10px] px-2 py-0.5 rounded border border-white/10 bg-white/5 text-neutral-300">
                        {course}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Modal Overlay */}
        <AnimatePresence>
          {selectedCollege && activeCollege && (
            <>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedCollege(null)}
                className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              />
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                <motion.div 
                  layoutId={`card-${activeCollege.id}`}
                  className="bg-neutral-950 border border-white/20 rounded-3xl p-6 md:p-10 w-full max-w-2xl overflow-y-auto max-h-[90vh] pointer-events-auto relative shadow-2xl"
                >
                  <button 
                    onClick={() => setSelectedCollege(null)}
                    className="absolute top-6 right-6 w-8 h-8 rounded-full bg-white/10 hover:bg-white text-white hover:text-black flex items-center justify-center transition-colors font-sans text-xl"
                  >
                    ×
                  </button>

                  <div className="flex gap-2 mb-6">
                    <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-white/20 bg-white/10 text-neutral-300">
                      {activeCollege.type}
                    </span>
                    {activeCollege.nirfRank && (
                      <span className="px-3 py-1 text-[10px] font-sans font-bold uppercase tracking-widest rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-500">
                        NIRF Ranking: #{activeCollege.nirfRank}
                      </span>
                    )}
                  </div>

                  <h2 className="text-3xl md:text-5xl font-heading font-bold text-white mb-6 leading-tight">
                    {activeCollege.name}
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                    <div>
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2"><MapPin size={14}/> Location</h4>
                      <p className="text-neutral-300 font-sans text-sm">{activeCollege.location.city}, {activeCollege.location.state}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-2 flex items-center gap-2"><Banknote size={14}/> Approximate Fee</h4>
                      <p className="text-neutral-300 font-sans text-sm">{activeCollege.approxFee}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 flex items-center gap-2"><Building2 size={14}/> Admission Process</h4>
                    <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                      <p className="text-neutral-300 font-sans text-sm leading-relaxed">{activeCollege.admissionProcess}</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h4 className="text-xs font-bold text-neutral-500 uppercase tracking-widest mb-3 flex items-center gap-2"><GraduationCap size={14}/> Programs Offered</h4>
                    <div className="flex flex-wrap gap-2">
                      {activeCollege.coursesOffered.map((course, i) => (
                        <span key={i} className="px-3 py-1.5 rounded-full bg-white/10 border border-white/10 text-xs font-sans text-neutral-300">
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>

                  <a 
                    href={activeCollege.officialWebsite} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 w-full justify-center py-4 rounded-xl bg-white text-black font-sans font-bold text-sm hover:bg-neutral-200 transition-colors"
                  >
                    Visit Official Website <ExternalLink size={16} />
                  </a>

                </motion.div>
              </div>
            </>
          )}
        </AnimatePresence>

      </div>
    </main>
  );
}
