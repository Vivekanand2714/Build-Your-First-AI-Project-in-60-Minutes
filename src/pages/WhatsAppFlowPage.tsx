import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { 
  MessageCircle, Play, Pause, RotateCcw, CheckCheck, Sparkles, 
  Clock, ShieldCheck, ArrowRight, Bell, Share2, Award, Zap 
} from 'lucide-react';

interface LifecycleStage {
  stageNumber: number;
  id: string;
  title: string;
  timing: string;
  goal: string;
  messageText: (name: string, project: string, code: string, college: string) => string;
  growthMechanism: string;
}

export const WhatsAppFlowPage: React.FC = () => {
  const { currentStudent } = useGrowth();

  const studentName = currentStudent?.fullName || 'Vivek Anand';
  const studentProject = currentStudent?.selectedProject === 'ai-chatbot'
    ? 'AI Chatbot'
    : currentStudent?.selectedProject === 'performance-predictor'
    ? 'Student Performance Predictor'
    : currentStudent?.selectedProject === 'sentiment-analyzer'
    ? 'Sentiment / Emotion Analyzer'
    : 'AI Resume Analyzer';
  const referralCode = currentStudent?.referralCode || 'AI60-VIVEK7';
  const college = currentStudent?.college || 'Amrita Vishwa Vidyapeetham – Bengaluru';

  const stages: LifecycleStage[] = [
    {
      stageNumber: 1,
      id: 'registration',
      title: 'Stage 1 — Registration Confirmation',
      timing: 'Instant (0 mins after signup)',
      goal: 'Deliver instant confirmation, establish project intent, and seed the referral code early.',
      messageText: (name, project, code) => 
`🎉 You're registered, ${name.split(' ')[0]}!

Your AI project: ${project}
Your referral code: ${code}

Invite classmates to join the cohort and help your campus climb the leaderboard.
Workshop access link: https://ai60.live/join`,
      growthMechanism: 'Early Referral Seeding — Students are most enthusiastic immediately upon registering. Providing the referral code right away turns them into a campus advocate before the event begins.'
    },
    {
      stageNumber: 2,
      id: '24h-reminder',
      title: 'Stage 2 — 24-Hour Reminder',
      timing: 'T-24 Hours before workshop',
      goal: 'Re-engage registrants, confirm attendance commitment, and provide setup expectations.',
      messageText: () => 
`🚀 Your AI project workshop starts tomorrow.

We'll be building and deploying your project live in 60 minutes.
Pre-requisites: Laptop with Google Chrome (no local GPU or software setup required).

See who else is attending from your campus:
https://ai60.live/campus-challenge`,
      growthMechanism: 'Attendance Confirmation & Cohort Warmup — Re-activates registered students, reduces no-show rates, and encourages last-minute peer invites.'
    },
    {
      stageNumber: 3,
      id: '60m-reminder',
      title: 'Stage 3 — 60-Minute Pre-Session Countdown',
      timing: 'T-60 Minutes before workshop',
      goal: 'Direct call to action to open browser and join the live workspace.',
      messageText: () => 
`⏰ Your 60-minute AI build session starts soon.

Get your laptop and browser ready!
We go live at 6:00 PM IST sharp.

Join the live workspace room:
https://ai60.live/room/live-session`,
      growthMechanism: 'Urgency & Friction Elimination — Ensures students are sitting at their desks with browsers ready, maximizing on-time workshop arrivals.'
    },
    {
      stageNumber: 4,
      id: 'completion',
      title: 'Stage 4 — Workshop Completion',
      timing: 'T+65 Minutes (Immediately after workshop)',
      goal: 'Acknowledge milestone achievement, share project artifact, and reinforce builder pride.',
      messageText: (name, project) => 
`🎉 Great work, ${name.split(' ')[0]}! You completed your AI project: "${project}".

Your project prototype is successfully built! Check your verified builder status on your dashboard:
https://ai60.live/dashboard`,
      growthMechanism: 'Achievement Reinforcement — Provides students with instant recognition and tangible proof of what they accomplished during the 60 minutes.'
    },
    {
      stageNumber: 5,
      id: 'referral-loop',
      title: 'Stage 5 — Campus Referral & Community Loop',
      timing: 'T+2 Hours post-completion',
      goal: 'Leverage student satisfaction to drive subsequent registrations for upcoming cohort rounds.',
      messageText: (name, _project, code, col) => 
`🚀 Know classmates who want practical AI experience?

Invite them and help ${col.split('–')[0].trim()} climb the campus leaderboard!
Share your referral code: ${code}

Track campus standings:
https://ai60.live/campus-challenge`,
      growthMechanism: 'Organic Virality Loop — Happy students who just experienced building a real project possess authentic credibility to recommend the workshop to branch peers.'
    }
  ];

  const [currentStageIdx, setCurrentStageIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStageIdx(prev => {
          if (prev >= stages.length - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 3500);
    }
    return () => clearInterval(timer);
  }, [isPlaying, stages.length]);

  const activeStage = stages[currentStageIdx];

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (currentStageIdx >= stages.length - 1) {
        setCurrentStageIdx(0);
      }
      setIsPlaying(true);
    }
  };

  const handleReset = () => {
    setIsPlaying(false);
    setCurrentStageIdx(0);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>SIMULATED WHATSAPP FLOW</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Lifecycle Communication & Retention Engine
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Demonstration of how the campaign utilizes automated lifecycle touchpoints to guide engineering students from initial registration, through workshop attendance, to post-event peer referrals.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="font-mono bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md border border-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Simulated Demonstration (No real messaging API calls are dispatched)
              </span>
              <span className="font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                5-Stage Lifecycle Journey
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Simulation Controls */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePlayToggle}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-5 py-2.5 rounded-xl transition shadow-xs cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Simulation</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Play Simulation</span>
                </>
              )}
            </button>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl border border-slate-200 transition cursor-pointer"
              title="Reset simulation to Stage 1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>

            <div className="text-xs text-slate-500 hidden sm:block">
              {isPlaying ? (
                <span className="text-emerald-600 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Advancing through stages automatically...
                </span>
              ) : (
                <span>Click stages below or click Play Simulation</span>
              )}
            </div>
          </div>

          {/* Stepper Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {stages.map((st, idx) => (
              <button
                key={st.id}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStageIdx(idx);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition border cursor-pointer shrink-0 ${
                  currentStageIdx === idx
                    ? 'bg-emerald-600 text-white border-emerald-600'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                Stage {st.stageNumber}
              </button>
            ))}
          </div>
        </div>

        {/* Active Stage Detail & Simulated Phone Screen */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Simulated Phone / Message Card (6 cols) */}
          <div className="lg:col-span-6 bg-[#EFEAE2] border border-slate-300 rounded-3xl p-5 sm:p-7 shadow-sm space-y-4">
            
            {/* Phone App Bar */}
            <div className="bg-[#075E54] text-white -mx-5 sm:-mx-7 -mt-5 sm:-mt-7 p-4 rounded-t-3xl flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-700 border border-white/20 flex items-center justify-center font-bold text-sm">
                  AI
                </div>
                <div>
                  <div className="font-bold text-sm leading-snug">
                    Workshop Updates &bull; AI60
                  </div>
                  <div className="text-[11px] text-emerald-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Official Campaign Channel (Simulated)</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] font-mono bg-white/20 px-2 py-0.5 rounded text-white font-medium">
                Lifecycle Bot
              </span>
            </div>

            {/* Chat Conversation Area */}
            <div className="space-y-4 pt-2">
              <div className="text-center">
                <span className="bg-[#E1D9D0] text-slate-700 text-[10px] font-semibold px-3 py-1 rounded-md uppercase tracking-wider font-mono shadow-2xs">
                  {activeStage.timing}
                </span>
              </div>

              {/* Message Bubble */}
              <div className="max-w-[92%] bg-white rounded-2xl rounded-tl-none p-4 shadow-sm border border-slate-200/60 space-y-2.5 relative">
                <div className="text-xs text-slate-800 whitespace-pre-line leading-relaxed font-sans">
                  {activeStage.messageText(studentName, studentProject, referralCode, college)}
                </div>

                <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 font-mono">
                  <span>10:30 AM</span>
                  <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                </div>
              </div>

              {/* Interactive Quick Reply Simulation */}
              <div className="pt-2 flex flex-wrap gap-2">
                <span className="bg-white/80 hover:bg-white text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-300 shadow-2xs cursor-pointer">
                  ✓ Open Workspace
                </span>
                <span className="bg-white/80 hover:bg-white text-emerald-800 text-xs font-semibold px-3 py-1.5 rounded-full border border-slate-300 shadow-2xs cursor-pointer">
                  🚀 Invite Classmates
                </span>
              </div>
            </div>

            <div className="text-[10px] text-slate-500 text-center font-mono pt-2 border-t border-slate-300/50">
              * Simulated interface preview for growth evaluation. Messages represent lifecycle triggers.
            </div>
          </div>

          {/* Right Column: Growth Mechanics Breakdown (6 cols) */}
          <div className="lg:col-span-6 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                <Bell className="w-3.5 h-3.5" />
                <span>{activeStage.timing}</span>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-900">
                {activeStage.title}
              </h2>
              
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                <strong className="text-slate-800">Target Objective: </strong> 
                {activeStage.goal}
              </p>
            </div>

            {/* Growth Mechanism Box */}
            <div className="bg-slate-50 rounded-xl p-4 sm:p-5 border border-slate-200 space-y-2">
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-emerald-600" />
                <span>Growth & Retention Mechanism</span>
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                {activeStage.growthMechanism}
              </p>
            </div>

            {/* Stage Navigation Buttons */}
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-100">
              <button
                disabled={currentStageIdx === 0}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStageIdx(prev => Math.max(0, prev - 1));
                }}
                className="text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              >
                &larr; Previous Stage
              </button>

              <button
                disabled={currentStageIdx === stages.length - 1}
                onClick={() => {
                  setIsPlaying(false);
                  setCurrentStageIdx(prev => Math.min(stages.length - 1, prev + 1));
                }}
                className="text-xs font-bold px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition shadow-xs"
              >
                Next Stage &rarr;
              </button>
            </div>

            {/* Links */}
            <div className="pt-2 text-xs text-slate-500 flex items-center justify-between">
              <Link to="/playground" className="text-emerald-600 font-semibold hover:underline flex items-center gap-1">
                <span>View AI Blueprints</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link to="/campus-challenge" className="text-emerald-600 font-semibold hover:underline flex items-center gap-1">
                <span>Campus Challenge</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

          </div>

        </div>

        {/* 5-Stage Complete Journey Grid Overview */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Full Lifecycle Communication Architecture
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Overview of the 5 sequential touchpoints in the simulated growth loop
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 font-semibold">
              5 Stages
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stages.map((st, idx) => {
              const isSelected = currentStageIdx === idx;
              return (
                <div
                  key={st.id}
                  onClick={() => {
                    setIsPlaying(false);
                    setCurrentStageIdx(idx);
                  }}
                  className={`p-4 rounded-xl border text-xs space-y-2 cursor-pointer transition ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 shadow-2xs'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-emerald-600 text-[11px]">
                      Stage {st.stageNumber}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {st.timing.split(' ')[0]}
                    </span>
                  </div>
                  
                  <div className="font-semibold text-slate-900 leading-snug">
                    {st.title.split('—')[1] || st.title}
                  </div>
                  
                  <p className="text-slate-500 text-[11px] line-clamp-3 leading-relaxed">
                    {st.goal}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
