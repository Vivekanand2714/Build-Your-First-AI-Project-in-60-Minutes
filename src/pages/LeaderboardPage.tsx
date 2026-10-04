import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { 
  Trophy, Medal, Award, Search, Filter, Sparkles, 
  ArrowUpRight, Share2, Info, UserCheck, Flame, ChevronRight
} from 'lucide-react';

export const LeaderboardPage: React.FC = () => {
  const { getLeaderboard, currentStudent } = useGrowth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCollege, setSelectedCollege] = useState<string>('ALL');

  const leaderboard = getLeaderboard();

  // Extract unique colleges
  const colleges = useMemo(() => {
    const set = new Set<string>();
    leaderboard.forEach(s => set.add(s.college));
    return Array.from(set);
  }, [leaderboard]);

  const filteredLeaderboard = useMemo(() => {
    return leaderboard.filter(student => {
      const matchSearch = student.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          student.referralCode.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchCollege = selectedCollege === 'ALL' || student.college === selectedCollege;

      return matchSearch && matchCollege;
    });
  }, [leaderboard, searchTerm, selectedCollege]);

  const top3 = leaderboard.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-wider mb-3">
            <Trophy className="w-3.5 h-3.5 text-amber-500" />
            <span>Campus Growth Challenge</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
            Engineering Campus Leaderboard
          </h1>
          <p className="text-slate-600 text-sm mt-2">
            Recognizing final-year engineering students driving peer participation for the 60-minute live AI workshop.
          </p>

          {/* Sample Data Disclaimer Note */}
          <div className="mt-4 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-[11px] text-slate-500 shadow-2xs">
            <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>
              <strong>Simulation Notice:</strong> Demonstrates real-time growth loop mechanics. Data includes simulated campus records.
            </span>
          </div>
        </div>

        {/* Podium for Top 3 */}
        {top3.length >= 3 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            
            {/* Rank 2 (Silver) */}
            <div className={`order-2 md:order-1 bg-white border ${
              currentStudent?.id === top3[1].id ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200'
            } rounded-2xl p-6 text-center relative flex flex-col justify-between shadow-xs`}>
              <div>
                <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-300 text-slate-700 flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-2xs">
                  🥈 2
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="font-bold text-[#0F172A] text-base">{top3[1].fullName}</h3>
                  {currentStudent?.id === top3[1].id && (
                    <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">You</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">{top3[1].college}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-2xl font-extrabold text-[#0F172A] font-mono">{top3[1].referralCount}</span>
                <span className="text-xs text-slate-500 block">Classmate Referrals</span>
              </div>
            </div>

            {/* Rank 1 (Gold) */}
            <div className={`order-1 md:order-2 bg-white border-2 ${
              currentStudent?.id === top3[0].id ? 'border-amber-400 ring-2 ring-amber-100' : 'border-amber-400/80'
            } rounded-2xl p-6 text-center relative flex flex-col justify-between shadow-sm md:-translate-y-2`}>
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                Campus Leader
              </div>
              <div>
                <div className="w-14 h-14 rounded-full bg-amber-50 border-2 border-amber-300 text-amber-700 flex items-center justify-center mx-auto mb-3 font-extrabold text-xl shadow-xs">
                  👑 1
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="font-extrabold text-[#0F172A] text-lg">{top3[0].fullName}</h3>
                  {currentStudent?.id === top3[0].id && (
                    <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">You</span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">{top3[0].college}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-amber-100">
                <span className="text-3xl font-extrabold text-amber-600 font-mono">{top3[0].referralCount}</span>
                <span className="text-xs text-slate-500 block font-medium">Classmate Referrals</span>
              </div>
            </div>

            {/* Rank 3 (Bronze) */}
            <div className={`order-3 md:order-3 bg-white border ${
              currentStudent?.id === top3[2].id ? 'border-emerald-600 ring-2 ring-emerald-100' : 'border-slate-200'
            } rounded-2xl p-6 text-center relative flex flex-col justify-between shadow-xs`}>
              <div>
                <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto mb-3 font-bold text-lg shadow-2xs">
                  🥉 3
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <h3 className="font-bold text-[#0F172A] text-base">{top3[2].fullName}</h3>
                  {currentStudent?.id === top3[2].id && (
                    <span className="bg-emerald-600 text-white text-[10px] px-1.5 py-0.5 rounded font-bold">You</span>
                  )}
                </div>
                <p className="text-xs text-slate-500 mt-1">{top3[2].college}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <span className="text-2xl font-extrabold text-[#0F172A] font-mono">{top3[2].referralCount}</span>
                <span className="text-xs text-slate-500 block">Classmate Referrals</span>
              </div>
            </div>

          </div>
        )}

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-2xl shadow-xs">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search student or college..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-slate-500 shrink-0" />
            <select
              value={selectedCollege}
              onChange={(e) => setSelectedCollege(e.target.value)}
              className="bg-slate-50 border border-slate-200 text-slate-800 text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 w-full sm:w-auto cursor-pointer"
            >
              <option value="ALL">All Engineering Colleges</option>
              {colleges.map(c => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono text-[11px]">
                  <th className="py-4 px-4 sm:px-6">Rank</th>
                  <th className="py-4 px-4">Student</th>
                  <th className="py-4 px-4">College</th>
                  <th className="py-4 px-4 sm:px-6 text-right">Referrals</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredLeaderboard.map((student) => {
                  const isCurrent = currentStudent?.id === student.id;
                  
                  return (
                    <tr
                      key={student.id}
                      className={`transition ${
                        isCurrent
                          ? 'bg-emerald-50/70 font-semibold border-l-4 border-l-emerald-600'
                          : 'hover:bg-slate-50/60'
                      }`}
                    >
                      {/* Rank Column */}
                      <td className="py-4 px-4 sm:px-6 font-mono">
                        <div className="flex items-center gap-2">
                          {student.rank === 1 ? (
                            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs border border-amber-300">
                              1
                            </span>
                          ) : student.rank === 2 ? (
                            <span className="w-6 h-6 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs border border-slate-300">
                              2
                            </span>
                          ) : student.rank === 3 ? (
                            <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs border border-amber-300">
                              3
                            </span>
                          ) : (
                            <span className="text-slate-500 font-medium pl-1">
                              #{student.rank}
                            </span>
                          )}
                        </div>
                      </td>

                      {/* Student Column */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className={isCurrent ? 'text-emerald-950 font-bold' : 'text-[#0F172A] font-medium'}>
                            {student.fullName}
                          </span>
                          {isCurrent && (
                            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                              You
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                          Code: {student.referralCode}
                        </div>
                      </td>

                      {/* College Column */}
                      <td className="py-4 px-4 text-slate-600">
                        {student.college}
                      </td>

                      {/* Referrals Column */}
                      <td className="py-4 px-4 sm:px-6 text-right font-mono">
                        <span className={`inline-block text-sm sm:text-base font-extrabold ${
                          student.rank <= 3 ? 'text-amber-600' : isCurrent ? 'text-emerald-600' : 'text-[#0F172A]'
                        }`}>
                          {student.referralCount}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredLeaderboard.length === 0 && (
            <div className="p-8 text-center text-slate-500 text-xs">
              No students match your filter criteria.
            </div>
          )}
        </div>

        {/* Growth CTA footer */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left shadow-xs">
          <div className="space-y-1">
            <h4 className="text-[#0F172A] font-bold text-sm">
              Want to see your name at the top?
            </h4>
            <p className="text-slate-500 text-xs">
              Grab your referral link from the dashboard, share it in your college clubs, and watch your rank climb!
            </p>
          </div>

          <Link
            to="/dashboard"
            className="shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-5 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
          >
            <span>Go to My Dashboard</span>
            <Share2 className="w-3.5 h-3.5" />
          </Link>
        </div>

      </div>
    </div>
  );
};
