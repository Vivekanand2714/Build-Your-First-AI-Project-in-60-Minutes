import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useGrowth } from '../context/GrowthContext';
import { PROJECT_BLUEPRINTS } from '../data/seedData';
import { 
  Cpu, ArrowRight, CheckCircle2, Clock, Sparkles, Terminal, 
  Layers, FileText, Bot, LineChart, Smile, Play, Check, ShieldCheck 
} from 'lucide-react';

export const PlaygroundPage: React.FC = () => {
  const { currentStudent, updateBuilderProgress } = useGrowth();
  const navigate = useNavigate();
  
  const [activeProject, setActiveProject] = useState(PROJECT_BLUEPRINTS[0].id);
  const [simulatingId, setSimulatingId] = useState<string | null>(null);
  const [simulatedOutputs, setSimulatedOutputs] = useState<Record<string, boolean>>({});

  const handleStartProject = (projectId: string) => {
    if (currentStudent) {
      updateBuilderProgress({ selectedProject: projectId });
      navigate(`/workshop?project=${projectId}`);
    } else {
      navigate(`/register?project=${projectId}`);
    }
  };

  const handleSimulateRun = (id: string) => {
    setSimulatingId(id);
    setTimeout(() => {
      setSimulatingId(null);
      setSimulatedOutputs(prev => ({ ...prev, [id]: true }));
    }, 800);
  };

  const getIcon = (id: string) => {
    switch (id) {
      case 'resume-analyzer':
        return <FileText className="w-5 h-5 text-emerald-600" />;
      case 'ai-chatbot':
        return <Bot className="w-5 h-5 text-emerald-600" />;
      case 'performance-predictor':
        return <LineChart className="w-5 h-5 text-emerald-600" />;
      case 'sentiment-analyzer':
        return <Smile className="w-5 h-5 text-emerald-600" />;
      default:
        return <Cpu className="w-5 h-5 text-emerald-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header Hero */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-10 shadow-xs">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Engineering Curriculum</span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              AI Project Playground
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Explore the exact project architectures final-year engineering students build during the 60-minute workshop. 
              Each project is structured into a 5-step sprint designed to take you from problem definition to functional AI prototype.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-mono bg-slate-100 px-2.5 py-1 rounded-md border border-slate-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Simulated Interactive Blueprint (No external API keys required)
              </span>
              <span className="flex items-center gap-1 font-mono bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-md border border-emerald-200">
                <Clock className="w-3.5 h-3.5" />
                60-Minute Workshop Format
              </span>
            </div>
          </div>
        </div>

        {/* Project Selector Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {PROJECT_BLUEPRINTS.map(p => (
            <button
              key={p.id}
              onClick={() => setActiveProject(p.id)}
              className={`shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition border cursor-pointer ${
                activeProject === p.id
                  ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>

        {/* 4 Project Blueprints Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {PROJECT_BLUEPRINTS.map((project) => {
            const isSelected = activeProject === project.id;
            const isUserCurrent = currentStudent?.selectedProject === project.id;
            const hasSimulated = simulatedOutputs[project.id];
            const isSimulating = simulatingId === project.id;

            return (
              <div
                key={project.id}
                id={project.id}
                className={`bg-white rounded-2xl border transition shadow-xs flex flex-col justify-between overflow-hidden ${
                  isSelected ? 'border-emerald-600 ring-2 ring-emerald-600/10' : 'border-slate-200'
                }`}
              >
                <div className="p-6 sm:p-7 space-y-6">
                  
                  {/* Top Meta Bar */}
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center shrink-0">
                        {getIcon(project.id)}
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-slate-900">
                          {project.title}
                        </h2>
                        <span className="text-xs text-emerald-700 font-medium">
                          {project.tagline}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <span className="text-[11px] font-mono font-semibold bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded border border-slate-200">
                        {project.estimatedTime}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Level: {project.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Problem & Outcome */}
                  <div className="space-y-3">
                    <div className="bg-slate-50 rounded-xl p-3.5 border border-slate-200/80">
                      <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                        <span>Problem Statement</span>
                      </h3>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {project.problem}
                      </p>
                    </div>

                    <div className="bg-emerald-50/60 rounded-xl p-3.5 border border-emerald-100">
                      <h3 className="text-xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                        Target Student Outcome
                      </h3>
                      <p className="text-xs text-emerald-900 leading-relaxed">
                        {project.targetOutcome}
                      </p>
                    </div>

                    <div className="bg-white rounded-xl p-3 border border-slate-200 text-xs">
                      <span className="font-semibold text-slate-800">AI Component / Layer: </span>
                      <span className="text-slate-600">{project.aiComponent}</span>
                    </div>
                  </div>

                  {/* 5-Step Build Journey */}
                  <div className="space-y-2.5 pt-1">
                    <div className="flex items-center justify-between text-xs font-bold text-slate-800">
                      <span>5-Step Build Journey</span>
                      <span className="font-mono text-emerald-600 text-[11px]">60 Mins Total</span>
                    </div>

                    <div className="space-y-2">
                      {project.journey.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-600">
                          <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-mono font-bold flex items-center justify-center shrink-0 text-[10px] border border-slate-200 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Interactive Sample Simulation */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-xl p-3 border border-slate-200 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                          Interactive Preview
                        </span>
                        <button
                          onClick={() => handleSimulateRun(project.id)}
                          disabled={isSimulating}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 bg-white border border-emerald-200 px-2.5 py-1 rounded-lg transition cursor-pointer"
                        >
                          {isSimulating ? (
                            <>
                              <Sparkles className="w-3 h-3 animate-spin text-emerald-600" />
                              <span>Evaluating...</span>
                            </>
                          ) : hasSimulated ? (
                            <>
                              <Check className="w-3 h-3 text-emerald-600" />
                              <span>Re-test Run</span>
                            </>
                          ) : (
                            <>
                              <Play className="w-3 h-3 text-emerald-600" />
                              <span>Simulate AI Output</span>
                            </>
                          )}
                        </button>
                      </div>

                      <div className="text-[11px] text-slate-600 font-mono bg-white p-2.5 rounded-lg border border-slate-200">
                        <div className="text-slate-400 text-[10px]">Sample Input:</div>
                        <div className="text-slate-800 mb-1.5">{project.sampleInput}</div>

                        {hasSimulated ? (
                          <div className="pt-1.5 border-t border-slate-100 text-emerald-700 font-medium">
                            <span className="text-[10px] text-emerald-600 uppercase">Simulated AI Response:</span>
                            <div>{project.sampleOutput}</div>
                          </div>
                        ) : (
                          <div className="text-[10px] text-slate-400 italic">
                            Click "Simulate AI Output" to preview what this blueprint produces.
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                </div>

                {/* Footer Action */}
                <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] font-mono bg-white border border-slate-200 px-2 py-0.5 rounded text-slate-600">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => handleStartProject(project.id)}
                    className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs transition cursor-pointer"
                  >
                    <span>{isUserCurrent ? 'Continue This Project' : 'Start This Project'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-lg font-bold text-slate-900">
              Not sure which project to pick?
            </h3>
            <p className="text-slate-500 text-xs max-w-xl">
              You can start with the <strong className="text-slate-800">AI Resume Analyzer</strong> in the live workshop, 
              then apply the same 5-step build pattern to your own custom ideas.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <Link
              to="/campus-challenge"
              className="text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl transition"
            >
              View Campus Challenge
            </Link>
            
            <Link
              to={currentStudent ? '/workshop' : '/register'}
              className="text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 px-4 py-2.5 rounded-xl transition shadow-xs flex items-center gap-1.5"
            >
              <span>{currentStudent ? 'Go to 60-Min Workshop' : 'Register for Free'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
