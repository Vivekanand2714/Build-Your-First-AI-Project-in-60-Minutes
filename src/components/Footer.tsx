import React from 'react';
import { Link } from 'react-router-dom';
import { Code2, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-500 text-xs mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-600">
                <Code2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-slate-900 text-base">
                Build Your First AI Project in 60 Minutes
              </span>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed max-w-md">
              A focused, hands-on live online workshop engineered for final-year engineering students. Go from an AI concept to a working deployed application in one intensive 60-minute build session.
            </p>
            <div className="flex items-center gap-2 text-slate-500 text-xs pt-1">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>100% Free Educational Workshop &bull; Growth Prototype Simulation</span>
            </div>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-3">Platform Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/playground" className="hover:text-slate-900 transition">AI Project Playground</Link>
              </li>
              <li>
                <Link to="/campus-challenge" className="hover:text-slate-900 transition">Campus Challenge</Link>
              </li>
              <li>
                <Link to="/whatsapp-flow" className="hover:text-slate-900 transition">WhatsApp Growth Flow</Link>
              </li>
              <li>
                <Link to="/workshop" className="hover:text-slate-900 transition">60-Minute Workshop</Link>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-slate-900 transition">Campus Leaderboard</Link>
              </li>
              <li>
                <Link to="/admin" className="hover:text-slate-900 transition">Growth & Admin Analytics</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-slate-900 font-semibold text-sm mb-3">Ethics & Transparency</h4>
            <p className="text-slate-500 text-xs leading-relaxed mb-3">
              We focus strictly on practical, hands-on engineering skills. We make no exaggerated or guaranteed job, placement, or salary claims.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
              <ShieldAlert className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulated Prototype Records</span>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-400">
          <p>© 2026 Build Your First AI Project in 60 Minutes. All rights reserved.</p>
          <div className="flex items-center gap-5 text-xs">
            <span className="hover:text-slate-700 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-700 cursor-pointer">Terms of Participation</span>
            <span className="hover:text-slate-700 cursor-pointer">Code of Conduct</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
