import React, { useState, useMemo } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { 
  BarChart3, Users, Share2, TrendingUp, Sparkles, School, 
  MessageCircle, ExternalLink, Copy, Check, RefreshCw, Zap, ArrowUpRight, 
  CheckCircle2, Filter, Layers, Radio, Settings, UserCheck, Target, ArrowDown, Award
} from 'lucide-react';
import { AcquisitionChannel } from '../types';

export const AdminPage: React.FC = () => {
  const { students, currentStudent, setCurrentStudentId, metrics, simulateReferral, resetDemoData, getCampusLeaderboard } = useGrowth();
  
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [campaignSource, setCampaignSource] = useState<AcquisitionChannel>('whatsapp');
  const [customRefCode, setCustomRefCode] = useState('AI60-VIVEK7');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const originUrl = window.location.origin;
  const generatedCampaignUrl = `${originUrl}/register?source=${campaignSource}${customRefCode ? `&ref=${customRefCode}` : ''}`;

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedLink(url);
    setTimeout(() => setCopiedLink(null), 2500);
  };

  const handleSimulate = () => {
    const res = simulateReferral();
    if (res.success) {
      setToastMessage(res.message);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  // Top Colleges breakdown
  const topColleges = useMemo(() => {
    const list = Object.entries(metrics.collegeBreakdown).map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / metrics.totalRegistrations) * 100) || 0
    }));
    return list.sort((a, b) => b.count - a.count).slice(0, 6);
  }, [metrics]);

  // Top referrers
  const topReferrers = useMemo(() => {
    return [...students]
      .filter(s => s.referralCount > 0)
      .sort((a, b) => b.referralCount - a.referralCount)
      .slice(0, 5);
  }, [students]);

  // Registrations over time (last 5 simulated days)
  const timelineData = useMemo(() => {
    const days: Record<string, number> = {};
    const now = new Date();
    for (let i = 4; i >= 0; i--) {
      const d = new Date(now.getTime() - i * 24 * 3600 * 1000);
      const key = d.toLocaleDateString(undefined, { weekday: 'short', month: 'numeric', day: 'numeric' });
      days[key] = 0;
    }

    students.forEach(s => {
      const d = new Date(s.registeredAt);
      const key = d.toLocaleDateString(undefined, { weekday: 'short', month: 'numeric', day: 'numeric' });
      if (days[key] !== undefined) {
        days[key] += 1;
      } else {
        const keys = Object.keys(days);
        days[keys[keys.length - 1]] = (days[keys[keys.length - 1]] || 0) + 1;
      }
    });

    const maxVal = Math.max(...Object.values(days), 1);
    return Object.entries(days).map(([label, count]) => ({
      label,
      count,
      heightPercent: Math.round((count / maxVal) * 100),
    }));
  }, [students]);

  // Channel details
  const channelDetails: { key: AcquisitionChannel; label: string; desc: string; color: string }[] = [
    { key: 'whatsapp', label: 'WhatsApp Groups', desc: 'Class WhatsApp groups & chats', color: 'bg-emerald-500' },
    { key: 'referral', label: 'Student Referrals', desc: 'Direct peer referral links', color: 'bg-emerald-600' },
    { key: 'club', label: 'College Clubs', desc: 'GDSC, ACM, Coding clubs', color: 'bg-teal-600' },
    { key: 'outreach', label: 'Targeted Outreach', desc: 'Departmental notices & emails', color: 'bg-amber-500' },
    { key: 'direct', label: 'Direct Organic', desc: 'Direct visits without tags', color: 'bg-slate-400' },
  ];

  // Campus Performance & Funnel Data
  const campusLeaderboard = getCampusLeaderboard();
  const registrationGoal = 50;
  const goalProgress = Math.min(100, Math.round((metrics.totalRegistrations / registrationGoal) * 100));

  const funnelVisitors = Math.round(metrics.totalRegistrations * 3.8);
  const funnelRegistrations = metrics.totalRegistrations;
  const funnelReferrals = metrics.referralRegistrations;
  const funnelStarts = Math.max(1, Math.round(metrics.totalRegistrations * 0.72));
  const funnelCompletions = Math.max(1, Math.round(metrics.totalRegistrations * 0.52));
  const activeCollegesCount = Math.max(6, Object.keys(metrics.collegeBreakdown).length);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Top Header */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-2">
              <BarChart3 className="w-3.5 h-3.5" />
              <span>Growth Intelligence & Campaign Analytics (Simulation)</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
              Workshop Growth Dashboard
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm mt-1">
              Tracking of simulated student referral loops, conversion metrics, and multi-channel attribution.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs bg-slate-100 text-slate-600 border border-slate-200 px-3 py-1.5 rounded-xl font-mono">
              Simulated Dataset
            </span>
          </div>
        </div>

        {/* DEMO CONTROLS AREA (Dedicated for Evaluator Presentation) */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center">
                <Settings className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <span>Demo Controls</span>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-200">
                    Presentation Only
                  </span>
                </h3>
                <p className="text-slate-500 text-xs mt-0.5">
                  Controls for demonstrating student switching, referral increments, and state resets.
                </p>
              </div>
            </div>

            <div className="text-xs text-slate-500">
              Active Persona: <strong className="text-slate-900">{currentStudent ? currentStudent.fullName : 'Unregistered Visitor'}</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-5">
            {/* Control 1: Switch Demo Student */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Switch Demo Student</span>
              </label>
              <select
                value={currentStudent?.id || ''}
                onChange={(e) => setCurrentStudentId(e.target.value || null)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 cursor-pointer"
              >
                <option value="">— Unregistered Visitor Mode —</option>
                {students.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.fullName} ({s.referralCount} refs &bull; {s.college.split('–')[0].trim()})
                  </option>
                ))}
              </select>
              <p className="text-[10px] text-slate-400 mt-1">
                Updates active student session across Dashboard and Leaderboard.
              </p>
            </div>

            {/* Control 2: Simulate Referral */}
            <div className="flex flex-col justify-end">
              <button
                onClick={handleSimulate}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-xs cursor-pointer"
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Classmate Referral (+1)</span>
              </button>
              <p className="text-[10px] text-slate-400 mt-1 text-center">
                Adds a friend registration using the active referral code.
              </p>
            </div>

            {/* Control 3: Reset Demo Data */}
            <div className="flex flex-col justify-end">
              <button
                onClick={() => {
                  if (window.confirm('Reset all demo state back to initial seed data?')) resetDemoData();
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 border border-slate-200 transition cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
              <p className="text-[10px] text-slate-400 mt-1 text-center">
                Restores original seed students and metrics.
              </p>
            </div>
          </div>
        </div>

        {toastMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm flex items-center gap-2 shadow-xs">
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* 5 CORE KPI CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          
          {/* KPI 1: Registration Goal */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>Registration Goal</span>
              <Target className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.totalRegistrations} <span className="text-xs font-normal text-slate-400 font-sans">/ {registrationGoal}</span>
            </div>
            <div className="mt-3 flex items-center gap-1.5 text-[11px] text-slate-500">
              <span className="font-semibold text-emerald-600">{goalProgress}%</span>
              <span>of cohort goal</span>
            </div>
          </div>

          {/* KPI 2: Current Registrations */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>Current Registrations</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.totalRegistrations}
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulated demo records</span>
            </div>
          </div>

          {/* KPI 3: Referral Rate */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>Referral Rate</span>
              <Share2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-600 font-mono">
              {metrics.referralRate}%
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
              <span>Peer-driven percentage</span>
            </div>
          </div>

          {/* KPI 4: Campus Invites */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>Campus Invites</span>
              <Sparkles className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {metrics.referralRegistrations}
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
              <span>Classmate referrals logged</span>
            </div>
          </div>

          {/* KPI 5: Active Colleges */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
              <span>Active Colleges</span>
              <School className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
              {activeCollegesCount}
            </div>
            <div className="mt-3 flex items-center gap-1 text-[11px] text-slate-500">
              <span>Engineering institutions</span>
            </div>
          </div>

        </div>

        {/* CAMPUS PERFORMANCE & GROWTH FUNNEL GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Section: Campus Performance (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <School className="w-4 h-4 text-emerald-600" />
                  <span>Campus Performance</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Inter-college community standings & registration pace (Simulated Dataset)
                </p>
              </div>
              <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                6 Campuses
              </span>
            </div>

            <div className="space-y-3">
              {campusLeaderboard.map((camp) => (
                <div key={camp.name} className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span className={`w-6 h-6 rounded-md font-mono font-bold flex items-center justify-center text-[11px] ${
                        camp.rank === 1 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
                      }`}>
                        #{camp.rank}
                      </span>
                      <span className="font-semibold text-slate-900 truncate">
                        {camp.name}
                      </span>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="font-mono font-extrabold text-slate-900 text-sm">
                        {camp.count}
                      </span>
                      <span className="text-[10px] text-slate-400">builders</span>
                    </div>
                  </div>

                  <div className="w-full h-2 bg-white rounded-full overflow-hidden border border-slate-200">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        camp.rank === 1 ? 'bg-emerald-600' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${camp.percent}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Growth Funnel (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Growth Funnel</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visitor to workshop completion lifecycle drop-off (Simulated)
                </p>
              </div>
              <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
                Conversion
              </span>
            </div>

            {/* Funnel Steps */}
            <div className="space-y-2.5">
              
              {/* Step 1: Visitors */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Top of Funnel</div>
                  <div className="text-xs font-bold text-slate-800">1. Visitors</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900 text-sm">{funnelVisitors}</div>
                  <div className="text-[10px] text-slate-400">100% baseline</div>
                </div>
              </div>

              <div className="flex justify-center text-slate-300 -my-1">
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Step 2: Registrations */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Lead Conversion</div>
                  <div className="text-xs font-bold text-slate-800">2. Registrations</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-600 text-sm">{funnelRegistrations}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    {Math.round((funnelRegistrations / funnelVisitors) * 100)}% visitor rate
                  </div>
                </div>
              </div>

              <div className="flex justify-center text-slate-300 -my-1">
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Step 3: Referrals */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Viral Loop</div>
                  <div className="text-xs font-bold text-slate-800">3. Referrals</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-600 text-sm">{funnelReferrals}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">
                    {metrics.referralRate}% referral share
                  </div>
                </div>
              </div>

              <div className="flex justify-center text-slate-300 -my-1">
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Step 4: Workshop Starts */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-slate-400">Attendance</div>
                  <div className="text-xs font-bold text-slate-800">4. Workshop Starts</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-slate-900 text-sm">{funnelStarts}</div>
                  <div className="text-[10px] text-slate-500">
                    {Math.round((funnelStarts / funnelRegistrations) * 100)}% show-up rate
                  </div>
                </div>
              </div>

              <div className="flex justify-center text-slate-300 -my-1">
                <ArrowDown className="w-3.5 h-3.5 text-slate-400" />
              </div>

              {/* Step 5: Workshop Completions */}
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <div className="text-[10px] uppercase font-mono text-emerald-700">Project Built</div>
                  <div className="text-xs font-bold text-emerald-900">5. Workshop Completions</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-emerald-700 text-sm">{funnelCompletions}</div>
                  <div className="text-[10px] text-emerald-800 font-semibold">
                    {Math.round((funnelCompletions / funnelStarts) * 100)}% completion rate
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* CHARTS & VISUALIZATIONS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Visualization 1: Registrations Over Time */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-600" />
                  <span>Registrations Over Time (Simulated)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Daily pace of simulated student signups</p>
              </div>
              <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                Last 5 Days
              </span>
            </div>

            {/* Custom Bar Chart with light styling */}
            <div className="h-48 flex items-end justify-between gap-3 pt-6 border-b border-slate-100 px-2">
              {timelineData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="text-[11px] font-mono text-slate-600 font-semibold group-hover:text-emerald-600 transition">
                    {d.count}
                  </div>
                  <div
                    className="w-full bg-emerald-600 hover:bg-emerald-700 rounded-t-lg transition-all duration-300 shadow-2xs"
                    style={{ height: `${Math.max(15, d.heightPercent)}%` }}
                  ></div>
                  <div className="text-[10px] text-slate-400 font-mono truncate w-full text-center">
                    {d.label}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-3 text-right text-[11px] text-slate-400">
              Simulated trend: Consistent student referral acceleration
            </div>
          </div>

          {/* Visualization 2: Acquisition Channel Performance */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Layers className="w-4 h-4 text-emerald-600" />
                  <span>Acquisition Channel Performance</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Breakdown by campaign attribution source</p>
              </div>
              <span className="text-[11px] font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                Attribution
              </span>
            </div>

            <div className="space-y-4">
              {channelDetails.map(ch => {
                const count = metrics.channelBreakdown[ch.key] || 0;
                const pct = metrics.totalRegistrations > 0 ? Math.round((count / metrics.totalRegistrations) * 100) : 0;
                
                return (
                  <div key={ch.key} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <span className={`w-2.5 h-2.5 rounded-full ${ch.color}`}></span>
                        <span className="font-semibold text-slate-800">{ch.label}</span>
                        <span className="text-slate-400 hidden sm:inline">({ch.desc})</span>
                      </div>
                      <div className="font-mono text-slate-700">
                        <strong>{count}</strong> ({pct}%)
                      </div>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${ch.color} rounded-full transition-all duration-500`}
                        style={{ width: `${pct}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Visualization 3: Top Participating Institutions (Demo Data) */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <School className="w-4 h-4 text-emerald-600" />
                  <span>Top Participating Institutions (Demo Data)</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Simulated breakdown for evaluation. Institutions are not real campaign partners.
                </p>
              </div>
            </div>

            <div className="space-y-3.5">
              {topColleges.map((col, idx) => (
                <div key={col.name} className="flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="font-mono text-slate-400 w-4">{idx + 1}.</span>
                    <span className="font-medium text-slate-800 truncate">{col.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <div className="w-24 sm:w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-emerald-600 rounded-full"
                        style={{ width: `${col.percent}%` }}
                      ></div>
                    </div>
                    <span className="font-mono font-bold text-slate-900 w-6 text-right">{col.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Visualization 4: Top Referrers */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>Top Student Referrers</span>
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Campus advocates driving peer signups</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase font-mono pb-2">
                    <th className="pb-2">Student</th>
                    <th className="pb-2">Code</th>
                    <th className="pb-2">College</th>
                    <th className="pb-2 text-right">Referrals</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {topReferrers.map((s, idx) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="py-2.5 font-medium text-slate-900 flex items-center gap-1.5">
                        <span className="font-mono text-slate-400">#{idx + 1}</span>
                        <span>{s.fullName}</span>
                      </td>
                      <td className="py-2.5 font-mono text-emerald-600 font-semibold">{s.referralCode}</td>
                      <td className="py-2.5 text-slate-600 truncate max-w-[140px]">{s.college}</td>
                      <td className="py-2.5 text-right font-mono font-extrabold text-amber-600">{s.referralCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

        {/* CAMPAIGN URL BUILDER */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="max-w-2xl">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Radio className="w-5 h-5 text-emerald-600" />
              <span>Campaign Attribution URL Generator</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Generate tracked UTM/Source links for testing college marketing channels (?source=whatsapp, ?source=club, ?source=outreach, ?source=referral).
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Channel (?source=)
              </label>
              <select
                value={campaignSource}
                onChange={(e) => setCampaignSource(e.target.value as AcquisitionChannel)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 cursor-pointer"
              >
                <option value="whatsapp">WhatsApp Groups (?source=whatsapp)</option>
                <option value="club">College Clubs (?source=club)</option>
                <option value="referral">Student Referrals (?source=referral)</option>
                <option value="outreach">Targeted Outreach (?source=outreach)</option>
                <option value="direct">Direct Organic (?source=direct)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Attach Referral Code (?ref=)
              </label>
              <input
                type="text"
                placeholder="Optional, e.g. AI60-VIVEK7"
                value={customRefCode}
                onChange={(e) => setCustomRefCode(e.target.value.toUpperCase())}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 font-mono uppercase focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <div className="flex flex-col justify-end">
              <button
                onClick={() => copyUrl(generatedCampaignUrl)}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1.5 transition cursor-pointer shadow-xs"
              >
                {copiedLink === generatedCampaignUrl ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-200" />
                    <span>Copied Generated URL!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Campaign URL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs font-mono text-slate-600">
            <span className="truncate pr-4">{generatedCampaignUrl}</span>
            <a
              href={generatedCampaignUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-600 hover:text-emerald-700 flex items-center gap-1 shrink-0 font-sans font-semibold text-[11px]"
            >
              <span>Test Link</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* RECENT REGISTRATIONS AUDIT FEED */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-4 h-4 text-emerald-600" />
              <span>Real-Time Registration Audit Log</span>
            </h3>
            <span className="text-xs text-slate-500 font-mono">
              Total: {students.length} demo records
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500 uppercase font-mono pb-2">
                  <th className="pb-2">Student</th>
                  <th className="pb-2">College</th>
                  <th className="pb-2">Referral Code</th>
                  <th className="pb-2">Referred By</th>
                  <th className="pb-2">Channel Source</th>
                  <th className="pb-2 text-right">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {students.slice(0, 10).map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="py-2.5 font-medium text-slate-900">{s.fullName}</td>
                    <td className="py-2.5 text-slate-600">{s.college}</td>
                    <td className="py-2.5 font-mono text-emerald-600 font-semibold">{s.referralCode}</td>
                    <td className="py-2.5 font-mono text-slate-500">
                      {s.referredBy ? (
                        <span className="text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                          {s.referredBy}
                        </span>
                      ) : (
                        <span className="text-slate-400">—</span>
                      )}
                    </td>
                    <td className="py-2.5 uppercase font-mono text-[10px]">
                      <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-700 border border-slate-200">
                        {s.acquisitionChannel || 'direct'}
                      </span>
                    </td>
                    <td className="py-2.5 text-right font-mono text-slate-500">
                      {new Date(s.registeredAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};
