import React, { useState } from 'react';
import { useGrowth } from '../context/GrowthContext';
import { Settings, X, Zap, RefreshCw, UserCheck, Sparkles } from 'lucide-react';

export const DemoControlsModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const { currentStudent, students, setCurrentStudentId, simulateReferral, resetDemoData } = useGrowth();

  const handleSimulate = () => {
    const res = simulateReferral();
    if (res.success) {
      setToastMessage(res.message);
      setTimeout(() => setToastMessage(null), 4000);
    } else {
      setToastMessage(res.message);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const handleReset = () => {
    if (window.confirm('Reset all demo registrations and referrals back to initial seed data?')) {
      resetDemoData();
      setToastMessage('Simulation reset to initial seed data.');
      setTimeout(() => setToastMessage(null), 3000);
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Small unobtrusive button in bottom-right corner */}
      <div className="fixed bottom-4 right-4 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 px-3.5 py-2 rounded-full border border-slate-200 shadow-md text-xs font-semibold transition cursor-pointer group"
          title="Open evaluator demo & simulation controls"
        >
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600"></span>
          </span>
          <span className="text-slate-500 font-normal">Evaluator:</span>
          <span className="text-emerald-600 font-bold group-hover:text-emerald-700">Demo Mode</span>
        </button>
      </div>

      {/* Floating toast notification */}
      {toastMessage && (
        <div className="fixed bottom-16 right-4 z-50 max-w-sm bg-white border border-emerald-300 text-slate-800 px-4 py-3 rounded-2xl shadow-xl text-xs flex items-center gap-2.5 animate-bounce">
          <Zap className="w-4 h-4 text-emerald-600 shrink-0" />
          <span className="font-medium text-emerald-900">{toastMessage}</span>
        </div>
      )}

      {/* Clean Light Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white border border-slate-200 rounded-2xl max-w-md w-full p-6 shadow-2xl relative text-left space-y-5 animate-scale-up">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                    <span>Demo Controls</span>
                    <span className="bg-emerald-50 text-emerald-700 text-[10px] font-mono px-2 py-0.5 rounded-full border border-emerald-200/60">
                      Simulation Only
                    </span>
                  </h3>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Simulation controls — for demonstration only
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Current Active Session */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200/80 text-xs flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[11px]">Currently Active Session:</span>
                <span className="text-slate-900 font-bold text-sm">
                  {currentStudent ? currentStudent.fullName : 'Unregistered Visitor (No active student)'}
                </span>
                {currentStudent && (
                  <span className="text-emerald-600 font-mono text-[11px] block mt-0.5">
                    Code: {currentStudent.referralCode} &bull; {currentStudent.referralCount} referrals
                  </span>
                )}
              </div>
              <div className="text-right">
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${
                  currentStudent ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-700'
                }`}>
                  {currentStudent ? 'Student Active' : 'Visitor Mode'}
                </span>
              </div>
            </div>

            {/* Control 1: Switch Demo Student */}
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                1. Switch Demo Student:
              </label>
              <select
                value={currentStudent?.id || ''}
                onChange={(e) => setCurrentStudentId(e.target.value || null)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs text-slate-800 focus:outline-none focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 cursor-pointer"
              >
                <option value="">— Unregistered Visitor (Empty Session) —</option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.fullName} ({s.referralCount} referrals &bull; {s.college.split('–')[0].trim()})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">
                Previews the dashboard and highlights the student on the leaderboard.
              </p>
            </div>

            {/* Control 2: Simulate Referral */}
            <div className="p-3.5 bg-emerald-50/50 border border-emerald-100 rounded-xl space-y-2">
              <div>
                <h4 className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                  <span>2. Simulate Referral (+1 Classmate)</span>
                </h4>
                <p className="text-[11px] text-slate-600 mt-0.5">
                  Simulates a classmate signing up with the active student's code to show live count updates.
                </p>
              </div>
              <button
                onClick={handleSimulate}
                disabled={!currentStudent}
                className={`w-full flex items-center justify-center gap-1.5 ${
                  currentStudent 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white cursor-pointer shadow-xs' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                } font-bold py-2 px-4 rounded-xl text-xs transition`}
              >
                <Zap className="w-3.5 h-3.5" />
                <span>Simulate Referral for {currentStudent ? currentStudent.fullName.split(' ')[0] : 'Active Student'}</span>
              </button>
            </div>

            {/* Control 3: Reset Demo Data */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <div className="text-slate-500 text-[11px]">
                Reset to initial seed records
              </div>
              <button
                onClick={handleReset}
                className="flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 px-3 py-1.5 rounded-lg border border-slate-200 transition cursor-pointer text-xs font-medium"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Demo Data</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
};
