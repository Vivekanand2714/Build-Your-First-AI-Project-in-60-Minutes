import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { POPULAR_COLLEGES } from '../data/seedData';
import { 
  Trophy, School, MessageCircle, Copy, Check, Users, Sparkles, 
  ArrowRight, TrendingUp, Zap, Share2, Award, AlertCircle 
} from 'lucide-react';

export const CampusChallengePage: React.FC = () => {
  const { currentStudent, getCampusLeaderboard, simulateReferral } = useGrowth();
  
  const campusLeaderboard = getCampusLeaderboard();
  
  // Default selected college to active student's college, or the #1 college if visitor
  const [selectedCollege, setSelectedCollege] = useState<string>(
    currentStudent?.college || POPULAR_COLLEGES[0]
  );
  
  const [copiedInvite, setCopiedInvite] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Stats for the currently selected campus
  const activeCampusStats = campusLeaderboard.find(c => c.name === selectedCollege) || campusLeaderboard[0];

  const originUrl = window.location.origin;
  const refCodeParam = currentStudent ? `?ref=${currentStudent.referralCode}&source=whatsapp` : '?source=whatsapp';
  const inviteUrl = `${originUrl}/register${refCodeParam}`;

  const inviteMessage = `🚀 Help ${activeCampusStats.name} climb the campus leaderboard in the free workshop "Build Your First AI Project in 60 Minutes"! We are currently rank #${activeCampusStats.rank} with ${activeCampusStats.count} builders. Register with my link: ${inviteUrl}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(inviteMessage)}`;

  const handleCopyInvite = () => {
    navigator.clipboard.writeText(inviteMessage);
    setCopiedInvite(true);
    setTimeout(() => setCopiedInvite(false), 2500);
  };

  const handleSimulateCampusReferral = () => {
    const res = simulateReferral(currentStudent?.referralCode);
    if (res.success) {
      setToastMessage(res.message);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Hero Section */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs text-center sm:text-left flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <Trophy className="w-3.5 h-3.5" />
              <span>Inter-College Engineering League</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Which campus can build the biggest AI community?
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Students register, invite classmates and help their campus climb the leaderboard. 
              Top campuses unlock priority workshop mentorship cohorts and institutional spotlight badges.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200">
                Simulated Campus Data
              </span>
              <span className="text-slate-400">
                Live simulated count based on student registrations & referrals
              </span>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
            <a
              href="#rally-panel"
              className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition shadow-xs cursor-pointer"
            >
              <span>🚀 Rally Your College</span>
            </a>
            
            <button
              onClick={handleSimulateCampusReferral}
              className="inline-flex items-center justify-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-4 py-2.5 rounded-xl border border-slate-200 transition cursor-pointer"
              title="Test real-time leaderboard update with +1 referral"
            >
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span>Simulate Peer Referral</span>
            </button>
          </div>
        </div>

        {toastMessage && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toastMessage}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-mono">Leaderboard Updated!</span>
          </div>
        )}

        {/* 2-Column Section: Leaderboard + Rally Sharing Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Campus Leaderboard (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <School className="w-5 h-5 text-emerald-600" />
                  <span>Campus Rankings</span>
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ordered by total registered student builders (Simulated Dataset)
                </p>
              </div>

              <span className="text-[11px] font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
                6 Campuses
              </span>
            </div>

            <div className="space-y-3.5">
              {campusLeaderboard.map((campus) => {
                const isSelected = selectedCollege === campus.name;
                const isUserCollege = currentStudent?.college === campus.name;

                return (
                  <div
                    key={campus.name}
                    onClick={() => setSelectedCollege(campus.name)}
                    className={`p-4 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/40 shadow-2xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3 mb-2">
                      <div className="flex items-center gap-3 min-w-0">
                        {/* Rank Badge */}
                        <div className={`w-7 h-7 rounded-lg font-mono font-extrabold text-xs flex items-center justify-center shrink-0 ${
                          campus.rank === 1
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : campus.rank === 2
                            ? 'bg-slate-200 text-slate-800 border border-slate-300'
                            : campus.rank === 3
                            ? 'bg-amber-50 text-amber-700 border border-amber-200'
                            : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          #{campus.rank}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-semibold text-xs sm:text-sm text-slate-900 truncate">
                              {campus.name}
                            </span>
                            {isUserCollege && (
                              <span className="bg-emerald-600 text-white text-[9px] font-mono px-1.5 py-0.2 rounded font-bold uppercase shrink-0">
                                Your Campus
                              </span>
                            )}
                          </div>
                          <span className="text-[11px] text-slate-500">
                            {campus.rank === 1
                              ? '🏆 Leading the AI community sprint'
                              : `${campus.neededForNextRank} builders needed to take #${campus.rank - 1}`}
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="font-mono text-base font-extrabold text-slate-900">
                          {campus.count}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          builders
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/60 mt-1">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          campus.rank === 1 ? 'bg-emerald-600' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${campus.percent}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 text-center">
              * Note: These are simulated metrics for the prototype growth challenge. Real institutions are not active promotional partners.
            </div>
          </div>

          {/* Right Column: Rally Your College Sharing Panel (5 cols) */}
          <div id="rally-panel" className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Rally Your College</span>
              </h2>
              <span className="text-[11px] font-mono text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Rank #{activeCampusStats.rank}
              </span>
            </div>

            {/* College selector dropdown */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Selected Campus to Rally:
              </label>
              <select
                value={selectedCollege}
                onChange={(e) => setSelectedCollege(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-medium focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 cursor-pointer"
              >
                {POPULAR_COLLEGES.map(name => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
            </div>

            {/* Target Campus Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
              <div className="text-xs text-slate-500 font-medium">
                Your campus:
              </div>
              <div className="text-sm font-bold text-slate-900">
                {activeCampusStats.name}
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-200/80">
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Current Rank</div>
                  <div className="text-lg font-extrabold text-emerald-600 font-mono">
                    #{activeCampusStats.rank}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 uppercase font-mono">Builders Registered</div>
                  <div className="text-lg font-extrabold text-slate-900 font-mono">
                    {activeCampusStats.count}
                  </div>
                </div>
              </div>

              <div className="p-2.5 bg-white rounded-lg border border-slate-200 text-xs text-slate-600">
                {activeCampusStats.rank === 1 ? (
                  <span className="text-emerald-700 font-semibold">
                    🎉 Leading position! Keep sharing to widen your campus lead.
                  </span>
                ) : (
                  <span>
                    Need <strong className="text-emerald-600 font-mono">+{activeCampusStats.neededForNextRank}</strong> more student registrations to reach <strong className="text-slate-800 font-mono">Rank #{activeCampusStats.rank - 1}</strong>.
                  </span>
                )}
              </div>
            </div>

            {/* Sharing Actions */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-800">
                Share With Classmates:
              </div>

              <a
                href={whatsappShareUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition shadow-xs"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Share on WhatsApp</span>
              </a>

              <button
                onClick={handleCopyInvite}
                className="w-full flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-3 px-4 rounded-xl border border-slate-200 transition cursor-pointer"
              >
                {copiedInvite ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>Campus Invite Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy Campus Invite</span>
                  </>
                )}
              </button>
            </div>

            {/* Preview Box */}
            <div className="text-[11px] text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-200 font-mono space-y-1">
              <div className="text-[10px] uppercase font-bold text-slate-400">Invite Preview:</div>
              <p className="line-clamp-3 leading-relaxed text-slate-600">
                "{inviteMessage}"
              </p>
            </div>

            {/* Logged in info */}
            {currentStudent ? (
              <div className="text-[11px] text-emerald-700 bg-emerald-50 p-2.5 rounded-lg border border-emerald-200 flex items-center justify-between">
                <span>Referrals track to your code: <strong className="font-mono">{currentStudent.referralCode}</strong></span>
                <Link to="/dashboard" className="font-semibold underline">Dashboard &rarr;</Link>
              </div>
            ) : (
              <div className="text-[11px] text-slate-500 text-center">
                Want individual referral tracking?{' '}
                <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
                  Register here
                </Link>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
