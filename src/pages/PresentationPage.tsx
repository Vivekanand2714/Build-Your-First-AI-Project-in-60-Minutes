import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Video,
  Download,
  ExternalLink,
  FileText,
  CheckCircle2,
  Trophy,
  Target,
  DollarSign,
  Calendar,
  Sparkles,
  Share2,
  Layers,
  Users,
  Zap,
  ArrowRight,
  Clock,
  ChevronRight,
  ChevronLeft,
  GraduationCap,
  MessageCircle,
  BarChart3,
  Flame,
  Check,
  Compass
} from 'lucide-react';

// Import the live application pages so they can be rendered seamlessly inside the presentation viewport
import { LandingPage } from './LandingPage';
import { PlaygroundPage } from './PlaygroundPage';
import { RegisterPage } from './RegisterPage';
import { DashboardPage } from './DashboardPage';
import { CampusChallengePage } from './CampusChallengePage';
import { AdminPage } from './AdminPage';
import { WhatsAppFlowPage } from './WhatsAppFlowPage';
import { WorkshopPage } from './WorkshopPage';

interface Chapter {
  id: number;
  title: string;
  subtitle: string;
  route: string;
  startTime: number; // in seconds
  endTime: number;   // in seconds
  voiceover: string;
  bulletPoints: string[];
  keyHighlight: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'The Challenge & Proposition',
    subtitle: '500 Registrations • 7 Days • ₹2,000 Budget',
    route: '/',
    startTime: 0,
    endTime: 25,
    voiceover:
      "Hi, I'm Vivek, and this is my solution for the growth challenge. The objective was to drive 500 final-year engineering student registrations in 7 days with a simulated budget of ₹2,000. My approach was to build a growth system around a simple proposition: Build Your First AI Project in 60 Minutes.",
    bulletPoints: [
      'Challenge: 500 final-year engineering student registrations in 7 days',
      'Constraint: ₹2,000 simulated budget (requires organic peer velocity)',
      'Core proposition: Hands-on build outcome in 60 minutes with zero local setup'
    ],
    keyHighlight: 'Target: 500 Registrations | 7 Days | ₹2,000 Budget'
  },
  {
    id: 2,
    title: 'The Product-Led Growth Strategy',
    subtitle: 'Self-Sustaining Viral Loop for Engineering Campuses',
    route: '/campus-challenge',
    startTime: 25,
    endTime: 50,
    voiceover:
      "Instead of treating this as just a workshop registration campaign, I designed the product itself to support acquisition and referrals. My core growth loop is simple: a student discovers the workshop, registers, gets a referral link, shares it with classmates, and those registrations contribute to their campus leaderboard. On a ₹2,000 budget, peer referrals in college WhatsApp groups are our primary acquisition engine.",
    bulletPoints: [
      'Engine: Product-led acquisition rather than paid media dependency',
      'Mechanism: Discover → Register → Referral Link → WhatsApp Share → Campus Rank',
      'Incentive: College pride & branch competition in student WhatsApp groups'
    ],
    keyHighlight: 'Loop: Discover → Register → Refer → WhatsApp Share → Campus Pride'
  },
  {
    id: 3,
    title: 'High-Converting Landing Page',
    subtitle: 'Clear Practical Outcome vs Generic Webinar',
    route: '/',
    startTime: 50,
    endTime: 70,
    voiceover:
      "Starting with the landing page, I wanted the value proposition to be immediately clear. Students aren't being asked to join just another webinar. They're being offered a practical outcome: building an AI project in 60 minutes. The messaging focuses on real hands-on learning with zero local setup required.",
    bulletPoints: [
      'Headline: Concrete outcome in 60 minutes eliminates decision hesitation',
      'Zero Setup: In-browser execution removes local python/GPU dependency',
      'Conversion Architecture: Clear CTA above fold, 3-step timeline, social proof'
    ],
    keyHighlight: 'Outcome: Build a real AI project in 60 minutes with 0 setup'
  },
  {
    id: 4,
    title: 'AI Project Playground',
    subtitle: '4 Tangible Blueprints & In-Browser Testing',
    route: '/playground',
    startTime: 70,
    endTime: 90,
    voiceover:
      "The AI Project Playground makes that promise more tangible. Students can explore the exact projects they could build, understand the problem, see the AI component, and follow a structured 5-step build journey. Testing a simulated output directly in the browser eliminates skepticism before they even sign up.",
    bulletPoints: [
      '4 Blueprints: Resume Analyzer, Chatbot, Performance Predictor, Sentiment AI',
      '5-Step Journey: Problem → Architecture → Prompt → Inference → Deployment',
      'Tangible Proof: Interactive browser simulator validates workshop value'
    ],
    keyHighlight: 'Blueprints: Resume Analyzer, Chatbot, Predictor & Sentiment AI'
  },
  {
    id: 5,
    title: 'Registration & Instant Referral Loop',
    subtitle: 'Frictionless Signup & Personalized Sharing Node',
    route: '/register',
    startTime: 90,
    endTime: 110,
    voiceover:
      "When a student registers, they immediately receive a unique referral code and a pre-configured referral link. We eliminate friction by immediately activating their session without password barriers. Every registrant instantly becomes an organic distribution node for their college.",
    bulletPoints: [
      'Frictionless: 30-second form tailored for engineering students',
      'Unique Referral Code: Instantly generated (e.g. AI60-VIVEK7)',
      '1-Tap WhatsApp Link: Pre-formatted invite message ready to forward'
    ],
    keyHighlight: 'Unique Code: AI60-VIVEK7 + Pre-filled WhatsApp Share'
  },
  {
    id: 6,
    title: 'Student Dashboard & AI Builder Journey',
    subtitle: '5 Milestones, Campus Standing & Live Referral Demo',
    route: '/dashboard',
    startTime: 110,
    endTime: 135,
    voiceover:
      "Inside the student dashboard, we give builders continuous momentum. The AI Builder Journey tracks their progress across five milestones. Crucially, the 'Rally Your College' section connects their individual referrals directly to their campus standing. When a classmate signs up through their link, their referral count and campus rank update in real time.",
    bulletPoints: [
      '5 Milestones: Registration → Setup → Prompting → Build → Certification',
      'Rally Your College: Connects personal sharing to campus leaderboard rank',
      'Live Simulation: Evaluators can click +1 Referral to watch scores react live'
    ],
    keyHighlight: 'Momentum: 5 Builder Milestones + Live Simulated Referral Counter'
  },
  {
    id: 7,
    title: 'Campus Challenge & WhatsApp Sharing',
    subtitle: 'Inter-College Rivalry across Top 6 Institutions',
    route: '/campus-challenge',
    startTime: 135,
    endTime: 155,
    voiceover:
      "To accelerate viral sharing, I built the Campus Challenge. College pride is a powerful growth trigger for engineering students. Campuses compete on a live simulated leaderboard. Students see exactly how many registrations are needed to overtake the next college and can rally their branch WhatsApp groups with a single click.",
    bulletPoints: [
      'Institutions: Amrita, RVCE, BMSCE, PES, MSRIT, NITK Surathkal',
      'Rally Dynamics: Shows exact margin (e.g. 14 registrations to reach #1)',
      'Viral Spark: 1-tap WhatsApp broadcast targeted to branch study groups'
    ],
    keyHighlight: 'Rivalry: 6 Recognized Institutions Competing on Live Leaderboard'
  },
  {
    id: 8,
    title: 'Growth Admin Analytics & Conclusion',
    subtitle: '5 KPIs, Conversion Funnel & 500-Student Thesis',
    route: '/admin',
    startTime: 155,
    endTime: 180,
    voiceover:
      "We also designed an end-to-end WhatsApp retention flow and a live workshop countdown. Finally, in the Growth Admin dashboard, the entire simulation is measurable: we track our 500-student goal, referral share, campus breakdown, and the full conversion funnel. In 7 days with ₹2,000, organic peer referral and campus competition are what make 500 registrations achievable. Thank you!",
    bulletPoints: [
      '5 Growth KPIs: Goal Target (500), Active Registrations, Referral %, Invites',
      'Full Funnel: Landing Visitors → Signups → Active Referrers → Attendees',
      'Strategic Conclusion: Product-led campus virality achieves 500 regs on ₹2,000'
    ],
    keyHighlight: 'Analytics: 5 KPIs, Funnel Tracking & Campaign Attribution'
  }
];

export const PresentationPage: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isVoiceoverEnabled, setIsVoiceoverEnabled] = useState<boolean>(true);
  const [isTeleprompterOpen, setIsTeleprompterOpen] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [recordSeconds, setRecordSeconds] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<'embed' | 'slide'>('embed');

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordIntervalRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Active chapter lookup
  const currentChapterIndex = CHAPTERS.findIndex(
    (c) => currentTime >= c.startTime && currentTime < c.endTime
  );
  const currentChapter =
    currentChapterIndex !== -1 ? CHAPTERS[currentChapterIndex] : CHAPTERS[CHAPTERS.length - 1];

  // Speech Synthesis helper
  const speakChapterVoiceover = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!isVoiceoverEnabled) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick best English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.lang.startsWith('en') &&
        (v.name.includes('Natural') ||
          v.name.includes('Google') ||
          v.name.includes('Samantha') ||
          v.name.includes('David') ||
          v.name.includes('India'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    currentUtteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  // Timer Tick
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 180) {
            setIsPlaying(false);
            if ('speechSynthesis' in window) window.speechSynthesis.cancel();
            return 180;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying]);

  // Voiceover triggers when crossing chapter boundaries while playing
  useEffect(() => {
    if (isPlaying && isVoiceoverEnabled) {
      // Find matching chapter start
      const matchingChapter = CHAPTERS.find((c) => c.startTime === currentTime);
      if (matchingChapter) {
        speakChapterVoiceover(matchingChapter.voiceover);
      }
    }
  }, [currentTime, isPlaying, isVoiceoverEnabled]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if ('speechSynthesis' in window) {
        window.speechSynthesis.pause();
      }
    } else {
      if (currentTime >= 180) {
        setCurrentTime(0);
        speakChapterVoiceover(CHAPTERS[0].voiceover);
      } else {
        if ('speechSynthesis' in window && window.speechSynthesis.paused) {
          window.speechSynthesis.resume();
        } else {
          speakChapterVoiceover(currentChapter.voiceover);
        }
      }
      setIsPlaying(true);
    }
  };

  // Restart from beginning
  const handleRestart = () => {
    setCurrentTime(0);
    setIsPlaying(true);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    speakChapterVoiceover(CHAPTERS[0].voiceover);
  };

  // Jump to specific chapter
  const jumpToChapter = (chapter: Chapter) => {
    setCurrentTime(chapter.startTime);
    if (isPlaying && isVoiceoverEnabled) {
      speakChapterVoiceover(chapter.voiceover);
    }
  };

  // Toggle voiceover audio
  const toggleVoiceover = () => {
    if (isVoiceoverEnabled) {
      setIsVoiceoverEnabled(false);
      if ('speechSynthesis' in window) window.speechSynthesis.cancel();
    } else {
      setIsVoiceoverEnabled(true);
      if (isPlaying) {
        speakChapterVoiceover(currentChapter.voiceover);
      }
    }
  };

  // Start Screen Recording with MediaRecorder
  const handleStartRecording = async () => {
    try {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getDisplayMedia) {
        alert(
          'Screen recording API is not supported in this browser mode. Please use Windows Game Bar (Win + Alt + R) to record.'
        );
        return;
      }

      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: { displaySurface: 'browser' },
        audio: true
      });

      recordedChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
          ? 'video/webm;codecs=vp9'
          : 'video/webm'
      });

      mediaRecorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordedBlobUrl(url);
        setIsRecording(false);
        clearInterval(recordIntervalRef.current);
      };

      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.start(1000);
      setIsRecording(true);
      setRecordSeconds(0);

      recordIntervalRef.current = setInterval(() => {
        setRecordSeconds((sec) => sec + 1);
      }, 1000);

      // Automatically reset presentation to 0:00 and start playback with voiceover
      handleRestart();

      // Listen for stream stop by browser UI
      stream.getVideoTracks()[0].onended = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
        }
      };
    } catch (err) {
      console.error('Recording initialization error:', err);
    }
  };

  // Stop Recording
  const handleStopRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach((track) => track.stop());
    }
    setIsRecording(false);
    clearInterval(recordIntervalRef.current);
  };

  // Auto-scroll inside live page view to give dynamic presentation movement
  useEffect(() => {
    if (scrollContainerRef.current) {
      if (currentChapter.id === 3) {
        // Landing page: auto-scroll gradually down to curriculum
        const scrollTarget = ((currentTime - 50) / 20) * 600;
        scrollContainerRef.current.scrollTo({ top: scrollTarget, behavior: 'smooth' });
      } else {
        scrollContainerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [currentTime, currentChapter.id]);

  // Format seconds to mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans select-none">
      {/* ============================================================== */}
      {/* TOP STUDIO NAVIGATION & CONTROLS BAR */}
      {/* ============================================================== */}
      <header className="bg-slate-950/80 border-b border-slate-800 backdrop-blur-md px-4 py-3 sticky top-0 z-50 flex flex-wrap items-center justify-between gap-4">
        {/* Left: Branding & Chapter Info */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs">
            3M
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-bold text-white tracking-tight">
                Video Presentation Studio
              </span>
              <span className="bg-emerald-950/80 text-emerald-400 text-[10px] font-mono px-2 py-0.5 rounded border border-emerald-800">
                Growth Challenge
              </span>
              {isRecording && (
                <span className="flex items-center gap-1.5 bg-rose-950/80 text-rose-400 border border-rose-800 px-2 py-0.5 rounded text-[10px] font-bold animate-pulse">
                  <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                  REC {formatTime(recordSeconds)}
                </span>
              )}
            </div>
            <p className="text-xs text-slate-400 truncate max-w-xs sm:max-w-md">
              <span className="text-emerald-400 font-medium">Ch {currentChapter.id}/8:</span>{' '}
              {currentChapter.title}
            </p>
          </div>
        </div>

        {/* Center: Playback Controls */}
        <div className="flex items-center gap-3 bg-slate-900 px-4 py-1.5 rounded-full border border-slate-800 shadow-inner">
          <button
            onClick={handleRestart}
            className="p-1.5 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800"
            title="Restart Presentation (0:00)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => {
              const prev = CHAPTERS[Math.max(0, currentChapterIndex - 1)];
              jumpToChapter(prev);
            }}
            className="p-1.5 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800"
            title="Previous Chapter"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <button
            onClick={togglePlay}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition shadow-md ${
              isPlaying
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-emerald-600 text-white hover:bg-emerald-500'
            }`}
            title={isPlaying ? 'Pause Presentation' : 'Play Presentation'}
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </button>

          <button
            onClick={() => {
              const next = CHAPTERS[Math.min(CHAPTERS.length - 1, currentChapterIndex + 1)];
              jumpToChapter(next);
            }}
            className="p-1.5 text-slate-400 hover:text-white transition rounded-full hover:bg-slate-800"
            title="Next Chapter"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="h-4 w-px bg-slate-800 mx-1"></div>

          {/* Time Scrubber Display */}
          <div className="font-mono text-xs font-semibold text-slate-300 min-w-20 text-center">
            <span className="text-emerald-400">{formatTime(currentTime)}</span> / 03:00
          </div>
        </div>

        {/* Right: Audio, Teleprompter & Recording Controls */}
        <div className="flex items-center gap-2">
          {/* Voiceover Toggle */}
          <button
            onClick={toggleVoiceover}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              isVoiceoverEnabled
                ? 'bg-slate-800 text-emerald-400 border-emerald-500/30 hover:bg-slate-700'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title={isVoiceoverEnabled ? 'Mute AI Voiceover' : 'Enable AI Voiceover'}
          >
            {isVoiceoverEnabled ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{isVoiceoverEnabled ? 'Narration ON' : 'Muted'}</span>
          </button>

          {/* Teleprompter Toggle */}
          <button
            onClick={() => setIsTeleprompterOpen(!isTeleprompterOpen)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition ${
              isTeleprompterOpen
                ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Script Notes</span>
          </button>

          {/* Record Video Button */}
          {!isRecording ? (
            <button
              onClick={handleStartRecording}
              className="flex items-center gap-1.5 bg-rose-600 hover:bg-rose-500 text-white px-3.5 py-1.5 rounded-lg text-xs font-semibold shadow-md transition"
              title="Record this 3-minute presentation into a WebM video file"
            >
              <Video className="w-3.5 h-3.5" />
              <span>Record Video</span>
            </button>
          ) : (
            <button
              onClick={handleStopRecording}
              className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-rose-400 border border-rose-500/40 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
              <span>Stop & Save</span>
            </button>
          )}


          {/* Download Recorded WebM Video if custom recorded */}
          {recordedBlobUrl && (
            <a
              href={recordedBlobUrl}
              download="Growth_Intern_Challenge_Presentation_Vivek.webm"
              className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-md transition animate-bounce"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Recorded (.webm)</span>
            </a>
          )}

          {/* Back to main website */}
          <Link
            to="/"
            className="text-xs text-slate-400 hover:text-white px-2 py-1.5 rounded transition flex items-center gap-1"
            title="Return to main website"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Exit Studio</span>
          </Link>
        </div>
      </header>

      {/* ============================================================== */}
      {/* TIMELINE CHAPTERS SCRUBBER BAR */}
      {/* ============================================================== */}
      <div className="bg-slate-950 border-b border-slate-800 px-4 py-2 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center justify-between min-w-[760px] gap-2">
          {CHAPTERS.map((ch, idx) => {
            const isActive = currentChapter.id === ch.id;
            const isCompleted = currentTime >= ch.endTime;
            const progressWithinChapter =
              currentTime >= ch.endTime
                ? 100
                : currentTime < ch.startTime
                ? 0
                : ((currentTime - ch.startTime) / (ch.endTime - ch.startTime)) * 100;

            return (
              <button
                key={ch.id}
                onClick={() => jumpToChapter(ch)}
                className={`flex-1 text-left p-1.5 rounded-lg transition group cursor-pointer relative ${
                  isActive
                    ? 'bg-slate-800/90 ring-1 ring-emerald-500/40'
                    : 'hover:bg-slate-900/60'
                }`}
              >
                {/* Progress bar line for this chapter */}
                <div className="w-full bg-slate-800 h-1 rounded-full mb-1.5 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 ${
                      isActive ? 'bg-emerald-400' : isCompleted ? 'bg-emerald-600' : 'bg-transparent'
                    }`}
                    style={{ width: `${progressWithinChapter}%` }}
                  ></div>
                </div>

                <div className="flex items-center justify-between gap-1 text-[11px]">
                  <span
                    className={`font-semibold truncate ${
                      isActive ? 'text-emerald-400' : isCompleted ? 'text-slate-300' : 'text-slate-500'
                    }`}
                  >
                    {idx + 1}. {ch.title.split(' ')[0]}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {formatTime(ch.startTime)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* MAIN PRESENTATION STAGE & VIEWPORT */}
      {/* ============================================================== */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main 16:9 Presentation Viewport */}
        <div className="flex-1 flex flex-col items-center justify-start p-3 sm:p-5 overflow-hidden bg-slate-950/50">
          
          {/* Simulated Browser Chrome Shell */}
          <div className="w-full max-w-6xl h-full flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-700/60 overflow-hidden relative text-slate-900">
            
            {/* Browser Top Window Bar */}
            <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center justify-between shrink-0">
              {/* Traffic Light Dots */}
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-400"></span>
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className="w-3 h-3 rounded-full bg-emerald-400"></span>
                <span className="ml-3 text-xs font-semibold text-slate-600 hidden sm:inline">
                  {currentChapter.id <= 2 ? 'Executive Briefing' : 'Live Product View'}
                </span>
              </div>

              {/* URL Address Bar */}
              <div className="flex items-center gap-2 bg-white px-4 py-1 rounded-full border border-slate-200 text-xs text-slate-600 font-mono shadow-inner w-72 sm:w-96 truncate">
                <span className="text-emerald-600 font-semibold">https://</span>
                <span>build60mins.ai{currentChapter.route}</span>
              </div>

              {/* View mode toggle (Live Website vs Visual Slide) */}
              <div className="flex items-center gap-1.5 text-xs">
                {currentChapter.id > 2 && (
                  <button
                    onClick={() => setActiveTab(activeTab === 'embed' ? 'slide' : 'embed')}
                    className="text-[11px] font-semibold text-slate-600 hover:text-slate-900 bg-slate-200/80 px-2.5 py-1 rounded-md transition"
                  >
                    {activeTab === 'embed' ? 'View Slide Summary' : 'View Live Website'}
                  </button>
                )}
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  Ch {currentChapter.id}/8
                </span>
              </div>
            </div>

            {/* Inner Content Area */}
            <div
              ref={scrollContainerRef}
              className="flex-1 overflow-y-auto relative bg-[#F8FAFC]"
            >
              {/* ============================================================== */}
              {/* CHAPTER 1: THE CHALLENGE TITLE CARD (0:00 - 0:25) */}
              {/* ============================================================== */}
              {currentChapter.id === 1 && (
                <div className="min-h-full flex flex-col justify-between p-8 sm:p-14 bg-gradient-to-br from-slate-50 via-white to-emerald-50/40 text-slate-900 animate-fade-in">
                  {/* Top Header Badge */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold text-lg shadow-md">
                        AI
                      </div>
                      <div>
                        <span className="text-xs font-bold tracking-widest text-emerald-700 uppercase">
                          Growth Intern Hiring Challenge
                        </span>
                        <p className="text-xs text-slate-500 font-medium">Candidate Presentation Solution</p>
                      </div>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full border border-emerald-200">
                      Live Prototype
                    </span>
                  </div>

                  {/* Core Challenge Title */}
                  <div className="my-8 space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs font-medium text-slate-700">
                      <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                      <span>End-to-End Product-Led Growth Simulation</span>
                    </div>

                    <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-tight">
                      Build Your First AI Project <br />
                      <span className="text-emerald-600 underline decoration-emerald-300 decoration-wavy decoration-2">
                        in 60 Minutes
                      </span>
                    </h1>

                    <p className="text-lg sm:text-xl text-slate-600 max-w-2xl font-normal leading-relaxed">
                      A scalable acquisition and referral engine designed to drive final-year engineering student registrations via campus virality.
                    </p>

                    {/* 3 Key Constraints Display Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-3xl">
                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xl">
                          <Target className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-black text-slate-900">500</div>
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Registrations Target
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold text-xl">
                          <Calendar className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-black text-slate-900">7 Days</div>
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Execution Window
                          </div>
                        </div>
                      </div>

                      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold text-xl">
                          <DollarSign className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="text-2xl font-black text-slate-900">₹2,000</div>
                          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                            Simulated Budget
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Presenter Footer Bar */}
                  <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500">
                    <div>
                      <span className="font-semibold text-slate-800">Presenter:</span> Vivek (Growth Intern Candidate)
                    </div>
                    <div className="flex items-center gap-4">
                      <span>Stack: React • Vite • Tailwind • TypeScript</span>
                      <span className="text-emerald-700 font-semibold">• Ready to Scale</span>
                    </div>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* CHAPTER 2: PRODUCT-LED GROWTH LOOP DIAGRAM (0:25 - 0:50) */}
              {/* ============================================================== */}
              {currentChapter.id === 2 && (
                <div className="min-h-full flex flex-col justify-between p-8 sm:p-12 bg-gradient-to-br from-slate-50 via-white to-emerald-50/50 text-slate-900 animate-fade-in">
                  <div>
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wider mb-2">
                      <Flame className="w-4 h-4 text-emerald-600" />
                      <span>Growth Mechanics</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-950 tracking-tight">
                      Product-Led Campus Viral Loop
                    </h2>
                    <p className="text-sm text-slate-600 mt-1 max-w-xl">
                      On a ₹2,000 budget, paid acquisition is mathematically limited. Growth is engineered directly into the user experience.
                    </p>
                  </div>

                  {/* Interactive Visual Growth Loop */}
                  <div className="my-8 max-w-4xl mx-auto w-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {[
                        {
                          num: '01',
                          title: 'Discover',
                          desc: 'Discovers via branch WhatsApp group or classmate share',
                          icon: MessageCircle,
                          active: currentTime >= 25 && currentTime < 30
                        },
                        {
                          num: '02',
                          title: 'Register',
                          desc: 'Zero-friction 30s registration form, no passwords',
                          icon: Target,
                          active: currentTime >= 30 && currentTime < 35
                        },
                        {
                          num: '03',
                          title: 'Get Referral Link',
                          desc: 'Instant personalized code (e.g. AI60-VIVEK7) activated',
                          icon: Zap,
                          active: currentTime >= 35 && currentTime < 40
                        },
                        {
                          num: '04',
                          title: 'Share With Classmates',
                          desc: '1-tap WhatsApp broadcast to college project groups',
                          icon: Share2,
                          active: currentTime >= 40 && currentTime < 44
                        },
                        {
                          num: '05',
                          title: 'Campus Challenge',
                          desc: 'Colleges compete on simulated live leaderboard',
                          icon: Trophy,
                          active: currentTime >= 44 && currentTime < 47
                        },
                        {
                          num: '06',
                          title: 'Compounding Growth',
                          desc: 'Each student brings 1.4+ peers, driving 500 target',
                          icon: Flame,
                          active: currentTime >= 47 && currentTime <= 50
                        }
                      ].map((step, idx) => {
                        const Icon = step.icon;
                        return (
                          <div
                            key={idx}
                            className={`p-5 rounded-2xl border transition-all duration-300 relative ${
                              step.active
                                ? 'bg-emerald-50/90 border-emerald-500 shadow-lg scale-102 ring-2 ring-emerald-400'
                                : 'bg-white border-slate-200 shadow-sm'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <span
                                className={`text-xs font-mono font-bold ${
                                  step.active ? 'text-emerald-700' : 'text-slate-400'
                                }`}
                              >
                                {step.num}
                              </span>
                              <div
                                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                  step.active
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-slate-100 text-slate-600'
                                }`}
                              >
                                <Icon className="w-4 h-4" />
                              </div>
                            </div>
                            <h3 className="font-bold text-slate-900 text-sm">{step.title}</h3>
                            <p className="text-xs text-slate-500 mt-1 leading-snug">{step.desc}</p>
                          </div>
                        );
                      })}
                    </div>

                    {/* Viral loop cycle callout */}
                    <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white flex items-center justify-between shadow-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                          <Zap className="w-4 h-4" />
                        </div>
                        <span className="text-xs text-slate-300">
                          <strong className="text-white">Calculated Virality:</strong> K-factor of 1.4 ensures 500 registrations with ₹2,000 seed budget.
                        </span>
                      </div>
                      <span className="text-xs font-mono text-emerald-400 font-bold hidden sm:inline">
                        100 Seeds → 500+ Signups ↺
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
                    <span>Acquisition Channel: College WhatsApp Groups & Branch Networks</span>
                    <span>Cost Per Acquisition (CAC): ~₹4.00 (vs ₹150+ paid ads)</span>
                  </div>
                </div>
              )}

              {/* ============================================================== */}
              {/* CHAPTER 3: LIVE LANDING PAGE (0:50 - 1:10) */}
              {/* ============================================================== */}
              {currentChapter.id === 3 && (
                <div className="w-full">
                  {activeTab === 'embed' ? (
                    <div className="w-full">
                      <LandingPage />
                    </div>
                  ) : (
                    <div className="p-8 max-w-3xl mx-auto space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900">Landing Page Strategy</h2>
                      <p className="text-sm text-slate-600">
                        The page is structured to highlight a concrete 60-minute outcome with 0 local setup.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {currentChapter.bulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* CHAPTER 4: AI PROJECT PLAYGROUND (1:10 - 1:30) */}
              {/* ============================================================== */}
              {currentChapter.id === 4 && (
                <div className="w-full">
                  {activeTab === 'embed' ? (
                    <div className="w-full">
                      <PlaygroundPage />
                    </div>
                  ) : (
                    <div className="p-8 max-w-3xl mx-auto space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900">AI Project Playground</h2>
                      <p className="text-sm text-slate-600">
                        Provides 4 concrete blueprints with simulated browser inferences to eliminate hesitation.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {currentChapter.bulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* CHAPTER 5: REGISTRATION & REFERRAL FLOW (1:30 - 1:50) */}
              {/* ============================================================== */}
              {currentChapter.id === 5 && (
                <div className="w-full">
                  {activeTab === 'embed' ? (
                    <div className="w-full">
                      <RegisterPage />
                    </div>
                  ) : (
                    <div className="p-8 max-w-3xl mx-auto space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900">Frictionless Registration</h2>
                      <p className="text-sm text-slate-600">
                        Tailored for final-year engineering students with immediate referral code activation.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {currentChapter.bulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* CHAPTER 6: STUDENT DASHBOARD & JOURNEY (1:50 - 2:15) */}
              {/* ============================================================== */}
              {currentChapter.id === 6 && (
                <div className="w-full">
                  {activeTab === 'embed' ? (
                    <div className="w-full">
                      <DashboardPage />
                    </div>
                  ) : (
                    <div className="p-8 max-w-3xl mx-auto space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900">Student Dashboard</h2>
                      <p className="text-sm text-slate-600">
                        Tracks 5 builder milestones and connects personal referral sharing to campus standing.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {currentChapter.bulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* CHAPTER 7: CAMPUS CHALLENGE & LEADERBOARD (2:15 - 2:35) */}
              {/* ============================================================== */}
              {currentChapter.id === 7 && (
                <div className="w-full">
                  {activeTab === 'embed' ? (
                    <div className="w-full">
                      <CampusChallengePage />
                    </div>
                  ) : (
                    <div className="p-8 max-w-3xl mx-auto space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900">Campus Challenge</h2>
                      <p className="text-sm text-slate-600">
                        6 real institutions compete on a simulated live leaderboard with 1-tap WhatsApp sharing.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {currentChapter.bulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* ============================================================== */}
              {/* CHAPTER 8: GROWTH ADMIN ANALYTICS & CONCLUSION (2:35 - 3:00) */}
              {/* ============================================================== */}
              {currentChapter.id === 8 && (
                <div className="w-full">
                  {activeTab === 'embed' ? (
                    <div className="w-full">
                      <AdminPage />
                    </div>
                  ) : (
                    <div className="p-8 max-w-3xl mx-auto space-y-4">
                      <h2 className="text-2xl font-bold text-slate-900">Growth Admin & Summary</h2>
                      <p className="text-sm text-slate-600">
                        Full funnel tracking, campaign attribution, and conclusion on achieving 500 registrations.
                      </p>
                      <ul className="space-y-2 text-sm text-slate-700">
                        {currentChapter.bulletPoints.map((pt, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                            <span>{pt}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* ============================================================== */}
            {/* FLOATING SUBTITLE / CLOSED CAPTIONS BAR */}
            {/* ============================================================== */}
            <div className="p-3 bg-slate-950/90 border-t border-slate-800 text-slate-200 shrink-0 backdrop-blur-md">
              <div className="flex items-start gap-3 max-w-5xl mx-auto">
                <div className="shrink-0 mt-0.5">
                  <span className="w-6 h-6 rounded-md bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                    CC
                  </span>
                </div>
                <div className="flex-1">
                  <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed">
                    "{currentChapter.voiceover}"
                  </p>
                  <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-1 font-mono">
                    <span className="text-emerald-400 font-semibold">{currentChapter.keyHighlight}</span>
                    <span>•</span>
                    <span>
                      {formatTime(currentChapter.startTime)} – {formatTime(currentChapter.endTime)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ============================================================== */}
        {/* COLLAPSIBLE TELEPROMPTER & EVALUATOR NOTES DRAWER */}
        {/* ============================================================== */}
        {isTeleprompterOpen && (
          <aside className="w-80 sm:w-96 bg-slate-950 border-l border-slate-800 flex flex-col shrink-0 overflow-hidden animate-slide-left">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <span className="text-sm font-bold text-white">Teleprompter & Script</span>
              </div>
              <button
                onClick={() => setIsTeleprompterOpen(false)}
                className="text-xs text-slate-400 hover:text-white px-2 py-1 rounded hover:bg-slate-800"
              >
                Close
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
              <div className="bg-emerald-950/40 border border-emerald-800/60 p-3 rounded-xl text-emerald-300">
                <span className="font-bold block mb-1">Evaluator Rubric Alignment:</span>
                Product-led growth, organic referral engine, transparent simulation labeling, zero-cost campus virality.
              </div>

              {CHAPTERS.map((ch) => {
                const isSelected = ch.id === currentChapter.id;
                return (
                  <div
                    key={ch.id}
                    onClick={() => jumpToChapter(ch)}
                    className={`p-3 rounded-xl border transition cursor-pointer ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/50'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`font-bold ${
                          isSelected ? 'text-emerald-400' : 'text-slate-300'
                        }`}
                      >
                        Ch {ch.id}: {ch.title}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        {formatTime(ch.startTime)}
                      </span>
                    </div>

                    <p className={`mt-1.5 leading-relaxed ${isSelected ? 'text-white' : 'text-slate-400'}`}>
                      "{ch.voiceover}"
                    </p>

                    <div className="mt-2 pt-2 border-t border-slate-800 space-y-1">
                      {ch.bulletPoints.map((pt, i) => (
                        <div key={i} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald-400"></span>
                          <span>{pt}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}

              {/* Windows Game Bar recording tip */}
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 text-[11px] text-slate-400">
                <span className="font-semibold text-slate-200 block mb-1">Recording Tip:</span>
                Press <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-white font-mono">Win + Alt + R</kbd> on Windows to start full HD screen recording instantly.
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default PresentationPage;
