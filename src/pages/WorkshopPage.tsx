import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { PROJECT_BLUEPRINTS } from '../data/seedData';
import confetti from 'canvas-confetti';
import { 
  Clock, Play, Pause, RotateCcw, CheckCircle2, Check, ArrowRight, 
  Terminal, Sparkles, Award, Code2, Layers, Cpu, Share2, ShieldCheck, ChevronRight 
} from 'lucide-react';

interface WorkshopPhase {
  id: number;
  timeRange: string;
  minutes: string;
  title: string;
  description: string;
  checklist: string[];
  interactiveTitle: string;
  interactiveContent: React.ReactNode;
}

export const WorkshopPage: React.FC = () => {
  const { currentStudent, updateBuilderProgress } = useGrowth();
  const [searchParams] = useSearchParams();
  const projectParam = searchParams.get('project');

  // Active project ID
  const activeProjectId = projectParam || currentStudent?.selectedProject || 'resume-analyzer';
  const projectBlueprint = PROJECT_BLUEPRINTS.find(p => p.id === activeProjectId) || PROJECT_BLUEPRINTS[0];

  const [currentPhase, setCurrentPhase] = useState<number>(1);
  const [completedSteps, setCompletedSteps] = useState<Record<string, boolean>>({
    '1-0': true,
    '1-1': true,
  });

  // 60-Minute Countdown Timer (Default: 60 minutes = 3600 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(3600);
  const [timerRunning, setTimerRunning] = useState<boolean>(false);
  const [isDemoSpeed, setIsDemoSpeed] = useState<boolean>(false);

  // Interactive state inside phases
  const [promptText, setPromptText] = useState(
    'Act as an expert technical hiring manager. Evaluate the candidate\'s resume against the Job Description and return a JSON match score (0-100) and 3 specific skill gaps.'
  );
  const [testRunDone, setTestRunDone] = useState(false);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [submittedProject, setSubmittedProject] = useState(false);

  // Mark workshop as started on mount
  useEffect(() => {
    if (currentStudent && !currentStudent.workshopStarted) {
      updateBuilderProgress({ workshopStarted: true, selectedProject: activeProjectId });
    }
  }, [currentStudent, activeProjectId, updateBuilderProgress]);

  // Timer interval
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning && secondsRemaining > 0) {
      interval = setInterval(() => {
        setSecondsRemaining(prev => Math.max(0, prev - (isDemoSpeed ? 30 : 1)));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning, secondsRemaining, isDemoSpeed]);

  const toggleCheckbox = (key: string) => {
    setCompletedSteps(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleNextPhase = () => {
    if (currentPhase < 5) {
      const next = currentPhase + 1;
      setCurrentPhase(next);
      // Auto-check checklist items for smooth demo
      setCompletedSteps(prev => ({
        ...prev,
        [`${next}-0`]: true,
        [`${next}-1`]: true,
      }));
    } else {
      // Completed workshop!
      setSubmittedProject(true);
      if (currentStudent) {
        updateBuilderProgress({ workshopCompleted: true, workshopStarted: true });
      }
      try {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {}
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const m = Math.floor(totalSeconds / 60);
    const s = totalSeconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const phases: WorkshopPhase[] = [
    {
      id: 1,
      timeRange: '0–10 min',
      minutes: '10 mins',
      title: 'Understand the Problem',
      description: 'Deconstruct the problem statement, define the student user persona, and scope inputs vs expected outputs.',
      checklist: [
        'Analyze the user problem statement & pain points',
        'Identify target user constraints (e.g. file formats, response latency)',
        'Formulate success metrics (e.g. accuracy score, extraction fidelity)'
      ],
      interactiveTitle: 'Problem Framing Canvas',
      interactiveContent: (
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
            <span className="font-bold text-slate-800">Target Project: </span>
            <span className="text-emerald-700 font-semibold">{projectBlueprint.title}</span>
          </div>
          <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1">
            <div className="font-semibold text-slate-700">Problem Statement:</div>
            <p className="text-slate-600">{projectBlueprint.problem}</p>
          </div>
          <div className="p-3 bg-emerald-50/60 rounded-xl border border-emerald-200 space-y-1">
            <div className="font-semibold text-emerald-900">Engineering Deliverable:</div>
            <p className="text-emerald-800">{projectBlueprint.targetOutcome}</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      timeRange: '10–25 min',
      minutes: '15 mins',
      title: 'Design the Solution',
      description: 'Draft the system architecture, design data schemas, and formulate structured JSON input/output contracts.',
      checklist: [
        'Diagram data ingestion pipeline (User Input → Prompt Wrapper → Model)',
        'Specify expected output schema (Score, Key Matches, Recommendations)',
        'Define validation rules for malformed or missing parameters'
      ],
      interactiveTitle: 'System Schema & Architecture',
      interactiveContent: (
        <div className="space-y-3 font-mono text-xs">
          <div className="bg-slate-900 text-slate-200 p-3 rounded-xl border border-slate-800 overflow-x-auto text-[11px] leading-relaxed">
            <span className="text-emerald-400 font-bold">// Output Contract (JSON Schema)</span>
            <pre>{`{
  "candidate": "Final Year Student",
  "match_score": 88,
  "key_strengths": ["React", "TypeScript", "REST APIs"],
  "skill_gaps": ["Docker", "System Design"],
  "recommendations": "Add 1 deployed full-stack project"
}`}</pre>
          </div>
          <div className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-[11px] font-sans">
            ✓ Architecture validated: Pipeline conforms to standard 60-minute live coding patterns.
          </div>
        </div>
      )
    },
    {
      id: 3,
      timeRange: '25–45 min',
      minutes: '20 mins',
      title: 'Add the AI Layer',
      description: 'Engineer the core prompt, configure zero-shot guidelines, and test structured AI response parsing.',
      checklist: [
        'Formulate system instructions and persona constraints',
        'Incorporate structured output formatting guidelines',
        'Execute zero-shot prompt evaluation'
      ],
      interactiveTitle: 'Interactive Prompt & AI Layer Tester',
      interactiveContent: (
        <div className="space-y-3 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">
              Engineered System Prompt:
            </label>
            <textarea
              rows={3}
              value={promptText}
              onChange={(e) => setPromptText(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 font-mono text-[11px] text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600"
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => {
                setIsEvaluating(true);
                setTimeout(() => {
                  setIsEvaluating(false);
                  setTestRunDone(true);
                }, 700);
              }}
              disabled={isEvaluating}
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs transition cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{isEvaluating ? 'Running Inference...' : 'Test AI Layer'}</span>
            </button>
            <span className="text-[10px] text-slate-400 font-mono">Browser Simulated Execution</span>
          </div>

          {testRunDone && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-emerald-900 font-mono text-[11px] space-y-1">
              <div className="font-bold text-emerald-700">✓ AI Execution Result:</div>
              <div>Match Score: 88/100 | Evaluation status: SUCCESS</div>
              <div className="text-[10px] text-emerald-600 font-sans">Prompt successfully returned structured JSON with 0 validation errors.</div>
            </div>
          )}
        </div>
      )
    },
    {
      id: 4,
      timeRange: '45–55 min',
      minutes: '10 mins',
      title: 'Test & Improve',
      description: 'Stress-test edge cases, validate corner-case inputs, and refine conversational/parsing error recovery.',
      checklist: [
        'Test unconventional resume layouts and missing sections',
        'Validate empty and oversized text payloads',
        'Refine error catch blocks and user-friendly fallback messaging'
      ],
      interactiveTitle: 'Robustness & Edge-Case Benchmark',
      interactiveContent: (
        <div className="space-y-2.5 text-xs">
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <div className="text-slate-400 text-[10px] uppercase font-mono">Test Case 1</div>
              <div className="font-bold text-slate-800 mt-0.5">Short Text</div>
              <span className="text-[10px] text-emerald-600 font-semibold">PASS (99ms)</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <div className="text-slate-400 text-[10px] uppercase font-mono">Test Case 2</div>
              <div className="font-bold text-slate-800 mt-0.5">Special Chars</div>
              <span className="text-[10px] text-emerald-600 font-semibold">PASS (115ms)</span>
            </div>
            <div className="p-2.5 bg-slate-50 rounded-lg border border-slate-200 text-center">
              <div className="text-slate-400 text-[10px] uppercase font-mono">Test Case 3</div>
              <div className="font-bold text-slate-800 mt-0.5">Schema Match</div>
              <span className="text-[10px] text-emerald-600 font-semibold">PASS (100%)</span>
            </div>
          </div>
          <p className="text-[11px] text-slate-500 text-center">
            All 3 automated benchmark checks pass within the acceptable latency threshold.
          </p>
        </div>
      )
    },
    {
      id: 5,
      timeRange: '55–60 min',
      minutes: '5 mins',
      title: 'Submit / Share',
      description: 'Finalize project demo build, claim your AI Builder Badge, and invite campus peers to rally your college.',
      checklist: [
        'Verify final project runs cleanly without errors',
        'Claim your verified AI Builder status badge',
        'Share your referral invite to boost your campus on the leaderboard'
      ],
      interactiveTitle: 'Project Verification & Showcase',
      interactiveContent: (
        <div className="space-y-3 text-xs text-center">
          {submittedProject ? (
            <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl space-y-2">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-emerald-900 text-sm">
                Project Successfully Built & Verified!
              </h4>
              <p className="text-emerald-800 text-[11px]">
                You completed the 60-minute "{projectBlueprint.title}" build. Your milestone progress has been updated on your dashboard.
              </p>
              <div className="pt-2 flex justify-center gap-2">
                <Link
                  to="/dashboard"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3 py-1.5 rounded-lg text-xs"
                >
                  View My Dashboard
                </Link>
                <Link
                  to="/campus-challenge"
                  className="bg-white hover:bg-slate-50 text-slate-700 font-semibold px-3 py-1.5 rounded-lg text-xs border border-slate-200"
                >
                  Rally Campus
                </Link>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
              <Award className="w-8 h-8 text-amber-500 mx-auto" />
              <div className="font-bold text-slate-900">
                Ready to Complete Your 60-Minute Build?
              </div>
              <p className="text-slate-500 text-[11px]">
                Click below to finalize your project submission and unlock your builder badge.
              </p>
            </div>
          )}
        </div>
      )
    }
  ];

  const activePhaseData = phases[currentPhase - 1];
  const progressPercent = Math.round((currentPhase / 5) * 100);

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Top Header Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <Code2 className="w-3.5 h-3.5" />
                <span>60-Minute Interactive Journey</span>
              </span>
              <span className="text-xs font-mono text-slate-400">
                Project: {projectBlueprint.title}
              </span>
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Build Your First AI Project
            </h1>
            
            <p className="text-slate-500 text-xs sm:text-sm">
              Hands-on 5-phase interactive sprint. Code, test, and package your AI prototype in 60 minutes.
            </p>
          </div>

          {/* Interactive Countdown Timer */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 flex items-center gap-4 shrink-0 shadow-2xs">
            <div className="text-center">
              <div className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
                Workshop Timer
              </div>
              <div className="text-3xl font-mono font-extrabold text-slate-900 tracking-tight">
                {formatTimer(secondsRemaining)}
              </div>
            </div>

            <div className="flex flex-col gap-1.5 border-l border-slate-200 pl-4">
              <button
                onClick={() => setTimerRunning(!timerRunning)}
                className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-lg transition cursor-pointer ${
                  timerRunning
                    ? 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                    : 'bg-emerald-600 text-white hover:bg-emerald-700'
                }`}
              >
                {timerRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                <span>{timerRunning ? 'Pause' : 'Start Timer'}</span>
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => setSecondsRemaining(3600)}
                  title="Reset timer to 60:00"
                  className="p-1 text-slate-400 hover:text-slate-700 rounded transition cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => setIsDemoSpeed(!isDemoSpeed)}
                  title="Fast-forward timer speed for presentation"
                  className={`text-[10px] font-mono px-1.5 py-0.5 rounded border transition cursor-pointer ${
                    isDemoSpeed ? 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold' : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  {isDemoSpeed ? '30x Speed' : 'Normal'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="bg-white border border-slate-200 rounded-2xl p-4 sm:p-5 shadow-xs space-y-2">
          <div className="flex items-center justify-between text-xs font-semibold">
            <span className="text-slate-700">
              Phase {currentPhase} of 5 &bull; <strong className="text-slate-900">{activePhaseData.title}</strong> ({activePhaseData.timeRange})
            </span>
            <span className="font-mono text-emerald-600 font-bold">{progressPercent}% Completed</span>
          </div>
          
          <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/80">
            <div
              className="h-full bg-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* 5 Phase Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {phases.map((ph) => {
            const isCurrent = currentPhase === ph.id;
            const isPast = currentPhase > ph.id;

            return (
              <button
                key={ph.id}
                onClick={() => setCurrentPhase(ph.id)}
                className={`p-3 rounded-xl border text-left transition cursor-pointer flex flex-col justify-between h-20 ${
                  isCurrent
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : isPast
                    ? 'bg-emerald-50/70 border-emerald-200 text-slate-800'
                    : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={isCurrent ? 'text-emerald-100' : 'text-slate-400'}>
                    Phase {ph.id}
                  </span>
                  <span className={`text-[10px] px-1 rounded ${
                    isCurrent ? 'bg-emerald-700/60 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    {ph.timeRange}
                  </span>
                </div>

                <div className="font-bold text-xs truncate">
                  {ph.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Phase Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Phase Details & Checklists (7 cols) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-2 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {activePhaseData.timeRange} ({activePhaseData.minutes})
                </span>
                <span className="text-xs text-slate-400">Current Phase</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {activePhaseData.title}
              </h2>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {activePhaseData.description}
              </p>
            </div>

            {/* Checklist */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Phase Deliverable Checklist:
              </h3>

              <div className="space-y-2.5">
                {activePhaseData.checklist.map((item, idx) => {
                  const key = `${activePhaseData.id}-${idx}`;
                  const isChecked = !!completedSteps[key];

                  return (
                    <div
                      key={idx}
                      onClick={() => toggleCheckbox(key)}
                      className={`flex items-start gap-3 p-3 rounded-xl border transition cursor-pointer ${
                        isChecked
                          ? 'bg-emerald-50/50 border-emerald-200 text-slate-800'
                          : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 border transition ${
                        isChecked
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </div>
                      <span className="text-xs font-medium leading-snug">
                        {item}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Next Phase Action Button */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-4">
              <button
                disabled={currentPhase === 1}
                onClick={() => setCurrentPhase(prev => Math.max(1, prev - 1))}
                className="text-xs font-semibold px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition"
              >
                &larr; Previous Phase
              </button>

              <button
                onClick={handleNextPhase}
                className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
              >
                <span>{currentPhase === 5 ? 'Complete Workshop & Verify' : 'Continue to Next Phase'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Code & Output Simulator (5 cols) */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-emerald-600" />
                <h3 className="text-xs font-bold text-slate-900">
                  {activePhaseData.interactiveTitle}
                </h3>
              </div>
              <span className="text-[10px] font-mono text-slate-400">
                In-Browser Sandbox
              </span>
            </div>

            {/* Interactive component for active phase */}
            <div>
              {activePhaseData.interactiveContent}
            </div>

            <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1 text-emerald-700 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Simulated Engineering Environment</span>
              </div>
              <p>
                The workshop teaches you how to construct, test, and deploy this pipeline using Python or JavaScript.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
