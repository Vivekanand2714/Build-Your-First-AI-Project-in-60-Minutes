import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Terminal, Sparkles, Clock, Calendar, CheckCircle2, Trophy, 
  Users, Share2, ArrowRight, Code2, Cpu, Rocket, ChevronRight, 
  HelpCircle, ShieldCheck, Flame, BookOpen, Layers, Check, ArrowDown
} from 'lucide-react';
import { WORKSHOP_DETAILS } from '../data/seedData';
import { useGrowth } from '../context/GrowthContext';

export const LandingPage: React.FC = () => {
  const { metrics, getLeaderboard } = useGrowth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const leaderboard = getLeaderboard();
  const top3 = leaderboard.slice(0, 3);

  const faqs = [
    {
      q: 'Is this workshop completely free?',
      a: 'Yes, 100% free. There are no hidden costs or credit card requirements. Our goal is to equip engineering students with real hands-on AI application building before final-semester submissions.'
    },
    {
      q: 'What prior technical experience is needed?',
      a: 'Basic knowledge of Python or JavaScript. We provide pre-structured project templates and walk through every line of code step-by-step.'
    },
    {
      q: 'How does the student referral and leaderboard program work?',
      a: 'When you register, you automatically receive a unique referral link (e.g. AI60-VIVEK7). Share it with your branch classmates. When friends sign up, your referral count increases and your campus leaderboard rank updates in real-time!'
    },
    {
      q: 'What will I have built by the end of 60 minutes?',
      a: 'You will build and deploy a working full-stack AI Copilot application that accepts prompts, orchestrates real LLM API completions, streams responses, and is deployed to a live shareable cloud URL.'
    },
    {
      q: 'Does this workshop guarantee placements or internships?',
      a: 'No. We focus strictly on genuine engineering skills and architectural fundamentals. We do not make misleading claims regarding guaranteed jobs, placements, or salaries.'
    }
  ];

  return (
    <div className="bg-[#F8FAFC] text-[#0F172A] min-h-screen">
      
      {/* HERO SECTION (Clean Supabase/Developer Two-Column Layout) */}
      <section className="pt-12 pb-20 md:pt-20 md:pb-28 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>FREE LIVE ONLINE WORKSHOP</span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.12]">
                Build Your First AI Project in{' '}
                <span className="text-emerald-600">60 Minutes</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl">
                Go from an AI idea to a working project in one focused, hands-on session. Designed specifically for final-year engineering students.
              </p>

              {/* Primary / Secondary CTAs */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
                <Link
                  to="/register"
                  className="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-7 py-3.5 rounded-xl text-sm transition shadow-xs hover:shadow"
                >
                  <span>Register for Free</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                
                <Link
                  to="/playground"
                  className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3.5 rounded-xl text-sm border border-slate-200 transition shadow-2xs"
                >
                  <Cpu className="w-4 h-4 text-emerald-600" />
                  <span>AI Project Playground</span>
                </Link>
              </div>

              {/* Social Proof Counter */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-6 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-emerald-600" />
                  <span><strong className="text-slate-900">{metrics.totalRegistrations}</strong> demo registrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4 text-amber-500" />
                  <span><strong className="text-slate-900">{metrics.referralRate}%</strong> simulated referral rate</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>No credit card required</span>
                </div>
              </div>

            </div>

            {/* Right Column: Stylized Project Experience Preview Card */}
            <div className="lg:col-span-5">
              <div className="linear-card rounded-2xl p-6 sm:p-7 space-y-5 bg-white shadow-sm border border-slate-200">
                
                {/* Header bar of preview card */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span>
                    <span className="font-mono text-slate-500 ml-1 text-[11px]">workshop-project.ai</span>
                  </div>
                  <span className="bg-emerald-50 text-emerald-700 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-200">
                    Live 60-Min Build
                  </span>
                </div>

                {/* Flow preview: Idea → AI Logic → Working App → Deploy */}
                <div className="space-y-3">
                  
                  {/* Step 1 */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      01
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900">Concept & Architecture</div>
                      <div className="text-[11px] text-slate-500 truncate">Multimodal Assistant idea & endpoints setup</div>
                    </div>
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>

                  {/* Step 2 */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      02
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900">AI Core Intelligence</div>
                      <div className="text-[11px] text-slate-500 truncate">Prompt chains & streaming token pipeline</div>
                    </div>
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>

                  {/* Step 3 */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-50/80 border border-slate-100">
                    <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      03
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-slate-900">Interactive Frontend App</div>
                      <div className="text-[11px] text-slate-500 truncate">Connecting live React UI with streaming states</div>
                    </div>
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>

                  {/* Step 4 */}
                  <div className="flex items-center gap-3 p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200">
                    <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs shrink-0 font-mono">
                      04
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-emerald-900">Cloud Deployment & URL</div>
                      <div className="text-[11px] text-emerald-700 truncate">Ready to showcase on GitHub and resume</div>
                    </div>
                    <Rocket className="w-4 h-4 text-emerald-600 shrink-0" />
                  </div>

                </div>

                {/* Footer preview stat */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>Target: Capstone & Portfolio</span>
                  <span className="font-semibold text-emerald-600">60 Minutes End-to-End</span>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TRUST / VALUE STRIP (4 Clean Benefit Cards) */}
      <section className="py-12 border-b border-slate-200 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">60-Minute Live Session</h3>
                <p className="text-xs text-slate-500 mt-1">High-density code-along without wasted time.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <Code2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Hands-on Project Building</h3>
                <p className="text-xs text-slate-500 mt-1">Code every line yourself. No boring lecture slides.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">Beginner-Friendly Approach</h3>
                <p className="text-xs text-slate-500 mt-1">Clear blueprints & pre-configured project templates.</p>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900">100% Free Access</h3>
                <p className="text-xs text-slate-500 mt-1">Free open learning for engineering students.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* "WHAT YOU'LL BUILD" SECTION */}
      <section id="how-it-works" className="py-20 bg-white border-b border-slate-200 scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
              The Project Journey
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-1">
              What You'll Build & Experience
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              A comprehensive walk-through that turns abstract AI concepts into deployable engineering code.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            
            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block mb-4">
                  01
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Start with an idea</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Identify a concrete student utility use-case and set up lightweight API keys and dev environment.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                Architecture Blueprint
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block mb-4">
                  02
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Add AI intelligence</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Structure system prompts, chain reasoning steps, and stream responses with real model endpoints.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                Core Reasoning Engine
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block mb-4">
                  03
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Build the application</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Connect modern frontend controls to the streaming API pipeline with clean loading and error states.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-slate-500">
                Interactive UI Layer
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-6 relative flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs font-bold text-emerald-600 bg-white px-2.5 py-1 rounded-md border border-slate-200 inline-block mb-4">
                  04
                </span>
                <h3 className="text-base font-bold text-slate-900 mb-2">Deploy and showcase</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Push your project to a public cloud link ready to demonstrate in capstone reviews and job portfolios.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-200 text-xs font-medium text-emerald-600 flex items-center gap-1 font-semibold">
                Live URL Ready
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 60-MINUTE WORKSHOP TIMELINE SECTION */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center mb-14">
            <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
              Schedule & Structure
            </span>
            <h2 className="text-3xl font-extrabold text-[#0F172A] mt-1">
              The 60-Minute Breakdown
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Every minute is optimized to ensure you finish with a complete working build.
            </p>
          </div>

          <div className="space-y-4">
            
            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-100 shrink-0">
                  00–10 min
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Setup & Project Idea</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Workspace configuration, API credentials, and project scope.</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">Phase 1</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-100 shrink-0">
                  10–25 min
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">AI Fundamentals</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Understanding model parameters, system instructions, and token streaming.</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">Phase 2</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-100 shrink-0">
                  25–45 min
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Build the Core Project</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Coding the prompt chaining, state logic, and interactive user interface.</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 font-semibold">Core Build</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-100 shrink-0">
                  45–55 min
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Connect & Test</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Wiring endpoints with frontend components, error handling, and latency testing.</p>
                </div>
              </div>
              <span className="text-xs text-slate-400 font-medium">Testing</span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start sm:items-center gap-4">
                <span className="px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono text-xs font-bold border border-emerald-100 shrink-0">
                  55–60 min
                </span>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">Deploy & Showcase</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Live production cloud deployment, public share URL, and Q&A.</p>
                </div>
              </div>
              <span className="text-xs text-emerald-600 font-semibold">Live Launch</span>
            </div>

          </div>

        </div>
      </section>

      {/* WHY STUDENTS SHOULD REGISTER */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            <div className="space-y-6">
              <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
                Engineering Relevance
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
                Why Final-Year Students Should Attend
              </h2>
              <p className="text-slate-600 text-base leading-relaxed">
                Most tutorials leave you with unfinished syntax. This workshop equips you with a real application you can explain, defend, and demonstrate in viva reviews and tech discussions.
              </p>

              <div className="space-y-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Build Something Practical</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Move past simple toy scripts to an interactive, deployable project.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Learn by Doing</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Hands-on keyboard practice where you write the logic as we go.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Understand How AI Fits into Real Apps</h4>
                    <p className="text-xs text-slate-500 mt-0.5">See how frontend interfaces, state logic, and LLM APIs work together.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-md bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Have a Project to Discuss & Showcase</h4>
                    <p className="text-xs text-slate-500 mt-0.5">Add a live URL and clean GitHub repository to your resume.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#F8FAFC] border border-slate-200 rounded-2xl p-8 space-y-6">
              <h3 className="text-base font-bold text-slate-900">Workshop Details at a Glance</h3>
              
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-slate-500">Workshop Name</span>
                  <span className="font-semibold text-slate-900">Build Your First AI Project in 60 Minutes</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-slate-500">Date & Schedule</span>
                  <span className="font-semibold text-slate-900">{WORKSHOP_DETAILS.date} &bull; {WORKSHOP_DETAILS.time}</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-slate-500">Duration</span>
                  <span className="font-semibold text-slate-900">60 Minutes Live</span>
                </div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                  <span className="text-slate-500">Format</span>
                  <span className="font-semibold text-slate-900">Live Interactive Code-Along</span>
                </div>
                <div className="flex items-center justify-between pb-1">
                  <span className="text-slate-500">Access Fee</span>
                  <span className="font-bold text-emerald-600">100% Free for Students</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to="/register"
                  className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 px-6 rounded-xl text-xs transition shadow-xs"
                >
                  <span>Reserve Your Free Seat</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* REFERRAL / CAMPUS GROWTH SECTION & LEADERBOARD PREVIEW */}
      <section className="py-20 bg-[#F8FAFC] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
              Peer Learning
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mt-1">
              Bring Your Friends. Build Together.
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Share the free workshop with your college classmates, track registrations, and climb the campus leaderboard.
            </p>
          </div>

          {/* Simple 4-step referral flow */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs text-center">
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Step 1</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">Register</h4>
              <p className="text-xs text-slate-500 mt-1">Sign up in 30 seconds for free.</p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs text-center">
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Step 2</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">Get Referral Link</h4>
              <p className="text-xs text-slate-500 mt-1">Receive a unique code & share link.</p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs text-center">
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Step 3</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">Share with Classmates</h4>
              <p className="text-xs text-slate-500 mt-1">Send to college WhatsApp groups.</p>
            </div>

            <div className="bg-white border border-slate-200 p-5 rounded-xl shadow-xs text-center">
              <span className="font-mono text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">Step 4</span>
              <h4 className="text-sm font-bold text-slate-900 mt-2">Climb Leaderboard</h4>
              <p className="text-xs text-slate-500 mt-1">Unlock VIP tiers as friends join.</p>
            </div>
          </div>

          {/* LEADERBOARD PREVIEW (Top 3 Cards) */}
          <div className="max-w-4xl mx-auto bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <h3 className="text-base font-bold text-slate-900">Demo Leaderboard</h3>
                  <span className="bg-slate-100 text-slate-600 text-[10px] font-mono px-2 py-0.5 rounded-full border border-slate-200">
                    Simulated Records
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">Top participating student referrers driving peer registrations</p>
              </div>

              <Link
                to="/leaderboard"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 bg-emerald-50 hover:bg-emerald-100/70 px-3.5 py-2 rounded-xl transition"
              >
                <span>View Full Leaderboard</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-6">
              {top3.map((student, idx) => (
                <div
                  key={student.id}
                  className={`p-5 rounded-2xl border text-center relative flex flex-col justify-between ${
                    idx === 0 
                      ? 'bg-amber-50/40 border-amber-200' 
                      : 'bg-[#F8FAFC] border-slate-200'
                  }`}
                >
                  <div>
                    <div className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-800 flex items-center justify-center font-bold text-sm mx-auto mb-2 shadow-xs">
                      {idx === 0 ? '👑 1' : idx === 1 ? '🥈 2' : '🥉 3'}
                    </div>
                    <h4 className="font-bold text-slate-900 text-sm">{student.fullName}</h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 truncate">{student.college}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200/80">
                    <span className="text-xl font-extrabold text-slate-900 font-mono">{student.referralCount}</span>
                    <span className="text-[11px] text-slate-500 block">referrals</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-[#0F172A]">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm mt-2">Clear answers regarding workshop participation, requirements, and referrals.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-slate-200 rounded-xl overflow-hidden bg-white transition"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-emerald-600 transition text-sm cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <ChevronRight
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                        isOpen ? 'rotate-90 text-emerald-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="py-16 bg-[#F8FAFC] text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-8 sm:p-12 shadow-xs space-y-5">
            <span className="text-xs font-semibold text-emerald-600 tracking-wider uppercase">
              Free Live Workshop
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A]">
              Build Your First AI Project in 60 Minutes
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-xl mx-auto">
              Join fellow engineering students, get your unique referral link immediately upon registration, and build a project you're proud of.
            </p>
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                to="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-8 py-3.5 rounded-xl text-sm transition shadow-xs"
              >
                <span>Register for Free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/leaderboard"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-semibold px-6 py-3.5 rounded-xl text-sm border border-slate-200 transition"
              >
                <span>View Leaderboard</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
