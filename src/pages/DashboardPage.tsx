import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { WORKSHOP_DETAILS, PROJECT_BLUEPRINTS } from '../data/seedData';
import confetti from 'canvas-confetti';
import { 
  CheckCircle2, Copy, Check, Share2, Trophy, Users, Zap, 
  ArrowRight, MessageCircle, Sparkles, Award, Calendar, ExternalLink,
  AlertCircle, Lock, Search, School, Code2, Cpu, CheckSquare, Square
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const { 
    currentStudent, getStudentRank, getReferredStudents, simulateReferral, 
    loginByEmailOrCode, setCurrentStudentId, getCampusStats, updateBuilderProgress 
  } = useGrowth();

  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedCampusInvite, setCopiedCampusInvite] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // For unregistered visitor lookup
  const [lookupQuery, setLookupQuery] = useState('');
  const [lookupError, setLookupError] = useState<string | null>(null);

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    const res = loginByEmailOrCode(lookupQuery);
    if (!res.success) {
      setLookupError(res.error || 'Student registration not found.');
    }
  };

  if (!currentStudent) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] py-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <div className="max-w-md w-full bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
              <Lock className="w-5 h-5" />
            </div>
            <h2 className="text-2xl font-bold text-[#0F172A]">Student Dashboard</h2>
            <p className="text-slate-500 text-xs leading-relaxed">
              Enter your registered email address or referral code to access your live dashboard and referral statistics.
            </p>
          </div>

          {lookupError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-800 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{lookupError}</span>
            </div>
          )}

          <form onSubmit={handleLookup} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Registered Email or Referral Code
              </label>
              <input
                type="text"
                placeholder="e.g. vivek.anand@college.edu or AI60-VIVEK7"
                value={lookupQuery}
                onChange={(e) => setLookupQuery(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0F172A] placeholder-slate-400 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-xs cursor-pointer"
            >
              Access My Dashboard
            </button>
          </form>

          <div className="pt-4 border-t border-slate-100 space-y-3 text-center text-xs">
            <div className="text-slate-500">
              Not registered yet?{' '}
              <Link to="/register" className="text-emerald-600 font-semibold hover:underline">
                Register Free (Takes 30s)
              </Link>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-[11px] text-slate-500 flex items-center justify-between">
              <span>Demo Quick Preview:</span>
              <button
                onClick={() => setCurrentStudentId('std-3')}
                className="text-emerald-600 hover:text-emerald-800 font-semibold underline cursor-pointer"
              >
                Open Demo Account (Vivek)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const rank = getStudentRank(currentStudent.id);
  const referredList = getReferredStudents(currentStudent.referralCode);
  const refCount = currentStudent.referralCount;

  // Campus stats
  const campusStats = getCampusStats(currentStudent.college);

  // Selected project info
  const selectedProjId = currentStudent.selectedProject || 'resume-analyzer';
  const projectObj = PROJECT_BLUEPRINTS.find(p => p.id === selectedProjId) || PROJECT_BLUEPRINTS[0];

  // AI Builder Milestones
  const m1_registered = true;
  const m2_selectedProject = !!currentStudent.selectedProject;
  const m3_invitedClassmates = refCount > 0;
  const m4_startedWorkshop = !!currentStudent.workshopStarted;
  const m5_completedWorkshop = !!currentStudent.workshopCompleted;

  const milestonesCompletedCount = [
    m1_registered,
    m2_selectedProject,
    m3_invitedClassmates,
    m4_startedWorkshop,
    m5_completedWorkshop
  ].filter(Boolean).length;

  const builderProgressPercent = Math.round((milestonesCompletedCount / 5) * 100);

  const milestoneTarget = 5;
  const progressPercent = Math.min(100, Math.round((refCount / milestoneTarget) * 100));

  const originUrl = window.location.origin;
  const referralLink = `${originUrl}/register?ref=${currentStudent.referralCode}&source=whatsapp`;

  const copyToClipboard = (text: string, isCode = false) => {
    navigator.clipboard.writeText(text);
    if (isCode) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2500);
    } else {
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const shareText = `Join me in the free workshop "Build Your First AI Project in 60 Minutes"! We code and deploy a real AI app live. Register with my link: ${referralLink}`;
  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  const campusRallyMsg = `🚀 Help ${currentStudent.college} climb the campus leaderboard in "Build Your First AI Project in 60 Minutes"! We are currently Rank #${campusStats.rank}. Register with my referral link: ${referralLink}`;
  const campusWhatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(campusRallyMsg)}`;

  const handleCopyCampusInvite = () => {
    navigator.clipboard.writeText(campusRallyMsg);
    setCopiedCampusInvite(true);
    setTimeout(() => setCopiedCampusInvite(false), 2500);
  };

  const handleSimulate = () => {
    const res = simulateReferral(currentStudent.referralCode);
    if (res.success) {
      setToast(res.message);
      try {
        confetti({
          particleCount: 40,
          spread: 60,
          origin: { y: 0.7 }
        });
      } catch {}
      setTimeout(() => setToast(null), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Welcome Header */}
        <div className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Registered ✓
              </span>
              <span className="text-xs text-slate-400 font-mono">
                Student ID: {currentStudent.id.substring(0, 10)}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
              Welcome back, {currentStudent.fullName}
            </h1>
            <p className="text-slate-500 text-xs sm:text-sm">
              {currentStudent.branch} &bull; {currentStudent.college} &bull; {currentStudent.yearOfStudy}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              to="/campus-challenge"
              className="inline-flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 transition"
            >
              <School className="w-4 h-4 text-emerald-600" />
              <span>Campus Challenge (#{campusStats.rank})</span>
            </Link>

            {/* Evaluator Demo Tool button */}
            <button
              onClick={handleSimulate}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
              title="Evaluator Demo: Test 1 classmate signup"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Demo: +1 Classmate Referral</span>
            </button>
          </div>
        </div>

        {/* Real-time Toast */}
        {toast && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl text-xs sm:text-sm flex items-center justify-between shadow-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{toast}</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-mono">Real-time update</span>
          </div>
        )}

        {/* FEATURE 6 — AI BUILDER JOURNEY SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-600" />
                <span>AI Builder Journey</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Track your progress through registration, project blueprint selection, referral loop, and live build session.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold font-mono text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                {milestonesCompletedCount} / 5 milestones completed
              </span>
            </div>
          </div>

          {/* Builder Progress Bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-medium text-slate-600">
              <span>Overall Builder Readiness</span>
              <span className="font-mono text-emerald-600 font-bold">{builderProgressPercent}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                style={{ width: `${builderProgressPercent}%` }}
              ></div>
            </div>
          </div>

          {/* 5 Milestones Row */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-1">
            
            {/* Milestone 1 */}
            <div className="p-3.5 rounded-xl border bg-emerald-50/60 border-emerald-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>1. Registered</span>
              </div>
              <p className="text-[11px] text-emerald-700">Workshop seat confirmed</p>
            </div>

            {/* Milestone 2 */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
              m2_selectedProject ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                {m2_selectedProject ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">○</span>
                )}
                <span>2. Selected Project</span>
              </div>
              <div className="text-[11px] text-slate-600 truncate">
                {projectObj.title}
              </div>
              <Link to="/playground" className="text-[10px] text-emerald-600 font-semibold hover:underline block">
                Change blueprint &rarr;
              </Link>
            </div>

            {/* Milestone 3 */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
              m3_invitedClassmates ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                {m3_invitedClassmates ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">○</span>
                )}
                <span>3. Invited Classmates</span>
              </div>
              <p className="text-[11px] text-slate-600">
                {refCount > 0 ? `${refCount} classmate(s) joined` : '0 referrals yet'}
              </p>
              {!m3_invitedClassmates && (
                <button
                  onClick={handleSimulate}
                  className="text-[10px] text-emerald-600 font-semibold hover:underline cursor-pointer text-left block"
                >
                  Simulate referral &rarr;
                </button>
              )}
            </div>

            {/* Milestone 4 */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
              m4_startedWorkshop ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                {m4_startedWorkshop ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">○</span>
                )}
                <span>4. Started Workshop</span>
              </div>
              <p className="text-[11px] text-slate-600">
                {m4_startedWorkshop ? 'Phase underway' : 'Not started yet'}
              </p>
              <Link to="/workshop" className="text-[10px] text-emerald-600 font-semibold hover:underline block">
                Open workshop &rarr;
              </Link>
            </div>

            {/* Milestone 5 */}
            <div className={`p-3.5 rounded-xl border text-xs space-y-1 ${
              m5_completedWorkshop ? 'bg-emerald-50/60 border-emerald-200' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                {m5_completedWorkshop ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-4 h-4 rounded-full border border-slate-300 flex items-center justify-center text-[10px] text-slate-400">○</span>
                )}
                <span>5. Completed Workshop</span>
              </div>
              <p className="text-[11px] text-slate-600">
                {m5_completedWorkshop ? 'AI badge verified' : 'Final submission'}
              </p>
              {!m5_completedWorkshop && (
                <Link to="/workshop" className="text-[10px] text-emerald-600 font-semibold hover:underline block">
                  Complete in 60m &rarr;
                </Link>
              )}
            </div>

          </div>
        </div>

        {/* 3 Core Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1: Unique Referral Code & Link */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span>Unique Referral Code</span>
                <Sparkles className="w-4 h-4 text-emerald-600" />
              </div>
              <div className="flex items-center justify-between bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="text-xl sm:text-2xl font-mono font-extrabold text-emerald-600">
                  {currentStudent.referralCode}
                </span>
                <button
                  onClick={() => copyToClipboard(currentStudent.referralCode, true)}
                  className="p-1.5 hover:bg-white rounded-lg text-slate-500 hover:text-slate-900 transition border border-transparent hover:border-slate-200 cursor-pointer"
                  title="Copy Code"
                >
                  {copiedCode ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-emerald-600" />}
                </button>
              </div>

              <div className="mt-4">
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Referral Link
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    readOnly
                    value={referralLink}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-700 text-xs rounded-xl px-3 py-2 font-mono truncate"
                  />
                  <button
                    onClick={() => copyToClipboard(referralLink, false)}
                    className="shrink-0 bg-white hover:bg-slate-50 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 border border-slate-200 transition cursor-pointer"
                  >
                    {copiedLink ? 'Copied' : 'Copy'}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-xl transition shadow-xs"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Share via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Card 2: Referral Count & Progress Bar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span>Referral Count & Progress</span>
                <Users className="w-4 h-4 text-emerald-600" />
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-[#0F172A] font-mono">
                  {refCount}
                </span>
                <span className="text-sm text-slate-500">
                  successful referrals
                </span>
              </div>

              {/* Progress Bar (e.g. 3 / 5) */}
              <div className="mt-5 space-y-2">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-700">Milestone: VIP Code Review</span>
                  <span className="text-emerald-600 font-mono">{refCount} / {milestoneTarget}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-emerald-600 rounded-full transition-all duration-500"
                    style={{ width: `${progressPercent}%` }}
                  ></div>
                </div>
                <p className="text-[11px] text-slate-500">
                  {refCount >= milestoneTarget 
                    ? '🎉 Goal reached! You unlocked VIP Mentor Code Review status.'
                    : `${milestoneTarget - refCount} more referrals needed to reach next tier.`}
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <div className="text-xs text-slate-600 flex items-center justify-between">
                <span>Current Tier</span>
                <span className="font-semibold text-emerald-600">
                  {refCount >= 10 ? 'AI Leader' : refCount >= 5 ? 'Campus Ambassador' : refCount >= 3 ? 'Growth Champion' : refCount >= 1 ? 'AI Pioneer' : 'Registered Member'}
                </span>
              </div>
            </div>
          </div>

          {/* Card 3: Leaderboard Position & CTA */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col justify-between shadow-xs">
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">
                <span>Campus Leaderboard</span>
                <Trophy className="w-4 h-4 text-amber-500" />
              </div>

              <div className="flex items-baseline gap-2 mt-1">
                <span className="text-4xl font-extrabold text-[#0F172A] font-mono">
                  #{rank}
                </span>
                <span className="text-sm text-slate-500">
                  Student Rank
                </span>
              </div>

              <div className="mt-5 p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <h4 className="text-xs font-bold text-slate-800 mb-0.5">
                  Campus Position
                </h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Your campus is currently <strong className="text-emerald-600 font-bold">Rank #{campusStats.rank}</strong> in the Campus Challenge.
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100">
              <Link
                to="/leaderboard"
                className="w-full flex items-center justify-center gap-1.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold py-2.5 rounded-xl border border-slate-200 transition"
              >
                <span>View Full Leaderboard Rankings</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* FEATURE 3 — RALLY YOUR COLLEGE SECTION */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <School className="w-5 h-5 text-emerald-600" />
                <span>Rally Your College</span>
              </h2>
              <p className="text-xs text-slate-600 mt-0.5">
                Your referrals help your campus climb the leaderboard.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full border border-emerald-200">
                {currentStudent.college.split('–')[0].trim()} &bull; Rank #{campusStats.rank}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* College Rank Card */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Current Campus Rank</div>
              <div className="text-2xl font-extrabold text-emerald-600 font-mono mt-1">
                #{campusStats.rank}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {campusStats.count} builders registered from {currentStudent.college.split('–')[0].trim()}
              </div>
            </div>

            {/* Referrals Contributed */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Your Campus Contribution</div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                {refCount}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                Direct peer referrals added to your college total
              </div>
            </div>

            {/* Needed for next rank */}
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[10px] font-mono text-slate-500 uppercase">Target Ahead</div>
              <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">
                {campusStats.rank === 1 ? 'Rank #1' : `+${campusStats.neededForNextRank}`}
              </div>
              <div className="text-xs text-slate-600 mt-1">
                {campusStats.rank === 1 
                  ? 'Leading the inter-college sprint!' 
                  : `Registrations needed to reach Rank #${campusStats.rank - 1}`}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={campusWhatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs py-2.5 px-5 rounded-xl transition shadow-xs"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Share on WhatsApp</span>
            </a>

            <button
              onClick={handleCopyCampusInvite}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs py-2.5 px-4 rounded-xl border border-slate-200 transition cursor-pointer"
            >
              {copiedCampusInvite ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span>Referral Link Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy Referral Link</span>
                </>
              )}
            </button>

            <Link
              to="/campus-challenge"
              className="w-full sm:w-auto ml-auto text-center text-xs font-semibold text-emerald-600 hover:text-emerald-700 hover:underline py-2"
            >
              View Full Campus Challenge &rarr;
            </Link>
          </div>
        </div>

        {/* Referred Classmates Table */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <span>Referred Classmates ({referredList.length})</span>
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Students who registered using your referral code <code className="text-emerald-600 font-mono font-semibold">{currentStudent.referralCode}</code>
              </p>
            </div>

            <button
              onClick={handleSimulate}
              className="inline-flex items-center gap-1.5 text-xs text-emerald-600 hover:text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-3.5 py-2 rounded-xl transition cursor-pointer"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Simulate Classmate Referral</span>
            </button>
          </div>

          {referredList.length === 0 ? (
            <div className="bg-slate-50 border border-dashed border-slate-200 rounded-xl p-10 text-center space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto">
                <Share2 className="w-6 h-6" />
              </div>
              <h4 className="text-[#0F172A] font-semibold text-sm">No referrals yet</h4>
              <p className="text-slate-500 text-xs max-w-sm mx-auto">
                Share your referral link with branch classmates in WhatsApp groups, or click "Simulate Classmate Referral" above to test the flow.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => copyToClipboard(referralLink, false)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-4 py-2 rounded-xl cursor-pointer transition"
                >
                  Copy Referral Link
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-500 uppercase tracking-wider font-mono text-[11px]">
                    <th className="pb-3 pl-2">#</th>
                    <th className="pb-3">Classmate</th>
                    <th className="pb-3">College</th>
                    <th className="pb-3">Branch</th>
                    <th className="pb-3">Registered Time</th>
                    <th className="pb-3 pr-2 text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {referredList.map((st, idx) => (
                    <tr key={st.id} className="hover:bg-slate-50 transition">
                      <td className="py-3.5 pl-2 font-mono text-slate-400">{idx + 1}</td>
                      <td className="py-3.5 font-medium text-[#0F172A]">{st.fullName}</td>
                      <td className="py-3.5 text-slate-600">{st.college}</td>
                      <td className="py-3.5 text-slate-500">{st.branch}</td>
                      <td className="py-3.5 text-slate-500 font-mono">
                        {new Date(st.registeredAt).toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="py-3.5 pr-2 text-right">
                        <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          Confirmed ✓
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Workshop Reminder Box */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 text-emerald-600 text-xs font-semibold">
              <Calendar className="w-4 h-4" />
              <span>{WORKSHOP_DETAILS.date} &bull; {WORKSHOP_DETAILS.time}</span>
            </div>
            <h3 className="text-xl font-bold text-[#0F172A]">
              {WORKSHOP_DETAILS.title}
            </h3>
            <p className="text-slate-500 text-xs max-w-lg">
              Live link will be sent to your registered email address before the session starts. Pre-read templates will be emailed 24 hours prior.
            </p>
          </div>

          <Link
            to="/workshop"
            className="shrink-0 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-5 py-3 rounded-xl transition shadow-xs flex items-center gap-2"
          >
            <span>Launch 60-Minute Workshop</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>
    </div>
  );
};
