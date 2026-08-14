"use client";

import { useState, useEffect } from "react";
import { Lock, MapPin, Mail, User, Clock, Search, LogOut } from "lucide-react";

type Lead = {
  id: string;
  name: string;
  email: string;
  country: string | null;
  city: string | null;
  region: string | null;
  created_at: string;
};

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [search, setSearch] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/admin/leads", {
        headers: {
          "Authorization": `Bearer ${passcode}`
        }
      });
      
      if (res.ok) {
        const data = await res.json();
        setLeads(data.leads || []);
        setIsAuthenticated(true);
      } else {
        setError("Invalid passcode");
      }
    } catch (err) {
      setError("Failed to connect to server");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPasscode("");
    setLeads([]);
  };

  const filteredLeads = leads.filter(lead => 
    lead.name.toLowerCase().includes(search.toLowerCase()) || 
    lead.email.toLowerCase().includes(search.toLowerCase()) ||
    (lead.country && lead.country.toLowerCase().includes(search.toLowerCase())) ||
    (lead.city && lead.city.toLowerCase().includes(search.toLowerCase()))
  );

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen pt-32 pb-24 px-6 relative z-10 flex items-center justify-center">
        <div className="w-full max-w-md p-8 glass-panel bg-black/60 rounded-3xl border border-white/10 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mb-4 text-blue-400">
              <Lock size={28} />
            </div>
            <h1 className="text-2xl font-heading font-bold text-white text-center">Admin Access</h1>
            <p className="text-neutral-400 text-sm mt-2 text-center">Enter your passcode to view leads data</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                placeholder="Enter passcode"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-blue-500/50 transition-colors"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-xs text-center">{error}</p>}
            <button
              type="submit"
              disabled={isLoading || !passcode}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white rounded-xl px-4 py-3 font-semibold transition-colors disabled:opacity-50"
            >
              {isLoading ? "Verifying..." : "Unlock Dashboard"}
            </button>
          </form>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-white tracking-tight mb-2">
              Leads Dashboard
            </h1>
            <p className="text-neutral-400 font-sans">
              You have collected <span className="text-white font-bold">{leads.length}</span> total leads.
            </p>
          </div>
          
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden bg-black/40">
          <div className="p-4 border-b border-white/10 bg-white/5">
            <div className="relative max-w-md">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input 
                type="text"
                placeholder="Search by name, email, or location..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-black/50 border border-white/10 rounded-xl py-2.5 pl-12 pr-4 text-sm text-white placeholder-neutral-500 focus:outline-none focus:border-white/30"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="border-b border-white/10 bg-black/20 text-xs uppercase tracking-widest text-neutral-500 font-bold">
                  <th className="p-4 font-sans">User</th>
                  <th className="p-4 font-sans">Location</th>
                  <th className="p-4 font-sans">Date Submitted</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredLeads.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="p-12 text-center text-neutral-500 font-sans">
                      No leads found matching your search.
                    </td>
                  </tr>
                ) : (
                  filteredLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-white font-semibold font-sans flex items-center gap-2">
                            <User size={14} className="text-neutral-400" /> {lead.name}
                          </span>
                          <span className="text-blue-400 text-sm font-sans flex items-center gap-2 mt-1">
                            <Mail size={14} className="text-neutral-400" /> {lead.email}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <MapPin size={16} className="text-emerald-400 shrink-0" />
                          <div className="flex flex-col">
                            <span className="text-white text-sm">{lead.city !== "Unknown" && lead.city ? lead.city : "Unknown City"}</span>
                            <span className="text-neutral-500 text-xs">
                              {lead.country !== "Unknown" && lead.country ? lead.country : "Unknown Country"}
                              {lead.region && lead.region !== "Unknown" ? ` (${lead.region})` : ""}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2 text-neutral-300 text-sm font-sans">
                          <Clock size={14} className="text-neutral-500" />
                          {new Date(lead.created_at).toLocaleDateString(undefined, { 
                            year: 'numeric', month: 'short', day: 'numeric',
                            hour: '2-digit', minute: '2-digit'
                          })}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
